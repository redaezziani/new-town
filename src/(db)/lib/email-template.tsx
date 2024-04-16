import React from "react";

interface EmailTemplateProps {
  firstName: string;
  token: string;
  email: string;
  id: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  token,
  email,
  id,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif' }}>
    <div
      style={{
        backgroundColor: '#f0f4f8',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          padding: '16px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }}
      >
        <img
          src="https://i.pinimg.com/originals/0a/52/21/0a52215b663fbdf4781950b18b9473d7.png"
          alt="logo"
          style={{ width: '56px', height: 'auto' }}
        />
        <h1
          style={{
            fontSize: '24px',
            color: '#374151',
            fontWeight: 'bold',
            textAlign: 'left',
            margin: '0',
          }}
        >
          Verify your Squid account
        </h1>
        <p style={{ color: '#4b5563', fontWeight: '600' }}>
          Hi {firstName}
        </p>
        <p style={{ color: '#4b5563', marginBottom: '16px' }}>
          Thanks for signing up for our service. We're excited to have you on board. Before you can start using our service, please verify your email address by clicking the link below:
        </p>
        <p
          style={{
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            height: '48px',
            borderRadius: '4px',
            margin: '0',
          }}
        >
          {token}
        </p>
        <a
          href={`http://localhost:3000/auth/verification/${id}`}
          target="_blank"
          style={{ color: '#3b82f6', fontWeight: 'bold', textDecoration: 'none' }}
        >
          Verify your email address
        </a>
        <hr
          style={{
            border: 'none',
            borderBottom: '1px solid #e5e7eb',
            margin: '16px 0',
          }}
        />
        <p style={{ color: '#4b5563', marginBottom: '16px' }}>
          If you have any questions, please don't hesitate to contact us.
        </p>
      </div>
    </div>
  </div>
);

export default EmailTemplate;
