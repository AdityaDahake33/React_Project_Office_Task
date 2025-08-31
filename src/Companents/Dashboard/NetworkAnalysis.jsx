import React, { useEffect, useState } from 'react';

const NetworkAnalysis = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Using environment variable from .env
    const socket = new WebSocket(import.meta.env.VITE_SNORT_WS_URL);

    socket.onmessage = (event) => {
      setAlerts(prev => [...prev, event.data]);
    };

    socket.onopen = () => {
      console.log("✅ Connected to WebSocket server");
    };

    socket.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
    };

    return () => socket.close();
  }, []);

  return (
    <div className="network-analysis p-6">
      <h1 className="text-xl font-bold">🚨 Live Snort Alerts</h1>
      <ul>
        {alerts.map((alert, i) => (
          <li 
            key={i} 
            className="alert-item border p-2 my-2 bg-white rounded shadow"
          >
            {alert}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NetworkAnalysis;