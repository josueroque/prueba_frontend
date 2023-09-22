import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, IconButton } from "@mui/material";
import iconMaleEmployee from "../assets/Avatar-Hombre.svg";
import iconId from "../assets/Icono-ID.svg";
import iconEmail from "../assets/Icono-Mail.svg";
import iconPhoneNumber from "../assets/Icono-Telefono.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateDialog from "./CreateDialog";
import DeleteDialog from "./DeleteDialog";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  documentNumber: string;
  position: any;
  id: number;
  gender: string;
  updateList: () => {};
  positions: any[];
}

export const CardItem: React.FC<Props> = ({
  id,
  firstName,
  lastName,
  email,
  phoneNumber,
  position,
  documentNumber,
  gender,
  positions,
  updateList,
}) => {
  const [showButtons, setShowButtons] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  return (
    <Card
      sx={{
        width: "420px",
        height: "300px",
        borderRadius: "20px",
        boxShadow: "1px 1px 10px #D2E4EA",
      }}
      className="card"
    >
      <div className="card-top-row">
        <img src={iconMaleEmployee} alt="Not Found" />
        <div>
          <div style={{ display: "flex" }}>
            <Typography
              variant="h6"
              color="text.primary"
              className="card-employee-name"
              display="inline"
            >{`${firstName} ${lastName}`}</Typography>
          </div>
          <Typography color="#7B55BF" gutterBottom component="div">
            {position.name}
          </Typography>
        </div>
        <IconButton
          aria-label="delete"
          onClick={() => {
            setShowButtons(!showButtons);
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
      <Divider />
      <CardContent>
        <div className="card-row">
          <img src={iconId} alt="Not Found" />
          <Typography variant="body2" color="text.secondary">
            {documentNumber}
          </Typography>
        </div>
        <div className="card-row">
          <img src={iconPhoneNumber} alt="Not Found" />
          <Typography variant="body2" color="text.secondary">
            {phoneNumber}
          </Typography>
        </div>
        <div className="card-row">
          <img src={iconEmail} alt="Not Found" />
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
        </div>
      </CardContent>
      <CardActions hidden={true}>
        <div
          className="card-actions"
          style={{ display: !showButtons ? "none" : "flex" }}
        >
          <Button
            variant="contained"
            className="card-button card-button-edit"
            onClick={() => setOpen(true)}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            className="card-button card-button-delete"
            onClick={() => setDeleteOpen(true)}
          >
            Dar de Baja
          </Button>
        </div>
      </CardActions>
      <CreateDialog
        open={open}
        setOpen={setOpen}
        updateList={updateList}
        id={id}
        setShowButtons={setShowButtons}
        employee={{
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          PhoneNumber: phoneNumber,
          DocumentNumber: documentNumber,
          PositionId: position.id,
          Id: id,
          Gender: gender,
        }}
        positions={positions}
      ></CreateDialog>
      <DeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        updateList={updateList}
        id={id}
        setShowButtons={setShowButtons}
        name={`${firstName} ${lastName}`}
      ></DeleteDialog>
    </Card>
  );
};

export default CardItem;
