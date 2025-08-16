// const nextConfig = {
//   output: "export",
//   distDir: "./dist",
// };

// export default nextConfig;
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
