import React, { Component } from 'react';
import CardList from '../components/CardList';
import Details from '../components/Details';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component {
    constructor() {
        super();
        this.state = {
            productos: [],
            route: 'cardlist',
            productoelegido: 0,
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:8081/api/products')
        .then(response=> response.json())
        .then(productos => {
            this.setState({ productos });
        });
    }

    onRouteChange = (route, id) => {
        this.setState({ route, productoelegido: id });
    }

    onSearchChange = (event) => { 
        this.setState({searchfield: event.target.value}); 
    }

    onDisabled = (id) => {
        const headers = new Headers();
        headers.append("Content-Type","application/json");
        const options = {
            method: "PATCH",
            body: JSON.stringify({
                enabled: false
            }),
            headers
        };
        fetch(`http://localhost:8081/api/products/${id}`,options)
        .then(res => {
            console.log(res.message);
        })
        .catch(err => {
            console.log(err.message);
        });
    }

    render() {
        const { productos, productoelegido, searchfield } = this.state;
        const productosFiltrados = productos.filter(producto =>{
            return producto.description.toLowerCase().includes(searchfield.toLowerCase());
        })
        return !productos.length ? 
            <h1>...Cargando</h1> :
        (
            <div className='tc'>
                <h1>Productos Garbarino</h1>
                
                { this.state.route === 'cardlist' 
                ?   <div>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <CardList productos={productosFiltrados}
                              onRouteChange={this.onRouteChange}
                              onDisabled={this.onDisabled} />
                    </div>
                :   <ErrorBoundry>
                        <Details productoid={productoelegido} onRouteChange={this.onRouteChange}/>
                    </ErrorBoundry>
                }            
            </div>
        );
    }
}

export default App;

