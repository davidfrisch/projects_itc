import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PetsList from "../PetsList/PetsList";

const MyPetsAdoptedFostered = () => {
    const { userPets } = useSelector(state => state.pets)
    const [listOfPetsAdoptedAndFostered, setListOfPetsAdoptedAndFostered] = useState(null)


    useEffect(() => {
        if (!userPets) return
        const { listOfPetsAdopted, listOfPetsFostered } = userPets
        setListOfPetsAdoptedAndFostered([...listOfPetsAdopted, ...listOfPetsFostered])
    }, [userPets?.listOfPetsAdopted, userPets?.listOfPetsFostered])

    return (<div>
        {listOfPetsAdoptedAndFostered?.length === 0 && <h1>No Pets at Home</h1>}
        {listOfPetsAdoptedAndFostered?.length > 0 && <PetsList pets={listOfPetsAdoptedAndFostered} />}
    </div>);
}

export default MyPetsAdoptedFostered;