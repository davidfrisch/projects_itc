import { Input, Paper, TextareaAutosize } from "@material-ui/core";
import React from "react";
import "../css/noteInput.css";
import { Button } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";

class FormInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      title: "",
    };

    this.searchInput = React.createRef();
  }

  setContentTextInNote(event) {
    this.setState({ text: event.target.value });
  }

  setTitleTextInNote(event) {
    this.setState({ title: event.target.value });
  }

  
  addNote() {
    const note = {
      title: this.state.title,
      text: this.state.text,
    };
    this.props.addNoteToList(note);
    this.setState({ text: "", title: "" });
  }

  render() {
    return (
      <div className="note-input-container">
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
            startIcon={<AddIcon />}
            onClick={() => {
              this.addNote();
            }}
          ></Button>
        </Paper>
      </div>
    );
  }
}

export default FormInput;
