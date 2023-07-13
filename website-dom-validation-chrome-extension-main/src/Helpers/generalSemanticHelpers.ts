import {
  ErrorObjectForElement,
  ErrorObjectForTime,
  ErrorObjectForFigure,
  ErrorObjectForInput,
  ErrorObjectForForm,
  ErrorObjectForAudioVideo,
} from '../Interface/interface'

import {
  elementList,
  elementTags,
  attributesList,
} from '../Common/globalConstants'

// check for the <aside> tag contains only elements like texts, images, icons or links
export function isChildValidForAside(
  asideElement: HTMLElement
): ErrorObjectForElement {
  const asideChildren = asideElement.children
  let errorObj: ErrorObjectForElement = {
    isError: false,
    element: asideElement,
  }

  for (let i = 0; i < asideChildren.length; i++) {
    const currentElementName = asideChildren[i].tagName.toLowerCase()
    if (!elementList.VALID_ASIDE_CHILDREN.includes(currentElementName)) {
      errorObj.isError = true
      errorObj.element = asideChildren[i] as HTMLElement
      return errorObj
    }
  }

  return errorObj
}

// check if there is a <summary> tag present in the <details>
export function checkForSummaryInDetails(detailsElement: HTMLElement): boolean {
  const detailsChildren = detailsElement.children

  for (let i = 0; i < detailsChildren.length; i++) {
    const currentChild = detailsChildren[i].tagName.toLowerCase()
    if (currentChild === elementTags.SUMMARY) {
      return true
    }
  }

  return false
}

// check if there are any html children of the <summary> tag
export function checkSummaryChildren(summaryElement: HTMLElement): boolean {
  const children = summaryElement.children

  if (children.length > 0) {
    return false
  }
  return true
}

// check for the presence and validity of the datetime attribute of the <time> tag
export function checkAttributeForTime(
  timeELement: HTMLElement
): ErrorObjectForTime {
  let errorObj: ErrorObjectForTime = {
    isAttributePresent: true,
    isAttributeValid: true,
  }
  const timeString = timeELement.getAttribute(attributesList.DATETIME)

  if (!timeString) {
    errorObj.isAttributePresent = false
  } else {
    if (isNaN(Date.parse(timeString))) {
      errorObj.isAttributeValid = false
    }
  }
  return errorObj
}

// check for the children of nav element
export function areNavChildrenValid(
  navElement: HTMLElement
): ErrorObjectForElement {
  let errorObj: ErrorObjectForElement = {
    isError: false,
    element: navElement,
  }

  const navChildren = navElement.children

  for (let i = 0; i < navChildren.length; i++) {
    const currentChildName = navChildren[i].tagName.toLowerCase()
    if (!elementList.VALID_NAV_CHILDREN.includes(currentChildName)) {
      errorObj.isError = true
      errorObj.element = navChildren[i] as HTMLElement
      break
    }
  }

  return errorObj
}

// check if the <figure> tag contains <figcaption> and other invalid elements
export function checkChildrenForFigure(
  figureElement: HTMLElement
): ErrorObjectForFigure {
  let errorObj: ErrorObjectForFigure = {
    isFigcaptionPresent: false,
    tags: [],
  }

  const children = figureElement.children
  for (let i = 0; i < children.length; i++) {
    const currentChildName = children[i].tagName.toLowerCase()
    if (currentChildName === elementTags.FIGURE_CAPTION) {
      errorObj.isFigcaptionPresent = true
    }
    if (
      ![elementTags.IMG, elementTags.FIGURE_CAPTION].includes(currentChildName)
    ) {
      errorObj.tags.push(currentChildName)
    }
  }

  return errorObj
}

// check for the type, name and id of input
export const checkForValidInput = (
  inputElement: HTMLElement
): ErrorObjectForInput => {
  let errorObj: ErrorObjectForInput = {
    isError: false,
    typePresent: true,
    idPresent: true,
    namePresent: true,
  }
  const type = inputElement.getAttribute(attributesList.TYPE)
  if (!type) {
    errorObj.isError = true
    errorObj.typePresent = false
  }

  const name = inputElement.getAttribute(attributesList.NAME)
  if (!name) {
    errorObj.isError = true
    errorObj.namePresent = false
  }

  const id = inputElement.getAttribute(attributesList.ID)
  if (!id) {
    errorObj.isError = true
    errorObj.idPresent = false
  }

  return errorObj
}

// check for action and button present in the <form> tag
export const checkFormValidity = (
  formElement: HTMLElement
): ErrorObjectForForm => {
  let errorObj: ErrorObjectForForm = {
    isError: false,
    actionPresent: true,
    buttonPresent: true,
  }

  const formAction = formElement.getAttribute(attributesList.ACTION)
  if (!formAction || formAction === '') {
    errorObj.isError = true
    errorObj.actionPresent = false
  }

  let submitPresent = false
  const children = formElement.children
  for (let i = 0; i < children.length; i++) {
    const element = children[i]
    const elementName = element.tagName.toLowerCase()

    if (elementName === elementTags.BUTTON) {
      submitPresent = true
      break
    }

    if (
      elementName === elementTags.INPUT &&
      element.getAttribute(attributesList.TYPE) === attributesList.SUBMIT
    ) {
      submitPresent = true
      break
    }
  }

  if (!submitPresent) {
    errorObj.isError = true
    errorObj.buttonPresent = false
  }

  return errorObj
}

// check for the children of <audio> or <video> tags
export const checkForAudioVideoChildren = (
  element: HTMLElement
): ErrorObjectForAudioVideo => {
  let errorObject: ErrorObjectForAudioVideo = {
    sourcePresent: false,
    anchorPresent: false,
    trackPresent: false,
    trackKindCorrect: false,
  }

  const children = element.children
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    const childName = child.tagName.toLowerCase()

    if (childName === elementTags.SOURCE) errorObject.sourcePresent = true
    else if (childName === elementTags.TRACK) {
      errorObject.trackPresent = true

      if (
        child.getAttribute(attributesList.KIND) === 'subtitles' ||
        child.getAttribute(attributesList.KIND) === 'captions'
      ) {
        errorObject.trackKindCorrect = true
      }
    } else if (childName === elementTags.ANCHOR) {
      errorObject.anchorPresent = true
    }
  }

  return errorObject
}
