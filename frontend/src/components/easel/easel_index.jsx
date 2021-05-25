import React from 'react';
import { Link } from 'react-router-dom';
import EaselIndexItem from './easel_index_item';

class EaselIndex extends React.Component {

    componentDidMount() {
        this.props.fetchEasels()
    }

    render () {

        let { easels, fetchEasel, deleteEasel } = this.props;

        if (!easels) return null;

        return (
            <div className="easel-index">

                <div className="easel-items">
                    {
                        easels.map(easel => <EaselIndexItem key={easel.id} drawingBoard={board} fetchEasel={fetchEasel} deleteEasel={deleteEasel} />)
                    }
                </div>

            </div>
        )

    }

}

export default EaselIndex;