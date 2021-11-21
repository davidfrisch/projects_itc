import React from "react";
import { Button } from "@material-ui/core";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

class SidebarArchives extends React.Component {
  render() {
    return (
      <div>
        <Button
          variant="contained"
          className="sidebar-title-archive"
          onClick={() => {
            this.props.fadeAnimation();
            setTimeout(() => {
              this.props.setIsShowArchive(true);
            }, 800);
          }}
        >
          <h2>Archives</h2>
        </Button>
        <ul className="ul-archive">
          {this.props.listOfArchives.map((note) => (
            <li className="li-archive" key={note.id + "-archive"}>
              <div className="group-text">
                <div className="date">
                  {new Date(note.date).toLocaleString().split(",")[0]}
                </div>
                <div className="title">
                  {note.title
                    ? note.title
                    : note.text.substr(0, 10) +
                      (note.text.length > 10 ? "..." : "Empty note...")}
                </div>
              </div>
              <div className="group-button">
                <Button
                  variant="outlined"
                  onClick={() => this.props.handleUnarchive(note.id)}
                  startIcon={<UnarchiveIcon />}
                ></Button>
                <Button
                  variant="outlined"
                  onClick={() => this.props.deleteNote(note.id)}
                  startIcon={<DeleteForeverIcon />}
                ></Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SidebarArchives;
