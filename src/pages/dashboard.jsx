import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    AreaChart,
    Area,
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

const Dashboard = () => {
    const [period, setPeriod] = useState("today");
    const data = sampleData[period];

    return (
        <div className="p-4 space-y-6">
            <Tabs value={period} onValueChange={setPeriod} className="w-full">
                <TabsList className="flex flex-wrap gap-2 justify-center">
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">{data.orders}</CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total Price ($)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">{data.price}</CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Delivery Orders</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">{data.deliveryOrders}</CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Delivery Price ($)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">{data.deliveryPrice}</CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Delivery Distance (km)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">{data.deliveryDistance}</CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">{data.users}</CardContent>
                </Card>
            </div>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-lg">Orders & Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={320}>
                        <AreaChart data={data.chart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" stroke="#888" />
                            <YAxis stroke="#888" />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#4f46e5"
                                fillOpacity={1}
                                fill="url(#colorTotal)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
