
// example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  (request, sender, sendResponse) => {
    // Error handlering
    if (chrome.pageAction) {
      chrome.pageAction.show(sender.tab.id);
      sendResponse();
    }
  },
);
