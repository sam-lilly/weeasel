import React from 'react';
import DrawingBoardIndex from '../drawing_boards/drawing_board_index';
// import { Link } from 'react-router-dom';

class Home extends React.Component {

    render () {
        return (
            <div className="home">
                <h1>you made it home!!! (this is the homepage)</h1>
                <DrawingBoardIndex />
                <EaselShow />
                <EaselIndex />
                <ChatIndex />
                <FriendsIndex />
            </div>
        )
    }

}

export default Home;