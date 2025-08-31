import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const NetworkAnalysis = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const websocket = new WebSocket(`${import.meta.env.VITE_SNORT_WS_URL}?token=${import.meta.env.VITE_SNORT_TOKEN}`);

    websocket.onopen = () => {
      console.log('✅ WebSocket connection established');
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('🚨 Snort Alert:', data);
      setAlerts(prev => [{
        id: Date.now(),
        message: data.message,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev]);
    };

    websocket.onclose = () => {
      console.log('❌ WebSocket connection closed');
    };

    return () => {
      websocket.close();
    };
  }, []);

  return (
    <div className="network-analysis">
      <h2>Network Intrusion Alerts</h2>
      <div className="alert-list">
        {alerts.map(alert => (
          <div key={alert.id} className="alert-item">
            <span className="alert-time">[{alert.timestamp}]</span>
            <span className="alert-message">{alert.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkAnalysis;