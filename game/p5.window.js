let os = null;
if (navigator.userAgentData && navigator.userAgentData.platform === "Windows") {
  navigator.userAgentData
    .getHighEntropyValues(["architecture", "bitness"])
    .then((ua) => {
      const arch = ua.architecture;
      const bitness = ua.bitness;

      if (arch === "x86" && bitness === "64") {
        os = "WIN x64";
      } else if (arch === "x86" && bitness === "32") {
        os = "WIN x32";
      } else if (arch === "arm" && bitness === "64") {
        os = "ARM x64";
      }
    });
}
