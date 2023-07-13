import { setErrorsMap } from '../Common/setErrors'
import { elementTags } from '../Common/globalConstants'

import {
  checkDivForReplacement,
  checkForNavInDiv,
  checkForFormInDiv,
  checkForAsideInDiv,
  checkForHStructure,
  checkForHigherHTags,
  isArticleValidByNesting,
  isArticleValidByParent,
  checkForValidChildren,
  checkHeaderForNesting,
  checkFooterLastElement,
  checkForHeadingsInSection,
} from './semanticHelper'

import {
  divEmptyChildrenMessage,
  divLevelMessage,
  divOneChildMessage,
  divParentMessage,
  divReplacableMessage,
  navInDivMessage,
  formInDivMessage,
  asideInDivMessage,
  spanWrapperMessage,
  spanChildMessage,
  hLowerTagsMessage,
  presenceOfHigherHTags,
  articleNestingMessage,
  articleParentErrorMessage,
  validChildrenMainMessage,
  headerNestingMessage,
  multipleHeaderErrorMessage,
  headerParentMessage,
  footerParentMessage,
  lastElementMessage,
  multipleFooterMessage,
  noChildSectionMessage,
  sectionParentMessage,
  headingsInSectionMessage,
  mainParentErrorMessage,
  multipleMainTagMessage,
} from '../Messages/errorMessages'

import {
  divOneChildMessageFix,
  divLevelMessageFix,
  divParentMessageFix,
  formInDivMessageFix,
  navInDivMessageFix,
  spanWrapperMessageFix,
  spanChildMessageFix,
  articleParentErrorMessageFix,
  multipleMainFix,
  mainAsBodyChildFix,
  validChildrenMainMessageFix,
  headerParentMessageFix,
  headerNestingMessageFix,
  MultipleHeaderFix,
  footerParentMessageFix,
  multipleFooterMessageFix,
  lastElementMessageFix,
  sectionParentMessageFix,
  noChildSectionMessageFix,
  headingsInSectionMessageFix,
} from '../Messages/fixesMessages'

import {
  ErrorObjectForElement,
  ErrorObjectForHeader,
  ErrorObjectForFooter,
} from '../Interface/interface'

import { elementList } from '../Common/globalConstants'

// check for semanticity, count and nesting of <div>
export function checkForDiv(divElement: HTMLElement, level: number): void {
  const childrenCount = divElement.children.length

  if (childrenCount <= 1) {
    let message = divEmptyChildrenMessage
    if (childrenCount === 1) {
      message = divOneChildMessage
    }

    setErrorsMap(elementTags.DIV, divElement, message, divOneChildMessageFix)
  }

  if (level >= 30) {
    const message = divLevelMessage(level)
    setErrorsMap(elementTags.DIV, divElement, message, divLevelMessageFix)
  }

  const parentElement = divElement.parentNode as HTMLElement
  if (parentElement) {
    const parentElementName = parentElement.tagName.toLowerCase()
    if (parentElementName === 'body') {
      const message = divParentMessage
      setErrorsMap(elementTags.DIV, divElement, message, divParentMessageFix)
    }
  }

  const isReplacable: boolean = checkDivForReplacement(divElement)
  if (isReplacable) {
    setErrorsMap(elementTags.DIV, divElement, divReplacableMessage)
  }

  const isFormInDiv: boolean = checkForFormInDiv(divElement)
  if (isFormInDiv) {
    setErrorsMap(
      elementTags.DIV,
      divElement,
      formInDivMessage,
      formInDivMessageFix
    )
  }

  const isNavInDiv: boolean = checkForNavInDiv(divElement)
  if (isNavInDiv) {
    setErrorsMap(
      elementTags.DIV,
      divElement,
      navInDivMessage,
      navInDivMessageFix
    )
  }

  const isAsideInDiv: boolean = checkForAsideInDiv(divElement)
  if (isAsideInDiv) {
    setErrorsMap(elementTags.DIV, divElement, asideInDivMessage)
  }
}

// check for presence of <span> and their count
export function checkForSpan(spanElement: HTMLElement): void {
  const children = spanElement.children
  let message = spanWrapperMessage
  let fixMessage = spanWrapperMessageFix

  if (children.length > 0) {
    message = spanChildMessage
    fixMessage = spanChildMessageFix
  }
  setErrorsMap(elementTags.SPAN, spanElement, message, fixMessage)
}

// check if the <h> tags follow correct order, <h3> should not occure before <h1>
export function checkForHTags(hElement: HTMLElement): void {
  const currentHTag: string = hElement.tagName.toLowerCase()
  const isGoodH: boolean = checkForHStructure(hElement)

  if (!isGoodH && hElement.tagName.toLowerCase() !== elementTags.H6) {
    let message: string = ''

    if (currentHTag === elementTags.H1) {
      message = hLowerTagsMessage('<h1>')
    } else if (currentHTag === elementTags.H2) {
      message = hLowerTagsMessage('<h2>')
    } else if (currentHTag === elementTags.H3) {
      message = hLowerTagsMessage('<h3>')
    } else if (currentHTag === elementTags.H4) {
      message = hLowerTagsMessage('<h4>')
    } else if (currentHTag === elementTags.H5) {
      message = hLowerTagsMessage('<h5>')
    }

    setErrorsMap(currentHTag, hElement, message)
  }
}

