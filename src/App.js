import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/route/ProtectedRoute';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import productsList from './pages/ProductsList';

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <ProtectedRoute exact path="/products" component={productsList} />
            <ProtectedRoute exact path="/product-details" component={ProductDetails} />
            <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;