import React from 'react';
import Card from './Card';

const CardList = ({ productos,  onPassId, onDisabled, onRouteChange, searchChange }) => {
    return(
        <div>
           {
               productos.map((producto, i) => {
                   
                   return(
                        <div className="fl w-25" key={i}>
                            <Card 
                                key={i}
                                id={producto.id}
                                descripcion={producto.description}
                                imagen={producto.image_url}
                                onPassId={onPassId}
                                onDisabled={onDisabled}
                                habilitado={producto.enabled}
                                onRouteChange={onRouteChange}
                            />
                        </div>
                   );
               })
           } 
        </div>
    );
}

export default CardList;