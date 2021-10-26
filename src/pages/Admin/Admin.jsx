import { useAuth0 } from "@auth0/auth0-react";

const Admin = () => {
  const { user } = useAuth0();
  console.log("user en /admin", user);
  return (
    <div className="">
      <h1>Bienvenido {user.name} a Ferreteria MisionTic</h1>
    </div>
  );
};

export default Admin;
