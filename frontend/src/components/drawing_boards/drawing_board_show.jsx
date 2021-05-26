import React from 'react';
import io from "socket.io-client" 

class DrawingBoardShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mainBoard: "board1"
        }
        this.createEasel = this.createEasel.bind(this);
        this.changeBoard = this.changeBoard.bind(this);
        this.drawOnCanvas = this.drawOnCanvas.bind(this);
      
    }

    socket = io.connect("http://localhost:5000",)
    componentDidMount() {

        this.socket.on("broadcast", function (data) {
            document.getElementById("clients").innerHTML = data.description;
          
        })
        this.socket.on(this.state.mainBoard, function (data, boardName) {
         
            const image = new Image();
            const canvas = document.querySelector(`#${boardName}`)
  
            const ctx = canvas.getContext("2d");

            image.onload = function () {
                ctx.drawImage(image, 0, 0);
            };
            image.src = data;
        })

        this.drawOnCanvas();

    }


    componentDidUpdate(prevProps, prevState){
       
        this.socket.off(prevState.mainBoard)
        this.socket.on(this.state.mainBoard, function (data, boardName) {
            console.log(5)
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

            const display = document.querySelector('#main-easel-display');
            const display_style = getComputedStyle(display);
            canvas.width = parseInt(display_style.getPropertyValue('width'));
            canvas.height = parseInt(display_style.getPropertyValue('height'));

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

        // let { drawingBoard, easels } = this.props;
        
        // if (!drawingBoard) return null;
        const easels = [
            {id: 1},
            {id: 2},
            {id: 3},
        
        ]

        // const mapped = easels.map(easel => <canvas id={`${easel.id}`}  />)

        const mapped = easels.map(easel => <canvas width="200" height="200" onClick={this.changeBoard} key={easel.id} id={`board${easel.id}`}  />)


        return (
            <div className="drawing-board-show-page">
                <h1>I am the drawing board show page!</h1>
                <div className="color-picker-container">
                    <input type="color" />
                </div>
                <div id="clients">

                </div>

                <div style={{height: "700px", width: "700px"}} id="main-easel-display">
                        <h1> {this.state.mainBoard}</h1>
                    <canvas id={this.state.mainBoard} width="700" height="700" style={{border: '1px solid black'}} ></canvas>
                </div>

                <button onClick={this.createEasel}>Create an Easel!</button>

                <div>
                        <h1>other boards</h1>
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