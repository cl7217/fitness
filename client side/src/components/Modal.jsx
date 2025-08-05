import React, { useEffect } from "react";

export const Modal = ({ isOpen, onClose, title, children }) => {
  // Close modal with ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        margin: 0,
        padding: 0,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '2px solid #EF6C00',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(239, 108, 0, 0.2)',
          padding: '20px',
          width: '400px',
          maxWidth: '90%',
          fontFamily: "'Segoe UI', sans-serif",
          color: '#333',
          position: 'relative',
          animation: 'popup 0.25s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#EF6C00',
            padding: '4px',
            borderRadius: '50%',
            transition: 'all 0.2s ease-in-out',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(239, 108, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          ✕
        </button>
        {title && (
          <h2 style={{
            color: '#EF6C00',
            marginBottom: '16px',
            fontSize: '24px',
            fontWeight: '600',
            fontFamily: "'Segoe UI Semibold', sans-serif",
          }}>
            {title}
          </h2>
        )}
        <div>{children}</div>
      </div>

      <style jsx>{`
        @keyframes popup {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}; 