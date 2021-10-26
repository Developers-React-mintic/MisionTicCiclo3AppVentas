//import { useAuth0 } from "@auth0/auth0-react";
import { obtenerDatosUsuario } from "utils/api";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const Perfil = () => {
  //const { user } = useAuth0();
  const [usuario, setUsuario] = useState([]);
  
  useEffect(() => {
    const fetchUsuario = async () => {
      await obtenerDatosUsuario(
        (response) => {
          setUsuario(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    fetchUsuario();
  }, []);
  return <div className="center">
     
    
    <Card style={{ width: '18rem'   }}>
  <Card.Img variant="top" src={usuario.picture} />
  <Card.Header as="h2">Perfil</Card.Header>

  <Card.Body>
  <Card.Title className="mb-2 text-muted">Nombre</Card.Title>
    <Card.Text>{usuario.name}</Card.Text>
  <Card.Subtitle className="mb-2 text-muted">Correo</Card.Subtitle>
    <Card.Text>{usuario.email}</Card.Text>
    
    
    <Card.Subtitle className="mb-2 text-muted">Creación</Card.Subtitle>
    <Card.Text>{usuario.created_at}</Card.Text>
    <Card.Subtitle className="mb-2 text-muted">Rol</Card.Subtitle>
    <Card.Text>{usuario.rol}</Card.Text>
    
    
  </Card.Body>
</Card>
  </div>;
};

export default Perfil;
