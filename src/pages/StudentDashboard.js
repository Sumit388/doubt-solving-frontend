// * Packages Import * //
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

// * Component Import * //
import DoubtHistory from "../components/Student Dasboard/DoubtHistory";
import DoubtBox from "../components/Student Dasboard/DoubtBox";
import RaiseDoubts from "../components/Student Dasboard/RaiseDoubts";

// * Utils Import * //
import { getUserDetails, removeAllCookies } from "../utils/cookieChecker";

// * Styles Import * //
import Styles from "../styles/StudentDashboard.module.scss";

function StudentDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeTab, setActiveTab] = useState("Doubt History");
  const [activeDoubt, setActiveDoubt] = useState(null);

  const userDetails = getUserDetails();
  const drawerWidth = 240;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = () => {
    removeAllCookies();
    window.location.replace(`/`);
  };

  const tabs = [
    {
      id: 1,
      name: "Doubt History",
      comp: (
        <DoubtHistory
          setActiveTab={setActiveTab}
          setActiveDoubt={setActiveDoubt}
        />
      ),
    },
    { id: 2, name: "Raise Doubts", comp: <RaiseDoubts /> },
    { id: 3, name: "Doubt Box", comp: <DoubtBox activeDoubt={activeDoubt} /> },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {tabs.map((text) => (
          <ListItem
            key={text.id}
            disablePadding
            sx={text.name === activeTab && { background: "#2196f3" }}
            onClick={() => setActiveTab(text.name)}
          >
            <ListItemButton>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ToastContainer />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            Menu
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Welcome {userDetails?.name} to your dashboard.
          </Typography>
          <button className={Styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {tabs.filter((tab) => tab.name === activeTab)?.[0].comp}
      </Box>
    </Box>
  );
}

export default StudentDashboard;
