import React from 'react';
import { Link } from 'react-router-dom';

class ChatIndexItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {

        let { chat } = this.props;
        
        if (!chat) return null;


        return (
            <div className="chat-index-boxes">
                <h1>hi! I am the chat items</h1>
            </div>
        )

    }

}

export default ChatIndexItem;