import React from "react";
import { Button, Paper } from "@material-ui/core";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "../css/ListOfArchivesDesktop.css";


//Display the archives list on the main board
const ListOfArchivesDesktop = (props) => {
  return (
    <div>
      <h1 className="desktop-archives-container-header">Archives</h1>
      <ul
        className={
          (props.fade === "fade-in" ? "fade-out" : "fade-in") +
          " desktop-archives-container"
        }
      >
        {props.listOfArchives.map((note) => (
          <li
            className="note-container archive-desktop-note-container"
            key={note.id + "-archive-desktop"}
          >
            <Paper style={{ backgroundColor: note.color }}>
              <div className="desktop-group-text-archive">
                <div className="desktop-date-archive">
                  {new Date(note.date).toLocaleString().split(",")[0]}
                </div>
                <div className="desktop-title-archive">{note.title}</div>
                <div className="desktop-text-archive">
                  {note.text ? note.text : "Empty note"}
                </div>
              </div>
              <div className="desktop-group-button-archive">
                <Button
                  variant="outlined"
                  onClick={() => props.handleUnarchive(note.id)}
                  startIcon={<UnarchiveIcon />}
                ></Button>
                <Button
                  variant="outlined"
                  onClick={() => props.deleteNote(note.id)}
                  startIcon={<DeleteForeverIcon />}
                ></Button>
              </div>
            </Paper>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfArchivesDesktop;
