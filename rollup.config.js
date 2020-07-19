import ts from "@wessberg/rollup-plugin-ts";
// import commonjs from '@rollup/plugin-commonjs';
// import replace from '@rollup/plugin-replace';
import progress from 'rollup-plugin-progress';

export default {
    input: 'src/index.ts',
    external: ['react', 'react-dom', 'lodash', 'react-is', 'react-popper', 'keyboard-key', 'shallowequal'],
    output: {
        dir: 'dist',
        format: 'es',
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
        ts({ transpiler: 'babel' }),
        // replace(__REPLACE_CONFIG__),
        // commonjs({ sourceMap: false }),
        progress({ clearLine: false }),
    ],
};
