import React from 'react';
import {socket} from "../home/home"

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
        this.handleInput = this.handleInput.bind(this);
        this.handleEmitInput = this.handleEmitInput.bind(this);
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
        if (!this.props.boardId) {
            return ;
        }
        // this.props.fetchEasels()

        //we're gonna need a way to fetch the easel info whenever the page loads
        //and then 


        // let image = new Image()
        // let canvas = document.getElementById(this.state.mainBoard)
        // let ctx = canvas.getContext("2d");
        // image.onload = function () {
        //     ctx.drawImage(image, 0, 0)
        // }
        // image.src = data
        //this will end up being the image data we pass down from our props
        this.socket.on(this.state.mainBoard._id, function (data, boardName) {

            let image = new Image();
            let canvas = document.querySelector(`#board${boardName}`)

            let ctx = canvas.getContext("2d");

            image.onload = function () {
                ctx.drawImage(image, 0, 0);
            };
            image.src = data;
        })

        this.drawOnCanvas();

    }


    componentDidUpdate(prevProps, prevState) {
        if (!this.props.boardId) return;
        if (this.props.boardId != prevProps.boardId) {
            let testChat = document.getElementById(`chat${this.props.boardId}`);
            if (testChat) testChat.innerHTML = '';
        }

        if (Object.values(prevState.mainBoard).length < 1 && this.props.easels.length > 0) {
            console.log(this.props.easels)
            this.setState({
                mainBoard: this.props.easels[0]
            })
            this.socket.on("broadcast", function (data) {
                document.getElementById("clients").innerHTML = data.description;

            })
            const that = this;
            this.socket.off('message')
            this.socket.on(`message`, function (data, username, boardId) {
                const p = document.createElement("p")
                p.innerHTML = `${username}: ${data}`
                const chat = document.getElementById(`chat${boardId}`)
                if (!chat) return;
                chat.append(p)
                // chat.append(data)

            });
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
        image.onload = function () {
            ctx.drawImage(image, 0, 0)
        }
        if ( this.state.mainBoard.image == prevState.mainBoard.image) {
            // image.src =this.state.mainBoard.image
            image.src = base64Imagedata
        } else {
            image.src = this.state.mainBoard.image;
        }

        this.socket.on(`board${this.state.mainBoard._id}`, function (data, boardName) {
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
        this.drawOnCanvas()
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
        
        const canvas = document.querySelector(`#board${this.state.mainBoard._id}`);
        if (!canvas) return
      
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

            root.timeout2 = setTimeout(function() {
                root.props.updateEasel(root.props.boardId, root.state.mainBoard._id, root.state.mainBoard);
            }, 3000)
          
        };

        ;
    }

   
    loadEaselImages(){
        this.props.easels.forEach(easel => {
            const image = new Image 
            let ctx = canvas.getContext("2d")

            const canvas = document.getElementById(easel._id)
                ctx = canvas.getContext("2d")

            image.onload = function () {
                ctx.drawImage(image, 0, 0)
            }

            image.src = easel.image
        })
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

    handleInput(e) {

        this.setState({
            input: e.target.value
        })
    }

    handleEmitInput(e) {
        e.preventDefault()
        //will end up also emitting which chat element more than likely saved in state
        this.socket.emit("message", this.state.input, this.props.currentUsername, this.props.boardId )
        this.setState({
            input: '',
        })
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

    showEasels(e) {
        console.log('helloooo')
        this.setState({
            easelDropdown: !this.state.easelDropdown,
        })
        e.stopPropagation()
    }

    makeEraser(e) {
        this.setState({
            color: '#F0E4D1',
            size: '100'
        })
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
        console.log(this.props.boardId)
        if (!this.props.boardId) {
            return (
                <div className='no-drawing-board-selected-pane'>
                    Select one of your drawing boards to get started!
                </div>
            )
        }

        if (this.props.easels.length < 1) {
            return (
                <div className='no-existing-easels-pane'>
                    <h1 className="drawing-board-show-page-name">{this.props.currentBoard.name}</h1>
                    <div className='no-existing-easels-pane'>Looks like you don't have any easels on this board, would you like to make a new one?</div>
                    <form onSubmit={this.onSubmit} className='create-new-easel-on-pane-form'>
                        <label htmlFor=""> Name
                            <input onChange={this.onEaselNameChange} type="text" value={this.state.newEaselName}></input>
                        </label>
                        <button>Create new easel</button>
                    </form>
                    
                </div>
            )
        }
        // let { drawingBoard, easels } = this.props;

        // if (!drawingBoard) return null;
        
        // const mapped = easels.map(easel => <canvas id={`${easel.id}`}  />)
        // if (!easels) return
        const easels = [
            {id: 1},
            {id: 2},
            {id:3}
        ]
        const mapped = () =>{ this.props.easels.map(easel => <canvas style={{ border: '1px solid black' }} width="200" height="200" onClick={this.changeBoard} key={easel.id} id={`board${easel._id}`} />)}

        const main = (<canvas className="canvas" id={`board${this.state.mainBoard._id}`} style={{ border: '1px solid black' }} ></canvas>)

        const displayEasels= () =>{
            return(
            <div className='easels-dropdown'>
                {this.props.easels.map(easel => { 
                    return(
                        <div className='easel-dropdown-component'>
                            <h3 className='easel-dropdown-easel-name'>{easel.name}</h3>
                            <canvas width='100' height='100' className='mini-canvas-option' onClick={this.changeBoard} key={easel._id} id={easel._id}/>
                        </div>
                )})}
                <div className='easel-dropdown-create-easel'>
                    <form onSubmit={this.onSubmit} className='create-new-easel-on-dropdown-form'>
                        <label htmlFor=""> Name
                        <input onChange={this.onEaselNameChange} type="text" value={this.state.newEaselName}></input>
                        </label>
                        <button>Create new easel</button>
                    </form>

                </div>
            </div>
            )
        }

        return (
            <div className="drawing-board-show-page">

                <h1 className="drawing-board-show-page-name">{this.props.currentBoard.name}</h1>
                        <div  id="main-easel-display">
                            {main}
                            <i onClick={() => this.props.setDrawingBoard()} className="far fa-times-circle"></i>
                        </div>
                <div className='drawing-board-show-nav'>
                        <button className='show-easels-button' onClick={this.showEasels}>+ More Easels</button>
                        {this.state.easelDropdown ? displayEasels() : null}
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
                            <div className='eraser-container'>
                                <button onClick={this.makeEraser}>Eraser</button>
                            </div>

                        </div>

                        <div id="clients">


                        </div>

                        < h1> {this.state.mainBoard.name}</h1>
                        
                        <form>
                            <input onChange={this.handleInput} type="text" value={this.state.input} />
                            <button onClick={this.handleEmitInput}>send</button>
                        </form>
                        <div className='chat-container'>
                            <h1>CHAT</h1>
                            <div id={`chat${this.props.boardId}`}>
                                
                            </div>
                        </div>

                        <div>
                        <button onClick={(e) =>{ 
                            this.props.fetchEasels(this.props.boardId);
                            this.setState(this.state)
                        }
                            }>button that regrabs all boards </button>
                            <h1>other boards</h1>

                            {this.props.easels.length > 0 ? mapped() : null}

                        </div>
                </div>

            </div>
        )
        //we need some kind of onclick to fetch the easel from the backend when we click on it
    }

}

export default DrawingBoardShow;
