import React from "react";

const Spinner = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px 0" }}>
    <div
      style={{
        width: "30px",
        height: "30px",
        border: "4px solid #ccc",
        borderTop: "4px solid #6772e5",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    ></div>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

export default Spinner;
