import { Button } from '@mui/material'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { deletePet, savePet } from '../../../actions/pet';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Favorite } from "@material-ui/icons";
import useStyles from "./styles";

const LikePetButton = ({ pet, currentUser }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [likePet, setLikePet] = useState(
        currentUser ? currentUser.listOfPetsSaved.includes(pet._id) : false
    );

    const handleFavoriteButton = (e) => {
        setLikePet((prev) => !prev);
        if (!likePet) {
            dispatch(savePet(pet._id));
        } else {
            dispatch(deletePet(pet._id));
        }
    };

    return (
        <Button
            disabled={!currentUser}
            variant="contained"
            onClick={handleFavoriteButton}
        >
            {likePet ? (
                <Favorite className={classes.likeIcon} />
            ) : (
                <FavoriteBorderIcon className={classes.likeIcon} />
            )}
        </Button>
    );
}

export default LikePetButton;