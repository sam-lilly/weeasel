
import React from 'react'
import "./board.css"
import io from "socket.io-client" 


class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            board: "board1"
        }

      
       
        this.changeBoard = this.changeBoard.bind(this)
        this.drawOnCanvas = this.drawOnCanvas.bind(this)
    }
    

    componentDidUpdate(prevProps, prevState){
        this.socket.off(prevState.board)
        this.socket.on(this.state.board, function (data, boardName) {

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

    changeBoard(e){
        this.state.board === "board1" ? 
        this.setState({ board: "board2"}) :
        this.setState({ board: "board1"}) 

    }

    timeout;
    socket = io.connect("http://localhost:5000")
    // subsocket = socket(`/${this.state.board}`)
    componentDidMount() {
        this.socket.on(this.state.board, function (data, boardName) {

            const image = new Image();
            const canvas = document.querySelector(`#${boardName}`)
            // if (!canvas) return
            const ctx = canvas.getContext("2d");

            image.onload = function () {
                ctx.drawImage(image, 0, 0);
            };
            image.src = data;
        })

        this.drawOnCanvas();

    }



    drawOnCanvas(){
        const canvas = document.querySelector(`#${this.state.board}`);
        // if (!canvas) return
            const ctx = canvas.getContext('2d');

            const sketch = document.querySelector('#sketch');
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
                    root.socket.emit("canvas-data", base64Imagedata, root.state.board
                        )
                }, 1000)
            };

        ;
    }

    render() {
        return (
            <div id="sketch">
                <h1>{this.state.board}</h1>
                {this.state.board === "board1" ?
                    <canvas className="board" id="board1"></canvas> :
                    <canvas className="board" id="board2"></canvas> 
                    }
               <button onClick={this.changeBoard}>Change Board</button>
            </div>
        )
    }
}

export default Board;
