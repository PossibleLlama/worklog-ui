// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    alias: {
        "@api": "./src/API",
        "@app": "./src/App",
    },
    mount: {
    /* ... */
    },
    plugins: [
        "@snowpack/plugin-typescript",
    ],
    packageOptions: {
    /* ... */
    },
    devOptions: {
    /* ... */
    },
    buildOptions: {
    /* ... */
    },
};
