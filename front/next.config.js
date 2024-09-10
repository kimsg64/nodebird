/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const nextConfig = {
    webpack(config, { webpack }) {
        const prod = process.env.NODE_ENV === 'production';
        const plugins = [...config.plugins, new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/)];
        return {
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval',
            plugins,
        };
    },
    reactStrictMode: true,
    transpilePackages: [
        'antd',
        '@ant-design',
        'rc-util',
        'kitchen-flow-editor',
        '@ant-design/pro-editor',
        'zustand',
        'leva',
        'rc-pagination',
        'rc-picker',
        'rc-notification',
        'rc-tooltip',
    ],
};

module.exports = withBundleAnalyzer(nextConfig);
