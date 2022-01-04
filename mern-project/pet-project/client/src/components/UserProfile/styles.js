import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
   form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },

   picture: {
      height: "170px",
      borderRadius: "400px",
   },

   iconEdit: {
      position: 'absolute',
      marginTop: 120,
      marginLeft: 130,
      borderRadius: 30,
      padding: theme.spacing(.5),
      backgroundColor: '#3B4CC4',
      color: '#fff',

   },

   inputForm: {
      width: "90%",
      marginBottom: 10,
      marginTop: 10,
   },

   fullNameEdit: {
      display: 'flex',
   },

   submitBtn: {
      display: 'flex',
      justifyContent: 'center',
   },

   // User Profile info

   profileContainer: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
   },

   topProfile: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap-reverse',
   },
   fullName: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: 100,
   },
 
   biography:{
      borderTop:"5px solid #000",
      marginTop: 20,
      display: "flex",
      flexDirection: 'column',
      fontSize: '1.5rem',
      width: '100%',
   },
}));