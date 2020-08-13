import ts from "@wessberg/rollup-plugin-ts";
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import progress from 'rollup-plugin-progress';

// console.debug(process.argv.join('\n'));
// arv[0] = /usr/bin/node
// arv[1] = /run/media/data/ted/projects/semantic-ui-react-esnext/node_modules/.bin/rollup
// arv[2] = -c

export default [
    {
        input: 'src/index.ts',
        external: ['lodash/fp', 'lodash/without', 'prop-types', 'react', 'react-dom', 'lodash', 'react-is', 'react-popper', 'keyboard-key', 'shallowequal'],
        output: {
            dir: 'dist.1',
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
            format: 'cjs',
            preferConst: true,
            interop: false,
            plugins: [],
            sourcemap: true,
            // manualChunks: id => {

            //     if (/.*src\/lib.*/.test(id)) return 'lib';

            //     let m=id.match(/.*\/src\/components\/([^\/]*)\/.*/);
            //     if (m) return m[1];

            //     m=id.match(/.*\/src\/components\/index.*/);
            //     if (m) return 'components';

            //     console.log(id);
            // },
        },
        acorn: {
            ecmaVersion: 11,
            sourceType: 'module',
            allowImportExportEverywhere: true
        },
        plugins: [
            ts({
                transpiler: 'babel',
                babelConfig: {
                    plugins: [
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
                    ],
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
                },
                include: ["src/**/*"]
            }),
            commonjs({ sourceMap: true }),
            replace({
                "process.env.NODE_ENV": JSON.stringify('development')
            }),
            progress({ clearLine: true }),
        ],
    },
    {
        input: '/home/ted/projects/Semantic-UI-React/src/index.js',
        external: ['react', 'react-dom', /lodash/, 'react-is', 'react-popper', 'keyboard-key', 'shallowequal', /@stardust/, 'debug', /@semantic/, 'prop-types', 'clsx'],
        output: {
            dir: 'dist.0',
            format: 'cjs',
            preferConst: true,
            interop: false,
            plugins: [],
            sourcemap: true
        },
        acorn: {
            ecmaVersion: 11,
            sourceType: 'module',
            allowImportExportEverywhere: true
        },
        plugins: [
            babel({
                babelHelpers: 'inline',
                comments: false,
                sourceMaps: true,
                // cwd: '/home/ted/projects/Semantic-UI-React/',
                plugins: [
                    "@babel/plugin-syntax-jsx",
                    [
                        "@babel/plugin-transform-react-jsx",
                        {
                            throwIfNamespace: false, // defaults to true
                            runtime: "classic", // defaults to classic
                            importSource: "react", // defaults to react
                            useSpread: true,
                        }
                    ],
                    'lodash',
                    'transform-react-handled-props',
                    '@babel/plugin-proposal-export-default-from',
                ]
            }),
            // replace(__REPLACE_CONFIG__),
            commonjs({ sourceMap: true, exclude: 'node_modules/**/*' }),
            progress({ clearLine: true }),
        ],
    }
];

// {
//     input: 'src/index.ts',
//         external: ['lodash/fp', 'lodash/without', 'prop-types', 'react', 'react-dom', 'lodash', 'react-is', 'react-popper', 'keyboard-key', 'shallowequal'],
//             output: {
//         dir: 'dist.1',
//             entryFileNames: '[name].js',
//                 chunkFileNames: '[name].js',
//                     format: 'cjs',
//                         preferConst: true,
//                             interop: false,
//                                 plugins: [],
//                                     sourcemap: true,
//             // manualChunks: (id) => /.*\/src\/lib.*/.test(id)? 'lib':/.*\/src\/components.*/.test(id)? 'components':id,
//         },
//     acorn: {
//         ecmaVersion: 11,
//             sourceType: 'module',
//                 allowImportExportEverywhere: true
//     },
//     plugins: [
//         ts({
//             transpiler: 'babel',
//             babelConfig: {
//                 plugins: [
//                     "@babel/plugin-syntax-jsx",
//                     [
//                         "@babel/plugin-transform-react-jsx",
//                         {
//                             throwIfNamespace: false, // defaults to true
//                             runtime: "classic", // defaults to classic
//                             importSource: "react", // defaults to react
//                             useSpread: true
//                         }
//                     ],
//                     // ["@babel/plugin-proposal-pipeline-operator", { proposal: "smart" }],
//                     // "@babel/plugin-proposal-partial-application",
//                     // "@babel/plugin-proposal-optional-chaining",
//                     // "@babel/plugin-proposal-numeric-separator",
//                     // "@babel/plugin-proposal-nullish-coalescing-operator",
//                     // "@babel/plugin-proposal-logical-assignment-operators",
//                     // "@babel/plugin-proposal-do-expressions",
//                     // "@babel/plugin-proposal-optional-catch-binding",
//                     // "@babel/plugin-proposal-function-bind",
//                     // "@babel/plugin-proposal-function-sent",
//                     // "@babel/plugin-proposal-export-default-from",
//                     // ["@babel/plugin-proposal-class-properties", { "loose": true }],
//                     // "babel-plugin-lodash",
//                     // "babel-plugin-pure-calls-annotation",
//                     // "babel-plugin-transform-remove-debugger",
//                     // "babel-plugin-transform-simplify-comparison-operators",
//                     // "babel-plugin-transform-node-env-inline",
//                 ],
//                 presets: [
//                     [
//                         "@babel/preset-env",
//                         {
//                             targets: { electron: "9.0" },
//                             bugfixes: true,
//                             loose: true,
//                             modules: false
//                         }
//                     ]
//                 ],
//             },
//             include: ["src/**/*"]
//         }),
//         commonjs({ sourceMap: true }),
//         replace({
//             "process.env.NODE_ENV": JSON.stringify('development')
//         }),
//         progress({ clearLine: true }),
//     ],
//     }
