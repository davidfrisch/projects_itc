import React from "react";
import ListNotes from "./ListNotes";
import NoteInput from "./NoteInput";
import "../css/board.css";
import ReactModal from "react-modal";
import NoteModal from "./NoteModal";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar";
import DBNotes from "../APIDatabaseFreshNotes";
import BottomNav from "./BottomNav";
import ListOfArchivesDesktop from "./ListOfArchivesDesktop";
import NoteNavBar from "./NoteNavBar.jsx";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfNotes: [],
      listOfArchives: [],
      showModal: false,
      showSideBar: false,
      modalNote: null,
      isShowArchive: false,
      fade: "fade-in",
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.fadeAnimation = this.fadeAnimation.bind(this);
  }


  updateListOfNotes(newList) {
    this.setState({ listOfNotes: newList });
    DBNotes.setTableNotePosition(newList);
  }

  addNoteToList(note) {
    const { title, text } = note;
    const listOfNotes = this.state.listOfNotes.slice();
    const id = uuidv4();
    const date = Date.now();
    const color = "#eee";
    const reminder = null;
    const positionDate = new Date().getTime();
    const newNote = { id, date, title, text, color, reminder, positionDate };
    listOfNotes.unshift(newNote);

    this.setState({
      listOfNotes: listOfNotes,
    });
    DBNotes.addNote(newNote);
  }


  deleteNote(id) {
    let noteToDelete;
    const listOfArchives = this.state.listOfArchives.filter((note) => {
      if (note.id !== id) {
        return true;
      }
      noteToDelete = note;
      return false;
    });

    DBNotes.deleteNoteFromDB(noteToDelete.id);
    this.setState({
      listOfArchives,
    });
  }

  archiveNoteFromList(id) {
    let confirm = window.confirm("Put in Archives ? ");
    if (confirm) {
      let noteToArchive;
      const listOfNotes = this.state.listOfNotes.filter((note) => {
        if (note.id !== id) {
          return true;
        }

        noteToArchive = note;
        return false;
      });

      this.setState({
        listOfNotes,
        listOfArchives: this.state.listOfArchives.concat(noteToArchive),
      });
      DBNotes.archiveNote(noteToArchive);
    }
  }

  handleOpenModal(id) {
    const listOfNotes = this.state.listOfNotes.slice();
    const modalNote = listOfNotes.filter((note) => note.id === id)[0];

    this.setState({
      showModal: true,
      modalNote,
    });
  }

  handleCloseModal(note) {
    const listOfNotes = this.state.listOfNotes.slice();

    for (let i in listOfNotes) {
      if (note.id === listOfNotes[i].id) {
        listOfNotes[i] = note;
        this.setState({ showModal: false, listOfNotes, modalNote: null });
        DBNotes.setNote(note);
        break;
      }
    }
  }

  handleUnarchive(id) {
    let noteToArchive;
    const listOfArchives = this.state.listOfArchives.filter((note) => {
      if (note.id !== id) {
        return true;
      }
      noteToArchive = note;
      return false;
    });

    this.setState({
      listOfArchives,
      listOfNotes: this.state.listOfNotes.concat(noteToArchive),
    });

    DBNotes.unArchiveNote(noteToArchive);
  }


  fadeAnimation() {
    if (this.state.fade === "fade-in") {
      this.setState({
        fade: "fade-out",
      });
    } else {
      this.setState({
        fade: "fade-in",
      });
    }
  }

  componentDidMount() {
    ReactModal.setAppElement("#board");
    DBNotes.getStartData().then(([notes, archives]) => {
      this.setState({
        listOfNotes: notes ? notes : [],
        listOfArchives: archives ? archives : [],
      });
    });
  }

  render() {
    return (
      <div id="board" className="board">
        <div className="main-board">
          <NoteNavBar
            setIsShowArchive={(value) => {
              this.setState({ isShowArchive: value });
            }}
            isShowArchive={this.state.isShowArchive}
            fadeAnimation={this.fadeAnimation}
          />

          {!this.state.isShowArchive && (
            <Paper>
              <NoteInput addNoteToList={(note) => this.addNoteToList(note)} />
            </Paper>
          )}

          {!this.state.isShowArchive && (
            <ListNotes
              fade={this.state.fade}
              listOfNotes={this.state.listOfNotes}
              archiveNoteFromList={(id) => this.archiveNoteFromList(id)}
              handleOpenModal={(id) => this.handleOpenModal(id)}
              setListOfNotes={(newList) => this.updateListOfNotes(newList)}
            />
          )}

          {this.state.isShowArchive && (
            <ListOfArchivesDesktop
              fade={this.state.fade}
              listOfArchives={this.state.listOfArchives}
              handleUnarchive={(id) => {
                this.handleUnarchive(id);
              }}
              deleteNote={(id) => {
                this.deleteNote(id);
              }}
            />
          )}

          {this.state.modalNote && (
            <NoteModal
              note={this.state.modalNote}
              handleCloseModal={(note) => this.handleCloseModal(note)}
              showModal={this.state.showModal}
            />
          )}

          <BottomNav
            setIsShowArchive={(value) => {
              this.setState({ isShowArchive: value });
            }}
            isShowArchive={this.state.isShowArchive}
            fadeAnimation={this.fadeAnimation}
          />
        </div>
        <div>
          {!this.state.isShowArchive && this.state.listOfArchives && (
            <Sidebar
              listOfArchives={this.state.listOfArchives}
              handleUnarchive={(id) => {
                this.handleUnarchive(id);
              }}
              deleteNote={(id) => {
                this.deleteNote(id);
              }}
              setIsShowArchive={(value) => {
                this.setState({ isShowArchive: value });
              }}
              fadeAnimation={this.fadeAnimation}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Board;
