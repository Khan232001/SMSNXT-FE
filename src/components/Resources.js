import { useNavigate } from "react-router-dom";
import { Grid, Typography, Paper } from "@mui/material";

const resources = [
    {
        img: "./imgs/team.png",
        title: "Group Texts",
        description: "Compose and send group texts to your subscribed contact",
        link: "/quick-group-messaging",
    },
    {
        img: "./imgs/convo.png",
        title: "Conversation",
        description: "Send and receive 1-on-1 texts with your contacts",
        link: "/quick-group-messaging",
    },
    {
        img: "./imgs/email.png",
        title: "Campaign",
        description: "Automate messages when subscribers join one of your contact groups",
        link: "/campaign-management",
    },
    {
        img: "./imgs/customer-service.png",
        title: "Contacts",
        description: "View and edit your list of subscribed contacts",
        link: "/contact-management",
    },
    {
        img: "./imgs/website.png",
        title: "Keywords",
        description: "Use keywords to create auto-replies and allow people to easily subscribe to your texts",
        link: "/tags-management",
    },
    {
        img: "./imgs/sign-up.png",
        title: "Sign-up forms",
        description: "Create shareable or embedded forms for new contacts to subscribe to your messages",
        link: null, // No navigation for this one
    },
];

const Resources = () => {
    const navigate = useNavigate();

    return (
        <Grid className="mt-6">
            <Typography variant="h4" className="text-2xl font-semibold text-gray-700">
                Resources
            </Typography>
            <Paper elevation={3} className="p-5 mt-6 shadow-md rounded-lg bg-white">
                <div className="quick-links-grid">
                    {resources.map((item, index) => (
                        <div
                            key={index}
                            className="box"
                            onClick={() => item.link && navigate(item.link)}
                            style={{ cursor: item.link ? "pointer" : "default" }}
                        >
                            <img src={item.img} alt={item.title} />
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <h3>Send a Group Text</h3>
                        </div>
                    ))}
                </div>
            </Paper>
        </Grid>
    );
};

export default Resources;