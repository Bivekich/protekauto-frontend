import React from "react";

interface InfoOrder1Props {
  children: React.ReactNode;
}

const InfoOrder1: React.FC<InfoOrder1Props> = ({ children }) => (
  <div
    style={{
      fontFamily: 'Onest, sans-serif',
      fontWeight: 400,
      fontSize: '14px',
      padding: '20px',
      height: '91px',
      color: '#000814',
      borderRadius: '12px',
      background: '#fff',
      boxShadow: '0 0 15px rgba(0,0,0,0.25)',
      width: '223px',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    }}
  >
    {children}
  </div>
);

export default InfoOrder1; 