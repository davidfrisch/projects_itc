import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        justifyContent: "space-around",
        padding: 20,
    },

    containerPetDetails: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
    },

    picture: {
        padding: 10,
        width: 300,

    },

    divider: {
        height: "5px",
        margin: theme.spacing(1, 0, 2, 0),
        width: "50%",
    },


    description: {
        flex: "1",
        padding: 10,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },


    bio: {
        marginTop: 10,
    },

    actions: {
        display: "flex",
        justifyContent: "flex-end",
    },


    modalStyle1: {
        position: 'absolute',
        top: '10%',
        left: '20%',
        overflow: 'scroll',
        width: "100",
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    paperModal: {
        width: "50%",
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },

    topPage: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    topLeftPage: {
        display: 'flex',
        flexDirection: 'column',
    },

    evolutions: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },

    petEvolutionContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },

    petEvolutionCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(1)
    },

    iconContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
    },

    typeIcon: {
        color: '#fff',
        fontSize: '1rem',
        padding: theme.spacing(0, 2),
        borderRadius: 50,
        margin: theme.spacing(.4, .5),
        fontWeight: '500',
        letterSpacing: 1,

    },

    suggestionPetsContainer: {
        marginTop: 40,
    },

    suggestionPetsResult: {
        display: 'flex',
        flexWrap: 'wrap',
    },

    petSuggestionCard: {
        marginRight: 10,
        marginTop: 10,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
}));