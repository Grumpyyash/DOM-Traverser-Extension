import { pageNames, msgSubjects } from '../Common/globalConstants'

// listen for messages from tabs and content-script and respond to them
chrome.runtime.onMessage.addListener((msg) => {
  if (
    msg.from === pageNames.POPUP &&
    msg.subject === msgSubjects.CHECK_STYLES
  ) {
    chrome.tabs.create({
      url: 'CheckStyles.html',
      active: false,
    })
  } else if (
    msg.from === pageNames.POPUP &&
    msg.subject === msgSubjects.TRAVERSE_DOM
  ) {
    chrome.tabs.create({
      url: 'TraverseDom.html',
      active: false,
    })
  } else if (
    msg.from === pageNames.POPUP &&
    msg.subject === msgSubjects.CHECK_DENSITY
  ) {
    chrome.tabs.create({
      url: 'CheckDensity.html',
      active: false,
    })
  } else if (msg.subject === msgSubjects.OPEN_FORM) {
    chrome.tabs.create({
      url: 'Form.html',
      active: true,
    })
  }
})
