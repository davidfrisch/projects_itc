import { Container} from '@mui/material'
import CardButton from './CardButton';
import myPetsImage from '../../../images/home/myPet.png'
import myProfileImage from '../../../images/home/pokemontrainer.png'
import searchPokemonImage from '../../../images/home/safari.jpg'


const CardsButtons = () => {
    return (
        <Container sx={{display:"flex", flexWrap: "wrap", justifyContent: "center"}}>
            <CardButton image={myPetsImage} title="My Pets" to="/user/mypets">
                Click to view all your adopted, fostered and favorite pets.
            </CardButton>
            <CardButton image={myProfileImage} title="My Profile" to="/user/profile">
                Click to view your profile and more.
            </CardButton>
            <CardButton image={searchPokemonImage} title="Search a Pokemon" to="/search">
                Click to search a pokemon.
            </CardButton>
        </Container>
    );
}

export default CardsButtons;