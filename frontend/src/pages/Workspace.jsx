import { useEffect, useState } from "react";
import "./Workspace.css";
import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import translations from "../translations/translations";

const Workspace = () => {
  // Luăm doar `language` și `changeLanguage` din context;
  // t nu mai e apelat direct, ci facem noi un helper care caută în `translations`.
  const { language, changeLanguage } = useLanguage();

  // Helper pentru traduceri
  const translate = (key) => {
    return translations[language]?.[key] || key;
  };

  // --- State‐uri pentru datele ofertei și interfață ---
  const [offers, setOffers] = useState([]);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [distanceToLocation, setDistanceToLocation] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filters, setFilters] = useState({
    loading: "",
    unloading: "",
    hasPrice: null,
  });
  const offersPerPage = 10;

  // State‐uri pentru câmpurile din modalul de reply
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleLocation, setVehicleLocation] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  // Când se schimbă `selectedOffer`, preumplem prețul (dacă există) și resetăm celelalte câmpuri
  useEffect(() => {
    if (selectedOffer) {
      setOfferPrice(
        selectedOffer.price > 0 ? selectedOffer.price.toString() : ""
      );
      setVehiclePlate("");
      setVehicleLocation("");
      setDistanceToLocation("");
    }
  }, [selectedOffer]);

  // Funcție helper care construiește textul din textarea (reply preview)
  const buildReplyText = () => {
  const fn = translations[language]?.replyTextPreview;
  if (typeof fn === "function") {
    return fn(vehiclePlate, vehicleLocation, offerPrice, distanceToLocation);
  }
    return "";
  };

  // Handler‐ul de “Reply” (construiește mailto:)
  const handleReply = () => {
    if (!selectedOffer) return; // protecție
    const subject = encodeURIComponent(
      translate("reply") + " – " + selectedOffer.ref_number
    );
    const body = encodeURIComponent(buildReplyText());
    window.location.href = `mailto:razvantdf@gmail.com?subject=${subject}&body=${body}`;
  };

  // Handler‐ul “Delete” (dummy): elimină oferta din state
  const handleDelete = (offerId) => {
    setOffers((prev) => prev.filter((o) => o.id !== offerId));
    setSelectedOffer(null);
  };

  // --- Funcția de fetch pentru oferte ---
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

  // La montare, preluăm ofertele
  useEffect(() => {
    fetchOffers();
  }, []);

  // Dark mode + tranziție
  useEffect(() => {
    document.body.classList.add("transitioning");
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
    const timeout = setTimeout(() => {
      document.body.classList.remove("transitioning");
    }, 1000);
    return () => clearTimeout(timeout);
  }, [darkMode]);

  // Auto‐refresh la 60s dacă e activat
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchOffers, 60000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // --- FILTRARE și SORTARE ---
  const filteredOffers = offers.filter((offer) => {
    const loadingMatch = filters.loading
      ? offer.loading_location
          .toLowerCase()
          .includes(filters.loading.toLowerCase())
      : true;
    const unloadingMatch = filters.unloading
      ? offer.unloading_location
          .toLowerCase()
          .includes(filters.unloading.toLowerCase())
      : true;
    const priceMatch =
      filters.hasPrice === null
        ? true
        : filters.hasPrice
        ? offer.price > 0
        : offer.price === 0;
    return loadingMatch && unloadingMatch && priceMatch;
  });

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const key = sortConfig.key;
    const dir = sortConfig.direction === "asc" ? 1 : -1;
    if (a[key] < b[key]) return -1 * dir;
    if (a[key] > b[key]) return 1 * dir;
    return 0;
  });

  // PAGINARE (cu cel puțin 1 pagină)
  const totalPages = Math.max(1, Math.ceil(filteredOffers.length / offersPerPage));
  const paginatedOffers = sortedOffers.slice(
    (currentPage - 1) * offersPerPage,
    currentPage * offersPerPage
  );

  // Sort handler (click pe header)
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  // Când se schimbă vreun input din panoul de filtre
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFilters((prev) => ({ ...prev, [name]: val }));
  };

  // Eliminarea unei etichete de filtru
  const removeFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: key === "hasPrice" ? null : "",
    }));
  };

  // Stilul butoanelor din dropdown‐ul de limbă
  const dropdownBtnStyle = {
    padding: "0.5rem 1rem",
    background: "none",
    border: "none",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
  };

  return (
    <div className="workspace">
      {/* Overlay de tranziție dark/light */}
      <div className={`transition-overlay ${darkMode ? "dark" : "light"}`}></div>

      {/* ===== NAVBAR ===== */}
      <nav className="navbar workspace-navbar">
        <div className="navbar-left">
          <a href="/workspace">
            <img
              src="/logo_min.jpg"
              alt="Logo"
              className="logo"
              style={{ cursor: "pointer" }}
            />
          </a>
        </div>

        <div className="navbar-center">
          <span className="workspace-title">Workspace</span>
        </div>

        <div
          className="navbar-right"
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          {/* 🌍 Dropdown limbă */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowLangDropdown((prev) => !prev)}
              title="Schimbă limba"
              style={{
                fontSize: "1.2rem",
                background: "none",
                border: "none",
                color: darkMode ? "white" : "#0B1B32",
                cursor: "pointer",
                lineHeight: "1",
                position: "relative",
                top: "1px",
              }}
            >
              🌍
            </button>
            {showLangDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  right: 0,
                  background: "white",
                  color: "#0B1B32",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  overflow: "hidden",
                  zIndex: 9999,
                }}
              >
                <button
                  onClick={() => {
                    changeLanguage("ro");
                    setShowLangDropdown(false);
                  }}
                  style={dropdownBtnStyle}
                >
                  Română
                </button>
                <button
                  onClick={() => {
                    changeLanguage("en");
                    setShowLangDropdown(false);
                  }}
                  style={dropdownBtnStyle}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    changeLanguage("es");
                    setShowLangDropdown(false);
                  }}
                  style={dropdownBtnStyle}
                >
                  Español
                </button>
              </div>
            )}
          </div>

          {/* ☀︎/☾ Light/Dark mode */}
          <button
            className="mode-toggle"
            title="Light/Dark mode"
            onClick={() => setDarkMode((prev) => !prev)}
            style={{
              fontSize: "1.2rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              lineHeight: "1",
              position: "relative",
              top: "1px",
            }}
          >
            {darkMode ? "☀︎" : "☾"}
          </button>

          {/* Profil + logout */}
          <div className="profile-wrapper">
            <button
              className="profile-icon"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              👤
            </button>
            {showDropdown && (
              <div className="profile-dropdown">
                <a href="/profile">{translate("profile")}</a>
                <a
                  href="#"
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    window.location.href = "/";
                  }}
                >
                  {translate("logout")}
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ===== TOP BAR (filtre + refresh) ===== */}
      <div className="workspace-top-bar">
        <div className="filters-box">
          <button
            className="filters-toggle-btn"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            {translate("filters")}
          </button>
          {showFilters && (
            <div className="filter-panel">
              <input
                type="text"
                name="loading"
                placeholder={translate("loadingLabel") + "..."}
                value={filters.loading}
                onChange={handleFilterChange}
              />
              <input
                type="text"
                name="unloading"
                placeholder={translate("unloadingLabel") + "..."}
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
                {translate("withPrice")}
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
                {translate("withoutPrice")}
              </label>
            </div>
          )}
        </div>

        <div className="refresh-controls">
          <div className="toggle-buttons">
            <button
              className={`toggle-btn ${!autoRefresh ? "active" : ""}`}
              onClick={() => setAutoRefresh(false)}
            >
              {translate("filters") === "Filtre" ? translate("filters") : "Refresh"}
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

      {/* ===== Etichete filtre active ===== */}
      <div className="active-filters">
        {filters.loading && (
          <span className="filter-tag" onClick={() => removeFilter("loading")}>
            {translate("loadingLabel")}: {filters.loading} ✖
          </span>
        )}
        {filters.unloading && (
          <span
            className="filter-tag"
            onClick={() => removeFilter("unloading")}
          >
            {translate("unloadingLabel")}: {filters.unloading} ✖
          </span>
        )}
        {filters.hasPrice === true && (
          <span
            className="filter-tag"
            onClick={() => removeFilter("hasPrice")}
          >
            {translate("withPrice")} ✖
          </span>
        )}
        {filters.hasPrice === false && (
          <span
            className="filter-tag"
            onClick={() => removeFilter("hasPrice")}
          >
            {translate("withoutPrice")} ✖
          </span>
        )}
      </div>

      {/* ===== BODY: tabel + paginare + modal ===== */}
      <div className="workspace-body">
        <p>
          {filteredOffers.length} {translate("offersShown")}
        </p>

        {loading ? (
          <p>{translate("loading")}</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>{translate("loadingLocation")}</th>
                  <th>{translate("unloadingLocation")}</th>
                  <th onClick={() => handleSort("distance_km")}>
                    {translate("distance")}
                    <span className="sort-icons">
                      <span
                        className={
                          sortConfig.key === "distance_km" &&
                          sortConfig.direction === "asc"
                            ? "active"
                            : ""
                        }
                      >
                        ↑
                      </span>
                      <span
                        className={
                          sortConfig.key === "distance_km" &&
                          sortConfig.direction === "desc"
                            ? "active"
                            : ""
                        }
                      >
                        ↓
                      </span>
                    </span>
                  </th>
                  <th onClick={() => handleSort("weight_kg")}>
                    {translate("weight")}
                    <span className="sort-icons">
                      <span
                        className={
                          sortConfig.key === "weight_kg" &&
                          sortConfig.direction === "asc"
                            ? "active"
                            : ""
                        }
                      >
                        ↑
                      </span>
                      <span
                        className={
                          sortConfig.key === "weight_kg" &&
                          sortConfig.direction === "desc"
                            ? "active"
                            : ""
                        }
                      >
                        ↓
                      </span>
                    </span>
                  </th>
                  <th>{translate("loadingDate")}</th>
                  <th>{translate("unloadingDate")}</th>
                  <th onClick={() => handleSort("price")}>
                    {translate("price")}
                    <span className="sort-icons">
                      <span
                        className={
                          sortConfig.key === "price" &&
                          sortConfig.direction === "asc"
                            ? "active"
                            : ""
                        }
                      >
                        ↑
                      </span>
                      <span
                        className={
                          sortConfig.key === "price" &&
                          sortConfig.direction === "desc"
                            ? "active"
                            : ""
                        }
                      >
                        ↓
                      </span>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedOffers.map((offer) => (
                  <tr
                    key={offer.id}
                    onClick={() => setSelectedOffer(offer)}
                  >
                    <td>{offer.loading_location}</td>
                    <td>{offer.unloading_location}</td>
                    <td>{offer.distance_km}</td>
                    <td>{offer.weight_kg}</td>
                    <td>{offer.loading_date?.split("T")[0] || ""}</td>
                    <td>{offer.unloading_date?.split("T")[0] || ""}</td>
                    <td>
                      {offer.price > 0 ? offer.price + " €" : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination-help-row">
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  « {translate("firstPage")}
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                >
                  ‹
                </button>
                <span>
                  {translate("page")} {currentPage} {translate("of")}{" "}
                  {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                >
                  ›
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  {translate("lastPage")} »
                </button>
              </div>
              <a href="/help" className="help-button">
                {translate("help")}
              </a>
            </div>
          </>
        )}

        {selectedOffer && (
          <div
            className="modal-backdrop"
            onClick={() => setSelectedOffer(null)}
          >
            <div
              className="modal-content modal-two-columns"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Stânga: Detalii ofertă */}
              <div className="modal-left">
                <h3>{translate("offerDetails")}</h3>
                <p>
                  <strong>{translate("refCode")}:</strong>{" "}
                  {selectedOffer.ref_number}
                </p>
                <p>
                  <strong>{translate("loadingLocation")}:</strong>{" "}
                  {selectedOffer.loading_location}
                </p>
                <p>
                  <strong>{translate("unloadingLocation")}:</strong>{" "}
                  {selectedOffer.unloading_location}
                </p>
                <p>
                  <strong>{translate("distance")}:</strong>{" "}
                  {selectedOffer.distance_km} km
                </p>
                <p>
                  <strong>{translate("weight")}:</strong>{" "}
                  {selectedOffer.weight_kg} kg
                </p>
                <p>
                  <strong>{translate("loadingDate")}:</strong>{" "}
                  {selectedOffer.loading_date?.split("T")[0]}
                </p>
                <p>
                  <strong>{translate("unloadingDate")}:</strong>{" "}
                  {selectedOffer.unloading_date?.split("T")[0]}
                </p>
                <p>
                  <strong>{translate("price")}:</strong>{" "}
                  {selectedOffer.price > 0
                    ? selectedOffer.price + " €"
                    : "—"}
                </p>
                <p>
                  <strong>{translate("recommendedPrice")}:</strong>{" "}
                  {selectedOffer.recommended_price || "—"}
                </p>
                <p>
                  <strong>{translate("cargoDetails")}:</strong>{" "}
                  {selectedOffer.cargo_details}
                </p>
                <p>
                  <strong>{translate("observations")}:</strong>{" "}
                  {selectedOffer.observations}
                </p>
              </div>

              {/* Dreapta: Arin (reply) */}
              <div className="modal-right">
                <h4>{translate("arinResponse")}</h4>
                <textarea
                className="arin-preview"
                readOnly
                value={buildReplyText()}
                />

                <input
                  type="text"
                  placeholder={translate("vehiclePlatePlaceholder")}
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={translate("vehicleLocationPlaceholder")}
                  value={vehicleLocation}
                  onChange={(e) => setVehicleLocation(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={translate("offerPricePlaceholder")}
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={translate("distancePlaceholder")}
                  value={distanceToLocation}
                  onChange={(e) => setDistanceToLocation(e.target.value)}
                />

                <div className="modal-actions">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(selectedOffer.id)}
                  >
                    {translate("deleteOffer")}
                  </button>
                  <button
                    className="reply-btn"
                    onClick={handleReply}
                    disabled={
                      !selectedOffer ||
                      !vehiclePlate ||
                      !vehicleLocation ||
                      !offerPrice
                    }
                  >
                    {translate("reply")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Workspace;
