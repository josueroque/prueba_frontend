import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IEmployee } from "../interfaces";
import { createEmployee } from "../services/apiService";
import { IconButton, MenuItem, Select } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getPositions } from "../services/apiService";
import swal from "sweetalert";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  updateList: () => {};
}

const FormDialog: React.FC<Props> = (props) => {
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [positionId, setPositionId] = React.useState<number>(0);
  const [docNumber, setDocNumber] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const positions = getPositions();

  const handleCreate = async (employee: IEmployee) => {
    try {
      await createEmployee(employee, "");
      swal({
        title: "success",
        icon: "success",
        text: "La información se guardo con exito",
      });
      props.updateList();
      handleClose();
    } catch (error) {
      swal({
        title: "Error",
        text: "Ocurrio un error, no se guardo el empleado",
        icon: "error",
      });
    }
  };

  const handleClose = () => {
    cleanValues();
    props.setOpen(false);
  };

  const cleanValues = () => {
    setFirstName("");
    setLastName("");
    setPositionId(0);
    setDocNumber("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const textFieldCommonValues = {
    autoFocus: true,
    type: "text",
    fullWidth: true,
    required: true,
    InputProps: {
      style: {
        borderRadius: "10px",
        height: "40px",
      },
    },
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"md"}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (password !== confirmPassword) {
            swal({
              title: "Error",
              text: "Password values must be the same",
              icon: "error",
            });
            return;
          }
          const employee: IEmployee = {
            FirstName: firstName,
            LastName: lastName,
            PositionId: positionId,
            Email: email,
            Password: password,
            DocumentNumber: docNumber,
            Gender: "M",
            PhoneNumber: phoneNumber,
            Active: true,
          };
          handleCreate(employee);
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          align="center"
          style={{ font: "normal normal 900 35px/60px Lato" }}
        >
          Agregar Colaborador
        </DialogTitle>

        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <div style={{ width: "45%" }}>
              <label>No. de Identidad o Pasaporte</label>
              <TextField
                {...textFieldCommonValues}
                margin="dense"
                variant="outlined"
                placeholder="No. de Identidad o Pasaporte"
                value={docNumber}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDocNumber(event.target.value);
                }}
              />
              <label>Nombre</label>
              <TextField
                {...textFieldCommonValues}
                margin="dense"
                variant="outlined"
                placeholder="Nombre"
                value={firstName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFirstName(event.target.value);
                }}
              />
              <label>Telefono</label>
              <TextField
                {...textFieldCommonValues}
                margin="dense"
                variant="outlined"
                placeholder="Telefono"
                value={phoneNumber}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPhoneNumber(event.target.value);
                }}
              />
              <label>Contraseña</label>
              <TextField
                {...textFieldCommonValues}
                margin="dense"
                variant="outlined"
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <div style={{ width: "45%" }}>
              <label>Cargo</label>
              <Select
                {...textFieldCommonValues}
                margin="dense"
                variant="outlined"
                placeholder="Cargo"
                value={positionId}
                onChange={(event: any) => {
                  setPositionId(parseInt(event.target.value));
                }}
                style={{
                  borderRadius: "10px",
                  height: "40px",
                  marginBottom: "13px",
                }}
              >
                {positions.map((item) => (
                  <MenuItem key={item.Id} value={item.Id}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
              <label>Apellido</label>
              <TextField
                {...textFieldCommonValues}
                margin="dense"
                variant="outlined"
                placeholder="Apellido"
                value={lastName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setLastName(event.target.value);
                }}
              />
              <label>Correo Electronico</label>
              <TextField
                {...textFieldCommonValues}
                margin="dense"
                variant="outlined"
                placeholder="Correo Electronico"
                type="email"
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                }}
              />
              <label>Confirmar Contraseña</label>
              <TextField
                {...textFieldCommonValues}
                margin="dense"
                variant="outlined"
                placeholder="Confirmar Contraseña"
                type="password"
                value={confirmPassword}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <Button variant="contained" type="submit" className="modal-button">
              Guardar
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
