import { setErrorsMap } from '../Common/setErrors'

import {
  isChildValidForAside,
  checkForSummaryInDetails,
  checkSummaryChildren,
  checkAttributeForTime,
  areNavChildrenValid,
  checkChildrenForFigure,
  checkForValidInput,
  checkFormValidity,
  checkForAudioVideoChildren,
} from '../Helpers/generalSemanticHelpers'

import {
  asideParentMessage,
  validChildAsideParentMessage,
  summaryPresentInDetailsMessage,
  summaryParentMessage,
  summaryValidByChildrenMessage,
  timeAttributeMessage,
  validChildrenNavMessage,
  validParentNavMessage,
  figcaptionPresentFigureMessage,
  replaceImgByFigureMessage,
  validChildrenFigureMessage,
  brMessage,
  hrMessage,
  deprecatedTagsMessage,
  noImgAltPresentMessage,
  validInputMessage,
  invalidFormMessage,
  noSourceMessage,
  noFallbackGiven,
  wrongTrackPresent,
  noCaptionsMessage,
  dateTimeAttributeMissing,
} from '../Messages/errorMessages'

import {
  validChildInAsideFix,
  summaryPresentInDetailsMessageFix,
  summaryParentMessageFix,
  summaryValidByChildrenMessageFix,
  timeAttributeMessageFix,
  wrongDateTimeAttributeFix,
  navChildrenMessageFix,
  figureChildrenFix,
  figcaptionPresentFigureMessageFix,
  brTagFix,
  hrTagFix,
  noImgAltPresentMessageFix,
  validInputMessageFix,
  nonTextCaptionElementsFix,
  nonTextFallbackElementsFix,
  nonTextSourceElementsFix,
  nonTextTrackElementsFix,
} from '../Messages/fixesMessages'

import {
  ErrorObjectForElement,
  ErrorObjectForTime,
  ErrorObjectForFigure,
} from '../Interface/interface'

import { elementList, elementTags } from '../Common/globalConstants'

// check for the <aside> tag
export function checkForAsideElement(asideElement: HTMLElement): void {
  const parentElement = asideElement.parentNode as HTMLElement
  const parentElementName: string = parentElement.tagName.toLowerCase()

  if (!elementList.VALID_ASIDE_PARENTS.includes(parentElementName)) {
    const message = asideParentMessage(parentElementName)
    setErrorsMap(elementTags.ASIDE, asideElement, message)
  }

  const isValidParent: ErrorObjectForElement =
    isChildValidForAside(asideElement)
  if (isValidParent.isError) {
    const message = validChildAsideParentMessage(
      isValidParent.element.tagName.toLowerCase()
    )
    setErrorsMap(elementTags.ASIDE, asideElement, message, validChildInAsideFix)
  }
}

// check for the <details> tag
export function checkForDetails(detailsElement: HTMLElement): void {
  const isSummaryPresent: boolean = checkForSummaryInDetails(detailsElement)

  if (!isSummaryPresent) {
    const message: string = summaryPresentInDetailsMessage
    setErrorsMap(
      elementTags.DETAILS,
      detailsElement,
      message,
      summaryPresentInDetailsMessageFix
    )
  }
}

// check for the <summary> tag
export function checkForSummaryElement(summaryElement: HTMLElement): void {
  const summaryParent = summaryElement.parentNode as HTMLElement
  if (
    !summaryElement ||
    summaryParent.tagName.toLowerCase() !== elementTags.DETAILS
  ) {
    const message = summaryParentMessage
    setErrorsMap(
      elementTags.SUMMARY,
      summaryElement,
      message,
      summaryParentMessageFix
    )
  }

  const isSummaryValidByChildren: boolean = checkSummaryChildren(summaryElement)
  if (!isSummaryValidByChildren) {
    const message = summaryValidByChildrenMessage
    setErrorsMap(
      elementTags.SUMMARY,
      summaryElement,
      message,
      summaryValidByChildrenMessageFix
    )
  }
}

// check for the <time> tag
export function checkForTimeElement(timeELement: HTMLElement): void {
  const timeAttribute: ErrorObjectForTime = checkAttributeForTime(timeELement)
  if (!timeAttribute.isAttributePresent) {
    const message = timeAttributeMessage
    setErrorsMap(
      elementTags.TIME,
      timeELement,
      message,
      timeAttributeMessageFix
    )
  }

  if (!timeAttribute.isAttributeValid) {
    const message = dateTimeAttributeMissing
    setErrorsMap(
      elementTags.TIME,
      timeELement,
      message,
      wrongDateTimeAttributeFix
    )
  }
}

