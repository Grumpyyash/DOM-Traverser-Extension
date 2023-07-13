import { ErrorObject } from '../Interface/interface'

import {
  checkForDiv,
  checkForSpan,
  checkForHTags,
  checkForPresenceOfHigherHTags,
  checkForArticle,
  checkForMain,
  checkForHeader,
  checkForFooter,
  checkForSection,
} from './checkElements'

import {
  checkForAsideElement,
  checkForAudioVideoStructure,
  checkForDeprecatedTags,
  checkForDetails,
  checkForFigureElement,
  checkForForm,
  checkForHrElement,
  checkForImgElement,
  checkForInput,
  checkForLineBreak,
  checkForNavElement,
  checkForSummaryElement,
  checkForTimeElement,
} from './checkElementsHelper'
import { stylesMapInObject } from '../Common/defaultStyles'
import { checkStyles } from './stylesHelper'
import { checkForButtonSpacing, checkForHeaderDensity } from './densityHelper'

import {
  getPath,
  spaciousDensityParam,
  compactDensityParam,
  createDivForAlert,
  createDivForErrorMessages,
} from '../Common/utility'

import { generalElementMessage } from '../Messages/fixesMessages'
import {
  mutationsFetchErrorMessage,
  mutationsSetErrorMessage,
  domAndMutationSetErrorMessage,
  errorsStoreErrorMessage,
  noErrorsFoundMessage,
} from '../Messages/consoleMessages'
import {
  messageNotReceivedAtContentScript,
  highlightElementResponse,
} from '../Messages/responseMessages'

import { elementList, elementTags } from '../Common/globalConstants'
import { updateDOMWithErrors } from '../Common/utility'
import { setErrorsMap } from '../Common/setErrors'

export const errorsMap: Map<HTMLElement, ErrorObject> = new Map()
export const stylesErrorsMap: Map<HTMLElement, ErrorObject> = new Map()
export const densityErrorsMap: Map<HTMLElement, ErrorObject> = new Map()
const elementsCountMap: Map<string, number> = new Map()
const elementsLevels: Map<HTMLElement, number> = new Map()
const pathMap: Map<HTMLElement, string> = new Map()
let objectToBePassedToPopup: ErrorObject[] = []
let stylesMap: { [k: string]: string[] | any }
let currentlyHighlightedElement: HTMLElement = null
let wholeDom: HTMLElement = null
let currentExamination: string = ''
let densityParam = spaciousDensityParam

