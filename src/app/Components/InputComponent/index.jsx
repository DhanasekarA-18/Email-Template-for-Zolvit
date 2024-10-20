const InputComponent = ({
  placeholder,
  type = "text",
  label = "",
  value = "",
  onChange, // Include onChange as a prop
}) => {
  return (
    <div className="pb-[1px]">
      <label className="text-blue-800 font-bold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value); // This will call the onChange function when the input value changes
        }}
      />
    </div>
  );
};

export default InputComponent;
