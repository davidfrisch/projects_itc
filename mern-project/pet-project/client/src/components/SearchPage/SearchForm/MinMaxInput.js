import { Grid, InputAdornment, TextField } from "@material-ui/core";
import useStyles from "./styles"

const MinMaxInput = ({ minKey, maxKey, unit, setSearchForm, searchForm }) => {
    const classes = useStyles()
    return (<Grid container spacing={1}>
        <Grid item xs={12} sm={6}  >
            <TextField
                label="min"
                type="number"
                fullWidth

                variant="outlined"
                InputProps={{
                    endAdornment: <InputAdornment position="end">{unit}</InputAdornment>
                }}
                value={searchForm[minKey]}
                onChange={(e) => setSearchForm({ ...searchForm, [minKey]: e.target.value })}
                onBlur={() => { if (searchForm[minKey] < 0) { setSearchForm({ ...searchForm, [minKey]: -1 * searchForm[minKey] }) } }}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                label="max"
                type="number"
                fullWidth
                variant="outlined"
                InputProps={{
                    endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
                    className: classes.inputRowMinMax
                }}
                value={searchForm[maxKey]}
                onChange={(e) => setSearchForm({ ...searchForm, [maxKey]: e.target.value })}
                onBlur={() => { if (searchForm[maxKey] < 0) { setSearchForm({ ...searchForm, [maxKey]: 0 }) } }}
            />
        </Grid>
    </Grid>);
}

export default MinMaxInput;