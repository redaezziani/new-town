import React from "react";

interface ResetPasswordTemplateProps {
  name: string;
  email: string;
  secret: string;
}

const ResetPasswordTemplate: React.FC<ResetPasswordTemplateProps> = ({
  name,
  email,
  secret,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
    <h1 style={{ fontSize: '24px', color: '#00db80', fontWeight: 'bold', marginBottom: '10px' }}>Reset your password</h1>
    <p style={{ fontSize: '16px', color: 'gray', fontWeight: '600', marginBottom: '10px' }}>Hi {name},</p>
    <p style={{ fontSize: '16px', marginBottom: '10px' }}>We have received a request to reset your password. To proceed with the password reset, please click the link below:</p>
    <a href={`http://localhost:3000/auth/reset-password/${secret}`} target="_blank" style={{ fontSize: '16px', color: 'blue', textDecoration: 'none', marginBottom: '10px' }}>
      Reset your password: {email}
    </a>
    <p style={{ fontSize: '16px', marginBottom: '10px' }}>If you did not request a password reset, please ignore this email.</p>
  </div>
);

export default ResetPasswordTemplate;
