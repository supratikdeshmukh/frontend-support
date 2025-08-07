export default function Textarea({ value, onChange }) {
  return (
    <textarea
      className="textarea"
      rows={8}
      placeholder="Enter your text here..."
      value={value}
      onChange={onChange}
      spellCheck={false}
      aria-label="Text input area"
      required
    />
  );
}
