let tabId;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'start') {
    tabId = request.tabId;
    chrome.alarms.create('refreshAlarm', { delayInMinutes: request.interval / 60000, periodInMinutes: request.interval / 60000 });
  } else if (request.action === 'stop') {
    tabId = null;
    chrome.alarms.clear('refreshAlarm');
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'refreshAlarm') {
    chrome.tabs.reload(tabId);
    checkButtonPresence(tabId);
  }
});

function checkButtonPresence(tabId) {
  chrome.tabs.query({ active: true, currentWindow: true}, tabs => {
    const activeTab = tabs[0];
    
    if (activeTab) {
      chrome.tabs.sendMessage(tabId, { action: 'checkButton' }, response => {
        if (!chrome.runtime.lastError && response && response.hasButton) {
          chrome.runtime.sendMessage({ action: 'notificationSound' });
        }
      });
    }
  });
}