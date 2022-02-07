module.exports = {
    content: [
        "./src/**/*.{html,ts}",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
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
        require('flowbite/plugin')
    ]
}