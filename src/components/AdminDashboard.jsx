import React from "react";

const AdminDashboard = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0e17" }}>
      <iframe
        src="/dashboard-analytics.html"
        title="Dashboard Analytics"
        style={{ width: "100vw", height: "100vh", border: "none", minHeight: "100vh" }}
        allowFullScreen
      />
    </div>
  );
};

export default AdminDashboard;
