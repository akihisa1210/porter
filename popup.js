document.addEventListener('DOMContentLoaded', function() {
  const errorMessage = document.getElementById('error-message');
  const destinationsContainer = document.getElementById('destinations');

  // Check if we're on a supported page
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentTab = tabs[0];
    
    if (!currentTab.url.includes('amazon.co.jp')) {
      showError('Please navigate to an Amazon Japan product page to use this extension.');
      destinationsContainer.style.display = 'none';
      return;
    }

    // Send message to content script to check if we can scrape data
    chrome.tabs.sendMessage(currentTab.id, { action: 'checkCanScrape' }, function(response) {
      if (chrome.runtime.lastError) {
        showError('Failed to connect to the page. Please refresh and try again.');
        destinationsContainer.style.display = 'none';
        return;
      }

      if (!response || !response.canScrape) {
        showError('This page does not appear to be a supported Amazon product page.');
        destinationsContainer.style.display = 'none';
        return;
      }

      // Page is supported, show destinations
      hideError();
    });
  });

  // Handle destination clicks
  document.querySelectorAll('.destination-option').forEach(option => {
    option.addEventListener('click', function() {
      const destination = this.dataset.destination;
      
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { 
          action: 'exportTo', 
          destination: destination 
        }, function(response) {
          if (chrome.runtime.lastError) {
            showError('Failed to export data. Please try again.');
            return;
          }

          if (response && response.success) {
            // Close popup after successful export
            window.close();
          } else {
            showError(response.error || 'Failed to export data. Please try again.');
          }
        });
      });
    });
  });

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  }

  function hideError() {
    errorMessage.style.display = 'none';
  }
});