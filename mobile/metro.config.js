const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config")

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: ["bin", "txt", "jpg", "png", "json", "mp4", "mov", "avi"],
    sourceExts: ["js", "json", "ts", "tsx", "jsx"],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
