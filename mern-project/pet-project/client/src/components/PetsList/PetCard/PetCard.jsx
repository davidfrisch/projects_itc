import { Button, Card, Typography, CardContent } from "@mui/material";
import useStyles from "./styles";
import pokeballImage from "../../../images/pokeball.png";
import pokedexIcon from "../../../images/pokedex.png";

import { Info } from "@material-ui/icons";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { colorType } from "../../../constants/colorTypesPokemon";
import LikePetButton from "./LikePetButton";

const PetCard = ({ pet }) => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.users);

  const navigate = useNavigate();

  const goToInfo = () => {
    navigate(`/pet/${pet.idPokedex}`);
  };

  return (
    <Card elevation={5} className={classes.card}>
      <img
        src={pet.picture ? pet.picture : pokeballImage}
        alt="pokemon"
        className={classes.media}
        style={{ backgroundColor: `${colorType[pet.type[0]]}bb` }}
      />
      <div className={classes.petOptions}>
        {currentUser ? (
          <LikePetButton pet={pet} currentUser={currentUser} />
        ) : (
          <div></div>
        )}
        <Button variant="contained" onClick={goToInfo}>
          <Info />
        </Button>
      </div>
      <CardContent>
        <Typography variant="h4">{pet.name}</Typography>
        <Typography variant="body">
          {pet.bio
            ? pet.bio
            : `${pet.name} is a lovely pokemon. \n 
               He weights ${pet.weight} kg and is ${pet.height}cm.  \n This ${
                pet.type
              } pokemon and ${
                pet.adoptionStatus === "available"
                  ? "wish to have a new home"
                  : `is being ${pet.adoptionStatus}`
              }.`}
        </Typography>
        <div className={classes.petInfos}>
          <div className={classes.petInfo}>
            <i className="fas fa-2x fa-home"></i>
            <Typography variant="body">Status</Typography>
            <Typography variant="body">{pet.adoptionStatus}</Typography>
          </div>
          <div className={classes.petInfo}>
            <img className={classes.icon} src={pokedexIcon} alt="pokedex-num" />
            <Typography variant="body">{pet.idPokedex}</Typography>
          </div>
          <div className={classes.petInfo}>
            {pet.type.map((type) => (
              <div
                key={pet.name + type}
                className={classes.typeIcon}
                style={{ backgroundColor: colorType[type] }}
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PetCard;
