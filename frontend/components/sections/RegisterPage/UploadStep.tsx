import React from "react";
import { UploadData, FileData } from "@/types/register";
import { noiseBg } from "@/constants/registerStyles";

interface UploadSlotProps {
  title: string;
  value: string;
  onChange: (fileName: string, fileData?: FileData) => void;
  className?: string;
}

const UploadSlot: React.FC<UploadSlotProps> = ({ title, value, onChange, className = "" }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        onChange(file.name, {
          name: file.name,
          mimeType: file.type,
          base64: base64
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center justify-center gap-1 sm:gap-1.5 md:gap-2 select-none cursor-pointer group hover:bg-[#D1EAE5]/20 transition-all duration-300 ease-out ${className}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <h4 className="font-crosner text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-normal text-black uppercase tracking-widest mb-1 sm:mb-2 lg:mb-3 group-hover:-translate-y-0.5 group-hover:scale-103 transition-all duration-300 ease-out">
        {title}
      </h4>
      <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full bg-[#D1EAE5] flex items-center justify-center border border-[#864B4D] group-hover:bg-[#2B918E] group-hover:border-black group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-out">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#2B918E] group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-300 ease-out"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        
        {value ? (
          <span className="font-body text-[10px] sm:text-xs text-gray-700 font-semibold bg-white border border-gray-300 rounded px-2 py-0.5 max-w-[140px] sm:max-w-[180px] truncate shadow-sm group-hover:border-gray-400 group-hover:shadow-md transition-all duration-300">
            {value}
          </span>
        ) : (
          <div className="flex flex-col items-center">
            <span className="font-body text-[9px] sm:text-xs text-gray-500">Drop your files here</span>
            <span className="font-body text-[9px] sm:text-xs text-[#2B918E] group-hover:text-[#1e6664] underline font-semibold transition-colors duration-300">
              or click to upload
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

interface UploadStepProps {
  uploadData: UploadData;
  updateUploadField: (field: keyof UploadData, value: string, fileData?: FileData) => void;
  submitError?: string | null;
  style?: React.CSSProperties;
}

export const UploadStep: React.FC<UploadStepProps> = ({ uploadData, updateUploadField, submitError, style }) => {
  return (
    <div
      style={{
        width: "863px",
        height: "1230px",
        top: "1843px",
        left: "50%",
        transform: "translateX(-50%)",
        position: "absolute",
        border: "12px solid transparent",
        backgroundImage: `${noiseBg}, linear-gradient(#EFE8DE, #EFE8DE), linear-gradient(to bottom, #F4631E, #B93310, #7E0202)`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, padding-box, border-box",
        ...style,
      }}
      className="overflow-hidden flex flex-col shadow-[10px_10px_0px_0px_#000]/50"
    >
      {submitError && (
        <div className="absolute top-2 left-2 right-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded font-body text-xs z-50">
          <strong className="font-bold">Error: </strong>
          <span>{submitError}</span>
        </div>
      )}
      {/* Slanted Dividers */}
      <div className="absolute top-[33.33%] -left-4 -right-4 h-[8px] bg-[#B93310] origin-center rotate-[3deg] pointer-events-none z-10" />
      <div className="absolute top-[66.66%] -left-4 -right-4 h-[8px] bg-[#B93310] origin-center -rotate-[3deg] pointer-events-none z-10" />
      {/* Vertical Divider 1 (Row 1) - Slanted right */}
      <div 
        className="absolute left-1/2 w-[8px] bg-[#B93310] origin-center pointer-events-none z-10"
        style={{
          top: "-4px",
          height: "calc(33.33% + 8px)",
          marginLeft: "-4px",
          transform: "rotate(-6deg)",
        }}
      />
      {/* Vertical Divider 2 (Row 2) - Slanted left */}
      <div 
        className="absolute left-1/2 w-[8px] bg-[#B93310] origin-center pointer-events-none z-10"
        style={{
          top: "calc(33.33% - 4px)",
          height: "calc(33.33% + 8px)",
          marginLeft: "-4px",
          transform: "rotate(6deg)",
        }}
      />

      {/* Row 1 - CV & KTM */}
      <div className="flex h-1/3 relative z-20">
        <UploadSlot
          title="CV"
          value={uploadData.cv}
          onChange={(name, data) => updateUploadField("cv", name, data)}
          className="w-1/2"
        />
        <UploadSlot
          title="KTM"
          value={uploadData.ktm}
          onChange={(name, data) => updateUploadField("ktm", name, data)}
          className="w-1/2"
        />
      </div>

      {/* Row 2 - TWIBBON & BUKTI FOLLOW */}
      <div className="flex h-1/3 relative z-20">
        <UploadSlot
          title="TWIBBON"
          value={uploadData.twibbon}
          onChange={(name, data) => updateUploadField("twibbon", name, data)}
          className="w-1/2"
        />
        <UploadSlot
          title="BUKTI FOLLOW"
          value={uploadData.buktiFollow}
          onChange={(name, data) => updateUploadField("buktiFollow", name, data)}
          className="w-1/2"
        />
      </div>

      {/* Row 3 - PORTOFOLIO */}
      <div className="flex h-1/3 relative z-20">
        <UploadSlot
          title="PORTOFOLIO"
          value={uploadData.portofolio}
          onChange={(name, data) => updateUploadField("portofolio", name, data)}
          className="w-full"
        />
      </div>
    </div>
  );
};
