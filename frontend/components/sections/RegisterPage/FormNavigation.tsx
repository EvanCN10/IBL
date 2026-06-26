import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface FormNavigationProps {
  step: number;
  setStep: (step: number) => void;
  handleNext: () => void;
  handleBack: () => void;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  step,
  setStep,
  handleNext,
  handleBack,
}) => {
  return (
    <div
      className="absolute left-1/2 z-20 flex -translate-x-1/2 items-center justify-between"
      style={{
        top: "89%",
        width: "74%",
        height: "var(--nav-height)",
        paddingLeft: "var(--nav-padding)",
        paddingRight: "var(--nav-padding)",
      }}
    >
      <div 
        className="flex justify-start"
        style={{ width: "var(--btn-width)" }}
      >
        {step > 1 ? (
          <Button onClick={handleBack}>BACK</Button>
        ) : (
          <div 
            style={{
              width: "var(--btn-width)",
              height: "var(--btn-height)",
            }} 
          />
        )}
      </div>

      {/* Basketball Indicators */}
      <div 
        className="flex items-center justify-center"
        style={{ gap: "var(--nav-ball-gap)" }}
      >
        {[1, 2, 3, 4].map((s) => {
          const isActive = s === step;
          return (
            <div
              key={s}
              onClick={() => setStep(s)}
              className="relative cursor-pointer transition-all duration-300 ease-out filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1.00)]"
              style={{
                width: isActive ? "var(--nav-ball-active-size)" : "var(--nav-ball-inactive-size)",
                height: isActive ? "var(--nav-ball-active-size)" : "var(--nav-ball-inactive-size)",
              }}
            >
              <Image
                src="/images/Basketball.svg"
                alt={`Step ${s}`}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>

      <div 
        className="flex justify-end"
        style={{ width: "var(--btn-width)" }}
      >
        <Button onClick={handleNext}>
          {step === 4 ? "SUBMIT" : "NEXT"}
        </Button>
      </div>
    </div>
  );
};
