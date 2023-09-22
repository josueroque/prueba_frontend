import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import logo from "../assets/Logo-IngenieriaDigital.svg";
import isoLogo from "../assets/Isologo-IngenieriaDigital.svg";
import iconoHome from "../assets/Icono-Home.svg";
import iconoEmployees from "../assets/Icono-Colaboradores.svg";
import { Link } from "react-router-dom";
const drawerWidth = 320;

//TODO: Move inline styles to a separated styles sheet
const Layout = (props: any) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: "white",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#081551",
            boxShadow: "1px 1px 10px #D2E4EA",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div
          style={{
            width: "100px",
            height: "50px",
            marginTop: "100px",
            marginLeft: "2vw",
            marginBottom: "10vh",
          }}
        >
          <img src={logo} alt="logo" />
        </div>

        <div style={{ display: "flex", gap: 0 }}>
          <div
            style={{
              width: "100px",
              height: "50px",
              marginTop: "7h",
              marginLeft: "1vw",
              marginBottom: "5vh",
              marginRight: 0,
              padding: 0,
            }}
          >
            <img src={isoLogo} alt="logo" />
          </div>
          <p
            style={{
              padding: 0,
              marginLeft: "-30px",
              font: "normal normal normal 18px/20px Lato",
              color: "#F8FBFD",
              letterSpacing: "0px",
              textAlign: "left",
            }}
          >
            Ingenieria Digital S.A. de C.V.
          </p>
        </div>
        <List>
          {["Dashboard", "Colaboradores"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <Link
                  style={{ textDecoration: "none" }}
                  to={text === "Colaboradores" ? "/employees" : "/dashboard"}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "15px",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={index % 2 === 0 ? iconoHome : iconoEmployees}
                      alt="logo"
                      style={{ marginLeft: "40px" }}
                    />
                    <ListItemText primary={text} style={{ color: "white" }} />
                  </div>
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {props.children}
      </Box>
    </Box>
  );
};

export default Layout;
