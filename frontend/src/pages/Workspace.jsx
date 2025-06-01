import { useEffect, useState } from "react";
import "./Workspace.css";

const Workspace = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:8000/api/offers/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setOffers(data);
    } catch (err) {
      console.error("Eroare la preluarea ofertelor:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchOffers, 60000); // la 1 minut
    return () => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <div className="workspace">
      <h2>Ofertele tale</h2>

      <div className="workspace-controls">
        <button onClick={fetchOffers}>🔄 Refresh</button>
        <label>
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={() => setAutoRefresh(!autoRefresh)}
          />
          Auto-refresh la 1 min
        </label>
      </div>

      {loading ? (
        <p>Se încarcă...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Cod</th>
              <th>Localitate Plecare</th>
              <th>Destinație</th>
              <th>Distanță (km)</th>
              <th>Greutate (kg)</th>
              <th>Preț</th>
              <th>Data Încarcare</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id}>
                <td>{offer.code}</td>
                <td>{offer.departure_location}</td>
                <td>{offer.arrival_location}</td>
                <td>{offer.distance}</td>
                <td>{offer.weight}</td>
                <td>{offer.suggested_price || "—"}</td>
                <td>{offer.loading_date?.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Workspace;
