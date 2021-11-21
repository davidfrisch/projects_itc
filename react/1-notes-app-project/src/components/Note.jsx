import { Paper } from "@material-ui/core";
import React from "react";
import NoteOptions from "./NoteOptions";
import "../css/note.css";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import DBNotes from "../APIDatabaseFreshNotes";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { green, red } from "@mui/material/colors";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const Note = (props) => {
  const { id, date, title, text, color } = props.note;
  const [reminder, setReminder] = useState(props.note.reminder);
  const [currentColor, setColor] = useState(color);
  const { enqueueSnackbar } = useSnackbar();

  const useStyles = makeStyles((theme) => ({
    colorPaper: {
      backgroundColor: currentColor,
    },
  }));

  useEffect(() => {
    if (reminder) {
      const textnotif = title ? title : text 
      createNotification(textnotif, reminder)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createNotification = (text, reminderTime) => {
    try {
      setTimeout(() => {
        enqueueSnackbar(text);
      }, reminderTime - Date.now());
    } catch (err) {
      console.log(err);
    }
  };

  const setReminderInDB = (time) => {
    const newTime = new Date(time).getTime();
    if (time) {
      DBNotes.setReminderNoteInDB(id, newTime);
      createNotification(text ? text : "Empty Note...", newTime);
    } else {
      DBNotes.setReminderNoteInDB(id, null);
      setReminder(null);
    }
  };

  const setBackgroundColor = (color) => {
    setColor(color);
    DBNotes.setColorNoteInDB(id, color);
  };

  const classes = useStyles();

  return (
    <div className="note-container">
      <Paper className={classes.colorPaper}>
        <div className="note-header">
          <div>{new Date(date).toLocaleString()}</div>
          <div>
            {reminder ? (
              <ScheduleIcon
                sx={{
                  color: reminder - Date.now() > 0 ? green[500] : red[500],
                }}
              />
            ) : (
              " "
            )}
          </div>
        </div>
        <div className="note-content" onClick={() => props.handleOpenModal(id)}>
          <div className="note-title">{title}</div>
          <div className="note-text">{text ? text : "Empty Note"}</div>
        </div>
        <NoteOptions
          setBackgroundColor={(color) => setBackgroundColor(color)}
          setReminder={(time) => {
            time ? setReminder(time) : setReminder(null);
          }}
          setReminderInDB={(time) => setReminderInDB(time)}
          reminder={reminder}
          id={id}
          archiveNoteFromList={props.archiveNoteFromList}
        />
      </Paper>
    </div>
  );
};

export default Note;
