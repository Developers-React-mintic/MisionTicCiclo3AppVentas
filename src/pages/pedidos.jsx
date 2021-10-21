import Table from "react-bootstrap/Table";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import Badge from "react-bootstrap/Badge";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
// import LocalShippingTwoToneIcon from "@material-ui/icons/LocalShippingTwoTone";
// import CheckTwoToneIcon from "@material-ui/icons/CheckTwoTone";
// import ClearTwoToneIcon from "@material-ui/icons/ClearTwoTone";
const Pedidos = () => {
  return (
    <Table striped bordered hover variant="dark">
      <thead className="container h-200">
        <tr>
          <th>#</th>
          <th>Cliente</th>
          <th>Estado</th>
          <th>Valor</th>
          <th>Gestionar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Carlos Cliente</td>
          <td>
            <Badge pill bg="primary">
              <AddCircleOutlineTwoToneIcon color="success" /> Nuevo{" "}
            </Badge>
          </td>
          <td>$265.000</td>
          <th>
            {" "}
            <SettingsIcon color="success" />{" "}
          </th>
        </tr>
        <tr>
          <td>2</td>
          <td>Juan Cliente</td>
          <td>
            <Badge pill bg="warning" text="dark">
              <PauseCircleOutlineIcon color="success" /> Embalaje
            </Badge>{" "}
          </td>
          <td>$145.000</td>
          <th>
            {" "}
            <SettingsIcon color="success" />{" "}
          </th>
        </tr>
      </tbody>
    </Table>
  );
};

export default Pedidos;
