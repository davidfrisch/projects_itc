import { Box, Container, Tab, Typography } from "@mui/material";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getPetsByUserId } from "../../actions/pet";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import MyPetsSaved from "./MyPetsSaved";
import MyPetsAdoptedFostered from "./MyPetsAdoptedFostered";


const MyPetsPage = () => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.users) 
    const [value, setValue] = useState(() => (localStorage.getItem('windowMyPets') ? localStorage.getItem('windowMyPets') : "1"));

    const handleChange = (event, newValue) => {
        setValue(newValue);
        localStorage.setItem('windowMyPets', newValue)
    };


    useEffect(() => {
        if (!currentUser?._id) return
        dispatch(getPetsByUserId(currentUser._id))
    }, [currentUser?._id, currentUser?.listOfPetsAdopted, currentUser?.listOfPetsSaved, currentUser?.listOfPetsFostered])

    return (
        <Container>
            {currentUser?.listOfPetsAdopted &&
                <>
                    <Typography variant="h1">My Pets</Typography>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="My Pets" value="1" />
                                <Tab label="My Saved Pets" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <MyPetsAdoptedFostered />
                        </TabPanel>
                        <TabPanel value="2">
                            <MyPetsSaved />
                        </TabPanel>
                    </TabContext>
                </>
            }
        </Container>
    )
}

export default MyPetsPage;