import React from 'react'

const Select = ({ label, value, onChange, options, className = "" }) => {
  return (
    <div className={`flex flex-col gap-1 mb-4 ${className}`}>
      <label className="text-[11px] font-bold text-gray-500 uppercase">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 px-3 py-1.5 rounded text-sm outline-none bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer"
      >
        {options.map((option) => (
          <option key={option} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
