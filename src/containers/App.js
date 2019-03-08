import React, { Component } from 'react';
import CardList from '../components/CardList';
import Details from '../components/Details';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
import { Route, BrowserRouter } from "react-router-dom";
import image from '../imagenes/logo.jpg';
import { URL_BASE } from "../common/constants";

class App extends Component {
    constructor() {
        super();
        this.state = {
            productos: [],
            productoelegido: 0,
            searchfield: '',
            mostrarSearchBox: true
        }
    }

    componentDidMount() {
        fetch(URL_BASE)
        .then(response=> response.json())
        .then(productos => {
            this.setState({ productos });
        });
    }

    onPassId = (id) => {
        this.setState({ productoelegido: id });
    }

    onRouteChange = () => {
        this.setState({ mostrarSearchBox: !this.state.mostrarSearchBox });
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
        fetch(`${URL_BASE}/${id}`,options)
        .then(res => {
            console.log(res.message);
        })
        .catch(err => {
            console.log(err.message);
        });
    }

    render() {
        const { productos, productoelegido, searchfield, mostrarSearchBox } = this.state;
        const productosFiltrados = productos.filter(producto =>{
            return producto.description.toLowerCase().includes(searchfield.toLowerCase());
            
        })

        return (   
                <div className='tc'>
                    <img src={image} alt="garbarino" width="300px" height="200px" />
                    {  
                        mostrarSearchBox ?
                        <SearchBox searchChange={this.onSearchChange}/> :
                        <div/>
                    }
                    
                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <div>
                        {!productos.length ? 
                            <h1>...Cargando</h1> :
                            <Route 
                                exact 
                                path={"/"} 
                                component={(props) => <CardList {...props} productos={productosFiltrados}
                                onPassId={this.onPassId} onDisabled={this.onDisabled} 
                                onRouteChange={this.onRouteChange}
                                />}
                            />
                        }
                            <Route 
                                path={`/detalle/:id`} 
                                component={(props) => <ErrorBoundry>
                                        <Details {...props} productoid={productoelegido}
                                        onRouteChange={this.onRouteChange} />
                                    </ErrorBoundry>}
                            />
                        </div>
                    </BrowserRouter>
                </div>
            );
    
    }
}

export default App;

