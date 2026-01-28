import React from "react";

const Modal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h1 className="text-xl font-bold text-gray-800">
            Create New Incident
          </h1>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600">Form coming soon...</p>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button className="btn-primary">Save Incident</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
