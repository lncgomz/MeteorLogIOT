import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import MeteorlogDashboard from "./components/meteorlog-dashboard.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/meteorlogs"} className="navbar-brand">
            Meteorlog IoT
          </Link>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/meteorlogs"]} component={MeteorlogDashboard} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
