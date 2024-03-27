'use client'
import React from 'react';
import { motion } from 'framer-motion';

const PathAnimation = () => {
  return (
    <div style={{ position: 'relative', width: '500px', height: '500px' }}>
      <svg width="100%" height="100%" viewBox="0 0 500 500">
        <path 
          id="motionPath" 
          d="M 100,200 Q 200,0 300,200 T 500,200" 
          fill="none" 
          stroke="black" 
          strokeWidth="2" 
        />
      </svg>
      <motion.span
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '20px',
          height: '20px',
          background: 'red',
          borderRadius: '50%',
        }}
        animate={{ 
          motionPath: { 
            path: "#motionPath", 
            align: 'none', 
            autoRotate: true 
          } 
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
    </div>
  );
};

export default PathAnimation;
