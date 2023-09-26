import { FC } from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ label, checked, onChange }) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer" title={label}>
      <input
        type="checkbox"
        className="form-checkbox text-indigo-600 h-5 w-5"
        checked={checked}
        aria-label={label}
        role="checkbox"
        aria-checked={checked ? "true" : "false"}
        onChange={handleChange}
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
