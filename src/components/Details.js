import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            producto: this.props.productoid
        }
    }

    componentDidMount() {
        if(this.props.productoid !== 0) { //busqueda por props
            fetch(`http://localhost:8081/api/products/${this.props.productoid}`)
            .then(response=> response.json())
            .then(producto => {
                this.setState({ producto });
            });
        } else { //busqueda por parametros de la url
            fetch(`http://localhost:8081/api/products/${this.props.match.params.id}`)
            .then(response=> response.json())
            .then(producto => {
                this.setState({ producto });
            });
        }
        
    }

    render() {
        const { producto } = this.state;
        console.log(producto)
        if(producto.enabled === false)
            throw new Error('No se pudo obtener producto');
            
        return producto === 0 ? 
            <div/>:
        (
            <div>
                <div className='bg-light-blue br3 pa3 ma2 bw2 shadow-5 dib'>
                    <div className="dtc tc pa3 ma2 pv4 bg-black-10 dib">
                        <img src={producto.image_url} width="200px" height="200px" alt='producto'/>
                        <p>Producto: {producto.description}</p>
                        <p>Precio: {producto.price}</p>
                        <p>Precio Lista: {producto.list_price}</p>
                        <p>Descuento: {producto.discount}</p>
                        <NavLink to="/producto" className="f6 link dim ph3 pv2 mb2 dib white bg-dark-blue"
                                    >Regresar</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default Details;