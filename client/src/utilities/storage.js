export const getHistory = () => {
    return JSON.parse(localStorage.getItem("history") || "[]");
}

export const addHistory = (url) => {
    const current = getHistory().filter(value => value !== url);
    const updated = [url, ...current];
    localStorage.setItem("history", JSON.stringify(updated));
}
