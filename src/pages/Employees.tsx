import React from "react";
import Layout from "../components/Layout";
import { getEmployees } from "../services/apiService";
import CardItem from "../components/CardItem";
import iconAdd from "../assets/Icono-Add.svg";
import { IconButton, Typography } from "@mui/material";
import Dialog from "../components/Dialog";
import swal from "sweetalert";
interface IEmployee {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  documentNumber: string;
  position: string;
  id: number;
  gender: string;
}

const Employees: React.FC = () => {
  const [employeesList, setEmployeesList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployeesList(response.data);
    } catch (error) {
      swal({
        title: "Error",
        text: "An error ocurred fetching the data",
        icon: "error",
      });
    }
  };
  React.useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Layout>
      <div className="employees-page-top">
        <Typography variant="h4">Colaboradores</Typography>
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <img src={iconAdd} alt="Not found" style={{ marginTop: "-10px" }} />
        </IconButton>
      </div>
      <div className="page-employees">
        {employeesList.length > 0 &&
          employeesList.map((item: IEmployee) => (
            <CardItem {...item} key={item.id} />
          ))}
      </div>
      <Dialog
        open={open}
        setOpen={setOpen}
        updateList={fetchEmployees}
      ></Dialog>
    </Layout>
  );
};

export default Employees;
