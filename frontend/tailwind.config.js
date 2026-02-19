/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#020617", // Deep Navy (Slate 950)
                secondary: "#1e293b", // Lighter Navy (Slate 800)
                accent: "#fbbf24", // Gold (Amber 400)
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'gradient': 'gradient 8s linear infinite',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': { 'background-size': '300% 300%', 'background-position': 'left center' },
                    '50%': { 'background-size': '300% 300%', 'background-position': 'right center' },
                },
            },
        },
    },
    plugins: [],
}
