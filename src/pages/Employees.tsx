import React from "react";
import Layout from "../components/Layout";
import { getEmployees } from "../services/apiService";
import CardItem from "../components/CardItem";

interface Employee {
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
  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployeesList(response.data);
    } catch (error) {
      // swal({
      //   title: "Error",
      //   text: "An error ocurred fetching the data",
      //   icon: "error",
      // });
      console.log("An error ocurred fetching the data");
    }
  };
  React.useEffect(() => {
    fetchEmployees();
  }, []);

  console.log(employeesList);

  return (
    <Layout>
      <div className="page-employees">
        {employeesList.length > 0 &&
          employeesList.map((item: Employee) => <CardItem {...item} />)}
      </div>
    </Layout>
  );
};

export default Employees;
