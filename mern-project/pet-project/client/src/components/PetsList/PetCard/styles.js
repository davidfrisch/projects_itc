import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: "space-between",
        borderRadius: '15px',
        position: 'relative',
        textAlign: 'center',
        width: 300,
    },
    media: {
        height: 250,
        padding: theme.spacing(2),
        marginTop: '100',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    icon: {
        height: 50,
        width: 50,
    },
    petOptions: {
        display: "flex",
        justifyContent: "space-between",
    },
    petInfos: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 10,
    },

    petInfo: {
        padding: 10,
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        JustifyContent: "space-between",
        textAlign: "center",
    },

    typeIcon: {
        color:'#fff',
        padding: theme.spacing(.3,2),
        borderRadius: 50,
        margin: theme.spacing(.4,0),
        fontWeight:'500',
        letterSpacing: 2,

    },

    likeIcon: {
        color: "red",
    },

}));