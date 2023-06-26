let refreshIntervalId;
let tabId;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'start') {
    tabId = request.tabId;
    refreshIntervalId = setInterval(() => {
      chrome.tabs.reload(tabId);
      checkButtonPresence(tabId);
    }, request.interval);
  } else if (request.action === 'stop') {
    tabId = null;
    clearInterval(refreshIntervalId);
  }
});

function checkButtonPresence(tabId) {
  chrome.tabs.sendMessage(tabId, {action: 'checkButton'});
}
