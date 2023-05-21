import React from "react";

import "./app.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserList from "./features/User/components/userList/UserList";
import Home from "./features/Home/Home";
import ProductList from "./features/Product/components/productList/ProductList";
import Product from "./features/Product/index/product/Product";
import NewProduct from "./features/Product/pages/newProduct/NewProduct";
import User from "./features/User/index/user/User";
import NewUser from "./features/User/pages/newUser/NewUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/users" component={UserList}></Route>
            <Route path="/user/:userId" component={User}></Route>
            <Route path="/newUser" component={NewUser}></Route>
            <Route path="/products" component={ProductList}></Route>
            <Route path="/product/:productId" component={Product} />
            <Route path="/newProduct" component={NewProduct}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
