import { useKontrahenci } from "../hooks/useKontrahenci";
import { useState } from "react";
import KontrahentFormModal from "./KontrahentFormModal";
import "./KontrahentList.css";
import binImg from "../assets/bin.png";
import penImg from "../assets/pen.png";

const KontrahentList = () => {
  const {
    kontrahenci,
    removeKontrahent,
    addKontrahent,
    editKontrahent,
    loading,
    handleDownloadReport,
  } = useKontrahenci();

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const openAddModal = () => {
    setEditItem(null);
    setShowModal(true);
  };

  const openEditModal = (kontrahent) => {
    setEditItem(kontrahent);
    setShowModal(true);
  };

  return (
    <div className="kontrahenci-wrapper">
      <button className="add-btn" onClick={openAddModal}>
        Dodaj kontrahenta
      </button>
      <button className="add-btn" onClick={handleDownloadReport}>
        Raport kontrahentów
      </button>

      {loading ? (
        <p>Ładowanie danych...</p>
      ) : kontrahenci.length === 0 ? (
        <p>Brak kontrahentów.</p>
      ) : (
        kontrahenci.map((k) => (
          <div className="kontrahent-card" key={k.id}>
            <div className="kontrahent-header">
              <h3>{k.name}</h3>
              <div className="action-buttons">
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => openEditModal(k)}
                >
                  <img src={penImg} alt="Edytuj" />
                </button>
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => removeKontrahent(k.id)}
                >
                  <img src={binImg} alt="Usuń" />
                </button>
              </div>
            </div>

            <ul className="additional-info">
              {Object.entries(k.additionalFields || {}).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}</strong>: {value}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      {showModal && (
        <KontrahentFormModal
          initialValues={editItem}
          onClose={() => setShowModal(false)}
          onSave={(data) => {
            if (editItem) {
              return editKontrahent(editItem.id, data);
            } else {
              return addKontrahent(data);
            }
          }}
        />
      )}
    </div>
  );
};

export default KontrahentList;
