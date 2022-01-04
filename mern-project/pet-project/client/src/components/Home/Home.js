import { Container, Paper } from '@material-ui/core';
import useStyles from './styles'
import { useSelector } from 'react-redux';
import CardsButtons from './CardsButtons/CardsButtons';
import pokeballImage from '../../images/pokeball.png'
const Home = () => {
    const styles = useStyles()
    const { currentUser } = useSelector(state => state.users)

    return (
        <Container className={styles.container}>
            {currentUser ? (<h1>Hello Trainer {currentUser.firstName}</h1>
            ) : (
                <div className={styles.welcome}>
                    <h1 className={styles.title}>PokeHouse</h1>
                    <img src={pokeballImage} height={300} alt='logo' />
                </div>
            )}
            {currentUser && <CardsButtons />}
            <Paper className={styles.paper}>
                <p className={styles.text}>
                    Hello Welcome to PokeHouse ! <br />
                    Here you can adopt or foster pokemon.<br />
                    Hope you will have fun adopting Pokemon.
                </p>
            </Paper>
        </Container>);
}

export default Home;