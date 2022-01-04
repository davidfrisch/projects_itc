
import { Container, Typography, Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfileSettings from './ProfileSettings/ProfileSettings'
import { useSelector } from 'react-redux'

const UserProfile = () => {

    const [value, setValue] = useState('1');
    const { currentUser } = useSelector(state => state.users)


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Container>
            <Typography variant="h1">Profile</Typography>
            {currentUser && <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Profile" value="1" />
                        <Tab label="Settings" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <ProfileInfo user={currentUser} />
                </TabPanel>
                <TabPanel value="2">
                    <ProfileSettings user={currentUser} />
                </TabPanel>
            </TabContext>}
        </Container>
    );
}

export default UserProfile;