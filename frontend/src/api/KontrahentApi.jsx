const API_URL = import.meta.env.example.VITE_API_URL;

export const getKontrahenci = async () =>
  await fetch(`${API_URL}/kontrahenci`).then((res) => res.json());

export const getKontrahentById = async (id) =>
  await fetch(`${API_URL}/kontrahenci/${id}`).then((res) => res.json());

export const createKontrahent = async (data) =>
  await fetch(`${API_URL}/kontrahenci`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const updateKontrahent = async (id, data) =>
  await fetch(`${API_URL}/kontrahenci/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteKontrahent = async (id) =>
  await fetch(`${API_URL}/kontrahenci/${id}`, {
    method: "DELETE",
  });
export const downloadReport = () => {
  const url = `${API_URL}/kontrahenci/raport`;
  return fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "raport_kontrahenci.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
};
