import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { SideBarItem } from "./";

export const SideBar = ({ drawerWidth }) => {
  const { displayName } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            zIndex: 1000
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} note={note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
SideBar.propTypes = {
  drawerWidth: PropTypes.number,
};
SideBar.defaultProps = {
  drawerWidth: 240,
};
