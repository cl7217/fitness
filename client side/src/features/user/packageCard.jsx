import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { orange } from '@mui/material/colors';
import PurchasePopup from '../../components/purchasePopup'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAddPurchase } from '../purchase/purchaseSlice';
import { useSelector } from 'react-redux';
import '../../css/packageCard.css'
import { useNavigate } from 'react-router-dom';
import { fetchUpdate } from './userSlice';

export default function MyCard({ img: src, name: name, qty: qty, price: price, code: code }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userId } = useSelector((state) => state.user.currentUser)


  const purchase = {
    pointsBalance: qty,
    date: new Date(),
    userId: userId,
    packageId: code
  }

  const handlePurchase = () => {
    setOpen(false);
    dispatch(fetchAddPurchase(purchase))
  }
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    // navigate('/lessons')
  };

  return (
    <Card sx={[{ maxWidth: 300 }, { color: orange[800] }]} className='packageList-card'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={src}
          alt="p"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {qty + " "}
            points package
            <br></br>{price + "$"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>

        <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mt: 2, backgroundColor: orange[800] }}>
          For Purchase
        </Button>

        <PurchasePopup open={open} handleClose={handleClose} handlePurchase={handlePurchase} />
      </CardActions>
    </Card>
  );
}
