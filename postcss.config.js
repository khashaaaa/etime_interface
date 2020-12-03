const twcss = require('tailwindcss')

module.exports = {
    plugins: [
        twcss('./tailwind.config.js'),
        require('autoprefixer')
    ]
}