import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const NetworkAnalysis = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SNORT_WS_URL, {
      query: { token: import.meta.env.VITE_SNORT_TOKEN },
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log('✅ Connected to Snort WebSocket Server');
    });

    socket.on('snort_alert', (data) => {
      console.log('🚨 Snort Alert:', data);
      setAlerts(prev => [{
        id: Date.now(),
        message: data.message,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev]);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
    });

    return () => {
      socket.disconnect();
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