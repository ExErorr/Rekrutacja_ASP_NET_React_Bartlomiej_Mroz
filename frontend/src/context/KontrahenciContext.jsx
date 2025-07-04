import { createContext, useEffect, useState } from "react";
import {
  getKontrahenci,
  createKontrahent,
  updateKontrahent,
  deleteKontrahent,
  downloadReport,
} from "../api/KontrahentApi";

export const KontrahenciContext = createContext();

export const KontrahenciProvider = ({ children }) => {
  const [kontrahenci, setKontrahenci] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadKontrahenci = async () => {
    try {
      setLoading(true);
      const data = await getKontrahenci();
      setKontrahenci(data);
    } finally {
      setLoading(false);
    }
  };

  const addKontrahent = async (data) => {
    const newKontrahent = await createKontrahent(data);
    setKontrahenci((prev) => [...prev, newKontrahent]);
  };

  const editKontrahent = async (id, data) => {
    await updateKontrahent(id, data);
    await loadKontrahenci();
  };

  const removeKontrahent = async (id) => {
    await deleteKontrahent(id);
    setKontrahenci((prev) => prev.filter((k) => k.id !== id));
  };

  const handleDownloadReport = async () => {
    try {
      await downloadReport();
    } catch (err) {
      console.error("Błąd pobierania raportu:", err);
    }
  };

  useEffect(() => {
    loadKontrahenci();
  }, []);

  return (
    <KontrahenciContext.Provider
      value={{
        kontrahenci,
        loading,
        addKontrahent,
        editKontrahent,
        removeKontrahent,
        handleDownloadReport,
      }}
    >
      {children}
    </KontrahenciContext.Provider>
  );
};
