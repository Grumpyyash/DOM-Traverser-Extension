import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './popup.css'

import { ErrorObject } from '../Interface/interface'
import { AppPresentation } from './popupPresentation'
import {
  configDownloadErrorMessage,
  densityFileParsingErrorMessage,
  densityToBackgroundErrorMessage,
  densityToContentScriptErrorMessage,
  formTabErrorMessage,
  semanticContentScriptErrorMessage,
  semanticToBackgroundErrorMessage,
  stylesFileParsingErrorMessage,
  stylesToBackgroundErrorMessage,
  stylesToContentScriptErrorMessage,
  tabIdStoreErrorMessage,
  websiteUrlStoreErrorMessage,
} from '../Messages/consoleMessages'

import {
  pageNames,
  elementTags,
  msgSubjects,
  alertColors,
} from '../Common/globalConstants'

const App = (): JSX.Element => {
  const [showCheckInput, setShowCheckInput] = useState(false)
  const [isFileInput, setIsFileInput] = useState(false)
  const [isCheckboxClicked, setIscheckboxClicked] = useState(false)
  const [isMessageError, setIsMessageError] = useState(false)
  const [jsonData, setJsonData] = useState(null)
  const [isFileFormatValid, setIsFileFormatValid] = useState(true)
  const [showfileFormatError, setShowFileFormatError] = useState(false)

  // add an alert to dom for showing different messages
  const showHighlightedAlert = (message: string, type: string) => {
    const alert = document.createElement(elementTags.DIV)
    alert.className = `alert alert-${type} fixed-alert`
    alert.textContent = message
    document.body.appendChild(alert)
    setTimeout(function () {
      document.body.removeChild(alert)
    }, 2000)
  }

  // set the traverse-dom data to chrome store to be accessed by the new tab
  const handleTraverseDomFromContentScript = (
    response: ErrorObject[]
  ): void => {
    try {
      chrome.runtime.sendMessage({
        from: pageNames.POPUP,
        subject: msgSubjects.TRAVERSE_DOM,
      })
    } catch (error) {
      showHighlightedAlert(semanticToBackgroundErrorMessage, alertColors.DANGER)
    }
  }

  // send message to content-script and set the website url into localstore
  const handleTraverseDom = (e: React.MouseEvent<HTMLElement>): void => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (tabs) {
        try {
          chrome.storage.local.set({ websiteTabId: tabs[0].id })
        } catch (error) {
          showHighlightedAlert(tabIdStoreErrorMessage, alertColors.DANGER)
        }
        try {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { from: pageNames.POPUP, subject: msgSubjects.TRAVERSE_DOM },
            handleTraverseDomFromContentScript
          )
        } catch (error) {
          showHighlightedAlert(
            semanticContentScriptErrorMessage,
            alertColors.DANGER
          )
        }

        try {
          chrome.storage.local.set({ websiteUrl: tabs[0].url })
        } catch (error) {
          showHighlightedAlert(websiteUrlStoreErrorMessage, alertColors.DANGER)
        }
      }
    )
  }

  // handle checkbox change of check-styles
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIscheckboxClicked(!isCheckboxClicked)
  }

  // handle uploading of a JSON file to check styles
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files.length === 0) return
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const fileContent = event.target.result as string
      try {
        const parsedJson = JSON.parse(fileContent)
        setJsonData(parsedJson)
        setIsFileInput(true)
        setIsFileFormatValid(true)
      } catch (error) {
        setIsFileFormatValid(false)
        showHighlightedAlert(stylesFileParsingErrorMessage, alertColors.DANGER)
      }
    }
    reader.readAsText(file)
  }

  // send message to background to create a new check-styles tab
  const handleCheckStyles = (e: React.MouseEvent<HTMLElement>): void => {
    setShowCheckInput(!showCheckInput)
  }

  // handle response for background for opening new tab for check-styles
  const handleCheckStylesFromContentScript = (
    response: ErrorObject[]
  ): void => {
    if (response.length === 0) {
      return
    }
    try {
      chrome.runtime.sendMessage({
        from: pageNames.POPUP,
        subject: msgSubjects.CHECK_STYLES,
      })
    } catch (error) {
      showHighlightedAlert(stylesToBackgroundErrorMessage, alertColors.DANGER)
    }
  }

  // handle check-styles submit button
  const handleStylesSubmit = (event: React.MouseEvent<HTMLElement>): void => {
    if (!isFileFormatValid) {
      setShowFileFormatError(true)
      return
    }
    if (!isCheckboxClicked && !isFileInput) {
      setIsMessageError(true)
      return
    }
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (tabs) {
        try {
          chrome.tabs.sendMessage(
            tabs[0].id,
            {
              from: pageNames.POPUP,
              subject: msgSubjects.CHECK_STYLES,
              default: isCheckboxClicked,
              jsonData: jsonData,
            },
            handleCheckStylesFromContentScript
          )
        } catch (error) {
          showHighlightedAlert(
            stylesToContentScriptErrorMessage,
            alertColors.DANGER
          )
        }

        try {
          chrome.storage.local.set({ websiteUrl: tabs[0].url })
        } catch (error) {
          showHighlightedAlert(websiteUrlStoreErrorMessage, alertColors.DANGER)
        }
        setIsFileInput(false)
        setIscheckboxClicked(false)
        setJsonData(null)
      }
    )
  }

  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [defaultDensity, setDefaultDensity] = useState(false)
  const [comapctDensity, setCompactDensity] = useState(false)
  const [customDensity, setCustomDensity] = useState(false)
  const [isDensityFileInput, setIsDensityFileInput] = useState(false)
  const [densityJsonData, setDensityJsonData] = useState('')
  const [isDensityFileFormatError, setIsDensityFileFormatError] =
    useState(false)

  // handle to give options for default or compact view for check-density
  const handleCheckDensity = (event: React.MouseEvent<HTMLElement>): void => {
    setIsSelectOpen(!isSelectOpen)
  }

  // single point function for handling change of any density checkbox
  const handleDensityCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const targetElement = event.target.name
    if (targetElement === 'default-density-checkbox') {
      setDefaultDensity(event.target.checked)
      setCompactDensity(false)
      setCustomDensity(false)
      setDensityJsonData('')
      setIsDensityFileFormatError(false)
    } else if (targetElement === 'compact-density-checkbox') {
      setCompactDensity(event.target.checked)
      setDefaultDensity(false)
      setCustomDensity(false)
      setDensityJsonData('')
      setIsDensityFileFormatError(false)
    } else if (targetElement === 'custom-density-checkbox') {
      setDefaultDensity(false)
      setCompactDensity(false)
      setCustomDensity(event.target.checked)
      setDensityJsonData('')
      setIsDensityFileFormatError(false)
    }
  }

  // handle response from content-script for
  const handleCheckDensityFromContentScript = (response: ErrorObject[]) => {
    if (response.length === 0) {
      return
    }
    try {
      chrome.runtime.sendMessage({
        from: pageNames.POPUP,
        subject: msgSubjects.CHECK_DENSITY,
      })
    } catch (error) {
      showHighlightedAlert(densityToBackgroundErrorMessage, alertColors.DANGER)
    }
  }

  // handle file input for density config
  const handleDensityFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files.length === 0) {
      setDensityJsonData('')
      return
    }
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const fileContent = event.target.result as string
      try {
        const parsedJson = JSON.parse(fileContent)
        setDensityJsonData(parsedJson)
        setIsDensityFileInput(true)
        setIsDensityFileFormatError(false)
      } catch (error) {
        setIsDensityFileFormatError(true)
        showHighlightedAlert(densityFileParsingErrorMessage, alertColors.DANGER)
      }
    }
    reader.readAsText(file)
  }

  // handle the submit button for checking density
  const handleDensitySubmit = (): void => {
    if (isDensityFileFormatError) {
      setShowFileFormatError(true)
      return
    }
    if (!defaultDensity && !comapctDensity && !isDensityFileInput) {
      setIsMessageError(true)
      return
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      try {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            from: pageNames.POPUP,
            subject: msgSubjects.CHECK_DENSITY,
            isDefault: defaultDensity,
            densityJsonData: densityJsonData,
          },
          handleCheckDensityFromContentScript
        )
      } catch (error) {
        showHighlightedAlert(
          densityToContentScriptErrorMessage,
          alertColors.DANGER
        )
      }
      setDensityJsonData('')
      setDefaultDensity(false)
      setCompactDensity(false)
      setIsDensityFileInput(false)
      setIsDensityFileFormatError(false)
    })
  }

  // close alert bar
  const handleAlertClose = (event: React.MouseEvent<HTMLElement>): void => {
    setIsMessageError(false)
  }

  // download the sample json file
  const handleDownloadFile = () => {
    const fileUrl = chrome.runtime.getURL('config.json')
    try {
      chrome.downloads.download({
        url: fileUrl,
        filename: 'data.json',
      })
    } catch (error) {
      showHighlightedAlert(configDownloadErrorMessage, alertColors.DANGER)
    }
  }

  // close the file format error alert
  const handleShowFileFormatClose = () => {
    setShowFileFormatError(false)
    setIsFileFormatValid(true)
  }

  // open the new form-tab for feedback
  const openFormTab = () => {
    try {
      chrome.runtime.sendMessage({
        from: pageNames.POPUP,
        subject: msgSubjects.OPEN_FORM,
      })
    } catch (error) {
      showHighlightedAlert(formTabErrorMessage, alertColors.DANGER)
    }
  }

  return (
    <AppPresentation
      isMessageError={isMessageError}
      showCheckInput={showCheckInput}
      isFileInput={isFileInput}
      showfileFormatError={showfileFormatError}
      isCheckboxClicked={isCheckboxClicked}
      isSelectOpen={isSelectOpen}
      comapctDensity={comapctDensity}
      defaultDensity={defaultDensity}
      customDensity={customDensity}
      handleAlertClose={handleAlertClose}
      handleShowFileFormatClose={handleShowFileFormatClose}
      handleTraverseDom={handleTraverseDom}
      handleCheckStyles={handleCheckStyles}
      handleDownloadFile={handleDownloadFile}
      handleCheckboxChange={handleCheckboxChange}
      isDensityFileInput={isDensityFileInput}
      handleFileInputChange={handleFileInputChange}
      handleStylesSubmit={handleStylesSubmit}
      handleCheckDensity={handleCheckDensity}
      handleDensityFileInputChange={handleDensityFileInputChange}
      handleDensityCheckboxChange={handleDensityCheckboxChange}
      handleDensitySubmit={handleDensitySubmit}
      openFormTab={openFormTab}
    />
  )
}

const container = document.createElement(elementTags.DIV)
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
