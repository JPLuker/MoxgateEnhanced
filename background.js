// Launch the real Moxgate website in an app-like browser window.
// No proxy, mirror, account handling, or hosted website is involved.
chrome.action.onClicked.addListener(async () => {
  try {
    await chrome.windows.create({
      url: "https://www.moxgate.com/",
      type: "popup",
      width: 1440,
      height: 900,
      focused: true
    });
  } catch (error) {
    console.error("Could not open MoxgateEnhanced browser window:", error);
    await chrome.tabs.create({ url: "https://www.moxgate.com/" });
  }
});
