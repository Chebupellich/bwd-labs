const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path'); // Импортируем модуль "path" для работы с путями файлов

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Точка входа для сборки проекта

    output: {
        filename: 'bundle.js', // Имя выходного файла сборки
        path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]', // Сохранить структуру папок
                            outputPath: 'assets/icons/', // Путь для выходных файлов в dist
                        },
                    },
                ],
            },
        ],
    },

    plugins: [

        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/about.html',
            inject: true,
            chunks: ['about'],
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/projects.html',
            inject: true,
            chunks: ['projects'],
            filename: 'projects.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/tasks.html',
            inject: true,
            chunks: ['tasks'],
            filename: 'tasks.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
                { from: 'src/scripts', to: 'scripts' },
            ],
        }),
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Каталог для статики
        },
        open: true, // Автоматически открывать браузер
    },

    mode: 'development', // Режим сборки
};