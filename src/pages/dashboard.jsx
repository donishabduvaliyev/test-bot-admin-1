import React, { useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Tabs,
    Tab,
    Box,
} from "@mui/material";
import {
    ShoppingCart,
    AttachMoney,
    DeliveryDining,
    LocalShipping,
    Route,
    People,
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

const sampleData = {
    today: {
        orders: 15,
        price: 230,
        deliveryOrders: 8,
        deliveryPrice: 120,
        deliveryDistance: 34,
        users: 300,
        chart: [
            { date: "10:00", total: 20 },
            { date: "11:00", total: 40 },
            { date: "12:00", total: 60 },
        ],
    },
    week: {
        orders: 70,
        price: 1240,
        deliveryOrders: 30,
        deliveryPrice: 540,
        deliveryDistance: 160,
        users: 300,
        chart: [
            { date: "Mon", total: 150 },
            { date: "Tue", total: 230 },
            { date: "Wed", total: 340 },
            { date: "Thu", total: 280 },
            { date: "Fri", total: 390 },
            { date: "Sat", total: 410 },
            { date: "Sun", total: 460 },
        ],
    },
    month: {
        orders: 300,
        price: 6200,
        deliveryOrders: 150,
        deliveryPrice: 3200,
        deliveryDistance: 940,
        users: 300,
        chart: [
            { date: "Week 1", total: 1000 },
            { date: "Week 2", total: 1800 },
            { date: "Week 3", total: 2200 },
            { date: "Week 4", total: 1200 },
        ],
    },
    year: {
        orders: 3150,
        price: 71000,
        deliveryOrders: 1800,
        deliveryPrice: 36000,
        deliveryDistance: 12400,
        users: 300,
        chart: [
            { date: "Jan", total: 5000 },
            { date: "Feb", total: 6400 },
            { date: "Mar", total: 7200 },
            { date: "Apr", total: 8100 },
            { date: "May", total: 9400 },
            { date: "Jun", total: 8600 },
        ],
    },
};

const cardItems = [
    { label: "Total Orders", key: "orders", icon: <ShoppingCart /> },
    { label: "Total Price ($)", key: "price", icon: <AttachMoney /> },
    { label: "Delivery Orders", key: "deliveryOrders", icon: <DeliveryDining /> },
    { label: "Delivery Price ($)", key: "deliveryPrice", icon: <LocalShipping /> },
    { label: "Delivery Distance (km)", key: "deliveryDistance", icon: <Route /> },
    { label: "Total Users", key: "users", icon: <People /> },
];

const Dashboard = () => {
    const [period, setPeriod] = useState("today");
    const data = sampleData[period];

    return (
        <Box sx={{ padding: 2 }}>
            <Tabs
                value={period}
                onChange={(e, newValue) => setPeriod(newValue)}
                centered
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
            >
                <Tab label="Today" value="today" />
                <Tab label="Week" value="week" />
                <Tab label="Month" value="month" />
                <Tab label="Year" value="year" />
            </Tabs>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                {cardItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={item.key}>
                        <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                            <Box sx={{ mr: 2 }}>{item.icon}</Box>
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {item.label}
                                </Typography>
                                <Typography variant="h6">{data[item.key]}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Orders & Revenue Trend
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data.chart}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" stroke="#666" />
                            <YAxis stroke="#666" />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#1976d2"
                                fill="url(#colorTotal)"
                                fillOpacity={1}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Dashboard;
