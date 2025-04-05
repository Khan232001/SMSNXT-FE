import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [selectedUseCase, setSelectedUseCase] = useState(() => {
        return localStorage.getItem("selectedUseCase") || "";
    });

    // Handle Change in Selection
    const handleChange = (event) => {
        setSelectedUseCase(event.target.value);
    };

    // Save the selection to localStorage when it changes
    useEffect(() => {
        if (selectedUseCase) {
            localStorage.setItem("selectedUseCase", selectedUseCase);
        }
    }, [selectedUseCase]);

    // Handle Next Step Navigation
    const handleNextStep = () => {
        if (!selectedUseCase) {
            alert("Please select a use case before continuing.");
            return;
        }
        navigate("/compaigndetails", { state: { selectedUseCase } });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 font-poppins p-4">
            <div className="max-w-3xl w-full bg-white text-black rounded-lg p-6 shadow-lg">
                <h1 className='text-black font-bold text-2xl'>Step 1: Use Case</h1>
                <p className="mt-3 text-gray-700">A Campaign describes a specific use case and details of the messages you will be sending.</p>

                <h2 className="font-bold text-black mt-3">Please select your texting use case <span className="text-red-500">*</span></h2>

                <div className="space-y-4 font-medium mt-3">
                    {[
                        "2FA",
                        "Account Notification",
                        "Customer Care",
                        "Delivery Notification",
                        "Fraud Alert Messaging",
                        "Higher Education",
                        "Marketing",
                        "Polling and Voting",
                        "Public Service Announcement",
                        "Security Alert",
                        "Low Volume Mixed"
                    ].map((useCase) => (
                        <div key={useCase} className="flex items-center">
                            <input
                                type="radio"
                                id={useCase.toLowerCase().replace(/\s+/g, '-') }
                                name="useCase"
                                value={useCase}
                                className="text-black"
                                checked={selectedUseCase === useCase}
                                onChange={handleChange}
                            />
                            <label htmlFor={useCase.toLowerCase().replace(/\s+/g, '-')} className='ml-2 text-gray-800'>{useCase}</label>
                        </div>
                    ))}
                </div>

                {selectedUseCase && (
                    <p className='mt-4 text-lg text-gray-800'>
                        You selected: <strong>{selectedUseCase}</strong>
                    </p>
                )}
                
                <div className="flex justify-center mt-6">
                    <button 
                        onClick={handleNextStep}
                        className="bg-blue-600 text-white h-12 px-8 rounded-lg hover:bg-blue-700 font-semibold text-lg"
                    >
                        Save & Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
