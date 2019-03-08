import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import image from '../imagenes/losentimos.jpg';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habilitado: this.props.habilitado
        }
    }

    render() {

        const {id, imagen, descripcion, onPassId, onDisabled} = this.props;

        return !this.state.habilitado ? 
            <div /> :
        (
        <div className='bg-light-blue br3 pa3 ma2 bw2 shadow-5 vh-75'>
            <div className="dt dt--fixed dib">
                <div className="dt-row dib">
                    <div className="dtc tc pv4 bg-black-10 dib">
                        <img src={imagen} width="200px" height="200px" alt='producto'/>
                        <div>
                            <p>{descripcion}</p>
                            <div className="ph3">
                                <NavLink to={`/detalle/${id}`} className="f6 link dim ph3 pv2 mb2 dib white bg-dark-blue" 
                                onClick={() => onPassId(id)}>Ver detalle</NavLink>
                                <br/>
                                <a className="f6 link dim ph3 pv2 mb2 dib white bg-dark-blue" 
                                onClick={() => {
                                    onDisabled(id);
                                    this.setState({habilitado: false});
                                }}>Deshabilitar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
export default Card;