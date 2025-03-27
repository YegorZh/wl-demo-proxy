/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Allow all origins
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM *", // Allow embedding in iframes
          },
          // Additional security headers
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' ${process.env.NEXT_PUBLIC_UNIT_URL} https://js.verygoodvault.com/vgs-show/1.5/ACh8JJTM42LYxwe2wfGQxwj5.js; style-src 'self' 'unsafe-inline' https://themes.unit.co https://fonts.googleapis.com; img-src 'self' data: https:; connect-src 'self' "https://themes.unit.co ${process.env.RETOOL_START_TRIGGER_URL} ${process.env.NEXT_PUBLIC_UNIT_URL} https://api.unit.co https://api.s.unit.sh https://themes.unit.co; frame-src 'self' ${process.env.NEXT_PUBLIC_UNIT_URL}; font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
