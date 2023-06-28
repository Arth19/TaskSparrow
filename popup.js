let countdownIntervalId;

document.getElementById('start').addEventListener('click', function() {
  console.log('Start button clicked');
  const interval = document.getElementById('interval').value * 1000;  // convert to milliseconds
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.runtime.sendMessage({action: 'start', interval: interval, tabId: tabs[0].id});
  });
  startCountdown(interval / 1000);
});

document.getElementById('stop').addEventListener('click', function() {
  chrome.runtime.sendMessage({action: 'stop'});
  stopCountdown();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'notificationSound') {
    document.getElementById('notificationSound').play();
    const taskMessageElement = document.getElementById('task-message');
    taskMessageElement.textContent = 'TASK!';
    taskMessageElement.classList.add('alert'); // Adiciona a classe 'alert' ao elemento
  }
});

function startCountdown(seconds) {
  let remainingSeconds = seconds;
  displayTime(remainingSeconds);
  countdownIntervalId = setInterval(() => {
    remainingSeconds--;
    displayTime(remainingSeconds);
    if (remainingSeconds <= 0) {
      stopCountdown();
      startCountdown(seconds); // Reiniciar o contador
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(countdownIntervalId);
  document.getElementById('countdown').textContent = '00:00';
  const taskMessageElement = document.getElementById('task-message');
  taskMessageElement.textContent = ''; // Limpe a mensagem TASK!
  taskMessageElement.classList.remove('alert'); // Remove a classe 'alert' do elemento
}

function displayTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  document.getElementById('countdown').textContent = `${pad(minutes)}:${pad(remainingSeconds)}`;
}

function pad(number) {
  return number.toString().padStart(2, '0');
}