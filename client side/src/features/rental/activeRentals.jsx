import { Box, Button, CircularProgress, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchGetRentals, fetchUpdateRental } from "./rentalSlice";

const ActiveRentals = () => {

    const dispatch = useDispatch();

    const { rentals = [], loading, error } = useSelector((state) => state.rental);

    console.log("rentals",rentals);


    const activeRentals = rentals.filter((ren) => ren.reallyEnd < new Date())
    console.log("activeRentals",activeRentals);
    

    console.log(activeRentals);

    const handleClick = (event) => {
        console.log(event);
        
        // useDispatch(fetchUpdateRental(rentalid,rental))
    }

    useEffect(() => {
        dispatch(fetchGetRentals());
    }, [dispatch]);
    return (
        <>
            {loading === true && <CircularProgress />}
            {error === true && <Typography color="error">Failed to load Active rentals.</Typography>}
            {activeRentals?.length === 0 ? (
                <ListItem>
                    <ListItemText primary="No Active rentals available." />
                </ListItem>
            ) : (
                activeRentals && activeRentals
                    .map((rental, index) => (
                        <div key={index}>
                            <ListItem >
                                <ListItemText
                                    primary="Active rental"
                                    secondary="please enter to update exitance the lesson"
                                />
                            </ListItem>
                            <Button onClick={handleClick}>update</Button>
                            <hr></hr>
                        </div>
                    ))
            )}
        </>
    );
}

export default ActiveRentals;