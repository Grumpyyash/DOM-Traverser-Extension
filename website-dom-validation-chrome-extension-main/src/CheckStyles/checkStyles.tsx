import React, { useEffect, useState, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './checkStyles.css'

import { ErrorObject, ErrorObjectInAccordion } from '../Interface/interface'
import { AppPresentation } from './stylesPresentation'
import {
  chromeStoreErrorMessage,
  formTabErrorMessage,
  highlightErrorMessage,
  highlightSuccessMessage,
} from '../Messages/consoleMessages'

import { elementTags } from '../Common/globalConstants'

const App = (): JSX.Element => {
  const [errorsCount, setErrorsCount] = useState(0)
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [objectsArray, setObjectsArray] = useState([])
  const [showPath, setShowPath] = useState(false)
  const [currentPath, setCurrentPath] = useState('')
  const [websiteTabId, setWebsiteTabId] = useState(null)

  // get the data from chrome to be used in accordions
  useEffect(() => {
    chrome.storage.local
      .get(['websiteUrl', 'errorsMapInStorage', 'websiteTabId'])
      .then((result) => {
        setWebsiteUrl(result.websiteUrl)
        setWebsiteTabId(result.websiteTabId)

        let temporaryErrorsMap: Map<string, ErrorObject[]> = new Map()
        result.errorsMapInStorage.map((error: ErrorObject) => {
          const elementName: string = error.elementName
          if (temporaryErrorsMap.has(elementName)) {
            temporaryErrorsMap.get(elementName).push(error)
          } else {
            temporaryErrorsMap.set(elementName, [error])
          }
        })

        let errorsObjectsArray: ErrorObjectInAccordion[] = []
        temporaryErrorsMap.forEach((value, elementName) => {
          let currentElementErrors = []
          currentElementErrors = value
          const errorObject: ErrorObjectInAccordion = {
            elementName: elementName,
            elementErrors: currentElementErrors,
          }
          errorsObjectsArray.push(errorObject)
        })
        setErrorsCount(result.errorsMapInStorage.length)
        setObjectsArray(errorsObjectsArray)
      })
      .catch((error) => {
        showHighlightedAlert(chromeStoreErrorMessage, 'danger')
      })
  }, [])

  // show full path of an error element
  const handleShowPath = useCallback((path: string): void => {
    setCurrentPath(path)
    setShowPath(true)
  }, [])

  // close the modal of full path
  const handleClosePath = useCallback((): void => {
    setCurrentPath('')
    setShowPath(false)
  }, [])

  // add an alert to dom for showing different messages
  const showHighlightedAlert = (message: string, type: string) => {
    const alert = document.createElement('div')
    alert.className = `alert alert-${type} fixed-alert`
    alert.textContent = message
    document.body.appendChild(alert)
    setTimeout(function () {
      document.body.removeChild(alert)
    }, 2000)
  }

  // handle highlight response from content-script
  const handleHighlightResponseFromContentScript = (response) => {
    showHighlightedAlert(highlightSuccessMessage, 'success')
  }

  // send message to content-script to highlight a specific element
  const handleHightlight = useCallback(
    (path: string) => {
      try {
        chrome.tabs.sendMessage(
          websiteTabId,
          { from: 'semantic', subject: 'highlight-element', path: path },
          handleHighlightResponseFromContentScript
        )
      } catch (error) {
        showHighlightedAlert(highlightErrorMessage, 'danger')
      }
    },
    [websiteTabId, currentPath]
  )

  // open the new form-tab for feedback
  const openFormTab = useCallback(() => {
    try {
      chrome.runtime.sendMessage({ from: 'check-styles', subject: 'open-form' })
    } catch (error) {
      showHighlightedAlert(formTabErrorMessage, 'danger')
    }
  }, [])

  return (
    <AppPresentation
      objectsArray={objectsArray}
      handleHightlight={handleHightlight}
      handleShowPath={handleShowPath}
      handleClosePath={handleClosePath}
      openFormTab={openFormTab}
      websiteUrl={websiteUrl}
      errorsCount={errorsCount}
      showPath={showPath}
      currentPath={currentPath}
    />
  )
}

const container = document.createElement(elementTags.DIV)
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
