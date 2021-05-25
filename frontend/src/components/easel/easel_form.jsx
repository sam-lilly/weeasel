import React from 'react';
import { Link } from 'react-router-dom';

class EaselForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.easel;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value })
        }
    }

    handleSubmit() {
        // e.preventDefault();
        this.props.submitEasel(this.state)
    }


    render () {

        return (

            <div className="easel-form">

                <h1>hi! I am the easel form</h1>


            </div>

        )
    }

}

export default EaselForm;