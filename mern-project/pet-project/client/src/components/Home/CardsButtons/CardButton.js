import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom';

const CardButton = ({ children, image, title,to }) => {



    return (
        <Card sx={{ maxWidth: 345, margin:2  }} elevation={6} >
            <CardActionArea component={Link} to={to} sx={{display: 'flex', height:"100%", flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    image={image}
                    alt={title}
                />
                <CardContent sx={{flexGrow:1,  width:"100%", display:"flex", flexDirection: 'column', justifyContent: 'flex-end'}}>
                    
                        <Typography sx={{paddingLeft:2, paddingRight:2}} gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography sx={{paddingLeft:2, paddingRight:2}} variant="body2" color="text.secondary">
                            {children}
                        </Typography>
                
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CardButton;