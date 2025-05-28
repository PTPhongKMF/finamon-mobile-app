module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel"
    ],

    plugins: [["module-resolver", {
      root: ["./"],

      alias: {
        "@": "./",
        "@app": "src/app",
        "@components": "src/components",
        "tailwind.config": "./tailwind.config.ts"
      }
    }]]
  };
};