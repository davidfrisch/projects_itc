import React from "react";
import { Button } from "@material-ui/core";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const ReminderButton = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (select) => {
    // eslint-disable-next-line default-case
    switch (select) {
      case "confirm":
        props.setReminderInDB(props.reminder);
        break;
      case "delete":
        props.setReminderInDB(null);
        break;
    }

    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        startIcon={<MoreTimeIcon />}
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      ></Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className="container-reminder-button">
          <MenuItem>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDateTimePicker
                renderInput={(params) => <TextField {...params} />}
                value={props.reminder}
                onChange={(newValue) => {
                  props.setReminder(newValue);
                }}
              />
            </LocalizationProvider>
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (props.reminder) handleClose("confirm");
            }}
            disabled={!props.reminder}
          >
            Confirm
          </MenuItem>
          <MenuItem onClick={() => handleClose("delete")}>
            {props.reminder ? "Delete" : "Close"}
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
};

export default ReminderButton;
