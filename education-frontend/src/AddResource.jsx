
import { useState } from "react";
import api from "./api.js";

function AddResource() {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    description: "",
    resourceUrl: "",
  });

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setSaving(true);
    setSuccess(false);

    try {
      await api.post("/resources", form);

      setMessage("Learning resource added successfully!");
      setSuccess(true);

      setForm({
        title: "",
        subject: "",
        description: "",
        resourceUrl: "",
      });
    } catch {
      setMessage(
        "Unable to add the resource. Please check your backend and database."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="add-resource-page">
      <div className="add-resource-heading">
        <span className="add-resource-tag">BUILD YOUR KNOWLEDGE LIBRARY</span>
        <h2>Add Learning Resource</h2>
        <p>
          Share useful study materials and help students learn new skills.
        </p>
      </div>

      <div className="add-resource-card">
        <div className="add-resource-card-heading">
          <div className="add-resource-icon">📚</div>
          <div>
            <h3>Resource Details</h3>
            <p>Enter the details of your learning material below.</p>
          </div>
        </div>

        <form className="add-resource-form" onSubmit={handleSubmit}>
          <div className="resource-form-field">
            <label htmlFor="resource-title">Resource Title</label>
            <input
              id="resource-title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Example: Java Programming Basics"
              required
            />
          </div>

          <div className="resource-form-field">
            <label htmlFor="resource-subject">Subject</label>
            <input
              id="resource-subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Example: Java"
              required
            />
          </div>

          <div className="resource-form-field">
            <label htmlFor="resource-description">Description</label>
            <textarea
              id="resource-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Explain what students will learn from this material..."
              rows={5}
              required
            />
          </div>

          <div className="resource-form-field">
            <label htmlFor="resource-url">Resource URL (optional)</label>
            <input
              id="resource-url"
              name="resourceUrl"
              type="url"
              value={form.resourceUrl}
              onChange={handleChange}
              placeholder="https://example.com/learning-material"
            />
            <small>Paste a link to a tutorial, video, or study material.</small>
          </div>

          <button
            className="add-resource-submit"
            type="submit"
            disabled={saving}
          >
            {saving ? "Adding Resource..." : "＋ Add Learning Resource"}
          </button>

          {message && (
            <p
              className={success ? "resource-success" : "resource-failure"}
              role="status"
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default AddResource;
