var path = require('path');

module.exports = {
    entry: {
        "index": "index.ts"
    },
    output: {
        filename: "[name].js",
        path: "dist"
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        root: [
            path.resolve(__dirname, "src")
        ],
        extensions: ["", ".ts", ".js"]
    }
};
