import React from "react";
import InputField from "@/components/ui/InputField";
import Dropdown from "@/components/ui/Dropdown";
import RadioGroup from "@/components/ui/RadioGroup";
import { FORM_LABELS, DROPDOWN_OPTIONS, RADIO_OPTIONS } from "@/constants/registerForm";
import { StepData } from "@/types/register";

interface FormStepFieldsProps {
  currentData: StepData;
  updateField: (field: keyof StepData, value: string) => void;
}

export const FormStepFields: React.FC<FormStepFieldsProps> = ({ currentData, updateField }) => {
  return (
    <div className="flex flex-col" style={{ gap: "24px" }}>
      <InputField
        label={FORM_LABELS.shortAnswer}
        value={currentData.shortAnswer1}
        onChange={(val) => updateField("shortAnswer1", val)}
      />
      <InputField
        label={FORM_LABELS.shortAnswer}
        value={currentData.shortAnswer2}
        onChange={(val) => updateField("shortAnswer2", val)}
      />
      <InputField
        label={FORM_LABELS.shortAnswer}
        value={currentData.shortAnswer3}
        onChange={(val) => updateField("shortAnswer3", val)}
      />
      
      <div className="flex flex-col w-full text-left">
        <label 
          className="font-bold text-[#2D2D2D] font-drowner tracking-widest"
          style={{ 
            fontSize: "var(--form-font-size)",
            marginBottom: "var(--form-margin-bottom)"
          }}
        >
          {FORM_LABELS.longAnswer}
        </label>
        <textarea
          value={currentData.longAnswer1}
          onChange={(e) => updateField("longAnswer1", e.target.value)}
          placeholder="Content"
          className="w-full bg-white border border-gray-300 font-body text-gray-800 placeholder-gray-400 outline-none focus:border-gray-500 transition-colors shadow-inner resize-y"
          style={{
            fontSize: "var(--form-font-size)",
            paddingTop: "var(--form-padding-y)",
            paddingBottom: "var(--form-padding-y)",
            paddingLeft: "var(--form-padding-x)",
            paddingRight: "var(--form-padding-x)",
            minHeight: "var(--form-textarea-min-height)",
            borderRadius: "calc(var(--form-font-size) * 0.43)"
          }}
        />
      </div>

      <div className="flex flex-col w-full text-left">
        <label 
          className="font-bold text-[#2D2D2D] font-drowner tracking-widest"
          style={{ 
            fontSize: "var(--form-font-size)",
            marginBottom: "var(--form-margin-bottom)"
          }}
        >
          {FORM_LABELS.longAnswer}
        </label>
        <textarea
          value={currentData.longAnswer2}
          onChange={(e) => updateField("longAnswer2", e.target.value)}
          placeholder="Content"
          className="w-full bg-white border border-gray-300 font-body text-gray-800 placeholder-gray-400 outline-none focus:border-gray-500 transition-colors shadow-inner resize-y"
          style={{
            fontSize: "var(--form-font-size)",
            paddingTop: "var(--form-padding-y)",
            paddingBottom: "var(--form-padding-y)",
            paddingLeft: "var(--form-padding-x)",
            paddingRight: "var(--form-padding-x)",
            minHeight: "var(--form-textarea-min-height)",
            borderRadius: "calc(var(--form-font-size) * 0.43)"
          }}
        />
      </div>

      <Dropdown
        label={FORM_LABELS.dropdown}
        options={DROPDOWN_OPTIONS}
        selected={currentData.dropdownVal}
        onSelect={(val) => updateField("dropdownVal", val)}
      />

      <RadioGroup
        label={FORM_LABELS.radio}
        options={RADIO_OPTIONS}
        selected={currentData.radioVal}
        onChange={(val) => updateField("radioVal", val)}
      />
    </div>
  );
};
