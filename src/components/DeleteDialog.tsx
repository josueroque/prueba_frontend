import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import iconDelete from "../assets/Eliminar.svg";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { deleteEmployee } from "../services/apiService";
import { UserContext } from "../context/UserContext";
import swal from "sweetalert";
interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowButtons?: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  updateList: () => {};
  id: number;
  name?: string;
}

const DeleteDialog: React.FC<Props> = (props) => {
  const [deletedAt, setDeletedAt] = React.useState<any>(null);

  const { dispatch, userState } = React.useContext(UserContext);

  const handleClose = () => {
    if (props.setShowButtons) props.setShowButtons(false);
    setDeletedAt(null);
    props.setOpen(false);
  };

  const handleDelete = async () => {
    try {
      if (!deletedAt) throw new Error("No se proporciono la fecha de baja");
      await deleteEmployee(props.id, deletedAt, userState.token);
      swal({
        title: "success",
        icon: "success",
        text: "El empleado se elimino con exito",
      });
      props.updateList();
      handleClose();
    } catch (error) {
      swal({
        title: "Error",
        text: "Ocurrio un error, verifique la fecha de baja",
        icon: "error",
      });
    }
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
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

      <DialogContent>
        <div className="modal-delete-container">
          <img src={iconDelete} alt="not found"></img>
          <Typography variant="h5" color="#081551" fontWeight="bold">
            ¿Seguro que deseas dar de baja?
          </Typography>
          <Typography marginBottom="20px">
            {`Selecciona la fecha para dar de baja a ${props.name}`}{" "}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={deletedAt} onChange={setDeletedAt} />
          </LocalizationProvider>
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
          <Button
            variant="contained"
            type="button"
            className="modal-button modal-delete-button"
            onClick={handleDelete}
          >
            OK
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
