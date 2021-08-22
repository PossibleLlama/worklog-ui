// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    alias: {
        "@api": "./src/API",
        "@app": "./src/App",
        "@model": "./src/Model",
    },
    mount: {
        public: "/",
        src: "/build",
    },
    plugins: [
        "@snowpack/plugin-typescript",
        "@snowpack/plugin-postcss",
    ],
    packageOptions: {
    /* ... */
    },
    devOptions: {
        tailwindConfig: "./tailwind.config.js",
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
