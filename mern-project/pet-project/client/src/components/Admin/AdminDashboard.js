import { Container, Modal, Paper, Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import PetForm from "../PetForm/PetForm";
import useStyles from './styles'
import { useState } from 'react'
import DataGridOfUsers from "./DataGridOfUsers/DataGridOfUsers";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from '../../actions/user';
import { useEffect } from 'react'
import DataGridOfUser from "./DataGridOfUsers/UserProfileForAdmin/DataGridOfUser";
import DataGridOfPets from "./DataGridOfPets/DataGridOfPets";
import StatisticsPage from "./StatisticsPage/StatisticsPage";

const AdminDashboard = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false);
    const [value, setValue] = useState(0)

    const handleOpenModal = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const { users, user } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getUsers())
    }, [users?.length, user])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                style={{ width: '100%' }}
                {...other}
            >
                {value === index && (
                    <Container>
                        {children}
                    </Container>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    return (
        <>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={classes.modalStyle1}
            >
                <Paper className={classes.paperModal}><PetForm pet={null} setOpenModal={setOpenModal} /></Paper>
            </Modal>
            <h1>Admin Dashboard</h1>

            <div className={classes.tabsContainer}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="All Pets" {...a11yProps(0)} />
                    {users && <Tab label="All Users" {...a11yProps(1)} />}
                    <Tab label="Statistics" {...a11yProps(2)} />

                </Tabs>
                <TabPanel value={value} index={0}>
                    <DataGridOfPets handleOpenModal={handleOpenModal} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {users && <DataGridOfUsers users={users} />}
                    {user && <DataGridOfUser user={user} />}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <StatisticsPage />
                </TabPanel>

            </div>
        </>);
}

export default AdminDashboard;