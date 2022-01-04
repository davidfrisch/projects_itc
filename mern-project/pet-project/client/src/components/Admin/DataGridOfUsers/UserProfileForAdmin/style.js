import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    paperProfile: {
        marginTop: 20,
        padding: theme.spacing(2),
    },

    headerProfilInfo: {
        width: "100%",
        justifyContent: "flex-end",
        display: "flex",
        marginBottom: 20,
    },

    containerInfoProfile: {
        display: "flex",
    },

    formRole: {
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        justifyContent: "end",
    }
}));