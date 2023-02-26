import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import avatar from "../../assets/images/avatar.png";



const ProfileCard = () => {
  return (
    <Card sx={{ maxWidth: 300, padding: 5}}>
      <CardMedia
        component="img"
        height="250"
        image= {avatar}
      />
      <CardContent>
        <Typography gutterBottom  component="div">
          Another day for another food adventure! 
        </Typography>
       
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
