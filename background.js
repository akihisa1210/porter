// Background script for Porter Chrome Extension
// Handles extension lifecycle and communication

chrome.runtime.onInstalled.addListener(() => {
  console.log('Porter extension installed');
});

// Handle popup opening
chrome.action.onClicked.addListener((tab) => {
  // This will open the popup automatically when the action is clicked
  // The popup HTML will handle the rest
});