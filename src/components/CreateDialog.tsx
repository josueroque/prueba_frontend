import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IEmployee } from "../interfaces";
import { createEmployee, editEmployee } from "../services/apiService";
import { IconButton, MenuItem, Select } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../context/UserContext";
import swal from "sweetalert";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowButtons?: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  updateList: () => {};
  id: number;
  employee?: IEmployee;
  positions: any[];
}

const CreateDialog: React.FC<Props> = (props) => {
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [positionId, setPositionId] = React.useState<number>(0);
  const [docNumber, setDocNumber] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const { userState } = React.useContext(UserContext);

  React.useEffect(() => {
    if (props.employee) {
      setEditValues();
    }
  }, [props.employee]);

  const setEditValues = () => {
    if (props.employee) {
      setFirstName(props.employee.FirstName);
      setLastName(props.employee.LastName);
      setPositionId(props.employee.PositionId);
      setDocNumber(props.employee.DocumentNumber);
      setPhoneNumber(props.employee.PhoneNumber);
      setEmail(props.employee.Email);
    }
  };

  const handleCreate = async (employee: IEmployee) => {
    try {
      if (props.id) {
        employee.Id = props.id;
        await editEmployee(employee, userState.token);
      } else await createEmployee(employee, userState.token);

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
    if (props.setShowButtons) props.setShowButtons(false);
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
  console.log(props.positions);
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
            DocumentNumber: docNumber,
            Gender: "M",
            PhoneNumber: phoneNumber,
            Active: true,
          };
          if (!props.id) employee.Password = password;
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
          {props.id === 0 ? "Agregar colaborador" : "Editar colaborador"}
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
                required={!props.id}
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
                {props.positions.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
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
                required={!props.id}
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

export default CreateDialog;
