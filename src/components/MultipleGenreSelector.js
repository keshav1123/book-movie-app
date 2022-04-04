import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300
  },
  indeterminateColor: {
    color: "#f50057"
  },
  selectAllText: {
    fontWeight: 500
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  }
}));

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 225,
      width: 200,
      marginTop: 10
    }
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
};


function MultipleGenreSelector({options}) {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);


  const handleChange = (event) => {
    const value = event.target.value;
    console.log(value)
    setSelected(value);
   
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="mutiple-select-label">Multiple Select</InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        value={selected}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.genre}>
            <ListItemIcon>
              <Checkbox checked={selected.indexOf(option.genre) > -1} />
            </ListItemIcon>
            <ListItemText primary={option.description} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultipleGenreSelector;
