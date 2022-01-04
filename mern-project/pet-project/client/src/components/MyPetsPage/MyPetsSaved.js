import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PetsList from "../PetsList/PetsList";

const MyPetsSaved = () => {
    const { userPets } = useSelector(state => state.pets)
    const [listOfPetsSaved, setListOfPetsSaved] = useState(null)


    useEffect(() => {
        if (!userPets) return
        const { listOfPetsSaved } = userPets
        setListOfPetsSaved(listOfPetsSaved)
    }, [userPets?.listOfPetsSaved])

    return (
        <div>
            {listOfPetsSaved?.length === 0 && <h1>No Pets Save</h1>}
            {listOfPetsSaved?.length > 0 && <PetsList pets={listOfPetsSaved} />}
        </div>
    );
}

export default MyPetsSaved;