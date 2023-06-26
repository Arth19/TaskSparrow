document.getElementById('start').addEventListener('click', function() {
    const interval = document.getElementById('interval').value * 1000;  // convert to milliseconds
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.runtime.sendMessage({action: 'start', interval: interval, tabId: tabs[0].id});
    });
  });
  
  document.getElementById('stop').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: 'stop'});
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'playSound') {
      document.getElementById('notificationSound').play();
    }
  });
  