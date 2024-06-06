chrome.runtime.onInstalled.addListener(async () => {
  // create new tab url
  let url = chrome.runtime.getURL("03.background.html");
  // create new tab
  let tab = await chrome.tabs.create({ url });

  // get show_clock value from storage
  chrome.storage.sync.get(["show_clock"], (result) => {
    // if show_clock is true then set badge text to ON
    if (result.show_clock) {
      chrome.action.setBadgeText({ text: "ON" });
    }
  });

  // get timer value from storage
  chrome.storage.sync.get(["timer"], (result) => {
    // if timer is not set then set timer to 1
    if (!result.timer) {
      chrome.storage.sync.set({ timer: 1 });
    }
  });

  chrome.commands.onCommand.addListener((command) => {
    // active tab
    chrome.tabs.update({}, async (tab) => {
      if (command === "toggle-clock") {
        // get show_clock value from storage
        chrome.storage.sync.get(["show_clock"], (result) => {
          // if show_clock is true then set show_clock to false and set badge text to OFF
          if (result.show_clock) {
            chrome.storage.sync.set({ show_clock: false });
            chrome.action.setBadgeText({ text: "OFF" });
          } else {
            // if show_clock is false then set show_clock to true and set badge text to ON
            chrome.storage.sync.set({ show_clock: true });
            chrome.action.setBadgeText({ text: "ON" });
          }
        });
      }
    });
  });
});
