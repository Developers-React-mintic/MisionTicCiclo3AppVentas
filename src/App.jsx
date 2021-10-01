import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "pages/login.jsx";
import Ventas from "pages/ventas.jsx";
import Pedidos from "pages/pedidos.jsx";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* aqui podria ir el layout */}
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/ventas" exact>
            <Ventas />
          </Route>
          <Route path="/pedidos" exact>
            <Pedidos />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
