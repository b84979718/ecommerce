import { BrowserRouter, Switch, Route} from 'react-router-dom'
import { Provider } from 'react-redux';

import './App.css';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ProtectedRoute from './components/ProtectedRoute';
import Product from './components/Product';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import ProductDetails from './components/ProductDetails';
import store from './redux/store';
import Orders from './components/Orders';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/registration" component = {RegistrationForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Product} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/products/:id" component={ProductDetails} />
            <ProtectedRoute exact path="/orders" component={Orders} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;

