import React from "react";

interface RadioGroupProps {
  label: string;
  options: string[];
  selected: string;
  onChange: (val: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full text-left">
      <label className="font-bold text-[14px] text-[#2D2D2D] mb-2 font-sans">
        {label}
      </label>
      <div className="flex flex-col gap-3">
        {options.map((option, idx) => {
          const isSelected = selected === option;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(option)}
              className="flex items-start gap-3 cursor-pointer text-left focus:outline-none"
            >
              {/* Custom Radio Button */}
              <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center bg-white mt-0.5 flex-shrink-0">
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-black" />
                )}
              </div>
              <span className="font-body text-[14px] text-gray-800 leading-tight">
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;
