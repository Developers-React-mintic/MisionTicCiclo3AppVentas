import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Ventas from "pages/Admin/Ventas.jsx";
import Productos from "pages/Admin/Productos";
import Users from "pages/Admin/Users.jsx";
import Admin from "pages/Admin/Admin";
import Perfil from "pages/Admin/Perfil";
import { UserContext } from "context/userContext";
import PrivateLayout from "layouts/PrivateLayout";
import { useState } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import PrivateRoute from "components/PrivateRoute";

function App() {
  const [userData, setUserData] = useState({});

  return (
    <Auth0Provider
      domain="mision-tic.us.auth0.com"
      clientId="zAIuTblOYDjAjnAZ73wBYKjKi5mOb32V"
      redirectUri="https://developerscorpecommerce.herokuapp.com/admin"
      audience="api-autenticacion-ferreteria-mintic"
    >
      <>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Router>
            <Switch>
              <Route
                path={[
                  "/",
                  "/admin",
                  "/admin/ventas",
                  "/admin/productos",
                  "/admin/users",
                ]}
              >
                <PrivateLayout>
                  <Switch>
                    <Route path="/admin/ventas">
                      <PrivateRoute roleList={["admin", "vendedor"]}>
                        <Ventas />
                      </PrivateRoute>
                    </Route>
                    <Route path="/admin/productos">
                      <PrivateRoute roleList={["admin", "vendedor"]}>
                        <Productos />
                      </PrivateRoute>
                    </Route>
                    <Route path="/admin/users">
                      <PrivateRoute roleList={["admin"]}>
                        <Users />
                      </PrivateRoute>
                    </Route>
                    <Route path="/admin/perfil">
                      <Perfil />
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
        </UserContext.Provider>
      </>
    </Auth0Provider>
  );
}

export default App;
