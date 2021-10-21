import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Ventas from "pages/ventas.jsx";
import Pedidos from "pages/pedidos.jsx";
import Productos from "pages/Productos";
import AdminUsers from "pages/AdminUsers.jsx";
import Admin from "pages/Admin";
import PrivateLayout from "layouts/privateLayout";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route
            path={[
              "/",
              "/admin",
              "/admin/ventas",
              "/admin/pededidos",
              "/admin/productos",
              "/admin/users",
            ]}
          >
            <PrivateLayout>
              <Switch>
                <Route path="/admin/ventas">
                  <Ventas />
                </Route>
                <Route path="/admin/pedidos">
                  <Pedidos />
                </Route>
                <Route path="/admin/productos">
                  <Productos />
                </Route>
                <Route path="/admin/users">
                  <AdminUsers />
                </Route>
                <Route path="/admin">
                  <Admin />
                </Route>
                <Route path="/"></Route>
              </Switch>
            </PrivateLayout>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
