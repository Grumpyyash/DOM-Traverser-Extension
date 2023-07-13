import {
  ErrorObjectForElement,
  ErrorObjectForFooter,
  ErrorObjectForHeader,
} from '../Interface/interface'

import { elementList } from '../Common/globalConstants'
import { elementTags } from '../Common/globalConstants'

// validate the <h> tags for correct order

export function checkForHStructure(currentH: HTMLElement): boolean {
  const currentTag: string = currentH.tagName.toLowerCase()
  let matchArray: string[] = []

  if (currentTag === elementTags.H1) {
    matchArray = elementList.INVALID_TAGS_BEFORE_H1
  } else if (currentTag === elementTags.H2) {
    matchArray = elementList.INVALID_TAGS_BEFORE_H2
  } else if (currentTag === elementTags.H3) {
    matchArray = elementList.INVALID_TAGS_BEFORE_H3
  } else if (currentTag === elementTags.H4) {
    matchArray = elementList.INVALID_TAGS_BEFORE_H4
  } else if (currentTag === elementTags.H5) {
    matchArray = elementList.INVALID_TAGS_BEFORE_H5
  }

  while (currentH) {
    const currentTagName = currentH.tagName.toLowerCase()

    if (matchArray.includes(currentTagName)) {
      return false
    }
    currentH = currentH.previousElementSibling as HTMLElement
  }

  return true
}

// validate the <h> tags for mandatory presence of higher <h> tags
export function checkForHigherHTags(currentH: HTMLElement): boolean {
  const currentTag = currentH.tagName.toLowerCase()
  let higherSet: Set<string> = new Set()

  if (currentTag === elementTags.H2) {
    higherSet = new Set(elementList.MANDATORY_TAGS_BEFORE_H2_SET)
  } else if (currentTag === elementTags.H3) {
    higherSet = new Set(elementList.MANDATORY_TAGS_BEFORE_H3_SET)
  } else if (currentTag === elementTags.H4) {
    higherSet = new Set(elementList.MANDATORY_TAGS_BEFORE_H4_SET)
  } else if (currentTag === elementTags.H5) {
    higherSet = new Set(elementList.MANDATORY_TAGS_BEFORE_H5_SET)
  } else if (currentTag === elementTags.H6) {
    higherSet = new Set(elementList.MANDATORY_TAGS_BEFORE_H6_SET)
  }

  while (currentH) {
    const currentTagName = currentH.tagName.toLowerCase()
    higherSet.delete(currentTagName)

    currentH = currentH.previousElementSibling as HTMLElement
  }

  if (higherSet.size == 0) return true
  return false
}

// check if a <div> can be replaced with a <section> or <article>
export function checkDivForReplacement(divElement: HTMLElement): boolean {
  const children = divElement.children
  for (let i = 0; i < children.length; i++) {
    const childName = children[i].tagName.toLowerCase()
    if (!elementList.DIV_WRAPPER_CHILDREN.includes(childName)) {
      return false
    }
  }
  return true
}

// check if there is a <form> in the <div>
export function checkForFormInDiv(divElement: HTMLElement): boolean {
  const children = divElement.children
  for (let i = 0; i < children.length; i++) {
    const childName = children[i].tagName.toLowerCase()
    if ([elementTags.FORM, elementTags.INPUT].includes(childName)) {
      return true
    }
  }

  const classNames = divElement.classList
  for (const currentClass in classNames) {
    if (currentClass.includes(elementTags.FORM)) return true
  }

  const elementId = divElement.id
  if (elementId.includes(elementTags.FORM)) return true

  return false
}

// check if there is <nav> in the <div>
export function checkForNavInDiv(divElement: HTMLElement): boolean {
  const children = Array.from(divElement.children)
  for (let i = 0; i < children.length; i++) {
    const childName = children[i].tagName.toLowerCase()
    if ([elementTags.NAV, elementTags.LI].includes(childName)) {
      return true
    }
  }

  const classNames = divElement.classList
  for (const currentClass in classNames) {
    if (currentClass.includes(elementTags.NAV)) return true
  }

  const elementId = divElement.id
  if (elementId.includes(elementTags.NAV)) return true

  return false
}

// check if there is an <aside> in <div>
export function checkForAsideInDiv(divElement: HTMLElement): boolean {
  const children = divElement.children
  for (let i = 0; i < children.length; i++) {
    const child = children[i].tagName.toLowerCase()
    if (child === elementTags.ASIDE) return true
  }

  const classNames = divElement.classList
  for (const currentClass in classNames) {
    if (currentClass.includes('side')) return true
  }

  const elementId = divElement.id
  if (elementId.includes('side')) return true

  return false
}

