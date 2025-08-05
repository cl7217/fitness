import React, { useEffect, useState } from "react";
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Modal, Button, Select, MenuItem, FormControl, InputLabel
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const baseUrl = "https://localhost:7104"; // שנה לכתובת שלך

const ScheduleTable = () => {
    const [schedule, setSchedule] = useState([]);
    const [userPoints, setUserPoints] = useState(0);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const { userId } = useSelector((state) => state.user.currentUser)

    const daysHebrew = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

    // שליפת טבלת שיעורים ונקודות
    useEffect(() => {
        axios.get(`${baseUrl}/api/Lesson/schedule`)
            .then(res => setSchedule(res.data))
            .catch(err => console.error("שגיאה בטעינת שיעורים:", err));

        axios.get(`${baseUrl}/api/User/${userId}/points`)
            .then(res => setUserPoints(res.data.Points))
            .catch(err => console.error("שגיאה בטעינת נקודות:", err));
    }, [userId]);

    const handleCellClick = (lesson) => {
        setSelectedLesson(lesson);
        setModalOpen(true);

        axios.get(`${baseUrl}/api/Lesson/${lesson.id}/available-dates`)
            .then(res => setAvailableDates(res.data))
            .catch(err => console.error("שגיאה בטעינת תאריכים:", err));
    };

    const handlePurchase = async () => {
        if (!selectedLesson || !selectedDate) return;

        const selectedDateObj = new Date(selectedDate);

        const dateWithHour = new Date(selectedDateObj);
        dateWithHour.setHours(selectedLesson.hour);  // כאן משתמש בשעה
        dateWithHour.setMinutes(0);
        dateWithHour.setSeconds(0);
        dateWithHour.setMilliseconds(0);

        try {
            const rental = {
                lessonId: selectedLesson.id,
                userId,
                date: dateWithHour.toISOString()  // מומלץ לשלוח בפורמט ISO string
            };
            console.log(rental);


            await axios.post(`${baseUrl}/api/Rental/add`, rental);

            alert("השיעור נרכש בהצלחה");

            // רענון הנקודות
            const res = await axios.get(`${baseUrl}/api/User/${userId}/points`);
            setUserPoints(res.data.Points);
            setModalOpen(false);
            setSelectedDate("");
        } catch (err) {
            alert(err.response?.data || "שגיאה בעת רכישת שיעור");
        }
    };

    return (
        <Box>
            <Typography variant="h5">מערכת שיעורים</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>נקודות זמינות: {userPoints}</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>יום</TableCell>
                            <TableCell>שעה</TableCell>
                            <TableCell>שם שיעור</TableCell>
                            <TableCell>נקודות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {schedule.map((lesson) => (
                            <TableRow key={lesson.id} hover onClick={() => handleCellClick(lesson)} sx={{ cursor: "pointer" }}>
                                <TableCell>{daysHebrew[lesson.day - 1]}</TableCell>
                                <TableCell>{lesson.hour.toString().padStart(2, "0")}:00</TableCell>
                                <TableCell>{lesson.name}</TableCell>
                                <TableCell>{lesson.pointsPerHour}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Paper sx={{ p: 3, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 350 }}>
                    <Typography variant="h6">{selectedLesson?.name}</Typography>
                    <Typography variant="body2" gutterBottom>
                        {selectedLesson?.day} בשעה {selectedLesson?.hour}
                    </Typography>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>בחר תאריך</InputLabel>
                        <Select
                            value={selectedDate}
                            label="בחר תאריך"
                            onChange={(e) => setSelectedDate(e.target.value)}
                        >
                            {availableDates.map(date => (
                                <MenuItem key={date} value={date}>
                                    {new Date(date).toLocaleDateString("he-IL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={!selectedDate || userPoints < selectedLesson?.pointsPerHour}
                        onClick={handlePurchase}
                    >
                        אשר רכישת שיעור ({selectedLesson?.pointsPerHour} נקודות)
                    </Button>

                    {userPoints < selectedLesson?.pointsPerHour && (
                        <Typography color="error" sx={{ mt: 1 }}>אין מספיק נקודות</Typography>
                    )}
                </Paper>
            </Modal>
        </Box>
    );
};

export default ScheduleTable;
