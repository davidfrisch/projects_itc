import {  Grid } from "@mui/material";
import PetCard from "./PetCard/PetCard";

const PetsList = ({ pets }) => {
 
    return (
        pets.length && 
        <Grid container>
            {pets.map((pet) => (
                <Grid key={pet._id} item xs={12} md={4} sm={6} style={{display: 'flex', justifyContent: 'center', marginBottom:20}}>
                    <PetCard pet={pet} />
                </Grid>
            ))}
        </Grid>
    );
}

export default PetsList;