//presence of higer <h> tags before a lower one e.g <h1>, <h2>, <h3> must be present if we have an <h4> in section
export function checkForPresenceOfHigherHTags(hElement: HTMLElement) {
  const currentHTag = hElement.tagName.toLowerCase()
  const isGoodH = checkForHigherHTags(hElement)

  if (!isGoodH) {
    let message: string

    if (currentHTag === elementTags.H6) {
      message = presenceOfHigherHTags(
        '<h6>',
        elementList.MANDATORY_TAGS_BEFORE_H6
      )
    } else if (currentHTag === elementTags.H2) {
      message = presenceOfHigherHTags(
        '<h2>',
        elementList.MANDATORY_TAGS_BEFORE_H2
      )
    } else if (currentHTag === elementTags.H3) {
      message = presenceOfHigherHTags(
        '<h3>',
        elementList.MANDATORY_TAGS_BEFORE_H3
      )
    } else if (currentHTag === elementTags.H4) {
      message = presenceOfHigherHTags(
        '<h4>',
        elementList.MANDATORY_TAGS_BEFORE_H4
      )
    } else if (currentHTag === elementTags.H5) {
      message = presenceOfHigherHTags(
        '<h5>',
        elementList.MANDATORY_TAGS_BEFORE_H5
      )
    }

    setErrorsMap(currentHTag, hElement, message)
  }
}

// check for standards of <article> tag
export function checkForArticle(articleElement: HTMLElement): void {
  const parentErrorMessage: ErrorObjectForElement =
    isArticleValidByParent(articleElement)
  if (parentErrorMessage.isError) {
    const message: string = articleParentErrorMessage(
      parentErrorMessage.element.tagName.toLowerCase()
    )

    setErrorsMap(
      elementTags.ARTICLE,
      articleElement,
      message,
      articleParentErrorMessageFix
    )
  }

  const nestingErrorMessage = isArticleValidByNesting(articleElement)
  if (nestingErrorMessage) {
    const message: string = articleNestingMessage

    setErrorsMap(elementTags.ARTICLE, articleElement, message)
  }
}

// check for the <main> tag
export function checkForMain(mainElement: HTMLElement) {
  const countElements = document.getElementsByTagName(elementTags.MAIN)
  if (countElements.length > 1) {
    const message = multipleMainTagMessage
    setErrorsMap(elementTags.MAIN, mainElement, message, multipleMainFix)
  }

  const parentElement = mainElement.parentNode as HTMLElement
  if (parentElement.tagName.toLowerCase() !== elementTags.BODY) {
    const message = mainParentErrorMessage
    setErrorsMap(elementTags.MAIN, mainElement, message, mainAsBodyChildFix)
  }

  const errorObj: ErrorObjectForElement = checkForValidChildren(mainElement)
  if (errorObj.isError) {
    const message = validChildrenMainMessage(
      errorObj.element.tagName.toLowerCase()
    )
    setErrorsMap(
      elementTags.MAIN,
      mainElement,
      message,
      validChildrenMainMessageFix
    )
  }
}

// check for the <header> tag
export function checkForHeader(headerElement: HTMLElement): void {
  const currentParent = headerElement.parentElement
  const currentParentName = currentParent.tagName.toLowerCase()
  if (!elementList.VALID_HEADER_PARENTS.includes(currentParentName)) {
    const message = headerParentMessage(currentParentName)
    setErrorsMap(
      elementTags.HEADER,
      headerElement,
      message,
      headerParentMessageFix
    )
  }

  const nestingResult: ErrorObjectForHeader =
    checkHeaderForNesting(headerElement)
  if (nestingResult.isError) {
    if (nestingResult.tags.length >= 1) {
      let message = headerNestingMessage(nestingResult.tags)
      setErrorsMap(
        elementTags.HEADER,
        headerElement,
        message,
        headerNestingMessageFix
      )
    }
    if (nestingResult.moreHeaders) {
      const message = multipleHeaderErrorMessage
      setErrorsMap(
        elementTags.HEADER,
        headerElement,
        message,
        MultipleHeaderFix
      )
    }
  }
}

// check for the <footer> tag
export function checkForFooter(footerElement: HTMLElement): void {
  const footerParent: HTMLElement = footerElement.parentNode as HTMLElement
  const footerParentName: string = footerParent.tagName.toLowerCase()

  if (!elementList.VALID_FOOTER_PARENTS.includes(footerParentName)) {
    const message = footerParentMessage(footerParentName)
    setErrorsMap(
      elementTags.FOOTER,
      footerElement,
      message,
      footerParentMessageFix
    )
  }

  const countFooter: HTMLCollection = document.getElementsByTagName('footer')
  if (countFooter.length > 1) {
    const message = multipleFooterMessage
    setErrorsMap(
      elementTags.FOOTER,
      footerElement,
      message,
      multipleFooterMessageFix
    )
  }

  const isLastElement: ErrorObjectForFooter =
    checkFooterLastElement(footerElement)
  if (!isLastElement.isLast) {
    const message = lastElementMessage(isLastElement.elementName)
    setErrorsMap(
      elementTags.FOOTER,
      footerElement,
      message,
      lastElementMessageFix
    )
  }
}

// check for the <section> tag
export function checkForSection(sectionElement: HTMLElement): void {
  let firstChildName = sectionElement.firstElementChild

  if (!firstChildName) {
    const message = noChildSectionMessage
    setErrorsMap(
      elementTags.SECTION,
      sectionElement,
      message,
      noChildSectionMessageFix
    )
  }

  const containsHeading: boolean = checkForHeadingsInSection(sectionElement)
  if (!containsHeading) {
    const message = headingsInSectionMessage
    setErrorsMap(
      elementTags.SECTION,
      sectionElement,
      message,
      headingsInSectionMessageFix
    )
  }

  const sectionParent = sectionElement.parentNode as HTMLElement
  const parentName = sectionParent.tagName.toLowerCase()

  if (!elementList.VALID_SECTION_PARENTS.includes(parentName)) {
    const message = sectionParentMessage(parentName)
    setErrorsMap(
      elementTags.SECTION,
      sectionElement,
      message,
      sectionParentMessageFix
    )
  }
}
