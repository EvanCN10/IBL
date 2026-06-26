"use client";

import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selected,
  onSelect,
  placeholder = "Placeholder text",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col w-full text-left relative" ref={dropdownRef}>
      <label className="font-bold text-[14px] text-[#2D2D2D] mb-1 font-sans">
        {label}
      </label>
      
      {/* Selection Box */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-md py-2.5 px-4 font-body text-[14px] text-gray-800 text-left outline-none flex justify-between items-center cursor-pointer shadow-sm"
      >
        <span className={selected ? "text-gray-800" : "text-gray-400"}>
          {selected || placeholder}
        </span>
        <span className="text-gray-400 text-xs transform transition-transform duration-200">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {/* Options Panel */}
      {isOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 overflow-hidden">
          <ul className="flex flex-col m-0 p-0 list-none">
            {options.map((option, idx) => (
              <li key={idx} className="m-0 p-0 border-b border-gray-100 last:border-b-0">
                <button
                  type="button"
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                  className="w-full font-body text-[14px] text-gray-700 hover:bg-gray-50 text-left py-3 px-4 transition-colors cursor-pointer"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
