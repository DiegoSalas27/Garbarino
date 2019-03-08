import React, { Component } from 'react';
import image from '../imagenes/losentimos.jpg';

class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <img src={image} alt="lo sentimos" width="200px" height="200px" />
                    <h1>Disculpe la molestia, este producto no esta habilitado</h1>
                </div>
            );
        }
        return this.props.children
    }
}

export default ErrorBoundry;
