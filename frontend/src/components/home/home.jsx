import React from 'react';
import DrawingBoardIndexContainer from '../drawing_boards/drawing_board_index_container';
import EaselShowContainer from '../easel/easel_show_container';
import EaselIndexContainer from '../easel/easel_index_container';
import ChatIndexContainer from '../chat/chat_index_container';
import FriendIndexContainer from '../friends/friend_index_container';
import { Link } from 'react-router-dom';
import '../scss/styles.scss';

class Home extends React.Component {

    render () {
        return (
            <div className="home">
                {/* <h1>you made it home!!! (this is the homepage)</h1> */}
                <DrawingBoardIndexContainer />
                <EaselShowContainer />
                <EaselIndexContainer />
                <ChatIndexContainer />
                <FriendIndexContainer />
            </div>
        )
    }

}

export default Home;