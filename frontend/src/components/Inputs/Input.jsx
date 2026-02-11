import React from 'react'

const Input = ({label, placeholder, value, onChange, readOnly, type = "text", rows = 4, className =""}) => {
  const baseClass = `w-full border px-3 py-1.5 rounded text-sm outline-none transition-all ${
    readOnly 
      ? "bg-gray-50/50 border-gray-200 text-gray-400 cursor-not-allowed italic" 
      : "border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/20"
  }`;
  return (
    <div className={`flex flex-col gap-1 mb-4 ${className}`}>
        <label className='text-[11px] font-bold text-gray-500 uppercase tracking-wide'>{label}</label>
       {type === "textarea" ? (
         <textarea
         type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
        className={`${baseClass} resize-none`}
        />
       ) : (
         <input
         type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`${baseClass} uppercase font-mono`}
        />
       )}
    </div>
  )
}

export default Input