// validate the <article> tag, its parent should only be <body> or <section>
export function isArticleValidByParent(
  articleElement: HTMLElement
): ErrorObjectForElement {
  let currParent = articleElement.parentElement

  let errorObj: ErrorObjectForElement = {
    isError: false,
    element: articleElement,
  }

  while (currParent && currParent.tagName.toLowerCase() !== elementTags.HTML) {
    const elementName = currParent.tagName.toLowerCase()
    if (
      elementName !== elementTags.BODY &&
      elementName !== elementTags.SECTION &&
      elementName !== elementTags.MAIN
    ) {
      errorObj.isError = true
      errorObj.element = currParent
      return errorObj
    }
    currParent = currParent.parentElement
  }
  return errorObj
}

// <article> tags should not be nested (recommended)
export function isArticleValidByNesting(articleElement: HTMLElement): boolean {
  const children = articleElement.children

  for (let i = 0; i < children.length; i++) {
    const elementName = children[i].tagName.toLowerCase()
    if (elementName === elementTags.ARTICLE) {
      return true
    }
  }

  return false
}

// check if the children of <main> contain tags like <header>, <nav>, <footer> etc
export function checkForValidChildren(
  mainElement: HTMLElement
): ErrorObjectForElement {
  let errorObj: ErrorObjectForElement = {
    isError: false,
    element: mainElement,
  }
  const mainChildren = mainElement.children
  for (let i = 0; i < mainChildren.length; i++) {
    const child = mainChildren[i]
    if (child.nodeType === Node.ELEMENT_NODE) {
      const childName = child.tagName.toLowerCase()
      if (
        childName === elementTags.HEADER ||
        childName === elementTags.NAV ||
        childName == elementTags.FOOTER
      ) {
        errorObj.isError = true
        errorObj.element = child as HTMLElement
        return errorObj
      }
    }
  }

  return errorObj
}

// check <header> tags for nesting and its allowed parent tags
export function checkHeaderForNesting(
  headerElement: HTMLElement
): ErrorObjectForHeader {
  const errorObj: ErrorObjectForHeader = {
    isError: false,
    tags: [],
    moreHeaders: false,
  }

  let currentParent = headerElement.parentElement
  if (!currentParent) return errorObj
  while (
    currentParent &&
    currentParent.tagName.toLowerCase() !== elementTags.BODY
  ) {
    const currentTagName = currentParent.tagName.toLowerCase()
    if (!elementList.VALID_HEADER_PARENTS.includes(currentTagName)) {
      errorObj.isError = true
      errorObj.tags.push(currentTagName)
    }
    currentParent = currentParent.parentElement
  }

  currentParent = headerElement.parentElement
  let headerCount = 0
  const currentChildren = currentParent.children
  for (let i = 0; i < currentChildren.length; i++) {
    const child = currentChildren[i]
    if (child.nodeType === Node.ELEMENT_NODE) {
      if (child.tagName.toLowerCase() === elementTags.HEADER) {
        headerCount++
      }
    }
  }

  if (headerCount > 1) {
    errorObj.isError = true
    errorObj.moreHeaders = true
  }

  return errorObj
}

// check for footer if it is the last element of its section
export function checkFooterLastElement(
  footerElement: HTMLElement
): ErrorObjectForFooter {
  const footerParent = footerElement.parentNode
  let errorObj: ErrorObjectForFooter = {
    isLast: true,
    elementName: '',
  }

  const nextElement = footerElement.nextElementSibling
  if (!nextElement) {
    return errorObj
  }

  const nextElementName = nextElement.tagName.toLowerCase()
  if (
    !elementList.FOOTER_VALID_NEXT_ELEMENTS.includes(nextElementName) &&
    nextElement.nodeType !== Node.COMMENT_NODE
  ) {
    errorObj.isLast = false
    errorObj.elementName = nextElementName
    return errorObj
  }

  return errorObj
}

// check for the <section> tag if it contains <heading> tags or not
export function checkForHeadingsInSection(
  sectionElement: HTMLElement
): boolean {
  const sectionChildren = sectionElement.children
  for (let i = 0; i < sectionChildren.length; i++) {
    const elementTagName = sectionChildren[i].tagName.toLowerCase()
    if (elementList.HEADERS_LIST.includes(elementTagName)) {
      return true
    }
  }
  return false
}
