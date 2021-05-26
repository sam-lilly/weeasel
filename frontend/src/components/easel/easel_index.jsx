import React from 'react';
import { Link } from 'react-router-dom';
import EaselIndexItem from './easel_index_item';

class EaselIndex extends React.Component {

    componentDidMount() {
        // this.props.fetchEasels(this.props.drawingBoard.id)
    }

    render() {

        let { easels, fetchEasel, deleteEasel } = this.props;

        // if (!easels) return null;
        // comment back in when do have easels

        return (
            <div className="easel-index">

                <h1>I am the easel index scroll bar</h1>

                <div className="easel-items">
                    {/* {
                        easels.map(easel => <EaselIndexItem key={easel.id} easel={easel} fetchEasel={fetchEasel} deleteEasel={deleteEasel} />)
                    } */}
                    {/* comment back in when do have easels */}
                </div>

            </div>
        )

    }

}

export default EaselIndex;