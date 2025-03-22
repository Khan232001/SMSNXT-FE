import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const UserLayout = () => {
    const location = useLocation();
    const [pageTitle, setPageTitle] = useState("Dashboard");
    const [isLoading, setIsLoading] = useState(true);

    // Define page titles for different routes
    const pageTitles = {
        "/dashboard": "Dashboard",
        "/campaign": "Campaign Management",
        "/messaging": "Quick Messaging",
        "/sender": "Sender ID",
        "/subscription": "Subscription Plans",
        "/order": "Order & Recharge",
        "/contact-management": "Contact Management",
        "/tags": "Manage Tags",
        "/contacts": "Manage Contacts",
        "/reporting": "Reporting",
    };

    const hiddenRoutes = ["/login", "/sign", "/forgot-password"];

    // Check if the current route is in the hiddenRoutes array
    const hideLayout = hiddenRoutes.includes(location.pathname);

    useEffect(() => {
        // Find the title based on the current route
        const foundTitle = Object.keys(pageTitles).find((path) =>
            location.pathname.includes(path)
        );
        setPageTitle(foundTitle ? pageTitles[foundTitle] : "Dashboard");

        // Simulate loading effect
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, [location]);

    return (
        <Box sx={{ display: "flex", bgcolor: "#F8F9FB", minHeight: "100vh" }}>
            {!hideLayout && (
                <Box
                    sx={{
                        display: { xs: "none", sm: "block" },
                        width: { sm: "240px" },
                        position: "fixed",
                        top: 0,
                        left: 0,
                        bgcolor: "#263238",
                        color: "#FFF",
                    }}
                >
                    <Sidebar hiddenRoutes={hiddenRoutes} />
                </Box>
            )}

            <Box
                sx={{
                    flex: 1,
                    marginLeft: hideLayout ? 0 : { xs: 0, sm: "240px" },
                    padding: "16px",
                    paddingTop: "0px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Navbar title={pageTitle} />
                <Paper
                    elevation={3}
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                >
                    <Outlet />
                </Paper>
            </Box>
        </Box>
    );
};

export default UserLayout;
