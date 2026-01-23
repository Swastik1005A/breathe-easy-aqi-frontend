// API Service for AQI Prediction System
// This service will connect to the FastAPI backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Simulated delay for realistic UX
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// API endpoints
export const api = {
  // Authentication
  login: async (credentials) => {
    await simulateDelay();
    // Placeholder response
    return {
      success: true,
      user: {
        id: 1,
        email: credentials.email,
        name: 'Demo User',
      },
      token: 'placeholder_token',
    };
  },

  register: async (userData) => {
    await simulateDelay();
    // Placeholder response
    return {
      success: true,
      message: 'Registration successful',
      user: {
        id: 1,
        email: userData.email,
        name: userData.name,
      },
    };
  },

  // AQI Prediction
  predictAQI: async (data) => {
    await simulateDelay(800);
    // Placeholder response with realistic AQI calculation simulation
    const { so2, no2, rspm } = data;
    const baseAQI = Math.round((parseFloat(so2) * 0.5 + parseFloat(no2) * 0.8 + parseFloat(rspm) * 1.2));
    const aqi = Math.min(500, Math.max(0, baseAQI + Math.floor(Math.random() * 50)));
    
    let category, healthRisk;
    if (aqi <= 50) {
      category = 'Good';
      healthRisk = 'Air quality is satisfactory, and air pollution poses little or no risk.';
    } else if (aqi <= 100) {
      category = 'Moderate';
      healthRisk = 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.';
    } else if (aqi <= 200) {
      category = 'Poor';
      healthRisk = 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.';
    } else if (aqi <= 300) {
      category = 'Unhealthy';
      healthRisk = 'Everyone may begin to experience health effects. Members of sensitive groups may experience more serious health effects.';
    } else {
      category = 'Severe';
      healthRisk = 'Health alert: The risk of health effects is increased for everyone. Avoid outdoor activities.';
    }

    return {
      success: true,
      prediction: {
        aqi,
        category,
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

  // Dashboard Data
  getDashboardData: async () => {
    await simulateDelay();
    return {
      success: true,
      data: {
        latestAQI: 85,
        category: 'Moderate',
        healthRisk: 'Air quality is acceptable. Sensitive individuals should limit prolonged outdoor exertion.',
        lastUpdated: new Date().toISOString(),
        stats: {
          predictions: 156,
          citiesMonitored: 12,
          alertsIssued: 8,
        },
      },
    };
  },

  // AQI Trends
  getAQITrends: async (city, dateRange) => {
    await simulateDelay();
    // Generate placeholder trend data
    const days = 7;
    const trends = [];
    const baseAQI = Math.floor(Math.random() * 100) + 50;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      trends.push({
        date: date.toISOString().split('T')[0],
        aqi: Math.max(0, baseAQI + Math.floor(Math.random() * 60) - 30),
      });
    }

    return {
      success: true,
      city: city || 'Delhi',
      trends,
    };
  },

  // Health Alerts
  getHealthAlerts: async () => {
    await simulateDelay();
    return {
      success: true,
      alerts: [
        {
          id: 1,
          level: 'safe',
          title: 'Good Air Quality',
          description: 'Air quality is satisfactory. Enjoy outdoor activities.',
          icon: 'check-circle',
        },
        {
          id: 2,
          level: 'caution',
          title: 'Moderate Conditions',
          description: 'Sensitive individuals should consider reducing prolonged outdoor exertion.',
          icon: 'alert-triangle',
        },
        {
          id: 3,
          level: 'danger',
          title: 'Unhealthy Air',
          description: 'Everyone should reduce outdoor activities. Wear masks if going outside.',
          icon: 'alert-octagon',
        },
      ],
    };
  },

  // Get Cities by State
  getCitiesByState: async (state) => {
    await simulateDelay(300);
    const citiesMap = {
      'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'],
      'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
      'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
      'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
      'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
      'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Noida'],
      'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
      'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
    };
    
    return {
      success: true,
      cities: citiesMap[state] || [],
    };
  },

  // Get States
  getStates: async () => {
    await simulateDelay(200);
    return {
      success: true,
      states: [
        'Delhi',
        'Maharashtra',
        'Karnataka',
        'Tamil Nadu',
        'Gujarat',
        'Uttar Pradesh',
        'West Bengal',
        'Rajasthan',
      ],
    };
  },
};

export default api;
