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
        "http://localhost:3000/api/alerts"
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
      {error && <p className="text-red-500">{error}</p>}\
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alerts.length === 0 && !loading && !error ? (
          <p className="col-span-full text-gray-600">No alerts received yet.</p>
        ) : (
          alerts.map((alert, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <p className="text-sm text-gray-500 mb-2">
                <strong className="text-gray-700">Timestamp:</strong> {new Date(alert.timestamp).toLocaleString()}
              </p>
              <p className="text-gray-800 font-medium mb-2">
                <strong className="text-gray-700">Message:</strong> {alert.message}
              </p>
              <p className="text-gray-600 text-sm">
                <strong className="text-gray-700">Source Host:</strong> {alert.source.host}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NetworkAnalysis;