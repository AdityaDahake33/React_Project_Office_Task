import React from 'react';

const NetworkAnalysis = () => {
  return (
    <div className="network-panel" style={{
      backgroundColor: '#0a1929',
      color: '#e6f1ff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }}>
      <h2 style={{
        borderBottom: '2px solid #1e88e5',
        paddingBottom: '10px',
        marginBottom: '20px'
      }}>
        🛡️ Network Threat Analysis
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '15px'
      }}>
        <div className="metric-card" style={{
          background: '#132f4c',
          padding: '15px',
          borderRadius: '6px'
        }}>
          <h4>AI Detections</h4>
          <p style={{ fontSize: '24px', color: '#4fc3f7' }}>1,243</p>
        </div>
        
        <div className="metric-card" style={{
          background: '#132f4c',
          padding: '15px',
          borderRadius: '6px'
        }}>
          <h4>n8n Alerts</h4>
          <p style={{ fontSize: '24px', color: '#81c784' }}>327</p>
        </div>
      </div>
      
      <div style={{ marginTop: '25px' }}>
        <h4>Threat Distribution</h4>
        <div style={{
          height: '200px',
          background: '#132f4c',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10px'
        }}>
          [Security Visualization Chart]
        </div>
      </div>
    </div>
  );
};

export default NetworkAnalysis;