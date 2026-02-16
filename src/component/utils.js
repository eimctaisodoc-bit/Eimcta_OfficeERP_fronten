// src/utils/auth.js

export const getSessionUser = () => {
  try {
    const userString = sessionStorage.getItem('user');
    
    // If nothing is in session storage, return null
    if (!userString) return null;

    // Convert the string back into a Javascript Object
    return JSON.parse(userString);
  } catch (error) {
    console.error("Error parsing session user:", error);
    return null;
  }
};
