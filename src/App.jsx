import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "pages/login.jsx";
import Ventas from "pages/ventas.jsx";
import Pedidos from "pages/pedidos.jsx";
import Admin from "pages/Admin";
import PrivateLayout from "layouts/privateLayout";
import AuthLayout from "layouts/authLayout";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path={["/admin", "/admin/ventas", "/admin/pededidos"]}>
            <PrivateLayout>
              <Switch>
                <Route path="/admin/ventas">
                  <Ventas />
                </Route>
                <Route path="/admin/pedidos">
                  <Pedidos />
                </Route>
                <Route path="/admin">
                  <Admin />
                </Route>
              </Switch>
            </PrivateLayout>
          </Route>

          <Route path="/">
            <AuthLayout>
              <Login />
            </AuthLayout>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
