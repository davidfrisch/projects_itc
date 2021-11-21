import { Button } from "@material-ui/core";
import ArchiveIcon from "@mui/icons-material/Archive";
import ColorPaletteButton from "./ColorPaletteButton";
import ReminderButton from "./ReminderButton";

const NoteOptions = (props) => {
  return (
    <div className="note-options">
      <Button
        startIcon={<ArchiveIcon />}
        onClick={() => props.archiveNoteFromList(props.id)}
      ></Button>
      <ColorPaletteButton setBackgroundColor={props.setBackgroundColor} />
      <ReminderButton
        setReminder={props.setReminder}
        reminder={props.reminder}
        setReminderInDB={props.setReminderInDB}
      />
    </div>
  );
};

export default NoteOptions;
