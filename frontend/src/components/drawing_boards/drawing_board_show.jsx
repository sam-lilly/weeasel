import React from 'react';
import { socket } from "../home/home"
import weeasel from '../../logo/weeasel_use.png';
import ChatIndexItem from '../chat/chat_index'

class DrawingBoardShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mainBoard: {},
            input: "",
            color: "#000000",
            size: "5",
            easelDropdown: false,
            chatDropdown: false,
            newEaselName: ''
        }
        // inside of our state we'll have to have the main board image data
        this.createEasel = this.createEasel.bind(this);
        this.changeBoard = this.changeBoard.bind(this);
        this.drawOnCanvas = this.drawOnCanvas.bind(this);
        this.changeColor = this.changeColor.bind(this)
        this.changeSize = this.changeSize.bind(this)
        this.showEasels = this.showEasels.bind(this)
        this.makeEraser = this.makeEraser.bind(this)
        this.onEaselNameChange = this.onEaselNameChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    socket = socket
    ctx;
    componentDidMount() {
        this.socket.on("broadcast", function (data) {
            let clientDiv = document.getElementById('clients');
            if (clientDiv) clientDiv.innerHTML = data.description

        })
        if (!this.props.boardId) {
            return;
        }
        this.socket.on(this.state.mainBoard._id, function (data, boardName) {

            let image = new Image();
            let canvas = document.querySelector(`#board${boardName}`)

            let ctx = canvas.getContext("2d");

            image.onload = function () {
                ctx.drawImage(image, 0, 0);
            };
            image.src = data;
        })

        this.drawOnCanvas(undefined, undefined, true);

    }


    componentDidUpdate(prevProps, prevState) {
        
        // let canvas = document.querySelector(`#board${this.state.mainBoard._id}`);
        // if (!canvas) return;
        // let ctx = canvas.getContext('2d');
            
        if (!this.props.boardId) return;

        if (this.props.boardId != prevProps.boardId) {
            let testChat = document.getElementById(`chat${this.props.boardId}`);
            if (testChat) testChat.innerHTML = '';
        }

        if (Object.values(prevState.mainBoard).length < 1 && this.props.easels.length > 0) {
       
            this.setState({
                mainBoard: this.props.easels[0]
            })
        }
        if ((this.props.boardId) && (this.props.boardId != prevProps.boardId)) {
            this.props.fetchEasels(this.props.boardId)
            this.setState({
                mainBoard: {}
            })
            this.drawOnCanvas()
        }

        this.socket.off(`board${prevState.mainBoard._id}`)
        if (!this.props.boardId) {
            return (
                <div>
                    Please Select A Drawing board
                </div>
            )
        }

        

        let image = new Image()
        let canvas = document.getElementById(`board${this.state.mainBoard._id}`)
        if (!canvas) return;
        const base64Imagedata = canvas.toDataURL("image/png")
        let ctx = canvas.getContext("2d");
        let condition;

        if (this.state.mainBoard.image == prevState.mainBoard.image) {
            // image.src =this.state.mainBoard.image
            condition = true;
            image.src = base64Imagedata
        } else {
            condition = false;
            image.src = this.state.mainBoard.image;
        }
        image.onload = function () {
            if (true) {
                ctx.drawImage(image, 0, 0)
            }
        }


        this.socket.on(`board${this.state.mainBoard._id}`, function (data, boardName) {
          

            const image = new Image();
            const canvas = document.querySelector(`#${boardName}`)

            const ctx = canvas.getContext("2d");
            // ctx.clearRect(0, 0, canvas.width, canvas.height);
            image.src = data;
            image.onload = function () {
                ctx.drawImage(image, 0, 0);
            };

        })
        this.drawOnCanvas(canvas, ctx, condition)
        if (prevState.mainBoard.name == this.state.mainBoard.name) {

            this.drawOnCanvas(canvas, ctx, condition)
        } else {
            this.drawOnCanvas()
        }
    }




    createEasel() {
        this.props.createEasel();

    }

    drawOnCanvas(canvas,ctx, condition) {
        
        if (!canvas) {
            
            let cnv = document.querySelector('canvas');
            if (!cnv) return;
            let context =cnv.getContext('2d');
            context.clearRect(0, 0, cnv.width, cnv.height);
            return;
        };
        if (condition) {
            ctx.lineWidth = this.state.size;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.strokeStyle = this.state.color;
            return;
        } else {
            canvas = document.querySelector(`#board${this.state.mainBoard._id}`);
            ctx = canvas.getContext('2d');
        }
        
        // let canvas = document.querySelector(`#board${this.state.mainBoard._id}`);
        // this.ctx = canvas.getContext('2d');
        // const ctx = this.ctx
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
            if (root.timeout2 !== undefined) clearTimeout(root.timeout2)
            root.timeout = setTimeout(function () {
                const base64Imagedata = canvas.toDataURL("image/png")
                //maybe we have the string in state as well and pass that down instead of selecting the canvas element
                //maybe even a conditional 
                root.socket.emit("canvas-data", base64Imagedata, `board${root.state.mainBoard._id}`
                )

                const newBoard = root.state.mainBoard;
                newBoard.image = base64Imagedata;
                root.setState({
                    mainBoard: newBoard
                })
                //can we just add update board here and give it the right info?
                //maybe store the name and things in state as well ? 
                // and change it when we change boards
            }, 1000)

            root.timeout2 = setTimeout(function () {
                root.props.updateEasel(root.props.boardId, root.state.mainBoard._id, root.state.mainBoard);
            }, 3000)

        };

        ;
    }



    changeBoard(e) {
        let newEasel;
        // this.props.easels.forEach(easel => {
        //     if (easel._id == e.target.id) {
        //         newEasel = easel
        //         return
        //     }
        // })
        this.setState({
            mainBoard: this.props.easels.find(easel => easel._id == e.target.id),
            easelDropdown: false,
        })
        // im thinking we already have the id in there 
        // let url;
        // this.setState({
        //     image: url
        // })

        //if we grab the entire canvas element it mi
    }
    changeColor(e) {
       
        this.setState({
            color: e.target.value
        })
    }

    changeSize(e) {
        let value = e? e.target.value : 15;
        this.setState({
            size: value,
        })
    }

    showEasels(e) {
       
        this.setState({
            easelDropdown: !this.state.easelDropdown,
        })
        e.stopPropagation()
    }

    makeEraser(e) {
        this.setState({
            color: '#F0E4D1',
        })
        this.changeSize();
    }

    onEaselNameChange(e) {
        this.setState({
            newEaselName: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        let newEasel = {
            name: this.state.newEaselName,
            image: ''
        }
        this.props.createEasel(this.props.boardId, newEasel)
        this.setState({
            newEaselName: ''
        })
    }






    render() {
      
        if (!this.props.boardId) {
            return (
                <div className='no-drawing-board-selected-pane'>

                    <img className="logo-logged-in" src={weeasel} alt="weeasel" />

                    <p className="select-board">
                        select one of your drawing
                    </p>
                    <p className="select-board">
                        boards to get started!
                    </p>
                    <p className="select-board new-board">
                        or create a new board!
                    </p>

                    <div id="clients"> </div>

                </div>
            )
        }








        if (this.props.easels.length < 1) {
            return (
                <div className='no-existing-easels-pane'>
                    <h1 className="drawing-board-show-page-name">{this.props.currentBoard.name}</h1>


                    <div className="no-exist-ease">

                        <img className="logo-logged-in" src={weeasel} alt="weeasel" />
                        <div className='no-existing-easels-pane-header'><p>you don't have any easels on this board</p> <p>would you like to make a new one?</p></div>
                        <form onSubmit={this.onSubmit} className='create-new-easel-on-pane-form'>
                                <input placeholder="name" onChange={this.onEaselNameChange} type="text" value={this.state.newEaselName}></input>
                            {/* </label> */}
                            <button>create new easel</button>
                        </form>

                    </div>

                </div>
            )
        }
        // let { drawingBoard, easels } = this.props;

        // if (!drawingBoard) return null;

        // const mapped = easels.map(easel => <canvas id={`${easel.id}`}  />)
        // if (!easels) return

        const mapped = () => { this.props.easels.map(easel => <canvas style={{ border: '1px solid black' }} width="200" height="200" onClick={this.changeBoard} key={easel._id} id={`board${easel._id}`} />) }

        const main = (<canvas className="canvas" id={`board${this.state.mainBoard._id}`} style={{ border: '1px solid black' }} ></canvas>)


        const displayEasels= () =>{
            return(
            <div className='easels-dropdown'>
                {this.props.easels.map(easel => { 
                    return(
                        <div key={easel._id} className='easel-dropdown-component'>
                            <h3 onClick={this.changeBoard} key={easel._id} id={easel._id} className={easel._id === this.state.mainBoard._id ? "main-mini-canvas" : "mini-canvas"}>{easel.name}</h3>
                        </div>
                )})}
                <div className='easel-dropdown-create-easel'>
                    <form onSubmit={this.onSubmit} className='create-new-easel-on-dropdown-form'>
                        {/* <label htmlFor=""> new easel name */}
                        <input placeholder="enter new easel name" className="easel-form-input" onChange={this.onEaselNameChange} type="text" value={this.state.newEaselName}></input>
                        {/* </label> */}
                        <button className="new-easel-button">create new easel</button>
                    </form>


                    </div>
                </div>
            )
        }

        return (
            <div className="drawing-board-show-page">

                <h1 className="drawing-board-show-page-name">{this.props.currentBoard.name}: {this.state.mainBoard.name} </h1>
                <div id="main-easel-display">
                    {main}
                    <i onClick={() => this.props.setDrawingBoard()} className="far fa-times-circle"></i>
                </div>

                <div className='drawing-board-show-nav'>


                    <div className="tools-section">


                        <div className="painting-tools">

                            <div className="color-picker-container">
                                color &nbsp; <i className="fas fa-palette"></i> &nbsp;
                                <input onChange={this.changeColor} type="color" value={this.state.color} />
                            </div>

                            <div className="brushsize-container">
                                size &nbsp;<i className="fas fa-paint-brush"></i>  &nbsp;
                                <select value={this.state.size} onChange={this.changeSize} >
                                    <option> 5</option>
                                    <option>10</option>
                                    <option>15</option>
                                    <option>20</option>
                                    <option>25</option>
                                    <option>30</option>

                                </select>
                            </div>

                            <div className='eraser-container'>
                                <button onClick={this.makeEraser}>eraser &nbsp;<i className="fas fa-eraser"></i></button>
                            </div>

                        </div>

                        <div className="lower-tools">

                            <button className='show-easels-button' onClick={this.showEasels}><i className="fas fa-plus"></i>&nbsp; create easels/ switch easel</button>
                            {this.state.easelDropdown ? displayEasels() : null}

                            <button onClick={(e) => {
                                this.props.fetchEasels(this.props.boardId);
                                this.setState(this.state)
                            }
                            } className="update-boards">update your boards</button>

                            {this.props.easels.length > 0 ? mapped() : null}

                        </div>

                    </div>
                        <ChatIndexItem socket={socket} boardId={this.props.boardId} currentUsername={this.props.currentUsername}/>
                    {/* <div className='chat-container'>
                        <h1 className="weasel-chat">chat with other weasels</h1>
                        <div className="chat-box" id={`chat${this.props.boardId}`}>

                        </div>
                        <form className="chat-input">
                            <input placeholder="message ..." onChange={this.handleInput} type="text" value={this.state.input} />
                            <button className="send-button" onClick={this.handleEmitInput}><i className="fas fa-arrow-up"></i></button>
                        </form>
                    </div> */}

                </div>


            </div>
        )
        //we need some kind of onclick to fetch the easel from the backend when we click on it
    }

}

export default DrawingBoardShow;
