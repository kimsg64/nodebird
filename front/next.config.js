/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ["antd", "@ant-design", "rc-util", "kitchen-flow-editor", "@ant-design/pro-editor", "zustand", "leva", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip"],
};

module.exports = nextConfig;
