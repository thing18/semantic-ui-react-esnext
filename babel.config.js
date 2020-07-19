const plugins=[
    "@babel/plugin-syntax-jsx",
    [
        "@babel/plugin-transform-react-jsx",
        {
            throwIfNamespace: false, // defaults to true
            runtime: "classic", // defaults to classic
            importSource: "react", // defaults to react
            useSpread: true
        }
    ],
    // ["@babel/plugin-proposal-pipeline-operator", { proposal: "smart" }],
    // "@babel/plugin-proposal-partial-application",
    // "@babel/plugin-proposal-optional-chaining",
    // "@babel/plugin-proposal-numeric-separator",
    // "@babel/plugin-proposal-nullish-coalescing-operator",
    // "@babel/plugin-proposal-logical-assignment-operators",
    // "@babel/plugin-proposal-do-expressions",
    // "@babel/plugin-proposal-optional-catch-binding",
    // "@babel/plugin-proposal-function-bind",
    // "@babel/plugin-proposal-function-sent",
    // "@babel/plugin-proposal-export-default-from",
    // ["@babel/plugin-proposal-class-properties", { "loose": true }],
    // "babel-plugin-lodash",
    // "babel-plugin-pure-calls-annotation",
    // "babel-plugin-transform-remove-debugger",
    // "babel-plugin-transform-simplify-comparison-operators",
    // "babel-plugin-transform-node-env-inline",
];

module.exports={

    plugins,
    presets: [
        [
            "@babel/preset-env",
            {
                targets: { electron: "9.0" },
                bugfixes: true,
                loose: true,
                modules: false
            }
        ]
    ],
}
