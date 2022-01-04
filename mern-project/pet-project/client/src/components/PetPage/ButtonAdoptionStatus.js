import { Button } from '@mui/material'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { adoptPet, returnPet } from "../../actions/pet";


const ButtonAdoptionStatus = ({ currentUser, pet, owner, fostered }) => {

    const classes = useStyles()
    const dispatch = useDispatch()


    const handleAdopt = () => {
        dispatch(adoptPet(pet._id, 'adopt'))
    }

    const handleFoster = () => {
        dispatch(adoptPet(pet._id, 'foster'))
    }

    const handleReturnPet = () => {
        pet.adoptionStatus = 'available'
        dispatch(returnPet(pet._id))
    }



    return (

        <div className={classes.actions}>
            {owner || fostered ? (
                <>
                    {fostered && <Button onClick={handleAdopt}>Adopt</Button>}
                    <Button variant="contained" sx={{ marginLeft: 1 }} onClick={handleReturnPet}>Return</Button>
                </>
            ) : (
                pet.adoptionStatus === 'available' ? (<>
                    <Button variant="contained" onClick={handleFoster}>Foster</Button>
                    <Button variant="contained" sx={{ marginLeft: 1 }} onClick={handleAdopt}>Adopt</Button>
                </>) : (
                    <h1>Not available</h1>
                )
            )}
        </div>

    );
}

export default ButtonAdoptionStatus;