export default function StatsPanel({ text }) {
  const trimmedText = text.trim();
  const wordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;
  const charCount = text.length;
  const sentenceCount = (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length;

  const totalSeconds = Math.ceil((wordCount / 200) * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${minutes} min ${seconds} sec`.replace(
    /^0 min\s*/,
    ""
  );

  return (
    <section className="stats" aria-label="Text Statistics Panel">
      <h3>Text Summary</h3>
      <ul>
        <li>Words: {wordCount}</li>
        <li>Characters: {charCount}</li>
        <li>Sentences: {sentenceCount}</li>
        <li>Estimated Reading Time: {formattedTime}</li>
      </ul>
    </section>
  );
}
