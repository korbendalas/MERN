const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@actions": path.resolve(__dirname, "src/actions"),
      "@reducers": path.resolve(__dirname, "src/reducers"),
      "@toResponse": path.resolve(__dirname, "src/to-response"),
      "@services": path.resolve(__dirname, "src/services"),
      "@endpoints": path.resolve(__dirname, "src/endpoints"),
      "@history": path.resolve(__dirname, "src/services/history")
    }
  }
};
