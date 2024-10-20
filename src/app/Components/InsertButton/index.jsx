const InsertButton = ({ name, checked, onChange, label = "" }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={name}
        className="cursor-pointer"
        checked={checked}
        onChange={(e) => {
          onChange?.(e.target.checked);
        }}
      />

      <label for={name} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
};
export default InsertButton;
