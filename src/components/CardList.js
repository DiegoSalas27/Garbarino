import React from 'react';
import Card from './Card';

const CardList = ({ productos,  onRouteChange, onDisabled}) => {
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
                                onRouteChange={onRouteChange}
                                onDisabled={onDisabled}
                                habilitado={producto.enabled}
                            />
                        </div>
                   );
               })
           } 
        </div>
    );
}

export default CardList;