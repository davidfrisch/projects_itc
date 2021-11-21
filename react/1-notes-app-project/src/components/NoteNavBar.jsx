import { Button } from "@material-ui/core";
import "../css/noteNavbar.css";
import logo from "../res/freshNotesLogo.png";

const NoteNavBar = ({ setIsShowArchive, isShowArchive, fadeAnimation }) => {

  const handleShowArchive = () => {
    fadeAnimation();
    setTimeout(() => {
      setIsShowArchive(!isShowArchive);
    }, 800);
  };

  return (
    <nav className="note-navbar">
      <div className="title-navbar">
        <h1>Fresh Notes</h1>
        <img className="logo-fresh-notes" src={logo} alt="" />
      </div>

      <div className="toggle-navbar">
        {isShowArchive && (
          <Button variant="contained" onClick={handleShowArchive}>
            <h1>My Notes</h1>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NoteNavBar;
