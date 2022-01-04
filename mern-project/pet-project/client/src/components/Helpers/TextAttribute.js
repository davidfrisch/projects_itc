import {  Typography } from '@mui/material'
import useStyles from './styles'

const TextAttribute = ({ attribute, value }) => {
    
    const classes = useStyles()
    return (
        <div className={classes.attributeContainer} >
            <div className={classes?.attribute} >
                <Typography variant="body">{attribute}</Typography>
            </div>
            <div className={classes?.attribute} >
                <Typography variant="body">{value !== undefined ? value : 'None'}</Typography>
            </div>
        </div >);
}

export default TextAttribute;