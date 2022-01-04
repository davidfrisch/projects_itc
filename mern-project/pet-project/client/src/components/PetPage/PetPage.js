import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getPet } from "../../actions/pet";
import { Button, Container, IconButton, Modal, Paper } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import PetDetails from "./PetDetails/PetDetails";
import useStyles from "./styles";
import PetForm from "../PetForm/PetForm";
import { ROLE } from "../../constants/roles"
import ButtonAdoptionStatus from "./ButtonAdoptionStatus";
import { colorType } from "../../constants/colorTypesPokemon";
import PetEvolutions from "./PetEvolutions";
import PetsSuggestion from "./PetsSuggestion";
import LikePetButton from "../PetsList/PetCard/LikePetButton";

const PetPage = () => {
    const classes = useStyles();
    const { currentUser } = useSelector(state => state.users)
    const { pet, isLoadingPet } = useSelector(state => state.pets)
    const { idPokedex } = useParams()

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const dispatch = useDispatch()
    const navigate = useNavigate()




    const [owner, setOwner] = useState(false)
    const [fostered, setFostered] = useState(false)


    useEffect(() => {
        dispatch(getPet(idPokedex))
    }, [owner, fostered, idPokedex, pet?._id])

    useEffect(() => {
        if (!currentUser || !pet?._id) return
        const { listOfPetsAdopted, listOfPetsFostered } = currentUser
        if (!listOfPetsAdopted || !listOfPetsFostered) return

        setOwner(listOfPetsAdopted.includes(pet._id))
        setFostered(listOfPetsFostered.includes(pet._id))
    }, [currentUser, pet?._id, pet?.adoptionStatus])

    const handleClose = () => setOpenModal(false);
    const navigateNext = () => { navigate(`/pet/${pet.idPokedex + 1}`) }
    const navigateBefore = () => { navigate(`/pet/${pet.idPokedex - 1}`) }

    return (
        <>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={classes.modalStyle1}
            >
                <Paper className={classes.paperModal}>
                    <PetForm pet={pet} setOpenModal={setOpenModal} />
                </Paper>
            </Modal>
            <Container>
                {!isLoadingPet && !pet && <h1> Pet not found !</h1>}
                {(!isLoadingPet && pet) &&
                    <Paper elevation={6} className={classes.paper} style={{ backgroundColor: `${colorType[pet.type[0]]}22` }}>

                        <div className={classes.topPage}>

                            {currentUser ? <div className={classes.topLeftPage}>
                                <LikePetButton pet={pet} currentUser={currentUser} />
                                {currentUser?.role === ROLE.ADMIN ? <Button sx={{ height: 50, marginTop: 2 }} variant="contained" onClick={handleOpenModal}>Edit Pet</Button> : <div></div>}
                            </div> : <div></div>}

                            {pet && <PetEvolutions pet={pet} />}

                            <div>
                                {pet.idPokedex > 1 && <IconButton aria-label="before" onClick={navigateBefore}>
                                    <NavigateBeforeIcon />
                                </IconButton>}
                                {pet.idPokedex < 151 && <IconButton aria-label="next" onClick={navigateNext}>
                                    <NavigateNextIcon />
                                </IconButton>}
                            </div>
                        </div>


                        <PetDetails pet={pet} />
                        {currentUser && <ButtonAdoptionStatus currentUser={currentUser} pet={pet} owner={owner} fostered={fostered} />}
                        <PetsSuggestion pet={pet} />
                    </Paper>}
            </Container>
        </>
    );
}

export default PetPage;