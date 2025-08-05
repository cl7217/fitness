import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../css/lesson.css';
import '../../css/modal.css';
import { orange } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useModal } from '../../App';
import { Box, TextField, InputAdornment, Typography, Card, CardContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { fetchAddPurchase } from '../purchase/purchaseSlice';
import { deductPoints } from '../user/userSlice';
import { getPoints } from '../../services/user';
import { getPurchasesByUserId, updatePurchase } from '../../services/purchase';
import { addRental } from '../../services/rental';

const slotTimesLookup = {
    0: '09:00 - 10:00',
    1: '10:00 - 11:00',
    2: '11:00 - 12:00',
    3: '12:00 - 13:00',
    4: '13:00 - 14:00',
    5: '14:00 - 15:00',
    6: '15:00 - 16:00',
    7: '16:00 - 17:00',
};

// נתונים מהדאטאבייס - יש להחליף עם קריאה אמיתית ל-API
const rows = [
    {
        id: 0,
        day: 'Sunday',
        slots: [
            { subject: 'יוגה', trainer: 'שרה כהן', duration: '60 דקות', points: 50 },
            { subject: 'פילאטיס', trainer: 'דוד לוי', duration: '45 דקות', points: 40 },
            { subject: 'זומבה', trainer: 'מיכל אברהם', duration: '60 דקות', points: 50 },
            { subject: 'אימון כוח', trainer: 'יוסי שמואלי', duration: '90 דקות', points: 75 },
            '',
            { subject: 'יוגה', trainer: 'שרה כהן', duration: '60 דקות', points: 50 },
            { subject: 'פילאטיס', trainer: 'דוד לוי', duration: '45 דקות', points: 40 },
            { subject: 'זומבה', trainer: 'מיכל אברהם', duration: '60 דקות', points: 50 }
        ]
    },
    {
        id: 1,
        day: 'Monday',
        slots: [
            { subject: 'אימון כוח', trainer: 'יוסי שמואלי', duration: '90 דקות', points: 75 },
            { subject: 'יוגה', trainer: 'שרה כהן', duration: '60 דקות', points: 50 },
            { subject: 'פילאטיס', trainer: 'דוד לוי', duration: '45 דקות', points: 40 },
            { subject: 'זומבה', trainer: 'מיכל אברהם', duration: '60 דקות', points: 50 },
            '',
            { subject: 'אימון כוח', trainer: 'יוסי שמואלי', duration: '90 דקות', points: 75 },
            { subject: 'יוגה', trainer: 'שרה כהן', duration: '60 דקות', points: 50 },
            { subject: 'פילאטיס', trainer: 'דוד לוי', duration: '45 דקות', points: 40 }
        ]
    },
    {
        id: 2,
        day: 'Tuesday',
        slots: [
            { subject: 'זומבה', trainer: 'מיכל אברהם', duration: '60 דקות', points: 50 },
            { subject: 'אימון כוח', trainer: 'יוסי שמואלי', duration: '90 דקות', points: 75 },
            { subject: 'יוגה', trainer: 'שרה כהן', duration: '60 דקות', points: 50 },
            { subject: 'פילאטיס', trainer: 'דוד לוי', duration: '45 דקות', points: 40 },
            '',
            { subject: 'אימון כוח', trainer: 'יוסי שמואלי', duration: '90 דקות', points: 75 },
            { subject: 'זומבה', trainer: 'מיכל אברהם', duration: '60 דקות', points: 50 },
            { subject: 'יוגה', trainer: 'שרה כהן', duration: '60 דקות', points: 50 }
        ]
    },
    {
        id: 3,
        day: 'Wednesday',
        slots: [
            { subject: 'פילאטיס', trainer: 'דוד לוי', duration: '45 דקות', points: 40 },
            { subject: 'יוגה', trainer: 'שרה כהן', duration: '60 דקות', points: 50 },
            { subject: 'אימון כוח', trainer: 'יוסי שמואלי', duration: '90 דקות', points: 75 },
            { subject: 'זומבה', trainer: 'מיכל אברהם', duration: '60 דקות', points: 50 },
            '',
            { subject: 'יוגה', trainer: 'שרה כהן', duration: '60 דקות', points: 50 },
            { subject: 'פילאטיס', trainer: 'דוד לוי', duration: '45 דקות', points: 40 }
        ]
    },
    {
        id: 4,
        day: 'Thursday',
        slots: [
            { subject: 'יוגה', trainer: 'שרה כהן', duration: '60 דקות', points: 50 },
            { subject: 'פילאטיס', trainer: 'דוד לוי', duration: '45 דקות', points: 40 },
            { subject: 'זומבה', trainer: 'מיכל אברהם', duration: '60 דקות', points: 50 },
            { subject: 'אימון כוח', trainer: 'יוסי שמואלי', duration: '90 דקות', points: 75 },
            '',
            { subject: 'זומבה', trainer: 'מיכל אברהם', duration: '60 דקות', points: 50 },
            { subject: 'יוגה', trainer: 'שרה כהן', duration: '60 דקות', points: 50 },
            { subject: 'פילאטיס', trainer: 'דוד לוי', duration: '45 דקות', points: 40 }
        ]
    },
    {
        id: 5,
        day: 'Friday',
        slots: [
            { subject: 'אימון כוח', trainer: 'יוסי שמואלי', duration: '90 דקות', points: 75 },
            { subject: 'יוגה', trainer: 'שרה כהן', duration: '60 דקות', points: 50 },
            { subject: 'פילאטיס', trainer: 'דוד לוי', duration: '45 דקות', points: 40 },
            { subject: 'זומבה', trainer: 'מיכל אברהם', duration: '60 דקות', points: 50 },
            '',
            { subject: 'יוגה', trainer: 'שרה כהן', duration: '60 דקות', points: 50 }
        ]
    },
];

const getNextWeeks = () => {
    const weeks = [];
    const today = new Date();
    for (let i = 0; i < 4; i++) {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() + i * 7);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        weeks.push({
            id: i,
            start: weekStart,
            end: weekEnd,
            label: `שבוע ${i + 1} (${weekStart.toLocaleDateString('he-IL')} - ${weekEnd.toLocaleDateString('he-IL')})`
        });
    }
    return weeks;
};

