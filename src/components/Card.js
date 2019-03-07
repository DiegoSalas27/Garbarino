import React from 'react';

const Card = ({id, imagen, descripcion, onRouteChange }) => {
    return(
        <div className='bg-light-blue br3 pa3 ma2 bw2 shadow-5'>
            <div className="dt dt--fixed dib">
                <div className="dt-row dib">
                    <div className="dtc tc pv4 bg-black-10 dib">
                        <img src={imagen} width="200px" height="200px" alt='producto'/>
                        <div>
                            <p>{descripcion}</p>
                            <div className="ph3">
                                <a className="f6 link dim ph3 pv2 mb2 dib white bg-dark-blue" href="#0"
                                onClick={() => onRouteChange('details', id)}>Ver detalle</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;