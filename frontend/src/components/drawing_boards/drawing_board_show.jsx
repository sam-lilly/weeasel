import React from 'react';

class DrawingBoardShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mainBoard: ""
        }
        this.createEasel = this.createEasel.bind(this);
        this.changeBoard = this.changeBoard.bind(this);
        this.drawOnCanvas = this.drawOnCanvas.bind(this);
    }


    componentDidMount() {
        this.props.fetchDrawingBoard(this.props.match.params.drawingBoardId);
        this.props.fetchEasels();
        // only fetch the easels of the drawing board
    }


    componentDidUpdate(prevProps, prevState){
        this.socket.off(prevState.mainBoard)
        this.socket.on(this.state.mainBoard, function (data, boardName) {

            const image = new Image();
            const canvas = document.querySelector(`#${boardName}`)
            // if (!canvas) return
            const ctx = canvas.getContext("2d");
            image.onload = function () {
                ctx.drawImage(image, 0, 0);
            };
            image.src = data;
        })
    }



    
    createEasel() {
        this.props.createEasel();
        // need to pass in the name, and ID of the drawing board it belongs to


        // creates an easel to be added to the drawing board
        // this easel becomes the easel on the SHOW page
        // becomes the MAIN easel

    }

    // main easel will be displayed above
    // inside of main easel / will have document.querySelector
    // onClick of an item in index , will set state ({mainID: easelID})
    // to main easels ID will trigger rerender
    // then change the main image to that selected

    drawOnCanvas(){
        const canvas = document.querySelector(`#${this.state.mainBoard}`);
        // if (!canvas) return
            const ctx = canvas.getContext('2d');

            const sketch = document.querySelector('#main-easel-display');
            const sketch_style = getComputedStyle(sketch);
            canvas.width = parseInt(sketch_style.getPropertyValue('width'));
            canvas.height = parseInt(sketch_style.getPropertyValue('height'));

            const mouse = { x: 0, y: 0 };
            const last_mouse = { x: 0, y: 0 };
         
            canvas.addEventListener('mousemove', function (e) {
                last_mouse.x = mouse.x;
                last_mouse.y = mouse.y;

                mouse.x = e.pageX - this.offsetLeft;
                mouse.y = e.pageY - this.offsetTop;
            }, false);

            ctx.lineWidth = 5;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'blue';

            canvas.addEventListener('mousedown', function (e) {
                canvas.addEventListener('mousemove', onPaint, false);
            }, false);

            canvas.addEventListener('mouseup', function () {
                canvas.removeEventListener('mousemove', onPaint, false);
            }, false);

            const root = this;
            const onPaint = function () {
                ctx.beginPath();
                ctx.moveTo(last_mouse.x, last_mouse.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.closePath();
                ctx.stroke();
                if (root.timeout !== undefined) clearTimeout(root.timeout)
                root.timeout = setTimeout(function(){
                    const base64Imagedata = canvas.toDataURL("image/png")
                    root.socket.emit("canvas-data", base64Imagedata, root.state.mainBoard
                        )
                }, 1000)
            };

        ;
    }




    changeBoard(e) {
        this.setState({ mainBoard: e.target.id})
    }



    render () {

        let { drawingBoard, easels } = this.props;
        
        if (!drawingBoard) return null;

        const mapped = easels.map(easel => <canvas id={`${easel.id}`}  />)


        return (
            <div className="drawing-board-show-page">
                <h1>I am the drawing board show page!</h1>

                <div className="main-easel-display">

                    {
                        mapped.length < 2 ? mapped[0] : document.getElementById(this.state.mainBoard)
                    }

                </div>

                <button onClick={this.createEasel}>Create an Easel!</button>

                <div>
                    {mapped}
                </div>

                <div>
                    CHAT
                </div>

            </div>
        )
    }

}

export default DrawingBoardShow;