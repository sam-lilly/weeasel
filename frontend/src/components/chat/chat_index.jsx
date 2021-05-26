import React from 'react';
import { Link } from 'react-router-dom';
import ChatIndexItem from './chat_index_item';

class ChatIndex extends React.Component {

    componentDidMount() {
        
    }

    render () {

        let { chats } = this.props;

        // if (!chats) return null;
        // comment back in when have chats


        return (
            <div className="chat-index">

                <h1>I am the chat index!</h1>

                <div className="chat-items">
                    {/* {
                        chats.map(chat => <ChatIndexItem key={chat.id} chat={chat} />)
                    } */}
                    {/* comment above back in when have chats */}
                </div>

            </div>
        )

    }

}

export default ChatIndex;