let refreshIntervalId;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'start') {
    refreshIntervalId = setInterval(() => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
            location.reload();
          }
        });
      });
    }, request.interval);
  } else if (request.action === 'stop') {
    clearInterval(refreshIntervalId);
  }
});
