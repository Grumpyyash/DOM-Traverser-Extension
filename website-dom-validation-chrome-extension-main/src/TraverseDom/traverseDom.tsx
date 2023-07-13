import React, { useEffect, useState, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './traverseDom.css'

import { ErrorObject, ErrorObjectInAccordion } from '../Interface/interface'
import { AppPresentation } from './traverseDomPresentation'
import {
  chromeStoreErrorMessage,
  fetchW3cErrorMessage,
  formTabErrorMessage,
  highlightErrorMessage,
  highlightSuccessMessage,
} from '../Messages/consoleMessages'
import {
  elementList,
  alertColors,
  msgSubjects,
  pageNames,
  elementTags,
} from '../Common/globalConstants'

const App = (): JSX.Element => {
  const [storageResult, setStorageResult] = useState({
    websiteDom: null,
    websiteUrl: '',
    websiteTabId: null,
  })
  const [errorsCount, setErrorsCount] = useState(0)
  const [objectsArray, setObjectsArray] = useState([])
  const [showPath, setShowPath] = useState(false)
  const [currentPath, setCurrentPath] = useState('')
  const [showW3cErrors, setShowW3cErros] = useState(false)

  // gets the data from storage to be used in accordions
  useEffect(() => {
    chrome.storage.local
      .get(['websiteDom', 'websiteUrl', 'errorsMapInStorage', 'websiteTabId'])
      .then((result) => {
        const parser = new DOMParser()
        const newDOM = parser.parseFromString(result.websiteDom, 'text/html')

        setStorageResult({
          ...storageResult,
          websiteDom: newDOM,
          websiteUrl: result.websiteUrl,
          websiteTabId: result.websiteTabId,
        })

        const temporaryErrorsMap: Map<string, ErrorObject[]> = new Map()
        result.errorsMapInStorage.map((error: ErrorObject) => {
          const elementName: string = error.elementName
          if (temporaryErrorsMap.has(elementName)) {
            temporaryErrorsMap.get(elementName).push(error)
          } else {
            temporaryErrorsMap.set(elementName, [error])
          }
        })

        let errorsObjectsArray: ErrorObjectInAccordion[] = []
        temporaryErrorsMap.forEach(
          (value: ErrorObject[], elementName: string) => {
            let currentElementErrors = []
            currentElementErrors = value
            const errorObject: ErrorObjectInAccordion = {
              elementName: elementName,
              elementErrors: currentElementErrors,
            }
            errorsObjectsArray.push(errorObject)
          }
        )
        setErrorsCount(result.errorsMapInStorage.length)
        setObjectsArray(errorsObjectsArray)
      })
      .catch((error) => {
        showHighlightedAlert(chromeStoreErrorMessage, alertColors.DANGER)
      })
  }, [])

  // handle showing full path of the element
  const handleShowPath = useCallback((path: string): void => {
    setCurrentPath(path)
    setShowPath(true)
  }, [])

  // handle closing full path of the element
  const handleClosePath = useCallback((): void => {
    setCurrentPath('')
    setShowPath(false)
  }, [])

  // state to hold the w3c accessibility errors
  const [w3cErrors, setW3cErrors] = useState({
    info: [],
    warning: [],
    error: [],
  })

  // handle opening of data from the w3c APIs
  const handleW3C = useCallback(() => {
    if (!storageResult.websiteUrl && !storageResult.websiteDom) {
      showHighlightedAlert(fetchW3cErrorMessage, alertColors.DANGER)
      return
    }

    const splitUrl = storageResult.websiteUrl.split(':')
    let websiteQueryToBeParsed: string = ''
    let requestOptions = {}

    if (splitUrl.length > 0 && splitUrl[0] === 'file') {
      const serializer = new XMLSerializer()
      const htmlContent = serializer.serializeToString(storageResult.websiteDom)

      requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html',
        },
        body: htmlContent,
      }
    } else {
      websiteQueryToBeParsed = storageResult.websiteUrl
    }

    const apiUrl = elementList.W3C_API_LINK + websiteQueryToBeParsed
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        data.messages.forEach((error) => {
          setW3cErrors((prevErrors) => {
            const newErrors = { ...prevErrors }
            if (error.type === 'error') {
              newErrors.error.push(error)
            } else if (error.type === 'warning') {
              newErrors.warning.push(error)
            } else if (error.type === 'info') {
              newErrors.info.push(error)
            }
            return newErrors
          })
        })
        setShowW3cErros(!showW3cErrors)
      })
      .catch((error) => {
        showHighlightedAlert(fetchW3cErrorMessage, alertColors.DANGER)
      })
  }, [storageResult.websiteDom, storageResult.websiteUrl, showW3cErrors])

  // push an alert to dom for showing different messages
  const showHighlightedAlert = (message: string, type: string) => {
    const alert = document.createElement(elementTags.DIV)
    alert.className = `alert alert-${type} fixed-alert`
    alert.textContent = message
    document.body.appendChild(alert)
    setTimeout(function () {
      document.body.removeChild(alert)
    }, 2000)
  }

  // handle highlight response from content-script
  const handleHighlightResponseFromContentScript = (response) => {
    showHighlightedAlert(highlightSuccessMessage, alertColors.SUCCESS)
  }

  // handle highlighting a specific element
  const handleHightlight = useCallback(
    (path: string) => {
      try {
        chrome.tabs.sendMessage(
          storageResult.websiteTabId,
          {
            from: pageNames.SEMANTIC,
            subject: msgSubjects.HIGHLIGHT_ELEMENT,
            path: path,
          },
          handleHighlightResponseFromContentScript
        )
      } catch (error) {
        showHighlightedAlert(highlightErrorMessage, alertColors.DANGER)
      }
    },
    [storageResult.websiteTabId, currentPath]
  )

  // open the new form-tab for feedback
  const openFormTab = useCallback(() => {
    try {
      chrome.runtime.sendMessage({
        from: pageNames.SEMANTIC,
        subject: msgSubjects.OPEN_FORM,
      })
    } catch (error) {
      showHighlightedAlert(formTabErrorMessage, alertColors.DANGER)
    }
  }, [])

  return (
    <AppPresentation
      objectsArray={objectsArray}
      handleHightlight={handleHightlight}
      handleShowPath={handleShowPath}
      handleClosePath={handleClosePath}
      openFormTab={openFormTab}
      websiteUrl={storageResult.websiteUrl}
      errorsCount={errorsCount}
      showPath={showPath}
      currentPath={currentPath}
      handleW3C={handleW3C}
      showW3cErrors={showW3cErrors}
      w3cErrors={w3cErrors}
    />
  )
}

const container = document.createElement(elementTags.DIV)
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
