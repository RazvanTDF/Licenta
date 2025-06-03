import { useEffect, useState } from "react";
import "./Workspace.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Workspace = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    loading: "",
    unloading: "",
    hasPrice: null,
  });
  const offersPerPage = 10;

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
      console.log("Date primite de la API:", data);
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
    const interval = setInterval(fetchOffers, 60000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const filteredOffers = offers.filter((offer) => {
    const loadingMatch = filters.loading
      ? offer.loading_location.toLowerCase().includes(filters.loading.toLowerCase())
      : true;
    const unloadingMatch = filters.unloading
      ? offer.unloading_location.toLowerCase().includes(filters.unloading.toLowerCase())
      : true;
    const priceMatch = filters.hasPrice === null
      ? true
      : filters.hasPrice
      ? offer.price > 0
      : offer.price === 0;
    return loadingMatch && unloadingMatch && priceMatch;
  });

  const paginatedOffers = filteredOffers.slice(
    (currentPage - 1) * offersPerPage,
    currentPage * offersPerPage
  );

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFilters((prev) => ({ ...prev, [name]: val }));
  };

  const removeFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: key === "hasPrice" ? null : "" }));
  };

  return (
    <div className="workspace">
      <nav className="navbar workspace-navbar">
        <div className="navbar-left">
          <img src="/logo_min.jpg" alt="Logo" className="logo" />
        </div>

        <div className="navbar-center">
          <span className="workspace-title">Workspace</span>
        </div>

        <div className="navbar-right">
          <button className="lang-btn" title="Schimbă limba">🌐</button>
          <button className="mode-toggle" title="Light/Dark mode">🌓</button>

          <div className="profile-wrapper">
            <button
              className="profile-icon"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              👤
            </button>

            {showDropdown && (
              <div className="profile-dropdown">
                <a href="/profile">Profil</a>
                <a
                  href="#"
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    window.location.href = "/";
                  }}
                >
                  Delogare
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="workspace-top-bar">
        <div className="filters-box">
          <button
            className="filters-toggle-btn"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            Filtre
          </button>
          {showFilters && (
            <div className="filter-panel">
              <input
                type="text"
                name="loading"
                placeholder="Pornire..."
                value={filters.loading}
                onChange={handleFilterChange}
              />
              <input
                type="text"
                name="unloading"
                placeholder="Destinație..."
                value={filters.unloading}
                onChange={handleFilterChange}
              />
              <label>
                <input
                  type="checkbox"
                  name="hasPrice"
                  checked={filters.hasPrice === true}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      hasPrice: prev.hasPrice === true ? null : true,
                    }))
                  }
                />
                Cu preț
              </label>
              <label>
                <input
                  type="checkbox"
                  name="hasPrice"
                  checked={filters.hasPrice === false}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      hasPrice: prev.hasPrice === false ? null : false,
                    }))
                  }
                />
                Fără preț din ofertă
              </label>
            </div>
          )}

          <div className="active-filters">
            {filters.loading && (
              <span onClick={() => removeFilter("loading")}>Pornire: {filters.loading} ✖</span>
            )}
            {filters.unloading && (
              <span onClick={() => removeFilter("unloading")}>Destinație: {filters.unloading} ✖</span>
            )}
            {filters.hasPrice === true && (
              <span onClick={() => removeFilter("hasPrice")}>Cu preț ✖</span>
            )}
            {filters.hasPrice === false && (
              <span onClick={() => removeFilter("hasPrice")}>Fără preț ✖</span>
            )}
          </div>
        </div>

        <div className="refresh-controls">
          <div className="toggle-buttons">
            <button
              className={`toggle-btn ${!autoRefresh ? "active" : ""}`}
              onClick={() => setAutoRefresh(false)}
            >
              Refresh
            </button>
            <button
              className={`toggle-btn ${autoRefresh ? "active" : ""}`}
              onClick={() => setAutoRefresh(true)}
            >
              Auto
            </button>
          </div>
        </div>
      </div>

      <div className="workspace-body">
        <p>{filteredOffers.length} oferte afișate</p>

        {loading ? (
          <p>Se încarcă...</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Pornire</th>
                  <th>Destinație</th>
                  <th>Distanță (km)</th>
                  <th>Greutate (kg)</th>
                  <th>Data Încărcare</th>
                  <th>Data Descărcare</th>
                  <th>Preț</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOffers.map((offer) => (
                  <tr key={offer.id} onClick={() => setSelectedOffer(offer)}>
                    <td>{offer.loading_location}</td>
                    <td>{offer.unloading_location}</td>
                    <td>{offer.distance_km}</td>
                    <td>{offer.weight_kg}</td>
                    <td>{offer.loading_date?.split("T")[0]}</td>
                    <td>{offer.unloading_date?.split("T")[0]}</td>
                    <td>{offer.price > 0 ? offer.price + " €" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination-help-row">
              <div className="pagination">
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>« Prima</button>
                <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1}>‹</button>
                <span>Pagina {currentPage} din {Math.ceil(filteredOffers.length / offersPerPage)}</span>
                <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage === Math.ceil(filteredOffers.length / offersPerPage)}>›</button>
                <button onClick={() => setCurrentPage(Math.ceil(filteredOffers.length / offersPerPage))} disabled={currentPage === Math.ceil(filteredOffers.length / offersPerPage)}>Ultima »</button>
              </div>
              <a href="/help" className="help-button">❓ Ajutor</a>
            </div>
          </>
        )}

        {selectedOffer && (
          <div className="modal-backdrop" onClick={() => setSelectedOffer(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Detalii ofertă</h3>
              <p><strong>Cod referință:</strong> {selectedOffer.ref_number}</p>
              <p><strong>Loc încărcare:</strong> {selectedOffer.loading_location}</p>
              <p><strong>Loc descărcare:</strong> {selectedOffer.unloading_location}</p>
              <p><strong>Distanță:</strong> {selectedOffer.distance_km} km</p>
              <p><strong>Greutate:</strong> {selectedOffer.weight_kg} kg</p>
              <p><strong>Data încărcare:</strong> {selectedOffer.loading_date?.split("T")[0]}</p>
              <p><strong>Data descărcare:</strong> {selectedOffer.unloading_date?.split("T")[0]}</p>
              <p><strong>Preț:</strong> {selectedOffer.price > 0 ? selectedOffer.price + " €" : "—"}</p>
              <p><strong>Preț recomandat:</strong> {selectedOffer.recommended_price || "—"}</p>
              <p><strong>Detalii marfă:</strong> {selectedOffer.cargo_details}</p>
              <p><strong>Observații:</strong> {selectedOffer.observations}</p>
              <button onClick={() => setSelectedOffer(null)}>Închide</button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Workspace;
