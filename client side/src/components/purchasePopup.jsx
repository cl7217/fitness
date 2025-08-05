import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import { useNavigate, Outlet, Navigate } from "react-router-dom"
import "../css/popup.css"

const PurchasePopup = ({ open, handleClose,handlePurchase }) => {
    // const navigate=useNavigate()
    // console.log("open!",open,"handleClose!",handleClose)
    // const b=()=>{
    //       navigate('/lessons')
    // }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="purchase-popup-title"
            aria-describedby="purchase-popup-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4
            }}>
                <Typography id="purchase-popup-title" variant="h6" component="h2">
                    Purchase Confirmation
                </Typography>
                <Typography id="purchase-popup-description" sx={{ mt: 2 }}>
                    You have successfully made your purchase!
                </Typography>
                <div className='popup-container-btn'>
                <Button onClick={handlePurchase} variant="contained"  sx={{ mt: 2 ,backgroundColor:orange[800]}}>
                    Confirm
                </Button>
                <Button onClick={handleClose} variant="contained"  sx={{ mt: 2 ,backgroundColor:orange[800]}}>
                    Cancel
                </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default PurchasePopup;