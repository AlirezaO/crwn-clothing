import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Switch, Route} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header-component/header.component';



const HatsPage =() => (
  <div>
    <h1>Hats Page</h1>
  </div>
);


function App() {
  return (
    <div >
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop' component={ShopPage}/>
        <Route exact path='/shop/hats' component={HatsPage}/>
      </Switch>
    </div>
  );
}

export default App;
