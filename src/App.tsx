import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </UserContextProvider>
    </Router>
  );
}

export default App;
