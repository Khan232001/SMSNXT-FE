import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
    const location = useLocation();
    const [pageTitle, setPageTitle] = useState('Dashboard');
    const [isLoading, setIsLoading] = useState(true);
    const isMobile = useIsMobile();

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
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar title={pageTitle} />
                <main className={(
                    "flex-1 overflow-y-auto transition-opacity duration-300 p-6",
                    isLoading ? "opacity-0" : "opacity-100 animate-fade-in"
                )}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
