/// <reference types="vite/client" />

export const getApiUrl = () => {
    return import.meta.env.MODE === "production"
        ? "https://siseveeb.voco.ee"
        : "https://siseveeb.voco.ee";
};