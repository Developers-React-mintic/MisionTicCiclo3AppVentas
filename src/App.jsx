import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "pages/login.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* aqui podria ir el layout */}
          <Route path="/" exact>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
