module.exports = {
    content: [
        "./src/**/*.{html,ts}",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        colors: {
            'gem': {
                50: '#f2f5fc',
                100: '#e2e8f7',
                200: '#ccd7f1',
                300: '#a9bee7',
                400: '#809cda',
                500: '#627ccf',
                600: '#4e63c2',
                700: '#4451b1',
                800: '#3f4898',
                900: '#343c74',
            },
            'picton': {
                50: '#f1f9fe',
                100: '#e2f3fc',
                200: '#bde7fa',
                300: '#83d5f6',
                400: '#4bc2ef',
                500: '#19a7de',
                600: '#0c87bd',
                700: '#0b6c99',
                800: '#0d5b7f',
                900: '#114c69',
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
