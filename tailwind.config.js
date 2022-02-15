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
            'rose': {
                50: '#fef1f8',
                100: '#fee5f2',
                200: '#fecce6',
                300: '#ffa2d2',
                400: '#fd69b1',
                500: '#f72585',
                600: '#e81a6e',
                700: '#ca0c54',
                800: '#a70d45',
                900: '#8b103c',
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