import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`bg-tosca outline outline-black inline-flex justify-center items-center font-hollywood text-white cursor-pointer active:translate-y-[var(--btn-active-translate)] active:shadow-[var(--btn-active-shadow)_var(--btn-active-shadow)_0px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none transition-all ${className}`}
      style={{
        width: "var(--btn-width)",
        height: "var(--btn-height)",
        fontSize: "var(--btn-font-size)",
        padding: "calc(var(--btn-height) * 10 / 48)", // proportional padding p-2.5 (10px)
        borderRadius: "calc(var(--btn-height) * 2)", // large pill rounded
        outlineWidth: "var(--btn-border)",
        boxShadow: "var(--btn-shadow) var(--btn-shadow) 0px 0px #000",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
