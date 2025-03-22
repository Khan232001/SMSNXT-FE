import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const UserLayout = () => {



 const location = useLocation();
    const [pageTitle, setPageTitle] = useState('Dashboard');
    const [isLoading, setIsLoading] = useState(true);
    console.log(pageTitle)
    // Set page title based on route
    useEffect(() => {
        const path = location.pathname;

        if (path.includes('/dashboard')) {
            setPageTitle('Dashboard');
        } else if (path.includes('/campaign')) {
            setPageTitle('Campaign Management');
        } else if (path.includes('/messaging')) {
            setPageTitle('Quick Messaging');
        } else if (path.includes('/sender')) {
            setPageTitle('Sender ID');
        } else if (path.includes('/subscription')) {
            setPageTitle('Subscription Plans');
        } else if (path.includes('/order')) {
            setPageTitle('Order & Recharge');
        } else if (path.includes('/contact-management')) {
            setPageTitle('Contact Management');
        } else if (path.includes('/tags')) {
            setPageTitle('Manage Tags');
        } else if (path.includes('/contacts')) {
            setPageTitle('Manage Contacts');
        } else if (path.includes('/reporting')) {
            setPageTitle('Reporting');
        } else {
            setPageTitle('Dashboard');
        }

     
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [location]);
    return (
        <Box sx={{ display: "flex", height: "100vh", bgcolor: "#F8F9FB" }}>
       
            <Box
                sx={{
                    display: { xs: "none", sm: "block" },
                    width: { sm: "240px" },
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    bgcolor: "#263238",
                    color: "#FFF",
                }}
            >
                <Sidebar />
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    flex: 1,
                    marginLeft: { xs: 0, sm: "240px" },
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
