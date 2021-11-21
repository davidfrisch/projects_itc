import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import NoteIcon from "@mui/icons-material/Note";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";

export default function BottomNav({
  setIsShowArchive,
  isShowArchive,
  fadeAnimation,
}) {
  const changePage = (val) => {
    const archive = val === 1;
    fadeAnimation();
    setTimeout(() => {
      setIsShowArchive(archive);
    }, 800);
  };

  const ref = React.useRef(null);

  return (
    <Box className="bottom-nav" sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={isShowArchive ? 1 : 0}
          onChange={(_, newValue) => {
            changePage(newValue);
          }}
        >
          <BottomNavigationAction label="My Notes" icon={<NoteIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
