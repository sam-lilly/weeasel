import React from 'react';
import io from "socket.io-client"

class DrawingBoardShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mainBoard: "board1",
            input: "",
            color: "#000000",
            size: "5"
        }
        // inside of our state we'll have to have the main board image data
        this.createEasel = this.createEasel.bind(this);
        this.changeBoard = this.changeBoard.bind(this);
        this.drawOnCanvas = this.drawOnCanvas.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleEmitInput = this.handleEmitInput.bind(this);
        this.changeColor = this.changeColor.bind(this)
        this.changeSize = this.changeSize.bind(this)

    }

    socket = io.connect("http://localhost:5000",)
    ctx;
    componentDidMount() {
        //we're gonna need a way to fetch the easel info whenever the page loads
        //and then 
        this.socket.on("broadcast", function (data) {
            document.getElementById("clients").innerHTML = data.description;

        })

        this.socket.on("message", function (data) {
            const p = document.createElement("p")
            p.innerHTML = data
            const chat = document.getElementById("chat")
            chat.append(p)
            // chat.append(data)

        });

        // let image = new Image()
        // let canvas = document.getElementById(this.state.mainBoard)
        // let ctx = canvas.getContext("2d");
        // image.onload = function () {
        //     ctx.drawImage(image, 0, 0)
        // }
        // image.src = data
        //this will end up being the image data we pass down from our props
        this.socket.on(this.state.mainBoard, function (data, boardName) {

            let image = new Image();
            let canvas = document.querySelector(`#${boardName}`)

            let ctx = canvas.getContext("2d");

            image.onload = function () {
                ctx.drawImage(image, 0, 0);
            };
            image.src = data;
        })

        this.drawOnCanvas();

    }


    componentDidUpdate(prevProps, prevState) {
        
        this.socket.off(prevState.mainBoard)

        let image = new Image()
        let canvas = document.getElementById(this.state.mainBoard)
        const base64Imagedata = canvas.toDataURL("image/png")
        let ctx = canvas.getContext("2d");
        image.onload = function () {
            ctx.drawImage(image, 0, 0)
        }
        if (this.state.mainBoard == prevState.mainBoard) {
            image.src = base64Imagedata 
        }

        this.socket.on(this.state.mainBoard, function (data, boardName) {
            console.log(5)

            const image = new Image();
            const canvas = document.querySelector(`#${boardName}`)

            const ctx = canvas.getContext("2d");
            // ctx.clearRect(0, 0, canvas.width, canvas.height);
            image.onload = function () {
                ctx.drawImage(image, 0, 0);
            };
            image.src = data;

        })
        this.drawOnCanvas();
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

    drawOnCanvas() {
        const canvas = document.querySelector(`#${this.state.mainBoard}`);
        // if (!canvas) return
      
         this.ctx = canvas.getContext('2d');
        const ctx = this.ctx
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

        ctx.lineWidth = this.state.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.state.color;

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
            root.timeout = setTimeout(function () {
                const base64Imagedata = canvas.toDataURL("image/png")
                //maybe we have the string in state as well and pass that down instead of selecting the canvas element
                //maybe even a conditional 
                root.socket.emit("canvas-data", base64Imagedata, root.state.mainBoard
                )
                //can we just add update board here and give it the right info?
                //maybe store the name and things in state as well ? 
                // and change it when we change boards
            }, 1000)
        };

        ;
    }


    changeBoard(e) {
        this.setState({ mainBoard: e.target.id })

    }

    handleInput(e) {
        this.setState({
            input: e.target.value
        })
    }

    handleEmitInput() {
        //will end up also emitting which chat element more than likely saved in state
        this.socket.emit("message", this.state.input, )
    }

    changeColor(e){
        console.log(e.target.value)
        this.setState({
            color: e.target.value
        })
    }

    changeSize(e){
        this.setState({
            size: e.target.value
        })
    }



    render() {

        // let { drawingBoard, easels } = this.props;

        // if (!drawingBoard) return null;
        const easels = [
            { id: 1 },
            { id: 2 },
            { id: 3 },

        ]

        // const mapped = easels.map(easel => <canvas id={`${easel.id}`}  />)

        const mapped = easels.map(easel => <canvas style={{ border: '1px solid black' }} width="200" height="200" onClick={this.changeBoard} key={easel.id} id={`board${easel.id}`} />)

        const main = (<canvas id={this.state.mainBoard} width="700" height="700" style={{ border: '1px solid black' }} ></canvas>)

        return (
            <div className="drawing-board-show-page">
                <h1>I am the drawing board show page!</h1>
               


                <div style={{ height: "700px", width: "700px" }} id="main-easel-display">

                    {main}
                </div>

                <button onClick={this.createEasel}>Create an Easel!</button>
                <div className="tools-section">
                    <div className="color-picker-container">
                        Select Brush Color
                        <input onChange={this.changeColor} type="color" value={this.state.color} />
                    </div>

                    <div className="brushsize-container">
                        Select Brush Size
                    <select value={this.state.size} onChange={this.changeSize} >
                            <option> 5</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                            <option>25</option>
                            <option>30</option>

                        </select>
                    </div>

                </div>

                <div id="clients">


                </div>

                < h1> {this.state.mainBoard}</h1>
                
                <form>
                    <input onChange={this.handleInput} type="text" value={this.state.input} />
                    <button onClick={this.handleEmitInput}>send</button>
                </form>

                <div id="chat">
                    <h1>CHAT</h1>
                </div>

                <div>
                    <button>button that regrabs all boards </button>
                    <h1>other boards</h1>

                    {mapped}

                </div>

            </div>
        )
        //we need some kind of onclick to fetch the easel from the backend when we click on it
    }

}

export default DrawingBoardShow;
