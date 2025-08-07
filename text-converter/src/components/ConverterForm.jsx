import { useRef } from "react";
import Button from "../ui/Button";
import useToast from "../hooks/useToast";

export default function ConverterForm({ text, setText }) {
  const textareaRef = useRef(null);
  const [Toast, showToast] = useToast();

  const historyRef = useRef([text]);
  const historyIndexRef = useRef(0);

  const updateHistory = (newText) => {
    const history = historyRef.current;
    const currentIndex = historyIndexRef.current;
    if (newText === history[currentIndex]) return; // prevent duplicate push
    if (currentIndex < history.length - 1) {
      history.splice(currentIndex + 1);
    }
    history.push(newText);
    historyIndexRef.current = history.length - 1;
  };

  const setTextWithHistory = (newText) => {
    setText(newText);
    updateHistory(newText);
  };

  const handleChange = (e) => {
    setTextWithHistory(e.target.value);
  };

  const undo = () => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      setText(historyRef.current[historyIndexRef.current]);
      showToast("Undo", "success");
    }
  };

  const redo = () => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1;
      setText(historyRef.current[historyIndexRef.current]);
      showToast("Redo", "success");
    }
  };

  const transformations = {
    uppercase: (txt) => txt.toUpperCase(),
    lowercase: (txt) => txt.toLowerCase(),
    capitalize: (txt) =>
      txt
        .split("\n")
        .map((line) =>
          line
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ")
        )
        .join("\n"),

    sentencecase: (txt) =>
      txt
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => match.toUpperCase()),

    removeAllSpaces: (txt) => txt.replace(/\s+/g, ""),

    removeExtraSpaces: (txt) =>
      txt
        .split("\n")
        .map((line) => line.trim().replace(/\s+/g, " "))
        .join("\n"),

    removeEmptyLines: (txt) =>
      txt
        .split("\n")
        .filter((line) => line.trim() !== "")
        .join("\n"),

    removeLineBreaks: (txt) => txt.replace(/[\r\n]+/g, " "),

    removeDuplicateLines: (txt) => {
      const lines = txt.split("\n");
      const uniqueLines = [...new Set(lines)];
      return uniqueLines.join("\n");
    },

    removePunctuation: (txt) => txt.replace(/[^\w\s]|_/g, ""),
  };

  const transformText = (transformFn, label) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = text.slice(start, end);

    let updatedText;

    if (start !== end) {
      const transformed = transformFn(selected);
      updatedText = text.slice(0, start) + transformed + text.slice(end);
    } else {
      updatedText = transformFn(text);
    }

    // Custom warnings
    if (label === "Remove Punctuation" && !/[^\w\s]|_/.test(text)) {
      showToast("No punctuation found", "warning");
      return;
    }

    if (label === "Remove Extra Spaces" && !/\s{2,}/.test(text)) {
      showToast("No extra spaces found", "warning");
      return;
    }

    if (label === "Remove All Spaces" && !/\s/.test(text)) {
      showToast("No spaces found", "warning");
      return;
    }

    if (label === "Remove Empty Lines" && !/^\s*$/m.test(text)) {
      showToast("No empty lines found", "warning");
      return;
    }

    if (label === "Remove Line Breaks" && !/[\r\n]+/.test(text)) {
      showToast("No line breaks found", "warning");
      return;
    }

    if (label === "Remove Duplicate Lines") {
      const lines = text.split("\n");
      const uniqueLines = [...new Set(lines)];
      if (lines.length === uniqueLines.length) {
        showToast("No duplicate lines found", "warning");
        return;
      }
    }

    if (updatedText === text) {
      showToast(`${label} already applied`, "error");
    } else {
      setTextWithHistory(updatedText);
      showToast(`${label} applied`, "success");
    }
  };

  const clearText = () => {
    setTextWithHistory("");
    showToast("Text cleared", "success");
  };

  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "converted-text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast("Text downloaded", "success");
  };

  const copyText = () => {
    if (!text.trim()) {
      showToast("Nothing to copy", "warning");
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => showToast("Text copied", "success"))
      .catch(() => showToast("Copy failed", "error"));
  };

  const isTextEmpty = !text.trim();

  return (
    <section>
      <Toast />
      <h3 className="formHeading">Text Converter</h3>

      <label htmlFor="text-input" className="sr-only">
        Enter your text
      </label>
      <textarea
        ref={textareaRef}
        id="text-input"
        className="textarea"
        rows="12"
        placeholder="Enter your text here..."
        value={text}
        onChange={handleChange}
        aria-label="Text input area"
      />

      <div className="button-group">
        <Button
          title="Convert text to uppercase"
          onClick={() => transformText(transformations.uppercase, "Uppercase")}
          disabled={isTextEmpty}
        >
          Uppercase
        </Button>
        <Button
          title="Convert text to lowercase"
          onClick={() => transformText(transformations.lowercase, "Lowercase")}
          disabled={isTextEmpty}
        >
          Lowercase
        </Button>
        <Button
          title="Capitalize every word"
          onClick={() =>
            transformText(transformations.capitalize, "Capitalize")
          }
          disabled={isTextEmpty}
        >
          Capitalize
        </Button>
        <Button
          title="Capitalize sentences"
          onClick={() =>
            transformText(transformations.sentencecase, "Sentence Case")
          }
          disabled={isTextEmpty}
        >
          Sentence Case
        </Button>
        <Button
          title="Remove extra spaces from text"
          onClick={() =>
            transformText(
              transformations.removeExtraSpaces,
              "Remove Extra Spaces"
            )
          }
          disabled={isTextEmpty}
        >
          Remove Extra Spaces
        </Button>
        <Button
          title="Remove all spaces from the text"
          onClick={() =>
            transformText(transformations.removeAllSpaces, "Remove All Spaces")
          }
          disabled={isTextEmpty}
        >
          Remove All Spaces
        </Button>
        <Button
          title="Remove all empty lines"
          onClick={() =>
            transformText(
              transformations.removeEmptyLines,
              "Remove Empty Lines"
            )
          }
          disabled={isTextEmpty}
        >
          Remove Empty Lines
        </Button>
        <Button
          title="Remove all line breaks"
          onClick={() =>
            transformText(
              transformations.removeLineBreaks,
              "Remove Line Breaks"
            )
          }
          disabled={isTextEmpty}
        >
          Remove Line Breaks
        </Button>
        <Button
          title="Remove duplicate lines"
          onClick={() =>
            transformText(
              transformations.removeDuplicateLines,
              "Remove Duplicate Lines"
            )
          }
          disabled={isTextEmpty}
        >
          Remove Duplicate Lines
        </Button>
        <Button
          title="Remove all punctuation"
          onClick={() =>
            transformText(
              transformations.removePunctuation,
              "Remove Punctuation"
            )
          }
          disabled={isTextEmpty}
        >
          Remove Punctuation
        </Button>
        <Button
          title="Undo last text change"
          onClick={undo}
          disabled={historyIndexRef.current === 0}
        >
          Undo
        </Button>
        <Button
          title="Redo last undone change"
          onClick={redo}
          disabled={historyIndexRef.current >= historyRef.current.length - 1}
        >
          Redo
        </Button>
        <Button
          title="Clear all text"
          onClick={clearText}
          disabled={isTextEmpty}
        >
          Clear
        </Button>
        <Button
          title="Download the converted text as .txt"
          onClick={downloadText}
          disabled={isTextEmpty}
        >
          Download Text
        </Button>
        <Button
          title="Copy text to clipboard"
          onClick={copyText}
          disabled={isTextEmpty}
        >
          Copy Text
        </Button>
      </div>
    </section>
  );
}
