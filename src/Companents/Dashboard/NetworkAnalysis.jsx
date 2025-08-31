import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NetworkAnalysis = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://your-n8n-instance.com/webhook/IDS-Alert"
      );
      setAlerts(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching alerts:", err);
      setError("Failed to load alerts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="network-analysis p-6">
      <h1 className="text-xl font-bold mb-4">Network Analysis Dashboard</h1>
      
      {loading && <p className="text-gray-500">Loading alerts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <ul className="space-y-2">
        {alerts.map((alert, index) => (
          <li 
            key={index} 
            className="border p-3 bg-white rounded shadow hover:bg-gray-50"
          >
            <strong className="text-gray-800">{alert.timestamp}</strong> - 
            <span className="text-gray-600">{alert.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NetworkAnalysis;