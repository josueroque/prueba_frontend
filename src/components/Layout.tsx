import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import logo from "../assets/Logo-IngenieriaDigital.svg";
import isoLogo from "../assets/Isologo-IngenieriaDigital.svg";
import iconoHome from "../assets/Icono-Home.svg";
import iconoEmployees from "../assets/Icono-Colaboradores.svg";
const drawerWidth = 360;

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
            marginLeft: "1vw",
            marginBottom: "10vh",
          }}
        >
          <img src={logo} alt="logo-test" />
        </div>

        <div
          style={{
            width: "100px",
            height: "50px",
            marginTop: "7h",
            marginLeft: "1vw",
            marginBottom: "5vh",
          }}
        >
          <img src={isoLogo} alt="logo-test" />
        </div>

        <List
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            flexDirection: "column",
          }}
        >
          {["Dashboard", "Colaboradores"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <img
                  src={index % 2 === 0 ? iconoHome : iconoEmployees}
                  alt="logo"
                  style={{ margin: "10px" }}
                />
                <ListItemText primary={text} style={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {props.children}
        <h1>test</h1>
      </Box>
    </Box>
  );
};

export default Layout;
