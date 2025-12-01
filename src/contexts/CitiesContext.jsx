import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error fetching cities");
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error("CitiesContext was used outside of its provider");
    }
    return context;
}

export { CitiesProvider, useCities };
