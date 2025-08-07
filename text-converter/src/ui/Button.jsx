export default function Button({
  children,
  type = "button",
  disabled,
  title,
  ...props
}) {
  return (
    <button
      className={`btn ${disabled ? "btn-disabled" : ""}`}
      type={type}
      disabled={disabled}
      title={title}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
