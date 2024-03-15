/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    // see https://github.com/sindresorhus/got/issues/2267#issuecomment-1659768856
    config.ignoreWarnings = [{ module: /node_modules\/keyv\/src\/index\.js/ }];

    // see https://github.com/rainbow-me/rainbowkit/blob/main/examples/with-next-app/next.config.js
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    config.externals.push(
      "pino-pretty",
      "lokijs",
      "encoding",
      "bufferutil",
      "utf-8-validate",
    );

    return config;
  },
};

export default config;
