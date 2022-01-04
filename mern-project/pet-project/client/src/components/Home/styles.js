import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        fontSize: "3rem"
    },
    
    text: {
        color: '#fff',
        weight: "bolder",
        fontSize: "1.5rem"

    },
    paper: {
        padding: theme.spacing(2),
        backgroundColor: "#cc0000",
        textAlign: "center",
        width:"100%", 
    },

    welcome:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    }
}));