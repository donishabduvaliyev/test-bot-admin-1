import React, { useState, useEffect, useCallback } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Tabs,
    Tab,
    Box,
    Button, 
    CircularProgress, 
    Alert, 
} from "@mui/material";
import {
    ShoppingCart,
    AttachMoney,
    DeliveryDining,
    LocalShipping,
    Route,
    People,
    Refresh as RefreshIcon, 
} from "@mui/icons-material";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const API_BASE_URL = 'https://test-admin-server-ls4z.onrender.com';
const ANALYTICS_ENDPOINT = `${API_BASE_URL}/api/analytics/dashboardAnalytics`;
const UPDATE_ANALYTICS_ENDPOINT = `${API_BASE_URL}/api/analytics/updateAnalytics`;


const API_KEY = null;

const sampleData = {
    today: {
        orders: 15, price: 2300000, deliveryOrders: 8, deliveryPrice: 1200000,
        deliveryDistance: 34, users: 12,
        chart: [
            { date: "08:00", total: 100000 }, { date: "09:00", total: 150000 },
            { date: "10:00", total: 200000 }, { date: "11:00", total: 400000 },
            { date: "12:00", total: 600000 }, { date: "13:00", total: 350000 },
            { date: "14:00", total: 500000 },
        ],
    },
    week: {
        orders: 70, price: 12400000, deliveryOrders: 30, deliveryPrice: 5400000,
        deliveryDistance: 160, users: 55,
        chart: [
            { date: "Mon", total: 1500000 }, { date: "Tue", total: 2300000 },
            { date: "Wed", total: 3400000 }, { date: "Thu", total: 2800000 },
            { date: "Fri", total: 3900000 }, { date: "Sat", total: 4100000 },
            { date: "Sun", total: 1000000 },
        ],
    },
    month: {
        orders: 300, price: 62000000, deliveryOrders: 150, deliveryPrice: 32000000,
        deliveryDistance: 940, users: 220,
        chart: [
            { date: "Week 1", total: 10000000 }, { date: "Week 2", total: 18000000 },
            { date: "Week 3", total: 22000000 }, { date: "Week 4", total: 12000000 },
        ],
    },
    year: {
        orders: 3150, price: 710000000, deliveryOrders: 1800, deliveryPrice: 360000000,
        deliveryDistance: 12400, users: 1500,
        chart: [
            { date: "Jan", total: 50000000 }, { date: "Feb", total: 64000000 },
            { date: "Mar", total: 72000000 }, { date: "Apr", total: 81000000 },
            { date: "May", total: 94000000 }, { date: "Jun", total: 86000000 },
  
            { date: "Jul", total: 95000000 }, { date: "Aug", total: 102000000 },
            { date: "Sep", total: 110000000 }, { date: "Oct", total: 120000000 },
            { date: "Nov", total: 130000000 }, { date: "Dec", total: 140000000 },

            
        ],
    },
};

// --- Card Configuration ---
const cardItems = [
    { label: "Umumiy buyurtmalar", key: "orders", icon: <ShoppingCart fontSize="large" /> },
    { label: "Umumiy mablag'", key: "price", icon: <AttachMoney fontSize="large" />, format: "currency" },
    { label: "Mijozlar soni", key: "users", icon: <People fontSize="large" /> },
    { label: "Yetkazib berish", key: "deliveryOrders", icon: <DeliveryDining fontSize="large" /> },
    { label: "Yetkazib berishdagi mablag'", key: "deliveryPrice", icon: <LocalShipping fontSize="large" />, format: "currency" },
    { label: "Yetkazib berish masofasi (km)", key: "deliveryDistance", icon: <Route fontSize="large" />, suffix: " km" },
];

// --- Helper to format price ---
// (Using UZS as an example, adjust currency as needed)
const formatPrice = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) return 'N/A';
    return new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS', minimumFractionDigits: 0 }).format(amount);
};


