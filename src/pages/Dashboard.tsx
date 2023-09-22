import React from "react";
import Layout from "../components/Layout";
import iconDashboard from "../assets/IngenieriaDigital-Portada.svg";
import { Button, Typography } from "@mui/material";
import { getEmployees } from "../services/apiService";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import iconEmployee from "../assets/Icono-Colaboradores.svg";
import swal from "sweetalert";

const Dashboard = () => {
  const [employeesList, setEmployeesList] = React.useState([]);
  const { userState } = React.useContext(UserContext);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const date = new Date();
  const month = months[date.getMonth()];

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

  return (
    <Layout>
      <div className="dashboard-main-container">
        <div className="dashboard-first-row">
          <div className="dashboard-first-row-text">
            <Typography variant="h5" color="white" fontWeight="bold">
              Buenos días,
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="white">
              Ingeniería Digital
            </Typography>
            <Typography
              variant="h4"
              fontSize="medium"
              color="white"
              marginY="10px"
            >
              Bienvenido a Ingeniería Digital
            </Typography>
            <Typography
              variant="h4"
              marginY="10px"
              fontSize="medium"
              color="white"
            >
              Aqui toda la información de su empresa.
            </Typography>

            <Button className="dashboard-first-row-button">Agendar</Button>
          </div>
          <div style={{ width: "50%" }}>
            <img
              src={iconDashboard}
              alt="not found"
              style={{
                maxWidth: "100%",
                height: "110%",
                marginTop: "-3.5vh",
                paddingTop: 0,
              }}
            ></img>
          </div>
        </div>
        <div
          className="dashboard-second-box"
          style={{ width: "24%", padding: "20px" }}
        >
          <div className="dashboard-second-box-fist-row">
            <Button className="dashboard-second-box-button">{month}</Button>
            <img
              className="dashboard-employee-icon"
              src={iconEmployee}
              alt="not found"
            ></img>
          </div>
          <div
            className="dashboard-second-box-botton"
            style={{ marginTop: "50%" }}
          >
            <Typography variant="h4" fontWeight="bold" color="white">
              {employeesList.length}
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="white">
              Colaboradores
            </Typography>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "50px",
          justifyContent: "center",
        }}
      >
        <div className="dashboard-second-row"></div>
        <div className="dashboard-second-row"></div>
      </div>
    </Layout>
  );
};

export default Dashboard;
