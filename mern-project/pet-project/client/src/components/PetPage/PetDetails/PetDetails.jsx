import { Typography} from "@mui/material";
import useStyles from "../styles";
import pokeballImage from "../../../images/pokeball.png";
import TextAttribute from "../../Helpers/TextAttribute";
import { colorType } from "../../../constants/colorTypesPokemon";

const PetDetails = ({ pet }) => {
  const classes = useStyles();

  const typeIcons = (pet, key) => {
    return (
      <div className={classes.iconContainer}>
        {pet[key].map((type) => (
          <div
            key={pet.name + type}
            className={classes.typeIcon}
            style={{ backgroundColor: colorType[type], border:'1px solid' }}
          >
            {type}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className={classes.containerPetDetails}>
        <div className={classes.picture}>
          <img
            src={pet?.picture ? pet.picture : pokeballImage}
            alt="pet"
            width={300}
            height={300}
          />
        </div>
        <div className={classes.description}>
          <Typography variant="h3">{pet.name}</Typography>
          <div
            className={classes.divider}
            style={{ backgroundColor: colorType[pet.type[0]] }}
          />
          <TextAttribute attribute={"Type"} value={typeIcons(pet, "type")} />
          <TextAttribute
            attribute={"AdoptionStatus"}
            value={pet["adoptionStatus"]}
          />
          <TextAttribute attribute={"Height"} value={pet["height"] + "m"} />
          <TextAttribute attribute={"Weight"} value={pet["weight"] + "kg"} />
          <TextAttribute
            attribute={"Weaknesses"}
            value={typeIcons(pet, "weaknesses")}
          />
        </div>
      </div>
      <div className={classes.bio}>
        <Typography variant="h3">Description:</Typography>
        <Typography variant="body">
          {pet.bio
            ? pet.bio
            : `${pet.name} is a lovely ${pet.type}. \n ${
                pet.type === "dog" ? "He" : "She"
              } weights ${pet.weight} kg and is ${
                pet.height
              }m.  \n This pokemon ${
                pet.adoptionStatus === "available"
                  ? "wish to have a new home"
                  : `is being ${pet.adoptionStatus}`
              }.`}
        </Typography>
      </div>
    </>
  );
};

export default PetDetails;
