import { Typography, Card, CardActionArea, Paper } from "@mui/material";
import useStyles from "./styles";
import pokeballImage from "../../images/pokeball.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPet } from "../../api";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PetEvolutions = ({ pet }) => {
    const classes = useStyles()
    const [allEvolutions, setAllEvolutions] = useState([]);
    const [isCancelled, setIsCancelled] = useState(false);

    useEffect(() => {
        if (isCancelled) return

        setAllEvolutions([])

        return () => setIsCancelled(true)
    }, [])

    useEffect(() => {
        const tempAllEvolutions = [];
        if (!pet?.next_evolution || !pet?.prev_evolution || isCancelled) return

        (async () => {
            try {
                for (const prevEvolution of pet.prev_evolution) {
                    const { data } = await getPet(prevEvolution.idPokedex);
                    tempAllEvolutions.push(data);
                }

                tempAllEvolutions.push(pet);

                for (const nextEvolution of pet.next_evolution) {
                    const { data } = await getPet(nextEvolution.idPokedex);
                    tempAllEvolutions.push(data);
                }

                setAllEvolutions(tempAllEvolutions);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [pet?.prevEvolution, pet?.nextEvolution]);

    return (
        <div className={classes.evolutions}>
            {allEvolutions.map((petEvolution) => (
                <div
                    key={petEvolution._id}
                    className={classes.petEvolutionContainer}
                >
                    <Card>
                        <CardActionArea
                            component={Link}
                            to={`/pet/${petEvolution.idPokedex}`}
                        >
                            <Paper
                                className={classes.petEvolutionCard}
                                elevation={6}
                                style={
                                    petEvolution.idPokedex === pet.idPokedex
                                        ? { backgroundColor: "#BDCAD6" }
                                        : {}
                                }
                            >
                                <Typography variant="body">{petEvolution.name}</Typography>
                                <img
                                    src={petEvolution.picture || pokeballImage}
                                    alt="evolution"
                                    height={50}
                                    width={50}
                                />
                            </Paper>
                        </CardActionArea>
                    </Card>
                    {petEvolution.next_evolution.length > 0 ? (
                        <ArrowForwardIcon />
                    ) : (
                        <div style={{ width: "24px" }}></div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PetEvolutions;