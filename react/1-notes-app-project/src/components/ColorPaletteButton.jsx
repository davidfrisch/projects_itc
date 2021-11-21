import ColorLensIcon from "@mui/icons-material/ColorLens";
import { Button } from "@material-ui/core";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CircleIcon from "@mui/icons-material/Circle";

const ColorPaletteButton = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (color) => {
    setAnchorEl(null);
    if(color) props.setBackgroundColor(color)
  };

  return (
    <div>
      <Button
        startIcon={<ColorLensIcon />}
        onClick={handleClick}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      ></Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={()=>(handleClose(null))}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleClose("#A1B548")}>
          <CircleIcon htmlColor="#A1B548" />
        </MenuItem>
        <MenuItem onClick={() => handleClose("#FEC4A1")}>
          <CircleIcon htmlColor="#FEC4A1" />
        </MenuItem>
        <MenuItem onClick={() => handleClose("#FCCC4A")}>
          <CircleIcon htmlColor="#FCCC4A" />
        </MenuItem>
        <MenuItem onClick={() => handleClose("#B2A148")}>
          <CircleIcon htmlColor="#B2A148" />
        </MenuItem>
        <MenuItem onClick={() => handleClose("#E94D33")}>
          <CircleIcon htmlColor="#E94D33" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ColorPaletteButton;
