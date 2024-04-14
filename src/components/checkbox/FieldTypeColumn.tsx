import { DynamicTableFieldsTypes } from "../../App";

export type CheckboxProps = {
  label: string;
  fieldType: keyof DynamicTableFieldsTypes;
  options: string[];
  onChange: (type: keyof DynamicTableFieldsTypes, option: string) => void;
  selectedKeys: string[];
};

export default function FieldTypeCheckbox({
  options,
  label,
  onChange,
  fieldType,
  selectedKeys,
}: CheckboxProps) {
  function handleOption(option: string) {
    onChange(fieldType, option);
  }

  function isChecked(option: string, selectedKeys: string[]): boolean {
    return selectedKeys.includes(option);
  }

  return (
    <div>
      <ul>
        <label>{label}</label>
        {options.map((option, index) => (
          <li
            key={index}
            className={
              isChecked(option, selectedKeys) ? "black" : "text-gray-500"
            }
          >
            <input
              type="checkbox"
              value={option}
              checked={isChecked(option, selectedKeys)}
              onChange={() => handleOption(option)}
            />
            <label>{option}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
