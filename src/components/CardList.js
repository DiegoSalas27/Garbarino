import React from 'react';
import Card from './Card';

const CardList = ({ productos,  onRouteChange}) => {
    return(
        <div>
           {
               productos.map((producto, i) => {
                   return(
                       <Card 
                           key={i}
                           id={producto.id}
                           descripcion={producto.description}
                           imagen={producto.image_url}
                           onRouteChange={onRouteChange}
                       />
                   );
               })
           } 
        </div>
    );
}

export default CardList;