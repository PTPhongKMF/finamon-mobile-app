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
        "@app/*": "src/app",
        "@assets/*": "src/assets",
        "@components/*": "src/components",
        "@i18n/*": "src/i18n",
        "@services/*": "src/services",
        "@stores/*": "src/stores",
        "@custom.types/*": "src/types",
        "tailwind.config": "./tailwind.config.ts",
      }
    }]]
  };
};