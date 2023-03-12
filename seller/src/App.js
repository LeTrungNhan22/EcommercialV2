import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "./app.css";
import LoadingPage from "./components/loadingPage/LoadingPage";
import Login from "./components/login/Login";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import AuthContext from "./context/authContext";
import Home from "./features/Home/index.js/Home";
import ProductHome from "./features/Product";
import NewProduct from "./features/Product/pages/newProduct/NewProduct";
import ProductSingle from "./features/Product/pages/productSingle/ProductSingle";
import UserList from "./features/User/components/userList/UserList";
import User from "./features/User/index/user/User";
import newUser from "./features/User/pages/newUser/NewUser";

function App() {
  const { isLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="App">
      {isLogin ? <Topbar /> : null}
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/login" component={Login} />
          <div className="container">
            <Sidebar />
            {loading ? (
              <LoadingPage loading={loading} />
            ) : (
              <Switch>
                <Route exact path="/dashboard-seller" component={Home}></Route>
                <Route path="/users" component={UserList}></Route>
                <Route path="/user/:userId" component={User}></Route>
                <Route path="/newUser" component={newUser}></Route>
                <Route path="/products" component={ProductHome}></Route>
                <Route
                  path="/product/:productId/detail"
                  component={ProductSingle}
                />
                <Route path="/newProduct" component={NewProduct}></Route>
                <Route component={PageNotFound} />
              </Switch>
            )}
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
