import React, { useState } from "react";
import { createPortal } from "react-dom";

export function Dialog({ children, onClose }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.(); // 외부 클릭 시 모달 닫힘
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded shadow-lg">{children}</div>
    </div>,
    document.body
  );
}

export function DialogTrigger({ children, onClick, css }) {
  return (
    <button onClick={onClick} className={css}>
      {children}
    </button>
  );
}

export function DialogContent({ children }) {
  return <div>{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="text-xl font-bold mb-2">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2>{children}</h2>;
}
