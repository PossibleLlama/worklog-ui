// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    alias: {
        "@api": "./src/API",
        "@model": "./src/Model",
        "@component": "./src/Components/",
        "@view": "./src/Views/",
        "@page": "./src/Pages/",
    },
    mount: {
        public: "/",
        src: "/build",
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
    optimize: {
        bundle: true,
        minify: true,
        target: "es2020",
        treeshake: true,
    }
};
