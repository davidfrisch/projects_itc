import { Avatar, Button, Container, Grid, Modal, Paper, Typography, FormControl } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react'
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import Input from "../Helpers/Input";
import useStyles from './styles'
import { signIn, signUp, signInWithGoogle } from '../../actions/auth'
import { firebaseConfig } from '../../config/config'
const initialState = { firstName: '', lastName: '', email: '', phoneNumber: '', password: '', confirmPassword: '' };
const AuthForm = ({ openModal = false, setOpenModal }) => {

    const dispatch = useDispatch()
    const handleClose = () => setOpenModal(false);
    const [showPassword, setShowPassword] = useState(false)
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [errors, setNewErrors] = useState({})

    const classes = useStyles()

    //problem, redux state erase at refresh
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSigningUp) {
            dispatch(signUp(formData, setOpenModal, setNewErrors))
        } else {
            dispatch(signIn(formData, setOpenModal, setNewErrors))
        }
    }

    const handleChange = (e) => {
        setFormData((form) => ({ ...form, [e.target.name]: e.target.value }))
    }

    const handleShowPassword = () => { setShowPassword(prev => !prev) }

    const switchMode = () => { setIsSigningUp(prev => !prev); setShowPassword(false) }

    const googleSucess = async (res) => {
        dispatch(signInWithGoogle(res, setOpenModal))
    }

    const googleFailure = (err) => {
        console.log(err)
        setNewErrors((prevErrors) => ({ ...prevErrors, email: "Google sign in was unsucessful. Try again later" }))
    }

    return (
        <Modal
            open={openModal}
            onClose={handleClose}
            className={classes.modalStyle1}
        >
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography variant="h5"> {isSigningUp ? "Sign up" : "Sign In"} </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSigningUp && (
                                <>
                                    <Input setNewErrors={setNewErrors} errorMsg={errors.firstName} required={true} name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input setNewErrors={setNewErrors} errorMsg={errors.lastName} required={true} name="lastName" label="Last Name" handleChange={handleChange} autoFocus half />
                                </>
                            )}
                            <Input setNewErrors={setNewErrors} errorMsg={errors.email} required={true} name="email" label="Email Address" handleChange={handleChange} type="email" />
                            {isSigningUp && <Input setNewErrors={setNewErrors} errorMsg={errors.phoneNumber} required={true} name="phoneNumber" label="Phone Number" handleChange={handleChange} type="text" />}
                            <Input setNewErrors={setNewErrors} errorMsg={errors.password} required={true} name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSigningUp && <Input setNewErrors={setNewErrors} errorMsg={errors.confirmPassword} required={true} name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginBottom: 10, marginTop: 10 }}>
                            {isSigningUp ? "Sign up" : "Sign In"}
                        </Button>

                        <GoogleLogin
                            clientId={firebaseConfig.googleId}
                            render={(renderProps) =>
                            (<>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    starticon={<icon />}
                                >
                                    Google Sign In
                                </Button>

                            </>)}
                            onSuccess={googleSucess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />


                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>{isSigningUp ? "Already Have an account ?" : "Create an account ?"}</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </Modal>);
}

export default AuthForm;