// traverse the DOM of the website
function travelDOM(element: HTMLElement, level: number): void {
  if (!element) return
  const elementName: string = element.tagName.toLowerCase()
  elementsLevels.set(element, level)

  if (level >= 30 && elementName !== 'div') {
    const message = generalElementMessage(elementName, level)
    setErrorsMap(elementName, element, message)
  }

  // increase the count of occurance of this tag by 1
  if (elementsCountMap.has(elementName)) {
    const currentCount: number = elementsCountMap.get(elementName)
    elementsCountMap.set(elementName, currentCount + 1)
  } else {
    elementsCountMap.set(elementName, 1)
  }

  if (elementName === elementTags.DIV) {
    checkForDiv(element as HTMLElement, level)
    if (element.getAttribute('data-identifier') === elementTags.HEADER) {
      checkForHeaderDensity(element, densityParam)
    }
  } else if (elementName === elementTags.SPAN) {
    checkForSpan(element as HTMLElement)
  } else if (elementList.HEADERS_LIST.includes(elementName)) {
    checkForHTags(element as HTMLDivElement)
    checkForPresenceOfHigherHTags(element as HTMLElement)
  } else if (elementName === elementTags.ARTICLE) {
    checkForArticle(element as HTMLElement)
  } else if (elementName === elementTags.MAIN) {
    checkForMain(element as HTMLElement)
  } else if (elementName === elementTags.HEADER) {
    checkForHeader(element as HTMLElement)
    checkForHeaderDensity(element, densityParam)
  } else if (elementName === elementTags.FOOTER) {
    checkForFooter(element as HTMLElement)
  } else if (elementName === elementTags.SECTION) {
    checkForSection(element as HTMLElement)
  } else if (elementName === elementTags.ASIDE) {
    checkForAsideElement(element as HTMLElement)
  } else if (elementName === elementTags.DETAILS) {
    checkForDetails(element as HTMLElement)
  } else if (elementName === elementTags.SUMMARY) {
    checkForSummaryElement(element as HTMLElement)
  } else if (elementName === elementTags.TIME) {
    checkForTimeElement(element as HTMLElement)
  } else if (elementName === elementTags.NAV) {
    checkForNavElement(element as HTMLElement)
  } else if (elementName === elementTags.FIGURE) {
    checkForFigureElement(element as HTMLElement)
  } else if (elementName === elementTags.BR) {
    checkForLineBreak(element as HTMLElement)
  } else if (elementName === elementTags.HR) {
    checkForHrElement(element as HTMLElement)
  } else if (elementName === elementTags.IMG) {
    checkForImgElement(element as HTMLElement)
  } else if (elementList.DEPRECATED_TAGS.includes(elementName)) {
    checkForDeprecatedTags(element as HTMLElement)
  } else if (elementName === elementTags.INPUT) {
    checkForInput(element as HTMLElement)
  } else if (elementName === elementTags.FORM) {
    checkForForm(element as HTMLElement)
  } else if (elementName === elementTags.BUTTON) {
    checkForButtonSpacing(element, densityParam)
  } else if (
    elementName === elementTags.AUDIO ||
    elementName === elementTags.VIDEO
  ) {
    checkForAudioVideoStructure(element as HTMLElement)
  }

  const path: string = getPath(element, pathMap)

  // Traverse child nodes recursively
  for (let i = 0; i < element.children.length; i++) {
    const child = element.children[i] as HTMLElement
    if (child.nodeType === Node.ELEMENT_NODE) {
      const childStyles = getComputedStyle(child)
      if (
        childStyles.getPropertyValue('display') !== 'none' &&
        childStyles.getPropertyValue('visibility') !== 'hidden'
      ) {
        travelDOM(child, level + 1)
      }
    }
  }
}

// observe the mutations on the website if some data is appended to the body
const observer = new MutationObserver((mutations: MutationRecord[]) => {
  // if we are not currently traversing DOM, return
  if (currentExamination === '') return

  // we first remove all the elements pushed by the extension e.g icons, border-styles
  objectToBePassedToPopup.forEach((error) => {
    if (error.element.style.borderWidth !== '')
      error.element.style.border = 'none'
  })
  elementList.ALL_CLASSES.forEach((className) => {
    const allElementsPushedByExtension = document.querySelectorAll(className)
    allElementsPushedByExtension.forEach((element) => {
      document.querySelector(elementTags.HTML).removeChild(element)
    })
  })

  // remove all the existing errors
  errorsMap.clear()
  stylesErrorsMap.clear()
  densityErrorsMap.clear()
  objectToBePassedToPopup = []

  // call the DOM traversal again
  generalFunctionForAllThreeOptions(currentExamination)

  // show the alert that a mutation has occured
  const mutationsAlertDiv = createDivForAlert()
  document.querySelector(elementTags.HTML).appendChild(mutationsAlertDiv)

  // limit the number of mutations we wish to track for
  chrome.storage.local
    .get(['countMutations'])
    .then((result) => {
      chrome.storage.local
        .set({ countMutations: result.countMutations + 1 })
        .then(() => {
          if (result.countMutations >= 1) {
            observer.disconnect()
          }
        })
        .catch((error) => {
          createDivForErrorMessages(mutationsSetErrorMessage, 'danger')
        })
    })
    .catch((error) => {
      createDivForErrorMessages(mutationsFetchErrorMessage, 'danger')
    })
})

// set the interval for checking mutations and upper limit on it
// const intervalId = setInterval(function () {
//   observer.observe(this.document.querySelector(elementTags.BODY), {
//     childList: true,
//     subtree: true,
//   })

//   if (chrome.runtime?.id) {
//     chrome.storage.local
//       .get(['countMutations'])
//       .then((result) => {
//         if (result.countMutations >= 1) {
//           clearInterval(intervalId)
//         }
//       })
//       .catch((error) => {
//         createDivForErrorMessages(mutationsSetErrorMessage, 'danger')
//       })
//   }
// }, 20000)

