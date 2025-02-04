import { Select as SelectFlowbite } from "flowbite-react";

function Select({ options, value, onChange }) {
  return (
    <div>
      <SelectFlowbite value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </SelectFlowbite>
    </div>
  );
}

export default Select;
