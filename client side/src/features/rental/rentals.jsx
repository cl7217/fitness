import React, { useEffect, useState } from "react";
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const baseUrl = "https://localhost:7104";

const UserRentals = () => {
    const [rentals, setRentals] = useState([]);
    const { userId } = useSelector((state) => state.user.currentUser || {});

    useEffect(() => {
        if (!userId) return;

        axios.get(`${baseUrl}/api/Rental/user/${userId}`)
            .then(res => setRentals(res.data))
            .catch(err => console.error("שגיאה בטעינת השכרות:", err));
    }, [userId]);

    const getStatus = (enter, exit) => {
        const now = new Date();
        const start = new Date(enter);
        const end = new Date(exit);

        if (now < start) return { label: "יהיה", color: "success" };
        if (now > end) return { label: "היה", color: "error" };
        return { label: "פעיל", color: "warning" };
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>השכרות שלי</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>שם שיעור</TableCell>
                            <TableCell>שעת התחלה</TableCell>
                            <TableCell>שעת סיום</TableCell>
                            <TableCell>נקודות שנוכו</TableCell>
                            <TableCell>סטטוס</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rentals.map((rental) => {
                            const status = getStatus(rental.reallyEnter, rental.reallyExit);

                            return (
                                <TableRow key={rental.code}>
                                    <TableCell>{rental.lessonName || "שיעור לא ידוע"}</TableCell>
                                    <TableCell>{new Date(rental.reallyEnter).toLocaleString("he-IL")}</TableCell>
                                    <TableCell>{new Date(rental.reallyExit).toLocaleString("he-IL")}</TableCell>
                                    <TableCell>{rental.pointsDeducated}</TableCell>
                                    <TableCell>
                                        <Chip label={status.label} color={status.color} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserRentals;
