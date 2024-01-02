import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";
export const SideBarItem = ({ note }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setActiveNote(note))
  };
  return (
    <ListItem disablePadding onClick={onClick}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>

        <Grid container direction="column">
          <ListItemText primary={note.title} />
          <ListItemText secondary={note.body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
SideBarItem.propTypes = {
  note: PropTypes.object.isRequired,
};
