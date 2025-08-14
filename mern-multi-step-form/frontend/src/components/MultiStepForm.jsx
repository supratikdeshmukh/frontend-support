import React, { useState, useRef, useEffect } from "react";

export default function MultiStepForm() {
  // ✅ Track the current form step
  const [step, setStep] = useState(0);

  // ✅ Store form input values
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
  });

  // ✅ Store messages for feedback (success/error)
  const [message, setMessage] = useState("");

  // ✅ Ref to access the form DOM
  const formRef = useRef(null);

  // ✅ Focus first input in the current step for accessibility
  useEffect(() => {
    const firstInput = formRef.current.querySelector(
      ".form-step.active input, .form-step.active select, .form-step.active textarea"
    );
    if (firstInput) firstInput.focus();
  }, [step]);

  // ✅ Handle phone input: digits only, max 10
  const handlePhoneInput = (e) => {
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, phone: cleaned }));
  };

  // ✅ Generic handler for other inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Validate the current step before moving forward or submitting
  const validateStep = () => {
    if (step === 0) {
      if (!form.name || !form.age || !form.gender) return false;
      const ageNum = parseInt(form.age, 10);
      if (Number.isNaN(ageNum) || ageNum < 1 || ageNum > 120) return false;
      return true;
    } else if (step === 1) {
      if (!form.phone || !form.email || !form.address) return false;
      if (!/^\d{10}$/.test(form.phone)) return false;
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return false;
      return true;
    }
    return false;
  };

  // ✅ Move to the next step if valid, else focus first invalid input
  const handleNext = () => {
    if (validateStep()) setStep((s) => s + 1);
    else {
      const currentStepEl = formRef.current.querySelector(".form-step.active");
      const firstInvalid = [
        ...currentStepEl.querySelectorAll("[required]"),
      ].find((input) => !input.checkValidity());

      if (firstInvalid) {
        firstInvalid.reportValidity();
        firstInvalid.focus();
      }
    }
  };

  // ✅ Move to the previous step
  const handlePrev = () => setStep((s) => Math.max(0, s - 1));

  // ✅ Submit the form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) {
      setMessage("Please complete all required fields correctly.");
      setTimeout(() => setMessage(""), 4000);
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data.message);
      setTimeout(() => setMessage(""), 4000);

      if (data.success) {
        // ✅ Reset form and step after successful submission
        setForm({
          name: "",
          age: "",
          gender: "",
          phone: "",
          email: "",
          address: "",
        });
        setStep(0);
      }
    } catch {
      setMessage("❌ An error occurred.");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {/* ---------------- Step 1 ---------------- */}
      <div
        className={"form-step" + (step === 0 ? " active" : "")}
        aria-hidden={step !== 0} // accessibility
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          title="Please enter your full name"
          required
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          title="Please enter your age (1-120)"
          required
          min="1"
          max="120"
          value={form.age}
          onChange={handleChange}
        />

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          title="Please select your gender"
          required
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <button type="button" onClick={handleNext}>
          Next
        </button>
      </div>

      {/* ---------------- Step 2 ---------------- */}
      <div
        className={"form-step" + (step === 1 ? " active" : "")}
        aria-hidden={step !== 1} // accessibility
      >
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          title="Please enter exactly 10 digits for phone"
          required
          pattern="\d{10}"
          maxLength="10"
          value={form.phone}
          onChange={handlePhoneInput}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          title="Please enter a valid email address"
          required
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          title="Please enter your address"
          required
          value={form.address}
          onChange={handleChange}
        ></textarea>

        <button type="button" onClick={handlePrev}>
          Back
        </button>
        <button type="submit">Submit</button>
      </div>

      {/* ---------------- Feedback message ---------------- */}
      <div id="formMessage">{message}</div>
    </form>
  );
}
