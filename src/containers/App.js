import React, { Component } from 'react';
import CardList from '../components/CardList';
import Details from '../components/Details';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component {
    constructor() {
        super();
        this.state = {
            productos: [],
            route: 'cardlist',
            productoelegido: 0
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/products')
        .then(response=> response.json())
        .then(productos => {
            this.setState({ productos });
        });
    }

    onRouteChange = (route, id) => {
        this.setState({ route, productoelegido: id });
    }

    render() {
        const { productos, productoelegido } = this.state;
        return !productos.length ? 
            <h1>...Cargando</h1> :
        (
            <div className='tc'>
                <h1>Productos Garbarino</h1>
                { this.state.route === 'cardlist' 
                ? <CardList productos={productos} onRouteChange={this.onRouteChange}/>
                :   <ErrorBoundry>
                        <Details productoid={productoelegido} onRouteChange={this.onRouteChange}/>
                    </ErrorBoundry>
                }            
            </div>
        );
    }
}

export default App;

