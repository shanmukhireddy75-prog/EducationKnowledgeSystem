
import { useEffect, useState } from "react";
import api from "./api.js";

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/resources")
      .then((response) => {
        setResources(response.data);
      })
      .catch(() => {
        setError("Unable to load resources. Please check the backend.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="resource-list">
      <div className="resources-heading">
        <span className="resources-tag">LEARN SOMETHING NEW</span>
        <h2>Learning Resources</h2>
        <p>Explore study materials and build your knowledge, one step at a time.</p>
      </div>

      {loading && <p className="resources-status">Loading learning resources...</p>}

      {!loading && error && (
        <p className="resources-error">{error}</p>
      )}

      {!loading && !error && resources.length === 0 && (
        <div className="resources-empty">
          <h3>No resources yet</h3>
          <p>Learning materials will appear here when they are added.</p>
        </div>
      )}

      {!loading && !error && resources.length > 0 && (
        <div className="learning-grid">
          {resources.map((resource) => (
            <article className="learning-card" key={resource.id}>
              <div className="resource-icon">📚</div>
              <span className="resource-subject">
                {resource.subject || "General"}
              </span>
              <h3>{resource.title}</h3>
              <p className="resource-description">
                {resource.description || "Explore this learning material."}
              </p>

              {resource.resourceUrl && (
                <a
                  className="resource-link"
                  href={resource.resourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Learning Material <span>↗</span>
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Resources;
