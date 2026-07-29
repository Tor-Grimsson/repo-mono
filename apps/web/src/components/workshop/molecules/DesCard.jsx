/**
 * DesCard
 *
 * Standardized header for individual component cards/previews (card-level)
 * Displays component name, description, and optional code snippet/details
 *
 * Typography:
 * - name: kol-mono-14 (smaller label for card-level hierarchy)
 * - description: kol-mono-12
 * - details/code: kol-mono-10 with opacity-60
 *
 * @param {string} name - Component name (e.g., ".text-auto", "Default State")
 * @param {string} description - Brief description of the component variant
 * @param {string} details - Additional technical details (optional)
 * @param {string} code - Code snippet example (optional)
 */
const DesCard = ({ name, description, details, code }) => {
  return (
    <div>
      <h4 className="kol-card-value">{name}</h4>

      {description && (
        <p className="kol-mono-12 text-fg-64 mt-2">{description}</p>
      )}

      {details && (
        <p className="kol-mono-10 text-fg-48 mt-1">{details}</p>
      )}

      {code && (
        <code className="block kol-mono-10 text-fg-48 mt-2">{code}</code>
      )}
    </div>
  )
}

export default DesCard
