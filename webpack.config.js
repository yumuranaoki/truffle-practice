module.exports = {
    mode: "development",
    watch: true,
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["env", {"modules": false}],
                                "react"
                            ]
                        }
                    }
                ],
                exclude: /node_modules/,
            }
        ]
    }
}