import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`w-40 h-12 p-2.5 bg-tosca rounded-[100px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1.00)] outline outline-2 outline-black inline-flex justify-center items-center gap-2.5 font-hollywood text-3xl text-white cursor-pointer active:translate-y-[2px] active:shadow-[6px_6px_0px_0px_rgba(0,0,0,1.00)] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
