import React from "react";
import ReactModal from "react-modal";
import { Input, Paper, TextareaAutosize, Button } from "@material-ui/core";
import "../css/noteModal.css";
import CheckIcon from "@mui/icons-material/Check";
class NoteModal extends React.Component {
  constructor(props) {
    super(props);
    const { id, date, title, text } = props.note;
    this.state = {
      id,
      date,
      title,
      text,
    };

    this.customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };
  }

  setContentTextInNote(event) {
    this.setState({ text: event.target.value });
  }

  setTitleTextInNote(event) {
    this.setState({ title: event.target.value });
  }

  saveNote() {
    const note = {
      id: this.state.id,
      date: this.state.date,
      title: this.state.title,
      text: this.state.text,
    };

    this.props.handleCloseModal(note);
  }

  setModal() {
    const { id, date, title, text } = this.props.note;
    this.setState({
      id,
      date,
      title,
      text,
    });
  }

  render() {

    //update the modal component to the current note
    if (this.props.note.id !== this.state.id) {
      this.setModal();
    }

    return (
      <div className="note-modal-body">
        <ReactModal
          shouldCloseOnOverlayClick={true}
          onRequestClose={() => {
            this.saveNote();
          }}
          isOpen={this.props.showModal}
          contentLabel="Modal Note"
          style={this.customStyles}
        >
          <Paper>
            <div className="note-header">
              <Input
                placeholder="Title"
                value={this.state.title}
                onChange={(title) => this.setTitleTextInNote(title)}
              ></Input>
            </div>
            <div
              className="note-content"
              onClick={() => {
                this.myInp.focus();
              }}
            >
              <TextareaAutosize
                id="input-text"
                maxRows={6}
                placeholder="Remind me that..."
                ref={(ip) => (this.myInp = ip)}
                value={this.state.text}
                onChange={(e) => this.setContentTextInNote(e)}
                style={{
                  width: 200,
                  border: "none",
                  resize: "none",
                  outlineStyle: "none",
                  boxShadow: "none",
                  borderColor: "transparent",
                }}
              />
            </div>
            <Button
              style={{ width: 220 }}
              startIcon={<CheckIcon />}
              onClick={() => {
                this.saveNote();
              }}
            ></Button>
          </Paper>
        </ReactModal>
      </div>
    );
  }
}

export default NoteModal;
