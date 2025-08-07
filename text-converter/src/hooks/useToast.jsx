import { useState } from "react";

export default function useToast(duration = 2000) {
  const [toastData, setToastData] = useState({ message: "", type: "" });

  const showToast = (msg, type = "success") => {
    setToastData({ message: msg, type });
    setTimeout(() => setToastData({ message: "", type: "" }), duration);
  };

  const Toast = () =>
    toastData.message ? (
      <div className={`toast show ${toastData.type}`} role="alert">
        {toastData.type === "success" && (
          <i className="fas fa-check-circle" style={{ marginRight: "6px" }}></i>
        )}
        {toastData.type === "error" && (
          <i className="fas fa-times-circle" style={{ marginRight: "6px" }}></i>
        )}
        {toastData.type !== "success" && toastData.type !== "error" && (
          <i className="fas fa-info-circle" style={{ marginRight: "6px" }}></i>
        )}
        <span>{toastData.message}</span>
      </div>
    ) : null;

  return [Toast, showToast];
}
