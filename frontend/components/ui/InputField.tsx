import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "Placeholder text",
  type = "text",
  error,
}) => {
  return (
    <div className="flex flex-col w-full text-left">
      <label className="font-bold text-[14px] text-[#2D2D2D] mb-1 font-sans">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-300 rounded-md py-2.5 px-4 font-body text-[14px] text-gray-800 placeholder-gray-400 outline-none focus:border-gray-500 transition-colors shadow-inner"
      />
      {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default InputField;
