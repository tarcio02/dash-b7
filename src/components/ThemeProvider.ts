import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
useEffect(() => {
    // Força dark mode
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
}, []);

return {children}
}