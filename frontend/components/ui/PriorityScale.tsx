import React from "react";

interface PriorityScaleProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

const PriorityScale: React.FC<PriorityScaleProps> = ({
  label,
  value,
  onChange,
}) => {
  const options = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  return (
    <div className="flex flex-col w-full text-left">
      <label 
        className="font-bold text-[#2D2D2D] font-drowner tracking-widest leading-relaxed"
        style={{ 
          fontSize: "var(--form-font-size)",
          marginBottom: "var(--form-margin-bottom)"
        }}
      >
        {label}
      </label>
      
      <div className="flex flex-col w-full mt-2">
        <div className="flex justify-between items-center w-full max-w-2xl px-2">
          {options.map((option) => {
            const isSelected = value === option;
            return (
              <button
                key={option}
                type="button"
                suppressHydrationWarning
                onClick={() => onChange(option)}
                className="flex flex-col items-center cursor-pointer focus:outline-none"
                style={{ gap: "calc(var(--form-radio-gap) * 0.5)" }}
              >
                <div 
                  className="rounded-full border border-black flex items-center justify-center bg-white flex-shrink-0 transition-colors"
                  style={{
                    width: "var(--form-radio-size)",
                    height: "var(--form-radio-size)",
                  }}
                >
                  {isSelected && (
                    <div 
                      className="rounded-full bg-[#2B918E]"
                      style={{
                        width: "var(--form-radio-dot-size)",
                        height: "var(--form-radio-dot-size)"
                      }}
                    />
                  )}
                </div>
                <span 
                  className={`font-body leading-tight ${isSelected ? 'text-[#2B918E] font-bold' : 'text-gray-800'}`}
                  style={{ fontSize: "calc(var(--form-font-size) * 0.9)" }}
                >
                  {option}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Description Text */}
        <div className="flex justify-between w-full max-w-2xl mt-2 text-gray-500 italic font-body text-xs px-2">
          <span className="text-left w-20 leading-tight">1 - Tidak Prioritas</span>
          <span className="text-right w-20 leading-tight">10 - Sangat Prioritas</span>
        </div>
      </div>
    </div>
  );
};

export default PriorityScale;
