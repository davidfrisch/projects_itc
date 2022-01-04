import { Container, TextField, Typography, Button, Paper, Card } from '@mui/material';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { updateCurrentUserById } from '../../../actions/user';
import Input from '../../Helpers/Input';
import EditIcon from '@mui/icons-material/Edit';
import useStyles from '../styles.js'
import personImage from '../../../images/profile.png'

const initialState = { firstName: '', lastName: '', email: '', phoneNumber: '', password: '', confirmPassword: '', bio: '', picture: undefined };

const ProfileSettings = ({ user }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [previewSource, setPreviewSource] = useState(user.picture)
    const [formData, setFormData] = useState(initialState)
    const handleShowPassword = () => { setShowPassword(prev => !prev) }
    const [isSearchFormEmpty, setIsSearchFormEmpty] = useState(true)
    const [error, setNewErrors] = useState({})

    //problem, redux state erase at refresh
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateCurrentUserById(user._id, formData))
    }

    useEffect(() => {
        for (const key of Object.keys(formData)) {
            if (formData[key] !== '') {
                setIsSearchFormEmpty(false)
                return
            }
        }
        setIsSearchFormEmpty(true)
    }, [formData])

    const handleChange = (e) => {
        setFormData((form) => ({ ...form, [e.target.name]: e.target.value }))
    }


    const handleCapture = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () => {
            setFormData((form) => ({ ...form, 'picture': reader.result }))
            setPreviewSource(reader.result)
        }
    };




    return (
        <Container>
            <Paper>
                <form className={classes.form}>

                    <Card
                        variant="contained"
                        component="label"
                    >
                        <EditIcon className={classes.iconEdit} fontSize="medium" />
                        <img src={previewSource ? previewSource : personImage} alt="chosen" className={classes.picture} />
                        <input type="file" name="picture" onChange={handleCapture} hidden />

                    </Card>
                    <div className={`${classes.inputForm} ${classes.fullNameEdit}`}>
                        <Input setNewErrors={setNewErrors} placeholder={user.firstName} type="text" name="firstName" label="First Name" handleChange={handleChange} />
                        <Input setNewErrors={setNewErrors} placeholder={user.lastName} type="text" name="lastName" label="Last Name" handleChange={handleChange} />
                    </div>

                    <div className={classes.inputForm}>
                        <Input setNewErrors={setNewErrors} placeholder={user.email} type="email" name="email" label="New Email" handleChange={handleChange} />
                    </div>
                    <div className={classes.inputForm}>
                        <Input setNewErrors={setNewErrors} placeholder={user.phoneNumber ? user.phoneNumber : 'New phone number'} name="phoneNumber" label="Phone Number" handleChange={handleChange} />
                    </div>

                    <div className={classes.inputForm}>
                        <Typography style={{ marginBottom: 10 }} variant="h5">Biography:</Typography>
                        <TextField maxRows={6} multiline name="bio" label="Describe yourself" onChange={handleChange} fullWidth />
                    </div>

                    <div className={classes.inputForm}>
                        <Typography style={{ marginBottom: 10 }} variant="h5">Modify Password:</Typography>
                        <Input setNewErrors={setNewErrors} name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        <Input setNewErrors={setNewErrors} name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />
                    </div>

                    <div className={`${classes.submitBtn} ${classes.inputForm}`}>
                        <Button onClick={handleSubmit} variant="contained" disabled={isSearchFormEmpty}
                        > Save </Button>
                    </div>
                </form>
            </Paper>
        </Container>);
}

export default ProfileSettings;