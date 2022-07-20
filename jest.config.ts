export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleNameMapper: {
        "^@api(.*)$": "<rootDir>/src/API/$1",
        "^@model(.*)$": "<rootDir>/src/Model/$1",
        "^@component(.*)$": "<rootDir>/src/Components/$1",
        "^@view(.*)$": "<rootDir>/src/Views/$1",
        "^@page(.*)$": "<rootDir>/src/Pages/$1"
    }
}
