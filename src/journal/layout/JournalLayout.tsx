import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { NavBar, SideBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({ children }: any) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar drawerWidth={drawerWidth}/>
        {/* Sidebar */}
        <SideBar drawerWidth={drawerWidth}/>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar></Toolbar>
          {children}    
        </Box>
      </Box>
    </>
  );
};
