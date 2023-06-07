import axios from "axios";
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
import { initFirebase } from "./firebase/initFirebase";
import OrderScreen from "./features/Order/pages";
import OrderDetail from "./features/Order/pages/detail";
initFirebase();

function App() {
  const { isLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [])
  console.log("isLogin=", isLogin);



  return (
    <div className="App">
      {isLogin ? <Topbar /> : null}
      <Router>
        <Switch>
          <>
            <Route exact path="/" render={() => <Redirect to="/seller/login" />} />
            <Route exact path="/seller/login" component={Login} />
            {isLogin ? (
              <>
                <div className="container">
                  <Sidebar />
                  {loading ? (
                    <>
                      <LoadingPage loading={loading} />
                    </>

                  ) : (
                    <>
                      <Switch>
                        <Route exact path="/seller/dashboard-seller" component={Home}></Route>
                        <Route path="/seller/users" component={UserList}></Route>
                        <Route path="/seller/user/:userId" component={User}></Route>
                        <Route path="/seller/newUser" component={newUser}></Route>
                        <Route path="/seller/products" component={ProductHome}></Route>
                        <Route
                          path="/seller/product/:productId/detail"
                          component={ProductSingle}
                        />
                        <Route path="/seller/newProduct" component={NewProduct}></Route>
                        <Route path="/seller/orders" component={OrderScreen}></Route>
                        <Route path="/seller/order/:orderId/detail" component={OrderDetail}></Route>

                        <Route component={PageNotFound} />
                      </Switch>

                    </>


                  )}
                </div></>
            ) :
              <PageNotFound />
            }
          </>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
