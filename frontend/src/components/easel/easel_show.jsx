import React from 'react';

class EaselShow extends React.Component {

    componentDidMount() {
        // this.props.fetchEasel(this.props.match.params.easelId);
    }

    render () {

        let { easel } = this.props;
        
        // if (!easel) return null;

        return (
            <div className="easel-show">
                <h1>I am the easel show page!</h1>
            </div>
        )
    }

}

export default EaselShow;