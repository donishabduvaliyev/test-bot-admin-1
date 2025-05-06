import React, { useState, useEffect, useCallback } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Tabs,
    Tab,
    Box,
    Button, // Added Button for manual update
    CircularProgress, // Added for loading state
    Alert, // Added for error messages
} from "@mui/material";
import {
    ShoppingCart,
    AttachMoney,
    DeliveryDining,
    LocalShipping,
    Route,
    People,
    Refresh as RefreshIcon, // Added for update button
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

// --- Configuration ---
// IMPORTANT: Replace this with the actual URL of your deployed Admin Server API
const API_BASE_URL = 'https://test-admin-server-ls4z.onrender.com'; // Example: 'https://your-admin-server.onrender.com'
const ANALYTICS_ENDPOINT = `${API_BASE_URL}/api/analytics/dashboardAnalytics`;
const UPDATE_ANALYTICS_ENDPOINT = `${API_BASE_URL}/api/analytics/updateAnalytics`;

// If your API requires an API key, set it here. Otherwise, leave as null or an empty string.
const API_KEY = null; // Example: 'YOUR_API_KEY_IF_NEEDED';

// --- Sample Data (Fallback) ---
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
            // Add more months for a full year if available
        ],
    },
};

// --- Card Configuration ---
const cardItems = [
    { label: "Total Orders", key: "orders", icon: <ShoppingCart fontSize="large" /> },
    { label: "Total Revenue", key: "price", icon: <AttachMoney fontSize="large" />, format: "currency" },
    { label: "Unique Users", key: "users", icon: <People fontSize="large" /> },
    { label: "Delivery Orders", key: "deliveryOrders", icon: <DeliveryDining fontSize="large" /> },
    { label: "Delivery Revenue", key: "deliveryPrice", icon: <LocalShipping fontSize="large" />, format: "currency" },
    { label: "Delivery Distance (km)", key: "deliveryDistance", icon: <Route fontSize="large" />, suffix: " km" },
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
        if (!isManualUpdate) setLoading(true); // Only show full page loading on initial load
        setError(null);
        if (isManualUpdate) setUpdateStatus('Fetching latest data...');

        try {
            const headers = { 'Content-Type': 'application/json' };
            if (API_KEY) {
                headers['X-API-Key'] = API_KEY; // Or your specific API key header
            }

            const response = await fetch(ANALYTICS_ENDPOINT, { method: 'GET', headers });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || 'Failed to fetch analytics'}`);
            }
            const data = await response.json();

            if (data && Object.keys(data).length > 0 && data.today) { // Basic check if data seems valid
                setAnalyticsData(data);
                if (isManualUpdate) setUpdateStatus('Data refreshed successfully!');
            } else {
                console.warn("Fetched data is empty or invalid, using fallback sample data.");
                setAnalyticsData(sampleData); // Fallback to sample data if fetched data is not good
                if (isManualUpdate) setUpdateStatus('Fetched data was empty, using sample data.');
            }

        } catch (err) {
            console.error('Error fetching analytics data:', err);
            setError(err.message);
            setAnalyticsData(sampleData); // Fallback to sample data on error
            if (isManualUpdate) setUpdateStatus(`Failed to refresh data: ${err.message}`);
        } finally {
            if (!isManualUpdate) setLoading(false);
            if (isManualUpdate) {
                setTimeout(() => {
                    setUpdateStatus(''); // Clear status after a few seconds
                }, 4000);
            }
        }
    }, []);

    useEffect(() => {
        fetchAnalyticsData();
    }, [fetchAnalyticsData]);

    const handleUpdateAnalytics = async () => {
        setIsUpdating(true);
        setUpdateStatus('Requesting analytics update...');
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
            setUpdateStatus(`Update process initiated: ${responseData.message}. Refreshing data shortly...`);
            setTimeout(() => fetchAnalyticsData(true), 2000); // Fetch new data after a short delay

        } catch (err) {
            console.error('Error triggering analytics update:', err);
            setUpdateStatus(`Update request failed: ${err.message}`);
            setError(err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    // Determine current data for the selected period, falling back to sample if needed
    const currentPeriodData = (analyticsData && analyticsData[period]) ? analyticsData[period] : sampleData[period];
    const currentChartData = (currentPeriodData && Array.isArray(currentPeriodData.chart)) ? currentPeriodData.chart : [];


    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading Analytics...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: { xs: 1, sm: 2, md: 3 }, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                <Typography variant="h4" component="h1" sx={{ mb: { xs: 2, sm: 0 } }}>
                    Dashboard
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={handleUpdateAnalytics}
                    disabled={isUpdating}
                >
                    {isUpdating ? "Updating..." : "Update Analytics"}
                </Button>
            </Box>
            {updateStatus && (
                <Alert severity={error && updateStatus.includes("failed") ? "error" : "info"} sx={{ mb: 2 }}>
                    {updateStatus}
                </Alert>
            )}
            {error && !updateStatus.includes("failed") && ( // Show general error if not covered by updateStatus
                <Alert severity="error" sx={{ mb: 2 }}>
                    Error loading data: {error}
                </Alert>
            )}


            <Tabs
                value={period}
                onChange={(e, newValue) => setPeriod(newValue)}
                centered
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                sx={{ backgroundColor: 'white', borderRadius: 1, mb: 3, boxShadow: 1 }}
            >
                <Tab label="Today" value="today" />
                <Tab label="This Week" value="week" />
                <Tab label="This Month" value="month" />
                <Tab label="This Year" value="year" />
            </Tabs>

            <Grid container spacing={3}>
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
                        <Grid item xs={12} sm={6} md={4} lg={2} key={item.key}> {/* Adjusted lg for 6 items */}
                            <Card sx={{ display: "flex", alignItems: "center", p: 2, height: '100%', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 3 } }}>
                                <Box sx={{ mr: 2, color: 'primary.main' }}>{item.icon}</Box>
                                <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}> {/* Reduced padding */}
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

            <Card sx={{ mt: 4, boxShadow: 1 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Revenue Trend ({period.charAt(0).toUpperCase() + period.slice(1)})
                    </Typography>
                    {currentChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart data={currentChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}> {/* Adjusted margins */}
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#1976d2" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date" stroke="#666" tick={{ fontSize: 12 }} />
                                <YAxis stroke="#666" tick={{ fontSize: 12 }} tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(value)} />
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
                    ) : (
                        <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
                            No chart data available for this period.
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default Dashboard;
