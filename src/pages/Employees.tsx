import React from "react";
import Layout from "../components/Layout";
import { getEmployees } from "../services/apiService";
import CardItem from "../components/CardItem";
import iconAdd from "../assets/Icono-Add.svg";
import { IconButton, Typography } from "@mui/material";
import Dialog from "../components/CreateDialog";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Paginator from "../components/Pagination";
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
  const [employeesPage, setEmployeesPage] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const pageSize = 6;

  const resetData = () => {
    setEmployeesPage([]);
    setPage(1);
    setCount(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const { userState } = React.useContext(UserContext);

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      if (!userState.token) {
        navigate("/");
      }
      const response = await getEmployees(userState.token);
      setEmployeesList(response.data);
    } catch (error) {
      if (userState.token) {
        swal({
          title: "Error",
          text: "An error ocurred fetching the data",
          icon: "error",
        });
      }
    }
  };

  React.useEffect(() => {
    fetchEmployees();
  }, []);

  React.useEffect(() => {
    if (employeesList.length > 0) {
      setCount(Array.isArray(employeesList) ? employeesList.length : 0);
      const pageResults = [...employeesList].splice(
        (page - 1) * pageSize,
        pageSize
      );
      setEmployeesPage(pageResults);
      setCount(Math.ceil(employeesList.length / pageSize));
    } else resetData();
  }, [employeesList, page]);

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
        {employeesPage.length > 0 &&
          employeesPage.map((item: IEmployee) => (
            <CardItem {...item} key={item.id} updateList={fetchEmployees} />
          ))}
      </div>
      <Dialog
        open={open}
        setOpen={setOpen}
        updateList={fetchEmployees}
        id={0}
      ></Dialog>
      <div className="pagination">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          <Paginator
            count={count}
            page={page}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Employees;
