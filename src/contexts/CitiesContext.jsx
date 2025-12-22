import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = "https://world-wise-jipz.onrender.com";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };

    case "cities/loaded":
      return { ...state, loading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, loading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
      };

    case "city/deleted":
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "rejected":
      return { ...state, loading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, loading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/comments/`);
        if (!res.ok) throw new Error("Failed to fetch cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/comments/${id}/`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading city...",
      });
    }
  }, []);

  // async function createCity(newCity) {
  //   dispatch({ type: "loading" });
  //   try {
  //     const res = await fetch(`${BASE_URL}/cities/`, {
  //       method: "POST",
  //       body: JSON.stringify(newCity),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await res.json();
  //     dispatch({ type: "city/created", payload: data });
  //   } catch {
  //     dispatch({
  //       type: "rejected",
  //       payload: "There was an error creating the city...",
  //     });
  //   }
  // }

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/comments/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check for HTTP errors
      if (!res.ok) {
        // DRF usually returns JSON with error details
        const errorData = await res.json();
        throw new Error(
          errorData.detail ||
            JSON.stringify(errorData) ||
            "Failed to create city"
        );
      }

      // Success: parse the response JSON
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  // async function deleteCity(id) {
  //   dispatch({ type: "loading" });
  //   try {
  //     await fetch(`${BASE_URL}/cities/${id}/`, {
  //       method: "DELETE",
  //     });
  //     dispatch({ type: "city/deleted", payload: id });
  //   } catch {
  //     dispatch({
  //       type: "rejected",
  //       payload: "There was an error deleting the city...",
  //     });
  //   }
  // }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/comments/${id}/`, {
        method: "DELETE",
      });

      // Check if delete was successful
      if (!res.ok) {
        // DRF might return JSON with details or just a status code
        let errorMsg = "There was an error deleting the city";
        try {
          const errorData = await res.json();
          errorMsg = errorData.detail || JSON.stringify(errorData);
        } catch {
          // no JSON returned, keep default errorMsg
        }
        throw new Error(errorMsg);
      }

      // Success: remove city from state
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.message,
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
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