const Dashboard = () => {
    const [period, setPeriod] = useState("today");
    const [analyticsData, setAnalyticsData] = useState(sampleData); // Initialize with sampleData
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateStatus, setUpdateStatus] = useState('');

    const fetchAnalyticsData = useCallback(async (isManualUpdate = false) => {
        if (!isManualUpdate) setLoading(true); 
        setError(null);
        if (isManualUpdate) setUpdateStatus("Eng so'ngi malumot yuklanmoqda...");

        try {
            const headers = { 'Content-Type': 'application/json' };
            if (API_KEY) {
                headers['X-API-Key'] = API_KEY; 
            }

            const response = await fetch(ANALYTICS_ENDPOINT, { method: 'GET', headers });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || 'Failed to fetch analytics'}`);
            }
            const data = await response.json();

            if (data && Object.keys(data).length > 0 && data.today) { 
                setAnalyticsData(data);
                if (isManualUpdate) setUpdateStatus('Malumotlar muvaffaqqiyatli yangilandi!');
            } else {
                console.warn("Fetched data is empty or invalid, using fallback sample data.");
                setAnalyticsData(sampleData); 
                if (isManualUpdate) setUpdateStatus('Kelgan malumotlar bosh, iltimos server malumotlarini tekshiring.');
            }

        } catch (err) {
            console.error('Error fetching analytics data:', err);
            setError(err.message);
            setAnalyticsData(sampleData); 
            if (isManualUpdate) setUpdateStatus(`Malumotni yuklashda xato: ${err.message}`);
        } finally {
            if (!isManualUpdate) setLoading(false);
            if (isManualUpdate) {
                setTimeout(() => {
                    setUpdateStatus(''); 
                }, 4000);
            }
        }
    }, []);

    useEffect(() => {
        fetchAnalyticsData();
    }, [fetchAnalyticsData]);

    const handleUpdateAnalytics = async () => {
        setIsUpdating(true);
        setUpdateStatus('Malumotlarni yuklash kutilmoqda...');
        setError(null);

        try {
            const headers = { 'Content-Type': 'application/json' };
            if (API_KEY) {
                headers['X-API-Key'] = API_KEY;
            }

            const response = await fetch(UPDATE_ANALYTICS_ENDPOINT, { method: 'POST', headers });
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
            }
            setUpdateStatus(`Yuklanish yakunlandi: ${responseData.message}. Qisqa malumotlar yangilanmoqda...`);
            setTimeout(() => fetchAnalyticsData(true), 2000); 

        } catch (err) {
            console.error('Error triggering analytics update:', err);
            setUpdateStatus(`Yangilashda xatolik: ${err.message}`);
            setError(err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    
    const currentPeriodData = (analyticsData && analyticsData[period]) ? analyticsData[period] : sampleData[period];
    const currentChartData = (currentPeriodData && Array.isArray(currentPeriodData.chart)) ? currentPeriodData.chart : [];


    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Analitika yuklanmoqda...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            padding: { xs: 1, sm: 2, md: 3 }, 
            backgroundColor: '#f4f6f8', 
            minHeight: '100vh',
            overflowX: 'hidden' 
        }}>
            <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'start', mb: 2 }}>
                <Typography variant="h4" component="h1" sx={{ mb: { xs: 2, sm: 0 } }}>
                    ANALITIKA
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={handleUpdateAnalytics}
                    disabled={isUpdating}
                >
                    {isUpdating ? "Yuklanmoqda..." : "Malumotlarni yangilash"}
                </Button>
            </Box>
        
            {updateStatus && (
                <Alert severity={error && updateStatus.includes("failed") ? "error" : "info"} sx={{ mb: 2 }}>
                    {updateStatus}
                </Alert>
            )}
            {error && !updateStatus.includes("failed") && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    Error loading data: {error}
                </Alert>
            )}
        
         
            <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                <Tabs
                    value={period}
                    onChange={(e, newValue) => setPeriod(newValue)}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    sx={{ 
                        backgroundColor: 'white', 
                        borderRadius: 1, 
                        mb: 3, 
                        boxShadow: 1, 
                        minWidth: 'max-content'
                    }}
                >
                    <Tab label="Bugun" value="today" />
                    <Tab label="Shu xafta" value="week" />
                    <Tab label="Shu oy" value="month" />
                    <Tab label="Shu yil" value="year" />
                </Tabs>
            </Box>
    
            <Box sx={{ width: '100%', overflowX: 'hidden' }}>
                <Grid container spacing={1}>
                    {cardItems.map((item) => {
                        let value = currentPeriodData[item.key];
                        if (value === undefined || value === null) {
                            value = "N/A";
                        } else if (item.format === "currency") {
                            value = formatPrice(value);
                        } else if (item.suffix) {
                            value = `${value}${item.suffix}`;
                        }
        
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={2} key={item.key}>
                                <Card sx={{ 
                                    display: "flex", 
                                    flexDirection: 'row',  
                                    alignItems: "center", 
                                    p: 2, 
                                    height: '100%', 
                                    transition: 'box-shadow 0.3s', 
                                    '&:hover': { boxShadow: 3 } 
                                }}>
                                    <Box sx={{ mr: 2, color: 'primary.main', flexShrink: 0 }}>
                                        {item.icon}
                                    </Box>
                                    <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {item.label}
                                        </Typography>
                                        <Typography variant="h5" component="div" fontWeight="bold">{value}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        
            <Card sx={{ mt: 4, boxShadow: 1 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Mablag' aylanmasi ({period.charAt(0).toUpperCase() + period.slice(1)})
                    </Typography>
                    {currentChartData.length > 0 ? (
                        <Box sx={{ width: '100%', overflowX: 'auto' }}>
                            <ResponsiveContainer width="100%" height={350}>
                                <AreaChart data={currentChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#1976d2" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="date" stroke="#666" tick={{ fontSize: 12 }} />
                                    <YAxis stroke="#666" tick={{ fontSize: 12 }} tickFormatter={(value) =>
                                        new Intl.NumberFormat('en-US', {
                                            notation: 'compact',
                                            compactDisplay: 'short'
                                        }).format(value)} />
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <Tooltip formatter={(value) => formatPrice(value)} />
                                    <Area
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#1976d2"
                                        strokeWidth={2}
                                        fill="url(#colorTotal)"
                                        fillOpacity={1}
                                        activeDot={{ r: 6, strokeWidth: 2, fill: '#fff' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Box>
                    ) : (
                        <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
                            Tanlangan sana bo'yicha hech qanday Grafik yo'q.
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
        
    );
};

export default Dashboard;