const slotColumnCommonFields = {
    sortable: false,
    filterable: false,
    pinnable: false,
    hideable: false,
    minWidth: 140,
    cellClassName: (params) => (params.value ? params.value : ''),
    colSpan: (value, row, column) => {
        const index = Number(column.field);
        let colSpan = 1;
        for (let i = index + 1; i < row.slots.length; i++) {
            if (row.slots[i] === value) colSpan++;
            else break;
        }
        return colSpan;
    },
};

const columns = [
    { field: 'day', headerName: 'יום' },
    ...Object.keys(slotTimesLookup).map((key) => ({
        field: key,
        headerName: slotTimesLookup[key],
        valueGetter: (value, row) => row.slots[key],
        ...slotColumnCommonFields,
    }))
];

const getDayOffset = (dayName) => {
    const dayMap = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
    };
    return dayMap[dayName] || 0;
};

const theme = createTheme({
    palette: {
        primary: { main: orange[800] },
        background: { paper: 'white' },
        text: { primary: orange[800], secondary: 'rgb(0, 0, 0)' },
    },
    typography: { fontFamily: 'sans-serif' },
});

export default function LessonBooking() {
    const { openModal, closeModal, updateModalContent } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);

    const [selectedCell, setSelectedCell] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [myBookings, setMyBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isBooking, setIsBooking] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const weeks = getNextWeeks();
    const filteredRows = rows.filter((row) =>
        row.slots.some((slot) =>
            slot && typeof slot === 'object' && slot.subject &&
            slot.subject.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleCellClick = (params) => {
        if (params.value && params.value !== '' && typeof params.value === 'object') {
            const cell = {
                day: params.row.day,
                time: slotTimesLookup[params.field],
                subject: params.value.subject,
                trainer: params.value.trainer,
                duration: params.value.duration,
                points: params.value.points,
                field: params.field
            };
            setSelectedCell(cell);
            setSelectedWeek(null);
            openModal(`הזמנת שיעור - ${params.value.subject}`, <ModalContent cell={cell} />);
        }
    };

    const handleWeekSelect = (week) => {
        setSelectedWeek(week);
    };

    const handleConfirmBooking = async () => {
        if (selectedCell && selectedWeek) {
            // בדיקת נקודות

            const userPoints = await getPoints(currentUser.userId)
            const lessonPoints = selectedCell.points;

            if (userPoints < lessonPoints) {
                // אין מספיק נקודות - הצג פופאפ אחר
                closeModal();
                openModal(
                    'אין מספיק נקודות',
                    <InsufficientPointsModal
                        requiredPoints={lessonPoints}
                        userPoints={userPoints}
                        onClose={closeModal}
                        onNavigateToPackages={() => {
                            closeModal();
                            navigate('/packages');
                        }}
                    />
                );
                return;
            }

            setIsBooking(true);

            try {

                //חבילה להורדת נקודות

                const purchases = await getPurchasesByUserId(currentUser.userId)
                const purchase = purchases.find(p => p.pointBalance > lesson.selectedCell.points)

                // ניכוי נקודות מהחבילה
                dispatch(updatePurchase(purchase.code));

                // הוספת השכרה חדשה
                const newRental = {
                    pointsDeducated: lessonPoints,
                    reallyEnter: new Date(selectedWeek.start.getTime() + (getDayOffset(cell.day) * 86400000)).toLocaleDateString('he-IL', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }),
                    reallyExit: null,
                    lessonId: selectedCell.LessonId,
                    purchaseId: purchase.code
                }

                dispatch(addRental(newRental))

                // הוספה לרשימה המקומית
                const newBooking = {
                    id: Date.now(),
                    ...purchaseData,
                    week: selectedWeek
                };
                setMyBookings([...myBookings, newBooking]);

                setSelectedCell(null);
                setSelectedWeek(null);
                setIsBooking(false);
                closeModal();

                // הצג הודעת הצלחה
                openModal(
                    'הזמנה בוצעה בהצלחה!',
                    <SuccessModal
                        lesson={selectedCell}
                        onClose={closeModal}
                    />
                );

            } catch (error) {
                console.error('Error booking lesson:', error);
                setIsBooking(false);
                closeModal();
                openModal(
                    'שגיאה בהזמנה',
                    <ErrorModal
                        error={error}
                        onClose={closeModal}
                    />
                );
            }
        }
    };

    useEffect(() => {
        if (selectedCell) {
            updateModalContent(<ModalContent cell={selectedCell} />);
        }
    }, [selectedWeek]);

    const ModalContent = ({ cell }) => {
        if (!cell) return null;

        return (
            <div>
                {/* Lesson Details Section */}
                <div className="lesson-details">
                    <h3>פרטי השיעור:</h3>
                    <div className="lesson-info">
                        <div className="lesson-info-row">
                            <span className="lesson-label">מקצוע:</span>
                            <span className="lesson-value">{cell.subject}</span>
                        </div>
                        <div className="lesson-info-row">
                            <span className="lesson-label">מאמן:</span>
                            <span className="lesson-value">{cell.trainer}</span>
                        </div>
                        <div className="lesson-info-row">
                            <span className="lesson-label">יום:</span>
                            <span style={{ color: '#1A1A1A', fontWeight: '500' }}>{cell.day}</span>
                        </div>
                        <div className="lesson-info-row">
                            <span className="lesson-label">שעה:</span>
                            <span className="lesson-time">{cell.time}</span>
                        </div>
                        <div className="lesson-info-row">
                            <span className="lesson-label">משך:</span>
                            <span style={{ color: '#1A1A1A', fontWeight: '500' }}>{cell.duration}</span>
                        </div>
                        <div className="lesson-info-row">
                            <span className="lesson-label">נקודות:</span>
                            <span style={{ color: orange[600], fontWeight: 'bold' }}>{cell.points} נקודות</span>
                        </div>
                    </div>
                </div>

                {/* Week Selection Section */}
                <div className="week-selection">
                    <h3>בחר שבוע</h3>
                    <div className="week-grid">
                        {weeks.map((week) => (
                            <button
                                key={week.id}
                                onClick={() => handleWeekSelect(week)}
                                className={`week-button ${selectedWeek?.id === week.id ? 'selected' : ''}`}
                            >
                                {week.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Selected Date Display */}
                {selectedWeek && (
                    <div className="selected-date">
                        <h4>תאריך השיעור</h4>
                        <p>
                            {new Date(selectedWeek.start.getTime() + (getDayOffset(cell.day) * 86400000)).toLocaleDateString('he-IL', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                            {' | '}
                            {cell.time} - {cell.subject}
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="action-buttons">
                    <button className="cancel-button" onClick={closeModal}>
                        ביטול
                    </button>
                    <button
                        className={`confirm-button ${!selectedWeek ? 'disabled' : ''}`}
                        onClick={handleConfirmBooking}
                        disabled={!selectedWeek || isBooking}
                    >
                        {isBooking ? (
                            <>
                                <span className="loading-spinner"></span>
                                מעבד...
                            </>
                        ) : (
                            'אישור הזמנה'
                        )}
                    </button>
                </div>
            </div>
        );
    };

    // פופאפ לאין מספיק נקודות
    const InsufficientPointsModal = ({ requiredPoints, userPoints, onClose, onNavigateToPackages }) => (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <Typography variant="h6" sx={{ color: orange[800], mb: 2 }}>
                אין לך מספיק נקודות
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                השיעור עולה {requiredPoints} נקודות
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                יש לך {userPoints} נקודות זמינות
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <button
                    className="cancel-button"
                    onClick={onClose}
                    style={{ margin: '0 8px' }}
                >
                    ביטול
                </button>
                <button
                    className="confirm-button"
                    onClick={onNavigateToPackages}
                    style={{ margin: '0 8px' }}
                >
                    רכוש חבילה
                </button>
            </Box>
        </div>
    );

    // פופאפ הצלחה
    const SuccessModal = ({ lesson, onClose }) => (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <Typography variant="h6" sx={{ color: 'green', mb: 2 }}>
                ✅ הזמנה בוצעה בהצלחה!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                {lesson.subject} עם {lesson.trainer}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                השיעור נרשם בהיסטוריית הרכישות שלך
            </Typography>
            <button className="confirm-button" onClick={onClose}>
                אישור
            </button>
        </div>
    );

    // פופאפ שגיאה
    const ErrorModal = ({ error, onClose }) => (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <Typography variant="h6" sx={{ color: 'red', mb: 2 }}>
                ❌ שגיאה בהזמנה
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {error?.message || 'אירעה שגיאה בעת ביצוע ההזמנה. אנא נסה שוב.'}
            </Typography>
            <button className="confirm-button" onClick={onClose}>
                אישור
            </button>
        </div>
    );

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                my: 8,
                mt: 40,
                maxWidth: '1200px',
                margin: '0 auto',
                px: 4
            }}>
                <TextField
                    variant="outlined"
                    placeholder="חפש שיעור"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                        marginTop: '36px',
                        marginBottom: '30px',
                        width: '300px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: orange[400]
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: orange[600]
                            }
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: orange[600] }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Box sx={{
                height: 500,
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                '& .MuiDataGrid-root': {
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    overflow: 'hidden'
                },
                '& .MuiDataGrid-cell': {
                    borderRight: '1px solid #e0e0e0',
                    borderBottom: '1px solid #e0e0e0',
                    textAlign: 'center',
                    padding: '12px 8px'
                },
                '& .MuiDataGrid-columnHeader': {
                    backgroundColor: '#f5f5f5',
                    borderRight: '1px solid #e0e0e0',
                    borderBottom: '1px solid #e0e0e0',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    padding: '12px 8px'
                },
                '& .MuiDataGrid-columnHeaders': {
                    borderBottom: '2px solid #e0e0e0'
                }
            }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    hideFooter
                    onCellClick={handleCellClick}
                    sx={{
                        '& .MuiDataGrid-cell:focus': {
                            outline: 'none'
                        },
                        '& .MuiDataGrid-cell:hover': {
                            backgroundColor: '#f8f9fa',
                            cursor: 'pointer'
                        }
                    }}
                />
            </Box>

            {myBookings.length > 0 && (
                <Box sx={{
                    mt: 5,
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <Typography variant="h5" sx={{
                        color: orange[800],
                        fontWeight: 'bold',
                        mb: 3
                    }}>
                        השיעורים שלי:
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        alignItems: 'center'
                    }}>
                        {myBookings.map((booking) => (
                            <Card key={booking.id} sx={{
                                width: '100%',
                                maxWidth: '600px',
                                border: `1px solid ${orange[200]}`,
                                '&:hover': {
                                    boxShadow: 2,
                                    transform: 'translateY(-1px)',
                                    transition: 'all 0.2s ease'
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: orange[800], fontWeight: 'bold' }}>
                                        {booking.subject}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {booking.date.toLocaleDateString('he-IL', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })} | {booking.time}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        מאמן: {booking.trainer} | משך: {booking.duration}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            )}
        </ThemeProvider>
    );
}
