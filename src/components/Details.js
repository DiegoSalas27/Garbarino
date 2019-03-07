import React, { Component } from 'react';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            producto: ''
        }
    }

    componentDidMount() {
        fetch(`http://localhost:3001/api/products/${this.props.productoid}`)
        .then(response=> response.json())
        .then(producto => {
            this.setState({ producto });
        });
    }

    render() {
        const { producto } = this.state;
        if(producto.enabled === false)
            throw new Error('No se pudo obtener producto');
            
        return producto === '' ? 
            <h1>...Cargando</h1> :
        (
            <div>
                <div className='bg-light-blue br3 pa3 ma2 bw2 shadow-5 dib'>
                    <div className="dtc tc pa3 ma2 pv4 bg-black-10 dib">
                        <img src={producto.image_url} width="200px" height="200px" alt='producto'/>
                        <p>Producto: {producto.description}</p>
                        <p>Precio: {producto.price}</p>
                        <p>Precio Lista: {producto.list_price}</p>
                        <p>Descuento: {producto.discount}</p>
                        <a className="f6 link dim ph3 pv2 mb2 dib white bg-dark-blue" href="#0"
                                    onClick={() => this.props.onRouteChange('cardlist')}>Regresar</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Details;