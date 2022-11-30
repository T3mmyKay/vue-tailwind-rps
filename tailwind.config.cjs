/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,tsx,jsx}"
    ],
    theme: {
        screens: {
            'sm': '480px'
        },
        extend: {},
    },
    plugins: [],
}
