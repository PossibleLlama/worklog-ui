/* eslint-disable @typescript-eslint/no-var-requires */
const windmill = require("@windmill/react-ui/config");

module.exports = windmill({
    purge: [
        "./public/**/*.html",
        "./src/**/*.{ts,tsx,}"
    ],
});
