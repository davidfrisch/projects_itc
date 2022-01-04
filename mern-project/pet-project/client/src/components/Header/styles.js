import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
        backgroundColor: '#f8f8f8',
        margin: '0 0 30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        display: "flex",
        alignItems: "center",
        height: "100%",
    },
    linkXs: {
        textDecoration: 'none',
        color: "#1976D2",
        bold:"bold"
    },
    linkMd: {
        textDecoration: 'none',
        color: "#fff"
    },
    imageRight: {
        marginLeft: '15px',
        "&:hover": {
            transform: "rotate(65deg)"
        },
    },
    imageLeft: {
        marginLeft: '15px',
        "&:hover": {
            transform: "rotate(-65deg)"
        },
    },
    toolbar: {
        display: "flex",
        justifyContent: "flex-end",
        height: "100%",
    },

    settings: {
        display: 'flex',
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
    },
 
    authButton: {
        backgroundColor: '#fff'
    }

}));