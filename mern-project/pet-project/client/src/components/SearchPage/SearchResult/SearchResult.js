import PetsList from '../../PetsList/PetsList'
import useStyles from './styles'
const SearchResult = ({ searchResult, isLoading }) => {
    const classes = useStyles()
    return (
        <div className={classes.listResult}>
            {isLoading && <h1>Loading</h1>}
            {!isLoading &&
                searchResult?.length > 0 &&
                <PetsList pets={searchResult}/>}

            {!isLoading &&
                searchResult?.length === 0 &&
                <div>No Pet matches your request</div>}
        </div>
    )
}

export default SearchResult;