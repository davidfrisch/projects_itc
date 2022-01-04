import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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

    tabsContainer: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },

    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        
    },

    petsAdminContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: 700,
    },

    todaySummary:{
        fontSize:'1.3rem'
    },
}));