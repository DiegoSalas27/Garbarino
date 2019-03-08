import React, { Component } from 'react';
import CardList from '../components/CardList';
import Details from '../components/Details';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
import { Route, BrowserRouter } from "react-router-dom";

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

    onPassId = (id) => {
        this.setState({ productoelegido: id });
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

        return (   
                <div className='tc'>
                    <h1>Productos Garbarino</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <div>
                        {!productos.length ? 
                            <h1>...Cargando</h1> :
                            <Route 
                                path={"/producto"} 
                                component={(props) => <CardList {...props} productos={productosFiltrados}
                                onPassId={this.onPassId} onDisabled={this.onDisabled} />}
                            />
                        }
                            <Route 
                                path={`/detalle/:id`} 
                                component={(props) => <ErrorBoundry>
                                        <Details {...props} productoid={productoelegido} />
                                    </ErrorBoundry>}
                            />
                        </div>
                    </BrowserRouter>
                </div>
            );
    
    }
}

export default App;

