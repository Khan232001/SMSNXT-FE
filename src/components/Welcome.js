import React from "react";
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardContent,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Chip,
    Avatar,
    Divider,
    Box,
    TextField,
    IconButton
} from "@mui/material";
import {
    ExpandMore,
    Chat,
    Phone,
    LocalOffer,
    CheckCircle,
    Language,
    SupportAgent,
    VerifiedUser,
    ArrowForward,
    MailOutline,
    Facebook,
    Twitter,
    LinkedIn
} from "@mui/icons-material";
import { green, blue, orange, purple } from "@mui/material/colors";

const Welcome = () => {
    const faqs = [
        {
            question: "What's the difference between 10DLC and toll-free numbers?",
            answer: "10DLC (10-Digit Long Code) numbers are standard local numbers ideal for high-volume messaging with better deliverability. Toll-free numbers (8XX) are better for nationwide campaigns and customer support."
        },
        {
            question: "How long does number verification take?",
            answer: "Typically 1-3 business days. We'll notify you via email once completed."
        },
        {
            question: "Can I port my existing number?",
            answer: "Yes! We support number porting from most carriers. Contact support to initiate the process."
        },
        {
            question: "What messaging limits apply?",
            answer: "Toll-free: 200 messages/minute. Local numbers: 1 message/second. 10DLC: Up to 100 messages/second with proper registration."
        },
        {
            question: "How does the free trial work?",
            answer: "Get your first number free for 30 days. No credit card required. Cancel anytime before trial ends."
        }
    ];

    return (
        <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto', bgcolor: 'background.default' }}>
            {/* Hero Section */}
            <Box textAlign="center" mb={6}>
                <Chip
                    label="New User Setup"
                    color="primary"
                    sx={{ mb: 2, px: 2, fontSize: '0.75rem' }}
                />
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Welcome to Your Messaging Hub! 🚀
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                    Set up your communication channels and start engaging with customers through SMS, MMS, and live chat.
                </Typography>
            </Box>

            {/* Progress Indicators */}
            <Grid container spacing={2} mb={6}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', borderLeft: `4px solid ${blue[500]}` }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600], mr: 2 }}>
                                    <CheckCircle />
                                </Avatar>
                                <Typography variant="h6">Step 1: Choose Number</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Select your preferred number type and area code
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', borderLeft: `4px solid ${orange[500]}` }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Avatar sx={{ bgcolor: orange[100], color: orange[600], mr: 2 }}>
                                    <VerifiedUser />
                                </Avatar>
                                <Typography variant="h6">Step 2: Verification</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Complete business verification for compliance
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', borderLeft: `4px solid ${green[500]}` }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Avatar sx={{ bgcolor: green[100], color: green[600], mr: 2 }}>
                                    <Chat />
                                </Avatar>
                                <Typography variant="h6">Step 3: Start Messaging</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Launch campaigns or enable live chat
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Number Selection Cards */}
            <Grid container spacing={3} mb={6}>
                <Grid item xs={12} md={6}>
                    <Card sx={{
                        border: '2px solid',
                        borderColor: blue[200],
                        '&:hover': { borderColor: blue[400] },
                        transition: '0.3s'
                    }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Language sx={{ fontSize: 40, color: blue[600], mr: 2 }} />
                                <div>
                                    <Typography variant="h6" fontWeight={600}>
                                        Toll-Free Number
                                        <Chip label="Recommended" color="primary" size="small" sx={{ ml: 1 }} />
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Free for 1 month • 8XX prefix • US/Canada
                                    </Typography>
                                </div>
                            </Box>
                            <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
                                <li><Typography variant="body2">Unlimited SMS/MMS</Typography></li>
                                <li><Typography variant="body2">High throughput (200/min)</Typography></li>
                                <li><Typography variant="body2">24/7 Support</Typography></li>
                            </ul>
                            <Button
                                variant="contained"
                                fullWidth
                                endIcon={<ArrowForward />}
                                sx={{ py: 1.5 }}
                            >
                                Choose Toll-Free Number
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{
                        border: '2px solid',
                        borderColor: green[200],
                        '&:hover': { borderColor: green[400] },
                        transition: '0.3s'
                    }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <SupportAgent sx={{ fontSize: 40, color: green[600], mr: 2 }} />
                                <div>
                                    <Typography variant="h6" fontWeight={600}>
                                        Local Number
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Free for 1 month • Area code selection
                                    </Typography>
                                </div>
                            </Box>
                            <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
                                <li><Typography variant="body2">Local presence</Typography></li>
                                <li><Typography variant="body2">Voice/SMS capabilities</Typography></li>
                                <li><Typography variant="body2">Call forwarding</Typography></li>
                            </ul>
                            <Link to="/modal">
                            <Button
                                variant="outlined"
                                fullWidth
                                endIcon={<ArrowForward />}
                                sx={{ py: 1.5, borderWidth: 2 }}
                            >
                                Choose Local Number
                            </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Additional Features */}
            <Typography variant="h6" fontWeight={600} mb={3}>More Options</Typography>
            <Grid container spacing={2} mb={6}>
                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<Chat sx={{ color: purple[500] }} />}
                        sx={{
                            py: 3,
                            borderStyle: 'dashed',
                            '&:hover': { borderStyle: 'solid' }
                        }}
                    >
                        Connect CPaaS Provider
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<Phone sx={{ color: orange[500] }} />}
                        sx={{
                            py: 3,
                            borderStyle: 'dashed',
                            '&:hover': { borderStyle: 'solid' }
                        }}
                    >
                        Setup Live Chat
                    </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<LocalOffer sx={{ color: green[500] }} />}
                        sx={{
                            py: 3,
                            borderStyle: 'dashed',
                            '&:hover': { borderStyle: 'solid' }
                        }}
                    >
                        View Pricing Plans
                    </Button>
                </Grid>
            </Grid>

            {/* FAQ Section */}
            <Typography variant="h5" fontWeight={600} mb={3}>Frequently Asked Questions</Typography>
            <Box mb={6}>
                {faqs.map((faq, index) => (
                    <Accordion key={index} sx={{ mb: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography fontWeight={500}>{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="text.secondary">{faq.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

        
        </Box>
    );
};

export default Welcome;