import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    attributeContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 5,
        textAlign: "start",
        marginLeft: 20,
    },
    attribute: {
        width: 300,
        fontSize: '1.5rem',
        margin: theme.spacing(0, 1),
        textAlign: 'start',
    },
}));