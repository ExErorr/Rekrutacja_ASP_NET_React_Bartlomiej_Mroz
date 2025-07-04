import { useState, useEffect } from "react";
import "./KontrahentFormModal.css";
const KontrahentFormModal = ({ onClose, onSave, initialValues = null }) => {
  const [name, setName] = useState("");
  const [fields, setFields] = useState([{ key: "", value: "" }]);

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name || "");
      setFields(
        Object.entries(initialValues.additionalFields || {}).map(
          ([key, value]) => ({ key, value })
        )
      );
    }
  }, [initialValues]);

  const handleAddField = () => {
    setFields([...fields, { key: "", value: "" }]);
  };

  const handleChangeField = (index, fieldName, value) => {
    const newFields = [...fields];
    newFields[index][fieldName] = value;
    setFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const additionalFields = {};

    fields.forEach(({ key, value }) => {
      if (key.trim()) {
        additionalFields[key] = value;
      }
    });

    await onSave({ name, additionalFields });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2>{initialValues ? "Edytuj Kontrahenta" : "Dodaj Kontrahenta"}</h2>

        <form onSubmit={handleSubmit}>
          <label>Nazwa kontrahenta:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <h4>Dodatkowe informacje:</h4>
          {fields.map((field, index) => (
            <div key={index} className="dynamic-fields">
              <input
                type="text"
                placeholder="Informacja"
                value={field.key}
                onChange={(e) =>
                  handleChangeField(index, "key", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Treść"
                value={field.value}
                onChange={(e) =>
                  handleChangeField(index, "value", e.target.value)
                }
              />
            </div>
          ))}

          <button
            type="button"
            className="add-field-button"
            onClick={handleAddField}
          >
            Dodaj nową informację
          </button>

          <div className="form-buttons">
            <button type="submit">
              {initialValues ? "Aktualizuj" : "Dodaj"}
            </button>
            <button type="button" onClick={onClose}>
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KontrahentFormModal;
