import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Switch, Route} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header-component/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import React from 'react';
import { auth, createUSerProfileDocument } from './firebase/firebase.utils';



const HatsPage =() => (
  <div>
    <h1>Hats Page</h1>
  </div>
);

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser : null,
    };

  }

  unsubscribeFromAuth = null;
  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if (userAuth) {
        const userRef = await createUSerProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id ,
              ...snapShot.data()
            }
          });
        });
      }
      
      this.setState({currentUser: userAuth});
    });
  }
  
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div >
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/signin' component={SignInAndSignUp}/>
          <Route exact path='/shop/hats' component={HatsPage}/>
        </Switch>
      </div>
    )
  }
}

export default App;
