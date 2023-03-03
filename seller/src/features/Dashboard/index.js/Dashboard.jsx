import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import Home from "../../Home/index.js/Home";
import ProductList from "../../Product/components/productList/ProductList";
import Product from "../../Product/index/product/Product";
import NewProduct from "../../Product/pages/newProduct/NewProduct";
import UserList from "../../User/components/userList/UserList";
import User from "../../User/index/user/User";
import newUser from "../../User/pages/newUser/NewUser";
const Dashboard = () => {
  return (
    <div>
      <Router>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Switch>
            <Route exact path="/dashboard-seller" component={Home}></Route>
            <Route path="/users" component={UserList}></Route>
            <Route path="/user/:userId" component={User}></Route>
            <Route path="/newUser" component={newUser}></Route>
            <Route path="/products" component={ProductList}></Route>
            <Route path="/product/:productId" component={Product} />
            <Route path="/newProduct" component={NewProduct}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Dashboard;
