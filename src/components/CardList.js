import React from 'react';
import Card from './Card';

const CardList = ({ productos,  onRouteChange}) => {
    return(
        <div>
           {
               productos.map((producto, i) => {
                   return(
                       <div>
                            <div className="fl w-50">
                                <Card 
                                    key={i}
                                    id={producto.id}
                                    descripcion={producto.description}
                                    imagen={producto.image_url}
                                    onRouteChange={onRouteChange}
                                />
                            </div>
                       </div>
                   );
               })
           } 
        </div>
    );
}

export default CardList;