module.exports = {
    extends: 'airbnb-base',
    rules: {
        indent: ['error', 4],
    },
    plugins: ['jest'],
    env: {
        jest: true,
    },
};
