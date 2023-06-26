document.getElementById('start').addEventListener('click', function() {
    const interval = document.getElementById('interval').value * 1000;  // convert to milliseconds
    chrome.runtime.sendMessage({action: 'start', interval: interval});
  });
  
  document.getElementById('stop').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: 'stop'});
  });
  