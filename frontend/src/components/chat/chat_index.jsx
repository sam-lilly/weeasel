import React from 'react';
import { socket } from "../home/home";
import { Link } from 'react-router-dom';

class ChatIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: ""
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleEmitInput = this.handleEmitInput.bind(this)
    }
    

    handleEmitInput(e) {
        e.preventDefault()
        //will end up also emitting which chat element more than likely saved in state
        this.props.socket.emit("message", this.state.input, this.props.currentUsername, this.props.boardId)
        this.setState({
            input: '',
        })
    }


    componentDidUpdate() {
        this.props.socket.off('message')
        this.props.socket.on(`message`, function (data, username, boardId) {
            const p = document.createElement("p")
            p.innerHTML = `${username}: ${data}`
            const chat = document.getElementById(`chat${boardId}`)
            if (!chat) return;
            chat.append(p)
            // chat.append(data)

        });
    }

    handleInput(e) {

        this.setState({
            input: e.target.value
        })
    }

    render() {


        return (
            <div className='chat-container'>
                <h1 className="weasel-chat">chat with other weasels</h1>
                <div className="chat-box" id={`chat${this.props.boardId}`}>

                </div>
                <form className="chat-input">
                    <input placeholder="message ..." onChange={this.handleInput} type="text" value={this.state.input} />
                    <button className="send-button" onClick={this.handleEmitInput}><i className="fas fa-arrow-up"></i></button>
                </form>
            </div>
        )

    }

}

export default ChatIndex;