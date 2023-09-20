import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
//import { CartContextProvider } from "./context/CartContext";

function App() {
  return (
    <Router>
      {/* <CartContextProvider> */}
      <Routes>
        <Route path="/" element={<Employees />} />
      </Routes>
      {/* </CartContextProvider> */}
    </Router>
  );
}

export default App;
