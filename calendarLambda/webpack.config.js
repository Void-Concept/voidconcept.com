const path = require('path');

module.exports = {
    target: "node",
    entry: "./src",
    mode: "none",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        libraryTarget: "commonjs",
        path: path.resolve(__dirname, "build"),
        filename: "index.js"
    },
    externals: {
        'erlpack': 'erlpack',
        'zlib-sync': 'zlib-sync',
        'bufferutil': 'bufferutil',
        'utf-8-validate': 'utf-8-validate',
        'ffmpeg-static': 'ffmpeg-static',
    }
};
