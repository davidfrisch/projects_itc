import { Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from 'react'
import { listsOfAdoptionStatus } from "../../constants/listsOfSearch";
import { useDispatch, useSelector } from "react-redux";
import { addPet, editPet, getPets } from "../../actions/pet";
import TypesSelect from '../Helpers/TypesSelect'
import useStyles from './styles'

const initialState = {
    type: [],
    idPokedex: 0,
    name: '',
    adoptionStatus: '',
    picture: undefined,
    height: 0,
    weight: 0,
    weaknesses: [],
    bio: '',
}

const PetForm = ({ pet, setOpenModal }) => {
    const isNewPet = pet ? false : true
    const [formData, setFormData] = useState(() => {
        return (pet ? pet : initialState) 
    })
    const dispatch = useDispatch()
    const { pets } = useSelector(state => state.pets)
    const [nextIdPokedexAvailable, setNextIdPokedexAvailable] = useState(null)
    const classes = useStyles()
    useEffect(() => {
        if (isNewPet) {
            dispatch(getPets())
            if (!pets || pets.length === 0) return
            const lastestIdPokedex = Number(pets.reduce((a, b) => { return (a.idPokedex > b.idPokedex) ? a : b }).idPokedex)
            setNextIdPokedexAvailable(lastestIdPokedex + 1)
        }

    }, [pets.length])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isNewPet) {
            dispatch(addPet(formData))
        } else {
            dispatch(editPet(formData))
        }
        setOpenModal(false)
    }

    const [previewSource, setPreviewSource] = useState('')

    const handleCapture = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () => {
            setFormData((form) => ({ ...form, 'picture': reader.result }))
            setPreviewSource(reader.result)
        }
    };

    return (
        <form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}>
            <div className={classes.inputForm}>
                <TextField
                    type="number"
                    name="idPokedex"
                    label="Pokedex Id"
                    helperText={`${nextIdPokedexAvailable && isNewPet ? 'suggestion:' + (nextIdPokedexAvailable) : ''}`}
                    value={formData.idPokedex}
                    disabled={!isNewPet}
                    onChange={(e) => setFormData({ ...formData, idPokedex: (e.target.value.replace(/^0+/, '')) })}
                    onBlur={(e) => setFormData({ ...formData, idPokedex: +formData.idPokedex })}
                    fullWidth
                    variant="filled"
                />
            </div>
            <div className={classes.inputForm}>
                <TypesSelect attribute="type" name="Type" formData={formData} setFormData={setFormData} />
            </div>
            <div className={classes.inputForm}>
                <TextField
                    label="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    fullWidth
                    variant="filled"
                />
            </div>
            <div className={classes.inputForm}>

                <TextField
                    select
                    label="Adoption Status"
                    value={formData.adoptionStatus}
                    variant="filled"
                    onChange={(e) => setFormData({ ...formData, adoptionStatus: e.target.value })}
                    fullWidth
                >
                    {
                        listsOfAdoptionStatus.map((status) => (<MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>))}
                </TextField>
            </div>
            <div className={classes.inputForm}>

                <TextField
                    name="weight"
                    label="Weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: (e.target.value.replace(/^00+/, '0')) })}
                    onBlur={(e) => setFormData({ ...formData, weight: +formData.weight })}
                    fullWidth
                    variant="filled"
                />
            </div>
            <div className={classes.inputForm}>

                <TextField
                    name="height"
                    label="Height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: (e.target.value.replace(/^00+/, '0')) })}
                    onBlur={(e) => setFormData({ ...formData, height: +formData.height })}
                    fullWidth
                    variant="filled"
                />
            </div>
            <div className={classes.inputForm}>

                <TypesSelect attribute="weaknesses" name="Weaknesses" formData={formData} setFormData={setFormData} />

            </div>
            <div className={classes.inputForm}>

                <TextField
                    name="bio"
                    label="Bio"
                    minRows={3}
                    type="text"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    fullWidth
                    variant="filled"
                />


            </div>
            <div className={classes.inputForm}>

                <input type="file" name="picture" onChange={handleCapture} />
                {previewSource && <img src={previewSource} alt="chosen" style={{ height: "300px" }} />}
            </div>

            <Button variant="contained" color="primary" type="submit"  >{isNewPet ? 'Create' : 'Save'} pet</Button>
        </form>);
}

export default PetForm;