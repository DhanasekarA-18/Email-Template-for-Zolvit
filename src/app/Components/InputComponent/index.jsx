const InputComponent = ({
  placeholder,
  type = "text",
  label = "",
  value = "",
  onChange,
}) => {
  return (
    <div>
      <label className="text-blue-800 font-bold">{label}</label>
      <br />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        className="border-[2px] border-solid border-[green] w-full"
      />
    </div>
  );
};

export default InputComponent;
