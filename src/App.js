import React from 'react';
import { Route, Switch, Redirect, NavLink, BrowserRouter } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import CheckOut from './components/CheckOut';
import Order from './components/Order';
import ProductsAPI from './components/ProductsAPI';


function App() {
  

  var heading_style = {
      position: 'relative',
      left: '25%',
      top: '20%',
      color : 'grey'
  }
  console.log("env " + JSON.stringify( process.env));
  return (
  <div className='test'>
    <BrowserRouter basename = {'/Shopec-dotnet_1000074019/dist/'}>
    <div className='container' style={{position: 'relative', height: '100%', width: '100%'}}>
      {console.log("env " + JSON.stringify( process.env))}
  <div className='test'>
  <div className="head" style={{backgroundColor: 'rgb(114, 222, 255)'}}><div className='heading' style={{height: '50px'}} ><h3 id='title' style={heading_style}>Welcome Shop Easy Offer Zone Top Deals & Discounts</h3></div></div>
     <NavLink
      type="button"
      className="btn btn-primary"
      id="signinButton"
      to={`/login`}
      style={{width:150, textAlign:'center' ,borderRight:'1px solid rgb(114,222,255)',borderRadius:'0rem'}}
    >Sign In</NavLink>
      <div className='router' style={{height:'100%', width:'100%'}}>
        <div id="borderDiv" style={{border:'2px solid rgb(114,222,255)'}}>
     
                      
                          <Switch>
                          <Route exact path={"/Products"} component={ProductsAPI} />
                          <Route path={"/login"} component={LoginPage} />
                          <Route path={"/checkout"} component={CheckOut} />
                          <Route path={"/order"} component={Order} />

                          </Switch>
                          </div>
                 
      </div></div></div></BrowserRouter></div>
  );
 
}

export default App;
