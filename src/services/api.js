// src/services/api.js

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Optional UX delay
const simulateDelay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  /* =========================
     AUTH (PLACEHOLDER)
  ========================= */
  login: async (credentials) => {
    await simulateDelay();
    return {
      success: true,
      user: {
        id: 1,
        email: credentials.email,
        name: "Demo User",
      },
      token: "demo_token",
    };
  },

  register: async (userData) => {
    await simulateDelay();
    return {
      success: true,
      message: "Registration successful",
      user: {
        id: 1,
        email: userData.email,
        name: userData.name,
      },
    };
  },

  /* =========================
     DASHBOARD
  ========================= */
  getDashboardData: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard`);

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard");
    }

    const json = await response.json();
    return json.data;
  },

  /* =========================
     AQI PREDICTION
  ========================= */
  predictAQI: async (data) => {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        state: data.state,
        location: data.city,
        area_type: data.areaType,
        so2: Number(data.so2),
        no2: Number(data.no2),
        rspm: Number(data.rspm),
      }),
    });

    if (!response.ok) {
      throw new Error("Prediction failed");
    }

    const result = await response.json();
    const aqi = Math.round(result.predicted_aqi);

    let healthRisk = "";
    if (aqi <= 50)
      healthRisk = "Air quality is good. No risk.";
    else if (aqi <= 100)
      healthRisk =
        "Air quality is acceptable. Sensitive individuals should take care.";
    else if (aqi <= 200)
      healthRisk = "Sensitive groups may experience health effects.";
    else if (aqi <= 300)
      healthRisk = "Everyone may begin to experience health effects.";
    else
      healthRisk = "Severe pollution. Avoid outdoor activities.";

    return {
      success: true,
      prediction: {
        aqi,
        category: result.aqi_category,
        healthRisk,
        timestamp: new Date().toISOString(),
        location: {
          state: data.state,
          city: data.city,
          areaType: data.areaType,
        },
      },
    };
  },

  /* =========================
     STATES (FROM BACKEND)
  ========================= */
  getStates: async () => {
    const res = await fetch(`${API_BASE_URL}/metadata`);

    if (!res.ok) {
      throw new Error("Failed to fetch states");
    }

    const data = await res.json();
    return {
      success: true,
      states: data.states,
    };
  },
};

/* =========================
   AQI TRENDS (FIXED)
========================= */
export const getAQITrends = async (city, days = 7) => {
  const res = await fetch(`${API_BASE_URL}/aqi-trends/${city}`);

  if (!res.ok) {
    throw new Error("Failed to fetch AQI trends");
  }

  const data = await res.json();

  if (data.status !== "ok") {
    throw new Error("AQI data fetch failed");
  }

  const baseAQI = data.data.aqi;

  // Pseudo trend for UI (backend gives current AQI)
  const trends = Array.from({ length: days }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));

    return {
      date: date.toISOString(),
      aqi: Math.max(20, baseAQI + Math.floor(Math.random() * 30 - 15)),
    };
  });

  return {
    success: true,
    trends,
  };
};

export default api;