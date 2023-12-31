chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkButton') {
    const button = document.querySelector('.button');
    if (button && button.innerText === 'Acquire if available') {
      sendResponse({ hasButton: true });
    } else {
      sendResponse({ hasButton: false });
    }
  }
});
