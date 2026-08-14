import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Prisma 6 generates a hashed client module that Turbopack cannot resolve
  // when bundled. Marking it as an external server package lets Node resolve
  // it at runtime and fixes the "Cannot find module '@prisma/client-<hash>'"
  // error that broke every DB-backed route (document export, assistant, etc.).
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
  // bcryptjs v3 is ESM-only and Turbopack's file tracing does not always copy
  // it into the standalone output, which breaks the login route at runtime
  // ("Cannot find module 'bcryptjs'"). Force-include it for the auth route.
  outputFileTracingIncludes: {
    "/api/auth/login": ["./node_modules/bcryptjs/**/*"],
  },
};

export default nextConfig;
