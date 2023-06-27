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
  const allowedURLPattern = 'https://www.raterhub.com/evaluation/rater';

  chrome.tabs.query({ active: true, currentWindow: true, url: allowedURLPattern }, tabs => {
    const activeTab = tabs[0];

    if (activeTab) {
      chrome.tabs.sendMessage(tabId, { action: 'checkButton' }, response => {
        if (!chrome.runtime.lastError && response && response.hasButton) {
          chrome.runtime.sendMessage({ action: 'playSound' });
        }
      });
    }
  });
}
