// import React, { useState } from "react";
// import { Card, CardContent, CardHeader, TextField, MenuItem, Button } from "@mui/material";
// import {  Schedule } from "@mui/icons-material";
// import { DatePicker, TimePicker } from "@mui/x-date-pickers";
// import dayjs from "dayjs";

// const ScheduledMessages = () => {
//     const [message, setMessage] = useState("");
//     const [date, setDate] = useState(dayjs());
//     const [time, setTime] = useState(dayjs());
//     const [recipients, setRecipients] = useState("");
//     const [scheduledMessages, setScheduledMessages] = useState([]);

//     const handleSchedule = () => {
//         if (!message || !recipients) return;
//         const newScheduledMessage = {
//             id: Date.now(),
//             message,
//             date: date.format("YYYY-MM-DD"),
//             time: time.format("HH:mm"),
//             recipients,
//         };
//         setScheduledMessages([...scheduledMessages, newScheduledMessage]);
//         setMessage("");
//         setRecipients("");
//     };

//     return (
//         <div className="p-6">
//             <Card className="shadow-md">
//                 <CardHeader title="Schedule a Message" />
//                 <CardContent>
//                     <div className="grid gap-4">
//                         <TextField
//                             label="Message"
//                             multiline
//                             rows={3}
//                             fullWidth
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                         />
//                         <TextField
//                             label="Recipients"
//                             fullWidth
//                             value={recipients}
//                             onChange={(e) => setRecipients(e.target.value)}
//                             helperText="Enter comma-separated phone numbers"
//                         />
//                         <DatePicker label="Select Date" value={date} onChange={setDate} />
//                         <TimePicker label="Select Time" value={time} onChange={setTime} />
//                         <Button
//                             className="bg-blue-500 hover:bg-blue-600"
//                             onClick={handleSchedule}
//                             startIcon={<Schedule />}>
//                             Schedule Message
//                         </Button>
//                     </div>
//                 </CardContent>
//             </Card>

//             <div className="mt-6">
//                 <Card className="shadow-md">
//                     <CardHeader title="Scheduled Messages" />
//                     <CardContent>
//                         {scheduledMessages.length === 0 ? (
//                             <p className="text-gray-500">No scheduled messages.</p>
//                         ) : (
//                             <ul className="space-y-3">
//                                 {scheduledMessages.map((msg) => (
//                                     <li key={msg.id} className="p-4 border rounded-lg">
//                                         <p className="font-semibold">{msg.message}</p>
//                                         <p className="text-sm text-gray-500">To: {msg.recipients}</p>
//                                         <p className="text-sm text-gray-500">
//                                             Scheduled for: {msg.date} at {msg.time}
//                                         </p>
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// };

// export default ScheduledMessages;
