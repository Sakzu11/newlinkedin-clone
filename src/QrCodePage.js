import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function QrCodePage() {
  const navigate = useNavigate();
  const qrImagePath = process.env.PUBLIC_URL + '/assets/qr.png';
  

  return (
    <div className="qr-page">
      <div className="qr-page__container">
     

        <h2>Your QR Code</h2>
        <img src={qrImagePath} alt="QR Code" />
      </div>
    </div>
  );
}
