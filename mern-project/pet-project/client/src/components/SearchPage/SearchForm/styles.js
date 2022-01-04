
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    advanceToggle: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: theme.spacing(1)
    },
    title: {
        display: 'flex',
        justifyContent: 'center',

    },

    clearButton: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: theme.spacing(1)
    },
    submitButton: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: theme.spacing(1)
    },
    inputRow: {
        margin: theme.spacing(1, 0),
    },
    
    inputRowMinMax: {
        margin: theme.spacing(0, 0, 1, 0),
    },
}));