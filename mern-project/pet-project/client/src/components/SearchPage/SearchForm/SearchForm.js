import { Paper, Typography, Switch, MenuItem, TextField, Button } from '@mui/material'
import { listsOfAdoptionStatus } from '../../../constants/listsOfSearch'
import { useState, useEffect } from 'react'
import MinMaxInput from './MinMaxInput'
import { useDispatch } from 'react-redux'
import { getPetsWithForm } from '../../../actions/pet'
import { useNavigate, useLocation } from "react-router-dom"
import TypesSelect from '../../Helpers/TypesSelect'
import useStyles from './styles'
const initialState = { type: [], adoptionStatus: '', minHeight: '', maxHeight: '', minWeight: '', maxWeight: '', name: '' }
const SearchForm = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const classes = useStyles()

    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
    const [isSearchFormEmpty, setIsSearchFormEmpty] = useState(true)
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    const [searchForm, setSearchForm] = useState(initialState)

    const clearForm = () => {
        setSearchForm(initialState)
    }

    useEffect(() => {
        const queryFromURL = Object.fromEntries(new URLSearchParams(location.search));
        if (queryFromURL.type) queryFromURL.type = queryFromURL.type.split(',')
        setSearchForm({ ...searchForm, ...queryFromURL })
    }, [])

    useEffect(() => {

        const queryString = Object.keys(searchForm).filter((key) => searchForm[key] !== '' && searchForm[key]?.length > 0).map(key => key + '=' + searchForm[key]).join('&');

        setQuery(queryString)
        navigate({ search: queryString })

        for (const key of Object.keys(searchForm)) {
            //advance case
            //simple case
            if (key === 'type') {
                if (searchForm[key].length > 0) {
                    setIsSearchFormEmpty(false)
                    return
                }
            }
            else if (isAdvancedSearch && searchForm[key] !== '') {
                setIsSearchFormEmpty(false)
                return
            }

        }
        setIsSearchFormEmpty(true)
    }, [isAdvancedSearch, navigate, searchForm])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isAdvancedSearch) {
            dispatch(getPetsWithForm(query))
        } else {
            dispatch(getPetsWithForm('type=' + searchForm.type))
        }
    }

    const handleSwitch = (e) => {
        setIsAdvancedSearch(e.target.checked)
    }
    return (
        <Paper elevation={6} style={{}}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit} className={classes.form}>

                <div className={classes.advanceToggle}>
                    <Typography variant="h6">Advanced: </Typography>
                    <Switch onChange={handleSwitch} />

                </div>

                <div className={classes.title}>
                    <Typography variant="h4">Search a pet</Typography>
                </div>

                <div className={classes.clearButton}>
                    <Button variant="contained" color="secondary" onClick={clearForm}> Clear </Button>
                </div>

                <TypesSelect attribute="type" name="Type" formData={searchForm} setFormData={setSearchForm} />

                {isAdvancedSearch && (
                    <>
                        <TextField
                            label="Name"
                            value={searchForm.name}
                            onChange={(e) => setSearchForm({ ...searchForm, name: e.target.value })}
                            fullWidth
                            variant="outlined"
                            InputProps={{ className: classes.inputRow }}
                        />
                        <TextField
                            select
                            label="Adoption Status"
                            value={searchForm.adoptionStatus}
                            variant="outlined"
                            onChange={(e) => setSearchForm({ ...searchForm, adoptionStatus: e.target.value })}
                            fullWidth
                            InputProps={{ className: classes.inputRow }}

                        >
                            {
                                listsOfAdoptionStatus.map((status) => (<MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>))}
                        </TextField>
                        <MinMaxInput
                            minKey={'minWeight'}
                            maxKey={'maxWeight'}
                            unit="kg"
                            setSearchForm={setSearchForm}
                            searchForm={searchForm}

                        />
                        <MinMaxInput
                            minKey={'minHeight'}
                            maxKey={'maxHeight'}
                            type="height"
                            unit="cm"
                            setSearchForm={setSearchForm}
                            searchForm={searchForm}

                        />
                    </>
                )}
                <div className={classes.submitButton}>
                    <Button variant="contained" color="primary" type="submit" disabled={isSearchFormEmpty} >Search pet</Button>
                </div>
            </form>
        </Paper>);
}

export default SearchForm;