// set the dom of the website into chrome local store
window.addEventListener('load', function () {
  wholeDom = this.document.documentElement
  chrome.storage.local
    .set({ websiteDom: wholeDom.outerHTML, countMutations: 0 })
    .catch((error) => {
      createDivForErrorMessages(domAndMutationSetErrorMessage, 'danger')
    })
})

// function to convert the erros-map to a serializable array
function modifyDataToBePassed(
  mapToTransform: Map<HTMLElement, ErrorObject>
): void {
  mapToTransform.forEach((value, key) => {
    const targetElement: Element = key
    const rect: DOMRect = targetElement.getBoundingClientRect()
    const x: number = rect.left + window.scrollX
    const y: number = rect.top + window.scrollY
    value.posX = x
    value.posY = y

    let path: string = ''
    if (pathMap.has(key)) {
      path = pathMap.get(key)
    } else {
      path = getPath(key, pathMap)
      pathMap.set(key, path)
    }

    value.path = path
    objectToBePassedToPopup.push(value)
  })
}

// set the final errors map into the chrome local store
function setErrorsInStorage(): void {
  chrome.storage.local
    .set({ errorsMapInStorage: objectToBePassedToPopup })
    .catch((error) => {
      createDivForErrorMessages(errorsStoreErrorMessage, 'danger')
    })
}

// highlight the specific element on the dom and un-highlight previous
const highlightSpecificElement = (path: string): void => {
  if (currentlyHighlightedElement) {
    currentlyHighlightedElement.style.border = 'none'
  }

  pathMap.forEach((value, element) => {
    if (value === path) {
      element.style.border = '5px solid blue'
      currentlyHighlightedElement = element
      return
    }
  })
}

// general wrapper function ot be called for each options of extension
function generalFunctionForAllThreeOptions(option: string): void {
  if (option === 'semantic') {
    if (typeof document === undefined) return
    travelDOM(wholeDom, 0)
    updateDOMWithErrors('semantic', errorsMap, elementsCountMap)
    modifyDataToBePassed(errorsMap)
    setErrorsInStorage()
  } else if (option === 'styles') {
    if (typeof document === undefined) return
    const htmlTag = document.querySelector(elementTags.HTML) as HTMLElement
    checkStyles(htmlTag, stylesMap)
    updateDOMWithErrors('styles', stylesErrorsMap, elementsCountMap)
    modifyDataToBePassed(stylesErrorsMap)
    setErrorsInStorage()
  } else if (option === 'density') {
    if (typeof document === undefined) return
    travelDOM(wholeDom, 0)
    updateDOMWithErrors('density', densityErrorsMap, elementsCountMap)
    modifyDataToBePassed(densityErrorsMap)
    setErrorsInStorage()
  }
}

// listen to messages from popup about events
try {
  chrome.runtime.onMessage.addListener((msg, sender, response): void => {
    if (msg.from === 'popup' && msg.subject === 'traverse-dom') {
      if (typeof document === undefined) response(objectToBePassedToPopup)
      currentExamination = 'semantic'
      generalFunctionForAllThreeOptions('semantic')
      response(objectToBePassedToPopup)
    } else if (msg.from === 'popup' && msg.subject === 'check-styles') {
      if (typeof document === undefined) response(objectToBePassedToPopup)
      if (msg.jsonData) {
        stylesMap = msg.jsonData
      } else {
        stylesMap = stylesMapInObject
      }
      currentExamination = 'styles'
      generalFunctionForAllThreeOptions('styles')
      response(objectToBePassedToPopup)
    } else if (msg.from === 'popup' && msg.subject === 'check-density') {
      if (typeof document === undefined) response(objectToBePassedToPopup)
      if (msg.densityJsonData !== '') densityParam = msg.densityJsonData
      else if (!msg.isDefault) densityParam = compactDensityParam
      else densityParam = spaciousDensityParam

      currentExamination = 'density'
      generalFunctionForAllThreeOptions('density')
      response(objectToBePassedToPopup)
    } else if (msg.subject === 'highlight-element') {
      highlightSpecificElement(msg.path)
      response(highlightElementResponse)
    }
  })
} catch (error) {
  createDivForErrorMessages(messageNotReceivedAtContentScript, 'danger')
}