// check for the <nav> tag
export function checkForNavElement(navElement: HTMLElement): void {
  const parentElement = navElement.parentNode as HTMLElement
  const parentElementName = parentElement.tagName.toLowerCase()
  if (!elementList.VALID_NAV_PARENTS.includes(parentElementName)) {
    const message = validParentNavMessage(parentElementName)
    setErrorsMap(elementTags.NAV, navElement, message)
  }

  const validChildren = areNavChildrenValid(navElement)
  if (validChildren.isError) {
    const message = validChildrenNavMessage(
      validChildren.element.tagName.toLowerCase()
    )
    setErrorsMap(elementTags.NAV, navElement, message, navChildrenMessageFix)
  }
}

// check for the <figure> element
export function checkForFigureElement(figureElement: HTMLElement): void {
  const validChildren: ErrorObjectForFigure =
    checkChildrenForFigure(figureElement)
  if (!validChildren.isFigcaptionPresent) {
    const message = figcaptionPresentFigureMessage
    setErrorsMap(
      elementTags.FIGURE,
      figureElement,
      message,
      figcaptionPresentFigureMessageFix
    )
  }

  if (validChildren.tags.length > 0) {
    let message = validChildrenFigureMessage(validChildren.tags)
    setErrorsMap(elementTags.FIGURE, figureElement, message, figureChildrenFix)
  }
}

// check for the <br> element
export function checkForLineBreak(brElement: HTMLElement): void {
  const message = brMessage
  setErrorsMap(elementTags.BR, brElement, message, brTagFix)
}

// check for the <hr> element
export function checkForHrElement(hrElement: HTMLElement): void {
  const message = hrMessage
  setErrorsMap(elementTags.HR, hrElement, message, hrTagFix)
}

// check for the <img> element
export function checkForImgElement(imgElement: HTMLElement): void {
  setErrorsMap(elementTags.IMG, imgElement, replaceImgByFigureMessage)

  const imgAlt = imgElement.getAttribute('alt')
  if (!imgAlt || typeof imgAlt !== 'string') {
    setErrorsMap(
      elementTags.IMG,
      imgElement,
      noImgAltPresentMessage,
      noImgAltPresentMessageFix
    )
  }
}

// check for the deprecated html tags
export function checkForDeprecatedTags(deprecatedElement: HTMLElement): void {
  const elementName = deprecatedElement.tagName.toLowerCase()
  const message = deprecatedTagsMessage(elementName)

  setErrorsMap(elementName, deprecatedElement, message)
}

// check for input tags
export function checkForInput(inputElement: HTMLElement): void {
  const errorObject = checkForValidInput(inputElement)
  if (errorObject.isError) {
    const message = validInputMessage(errorObject)
    setErrorsMap(elementTags.INPUT, inputElement, message, validInputMessageFix)
  }
}

// check for form tags
export function checkForForm(formElement: HTMLElement): void {
  const errorObject = checkFormValidity(formElement)
  if (errorObject.isError) {
    const message = invalidFormMessage(errorObject)
    setErrorsMap(elementTags.FORM, formElement, message)
  }
}

// check for erros in using <audio> or <video> elements
export const checkForAudioVideoStructure = (element: HTMLElement): void => {
  const elementName = element.tagName.toLowerCase()
  const errorObject = checkForAudioVideoChildren(element)

  if (!errorObject.sourcePresent) {
    const message = noSourceMessage(elementName)
    setErrorsMap(elementName, element, message, nonTextSourceElementsFix)
  }
  if (!errorObject.trackPresent) {
    const message = noCaptionsMessage(elementName)
    setErrorsMap(elementName, element, message, nonTextCaptionElementsFix)
  }
  if (!errorObject.trackKindCorrect) {
    const message = wrongTrackPresent(elementName)
    setErrorsMap(elementName, element, message, nonTextTrackElementsFix)
  }
  if (!errorObject.anchorPresent) {
    const message = noFallbackGiven(elementName)
    setErrorsMap(elementName, element, message, nonTextFallbackElementsFix)
  }
}
