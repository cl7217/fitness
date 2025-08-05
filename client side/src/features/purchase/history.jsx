import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchHistory, addDemoPurchase, clearPurchases } from "./purchaseSlice";
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Paper,
    CircularProgress,
    Box,
    Container,
    Card,
    CardContent,
    Divider,
    Chip,
    Grid,
    Button
} from '@mui/material';
import { orange } from '@mui/material/colors';
import '../../css/history.css'
import axios from "axios";

const History = () => {
    const currentUser = useSelector((state) => state.user.currentUser)
    const [rentals, setRentals] = useState([]);
    const [loadingr, setLoadingr] = useState(false);
    const [errorr, setErrorr] = useState(null);
    const now = new Date()

    useEffect(() => {
        if (!currentUser.userId) return;

        setLoadingr(true);
        setErrorr(null);

        axios.get(`https://localhost:7104/api/Rental/user/${currentUser.userId}`)
            .then(response => {
                setRentals(response.data);
                setLoadingr(false);
            })
            .catch(err => {
                setErrorr('Error loading rentals');
                setLoadingr(false);
                console.error(err);
            });
    }, [currentUser.userId]);

   
    const { purchases = [], loading, error } = useSelector((state) => state.purchase);
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUser && currentUser.userId) {
            console.log("Fetching history for user:", currentUser);
            dispatch(fetchHistory(currentUser));
        }
    }, [dispatch, currentUser])

    console.log("Current purchases:", purchases);
    console.log("Loading:", loading);
    console.log("Error:", error);

     if (loadingr) return <p>Loading rentals...</p>;
    if (errorr) return <p>{error}</p>;
    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <CircularProgress sx={{ color: orange[800] }} />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <Typography color="error" variant="h6">
                    Failed to load purchase history. Please try again.
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    textAlign: 'center',
                    mb: 4,
                    color: orange[800],
                    fontWeight: 'bold'
                }}
            >
                היסטוריית רכישות
            </Typography>

            {purchases && purchases.length > 0 && (
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        מציג {purchases.length} רכישות מהשרת
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Card sx={{ minWidth: 120, backgroundColor: orange[50] }}>
                                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                                    <Typography variant="h6" color={orange[800]}>
                                        {purchases.length}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        סה"כ רכישות
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ minWidth: 120, backgroundColor: orange[50] }}>
                                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                                    <Typography variant="h6" color={orange[800]}>
                                        {purchases.reduce((sum, p) => sum + (p.pointsBalance || 0), 0)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        נקודות סה"כ
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ minWidth: 120, backgroundColor: orange[50] }}>
                                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                                    <Typography variant="h6" color={orange[800]}>
                                        {rentals.filter(r => {
                                            if (!r.ReallyExit) return false; // אם אין תאריך סיום - לא נספור את זה
                                            const exitDate = new Date(r.ReallyExit);
                                            return exitDate <= now; // השיעור כבר הסתיים
                                        }).length}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        שיעורים שהושלמו
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ minWidth: 120, backgroundColor: orange[50] }}>
                                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                                    <Typography variant="h6" color={orange[800]}>
                                        {rentals.length}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        שיעורים שנרכשו
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            )}

            {!purchases || purchases.length === 0 ? (
                <Card sx={{ textAlign: 'center', py: 4 }}>
                    <CardContent>
                        <Typography variant="h6" color="text.secondary">
                            אין היסטוריית רכישות זמינה
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            עדיין לא ביצעת רכישות במערכת. תוכל לרכוש חבילות מהדף הראשי או להוסיף רכישות לדוגמה.
                        </Typography>
                        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                onClick={() => dispatch(addDemoPurchase())}
                                sx={{
                                    backgroundColor: orange[600],
                                    '&:hover': { backgroundColor: orange[700] }
                                }}
                            >
                                הוסף רכישה לדוגמה
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => window.location.href = '/packages'}
                                sx={{
                                    borderColor: orange[600],
                                    color: orange[600],
                                    '&:hover': {
                                        borderColor: orange[700],
                                        backgroundColor: orange[50]
                                    }
                                }}
                            >
                                לך לחבילות
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ) : (
                <>
                    <Box sx={{ mb: 3, textAlign: 'center', display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            onClick={() => dispatch(clearPurchases())}
                            sx={{
                                borderColor: orange[600],
                                color: orange[600],
                                '&:hover': {
                                    borderColor: orange[700],
                                    backgroundColor: orange[50]
                                }
                            }}
                        >
                            נקה היסטוריה
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (currentUser && currentUser.userId) {
                                    dispatch(fetchHistory(currentUser));
                                }
                            }}
                            sx={{
                                backgroundColor: orange[600],
                                '&:hover': { backgroundColor: orange[700] }
                            }}
                        >
                            רענן נתונים
                        </Button>
                    </Box>
                    <Grid container spacing={2}>
                        {purchases.map((purchase, index) => (
                            <Grid item xs={12} key={index}>
                                <Card sx={{
                                    mb: 2,
                                    border: `1px solid ${orange[200]}`,
                                    '&:hover': {
                                        boxShadow: 4,
                                        transform: 'translateY(-2px)',
                                        transition: 'all 0.3s ease'
                                    }
                                }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Typography variant="h6" component="h2" sx={{ color: orange[800], fontWeight: 'bold' }}>
                                                {purchase.type === 'lesson' ? `שיעור ${purchase.subject || ''}` : `רכישה #${purchase.code || index + 1}`}
                                            </Typography>
                                            <Chip
                                                label={purchase.type === 'lesson' ? 'שיעור' : 'חבילה'}
                                                color="primary"
                                                size="small"
                                                sx={{ backgroundColor: orange[600] }}
                                            />
                                        </Box>

                                        <Divider sx={{ my: 2 }} />

                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>תאריך:</strong>
                                                </Typography>
                                                <Typography variant="body1">
                                                    {purchase.date ? new Date(purchase.date).toLocaleDateString('he-IL', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    }) : 'לא זמין'}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>נקודות:</strong>
                                                </Typography>
                                                <Typography variant="body1" sx={{ color: orange[700], fontWeight: 'bold' }}>
                                                    {purchase.pointsBalance || 0} נקודות
                                                </Typography>
                                            </Grid>

                                            {purchase.packageId && (
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>מזהה חבילה:</strong>
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        #{purchase.packageId}
                                                    </Typography>
                                                </Grid>
                                            )}

                                            {purchase.type === 'lesson' && purchase.subject && (
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>סוג שיעור:</strong>
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {purchase.subject}
                                                    </Typography>
                                                </Grid>
                                            )}

                                            {purchase.type === 'lesson' && purchase.trainer && (
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>מאמן:</strong>
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {purchase.trainer}
                                                    </Typography>
                                                </Grid>
                                            )}

                                            {purchase.type === 'lesson' && purchase.duration && (
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>משך:</strong>
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {purchase.duration}
                                                    </Typography>
                                                </Grid>
                                            )}

                                            {purchase.type === 'lesson' && purchase.time && (
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>שעה:</strong>
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {purchase.time}
                                                    </Typography>
                                                </Grid>
                                            )}

                                            {purchase.lessonName && purchase.type !== 'lesson' && (
                                                <Grid item xs={12}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>שם החבילה:</strong>
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {purchase.lessonName}
                                                    </Typography>
                                                </Grid>
                                            )}

                                            {purchase.instructorName && (
                                                <Grid item xs={12}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>המאמן:</strong>
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {purchase.instructorName}
                                                    </Typography>
                                                </Grid>
                                            )}

                                            {purchase.status && (
                                                <Grid item xs={12}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>סטטוס:</strong>
                                                    </Typography>
                                                    <Chip
                                                        label={purchase.status === 'completed' ? 'הושלם' :
                                                            purchase.status === 'upcoming' ? 'קרוב' :
                                                                purchase.status}
                                                        color={purchase.status === 'completed' ? 'success' :
                                                            purchase.status === 'upcoming' ? 'warning' : 'default'}
                                                        size="small"
                                                    />
                                                </Grid>
                                            )}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Container>
    );
}

export default History;