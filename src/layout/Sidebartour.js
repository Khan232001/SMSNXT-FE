import Joyride from "react-joyride";
import { useState } from "react";

const SidebarTour = () => {
  const [run, setRun] = useState(true); // You can control this with a button or conditionally (e.g., localStorage)

  const steps = [
    {
      target: ".sidebar-step-getting-started",
      content: "Yahan se aap app ka quick intro le sakte ho.",
    },
    {
      target: ".sidebar-step-dashboard",
      content: "Dashboard par aapko overview milega.",
    },
    {
      target: ".sidebar-step-compose",
      content: "Compose section se naya message bhejein.",
    },
    {
      target: ".sidebar-step-campaign",
      content: "Campaigns manage karne ke liye yeh section use karein.",
    },
    {
      target: ".sidebar-step-subscriptions",
      content: "Yahan se subscription plans control kar sakte hain.",
    },
  ];

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      scrollToFirstStep
      showSkipButton
      showProgress
      styles={{
        options: {
          zIndex: 9999,
          primaryColor: "#2563eb", // Tailwind blue-600
          textColor: "#333",
        },
      }}
    />
  );
};

export default SidebarTour;
