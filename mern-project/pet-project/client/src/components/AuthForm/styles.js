
import { createTheme } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => {
  const theme = createTheme()
  return {


    modalStyle1: {
      position: 'absolute',
      top: '10%',
      left: '10%',
      overflow: 'scroll',
      height: '100%',
      display: 'block'
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
    },
    avatar: {
      margin: theme.spacing(1),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
      
    },
    submit: {
      margin: theme.spacing(3, 0, 4),
      border: "10px solid red"
    },
    googleButton: {
      marginBottom: theme.spacing(3,0,4),
    },
  }
});