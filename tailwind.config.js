module.exports = {
    content: [
        "./src/**/*.{html,ts}",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        colors: {
            'gem': {
                50: '#f3f1ff',
                100: '#e9e6ff',
                200: '#d5d0ff',
                300: '#b7abff',
                400: '#947bff',
                500: '#7346ff',
                600: '#6221ff',
                700: '#540ff2',
                800: '#450ccb',
                900: '#3a0ca3',
            },
        },
        extend: {},
        listStyleType: {
            none: 'none',
            disc: 'disc',
            decimal: 'decimal',
            square: 'square',
            roman: 'upper-roman',
        }
    },
    plugins: [
        require('flowbite/plugin'),
        require('@tailwindcss/line-clamp'),
    ]
}