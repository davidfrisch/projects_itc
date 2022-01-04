import { Container, Typography, Divider } from '@mui/material'
import TextAttribute from "../../Helpers/TextAttribute";
import personImage from '../../../images/profile.png'
import useStyles from '../styles.js'


const ProfileInfo = ({ user }) => {
    const classes = useStyles()
    return (
        <Container>
            {user &&
                <>

                    <div className={classes.profileContainer}>
                        <div className={classes.topProfile}>
                            <div className={classes.fullName}>
                                <Typography variant="body" fontSize="5rem">{user.firstName}</Typography>
                                <Typography variant="body" fontSize="5rem">{user.lastName}</Typography>
                            </div>
                            <div>
                                <img src={user?.picture ? user.picture : personImage} alt="chosen" className={classes.picture} />
                            </div>
                        </div>

                        <TextAttribute attribute="Email" value={user?.email} />
                        <TextAttribute attribute="Phone Number" value={user?.phoneNumber} />
                        <TextAttribute attribute="Number of pets adopted" value={user?.listOfPetsAdopted.length} />
                        <TextAttribute attribute="Number of pets fostered" value={user?.listOfPetsFostered.length} />
                        <TextAttribute attribute="Number of pets saved" value={user?.listOfPetsSaved.length} />
                        <Divider />
                        <div className={classes.biography}>
                            <Typography variant="body" >About You:</Typography>
                            <Typography variant="body" >{user?.bio ? user?.bio : "Set a bio in settings!"}</Typography>
                        </div>
                    </div>

                </>}
        </Container>);
}

export default ProfileInfo;