import { Typography, Card, CardActionArea, Paper } from "@mui/material";
import useStyles from "./styles";
import pokeballImage from "../../images/pokeball.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPetsWithForm } from "../../actions/pet";


function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

const PetsSuggestion = ({ pet }) => {
    const classes = useStyles()
    const { petsQuery } = useSelector(state => state.pets)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPetsWithForm(`type=${pet.type[0]}`))
    }, [pet._id]);


    return (
        <div className={classes.suggestionPetsContainer}>
            <Typography variant="h3">You might also like:</Typography>

            <div className={classes.suggestionPetsResult}>
                {petsQuery.length > 0 && getRandom(petsQuery.filter((petR) => pet._id !== petR._id), Math.min(petsQuery.length - 1, 10)).map((petSuggestion) => (
                    <Card key={petSuggestion._id} className={classes.petSuggestionCard}>
                        <CardActionArea
                            component={Link}
                            to={`/pet/${petSuggestion.idPokedex}`}
                        >
                            <Paper
                                elevation={6} sx={{display:'flex', flexDirection:'column'}}>
                                <Typography variant="body">{petSuggestion.name}</Typography>
                                <img
                                    src={petSuggestion.picture || pokeballImage}
                                    alt={petSuggestion.name}
                                    height={80}
                                    width={80}
                                />
                            </Paper>
                        </CardActionArea>
                    </Card>
                ))}
            </div>
        </div>);
}

export default PetsSuggestion;