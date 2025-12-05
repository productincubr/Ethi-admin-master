import React from 'react';
import { motion } from 'framer-motion';

export default function CongratsModal({ open, onClose, title = 'Congratulations!', subtitle = 'Account created successfully.' }) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(0,0,0,0.36)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, lineHeight: 1 }}>🎉</div>
          <h2 style={{ marginTop: 8, marginBottom: 6, fontSize: 20, fontWeight: 700 }}>{title}</h2>
          <p style={{ color: '#555', marginBottom: 18 }}>{subtitle}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd' }}>Close</button>
            <button onClick={() => { onClose(); }} style={{ padding: '8px 16px', borderRadius: 8, background: '#2ea677', color: '#fff' }}>Continue</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
