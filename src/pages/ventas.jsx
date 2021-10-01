import Table from 'react-bootstrap/Table'
import Visibility from '@material-ui/icons/Visibility';
const Ventas = () => {
    // TODO importar libreria de alertas para el login
    // TODO ver funcionalidad iniciar sesion y remember me
    return (
        <Table striped bordered hover variant="dark"  >
            <thead className="container h-200"  >
                <tr >
                    <th>#</th>
                    <th>Vendedor</th>
                    <th>Ventas</th>
                    <th>Tienda</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Carlos Rodriguez</td>
                    <td>$5968000</td>
                    <td>Bogotá</td>
                    <th> Ver <Visibility color="success" /></th>
                </tr>
                <tr>
                    <td >2</td>
                    <td>Jacob Morales</td>
                    <td>$5568000</td>
                    <td>Cali</td>
                    
                    <th> Ver <Visibility color="success" /></th>
                </tr>
                <tr>
                    <td >3</td>
                    <td>Patricia Bueno</td>
                    <td>$4568000</td>
                    <td>Medellin </td>
                    <th> Ver <Visibility color="success" /></th>
                </tr>
            </tbody>
        </Table>

    );
};

export default Ventas;
