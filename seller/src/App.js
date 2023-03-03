import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./app.css";
import Login from "./components/login/Login";
import SellerRegisterForm from "./components/onBoardingForm/index/OnBoardingForm";

import Dashboard from "./features/Dashboard/index.js/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/onboarding/form" component={SellerRegisterForm} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard-seller" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
