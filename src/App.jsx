import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Ventas from "pages/ventas.jsx";
import Pedidos from "pages/pedidos.jsx";
import AdminUsers from "pages/AdminUsers.jsx";
import Admin from "pages/Admin";
import PrivateLayout from "layouts/privateLayout";
import AuthLayout from "layouts/authLayout";
import Login from "pages/login";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route
            path={[
              "/admin",
              "/admin/ventas",
              "/admin/pededidos",
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
                </Route>{" "}
                <Route path="/admin/users">
                  <AdminUsers />
                </Route>
                <Route path="/admin">
                  <Admin />
                </Route>
              </Switch>
            </PrivateLayout>
          </Route>
          <AuthLayout>
            <Route path="/">
              <Login />
            </Route>
          </AuthLayout>
        </Switch>
      </Router>
    </>
  );
}

export default App;
