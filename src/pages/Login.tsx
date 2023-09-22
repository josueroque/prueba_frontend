import React from "react";
import logo from "../assets/Logo-IngenieriaDigital.svg";
import { Button, TextField, Typography } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { authenticate } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Buffer } from "buffer";

const Login = () => {
  const { dispatch } = React.useContext(UserContext);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const token = Buffer.from(`${email}:${password}`, "utf8").toString(
        "base64"
      );
      const response = await authenticate(token);
      console.log(response);
      if (response.status === 200) {
        dispatch({
          type: "SAVE",
          payload: { email, token },
        });
        navigate("/employees");
      }
    } catch (error) {
      swal({
        title: "Error",
        text: "Sus credenciales nos son validas",
        icon: "error",
      });
    }
  };

  return (
    <div className="page-login">
      <img className="login-logo" src={logo} alt="Not found" />
      <Typography
        variant="h3"
        color="white"
        fontWeight="bold"
        marginTop="30px"
        className="login-text-title"
      >
        Bienvenido a Ingeniería Digital
      </Typography>
      <Typography
        variant="h6"
        color="white"
        fontWeight="bold"
        marginBottom="30px"
        className="login-text-title"
      >
        Ingresa tus datos para acceder a tu cuenta
      </Typography>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label className="login-label">Correo electrónico</label>
        <TextField
          autoFocus
          type="email"
          required
          InputProps={{
            style: {
              borderRadius: "10px",
              height: "40px",
              width: "600px",
              backgroundColor: "white",
            },
          }}
          className="login-textfield"
          placeholder="Correo electrónico"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
        />
        <label className="login-label">Password</label>
        <TextField
          autoFocus
          type="password"
          required
          InputProps={{
            style: {
              borderRadius: "10px",
              height: "40px",
              width: "600px",
              backgroundColor: "white",
            },
          }}
          className="login-textfield"
          placeholder="Password"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            className="login-button"
            onClick={handleAuth}
          >
            Ingresar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
