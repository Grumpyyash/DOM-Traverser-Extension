import { ErrorObject } from '../Interface/interface'
import { setErrorsMap } from './setErrors'
import { elementTags } from './globalConstants'
import {
  generalDivMessage,
  generalSpanMessage,
  headerSemanticMessage,
  navSemanticMessage,
  mainSemanticMessage,
  articleSemanticMessage,
  sectionSemanticMessage,
  asideSemanticMessage,
  footerSemanticMessage,
  figureSemanticMessage,
  timeSemanticMessage,
  citeSemanticMessage,
  addressSemanticMessage,
} from '../Messages/errorMessages'

// check for general presenrce of semantic tags present on the website
export function checkForPresenceOfSemanticElements(
  elementsCountMap: Map<string, number>
): void {
  const dummyElement = document.querySelector('html')

  if (!elementsCountMap.has(elementTags.DIV))
    setErrorsMap('html', dummyElement, generalDivMessage, null, 'blue', 500, 20)
  if (!elementsCountMap.has('span'))
    setErrorsMap('html', dummyElement, generalSpanMessage, null, 'blue')
  if (!elementsCountMap.has('header'))
    setErrorsMap('html', dummyElement, headerSemanticMessage, null, 'blue')
  if (!elementsCountMap.has('nav'))
    setErrorsMap('html', dummyElement, navSemanticMessage, null, 'blue')
  if (!elementsCountMap.has('main'))
    setErrorsMap('html', dummyElement, mainSemanticMessage, null, 'blue')
  if (!elementsCountMap.has('article'))
    setErrorsMap('html', dummyElement, articleSemanticMessage, null, 'blue')
  if (!elementsCountMap.has('section'))
    setErrorsMap('html', dummyElement, sectionSemanticMessage, null, 'blue')
  if (!elementsCountMap.has('aside'))
    setErrorsMap('html', dummyElement, asideSemanticMessage, null, 'blue')
  if (!elementsCountMap.has('footer'))
    setErrorsMap('html', dummyElement, footerSemanticMessage, null, 'blue')
  if (!elementsCountMap.has('figure'))
    setErrorsMap('html', dummyElement, figureSemanticMessage, null, 'blue')
  if (!elementsCountMap.has('time'))
    setErrorsMap('html', dummyElement, timeSemanticMessage, null, 'blue')
  if (!elementsCountMap.has('cite'))
    setErrorsMap('html', dummyElement, citeSemanticMessage, null, 'blue')
  if (!elementsCountMap.has('address'))
    setErrorsMap('html', dummyElement, addressSemanticMessage, null, 'blue')
}

// error icon to be pushed into the DOM
export function assignStylesToElement(
  iconElement: HTMLElement,
  x: number,
  y: number,
  color: string,
  type: string
): void {
  if (type === 'semantic')
    iconElement.className = 'fa-regular fa-lg fa-circle-question'
  else iconElement.className = 'fa-regular fa-lg fa-circle-xmark'
  iconElement.style.position = 'absolute'
  iconElement.style.top = y + 'px'
  iconElement.style.left = x + 'px'
  iconElement.style.color = color
  iconElement.style.cursor = 'pointer'
  iconElement.style.zIndex = '2000'
  iconElement.style.fontSize = '20px'
}

// lightbulb icon to be pushed to the DOM
export function overrideStylesForBulbIcon(iconElement: HTMLElement): void {
  iconElement.style.position = null
  iconElement.style.marginTop = '23px'
  iconElement.style.marginLeft = '13px'
  iconElement.style.color = 'blue'
  iconElement.style.zIndex = '2000'
  iconElement.style.fontSize = '30px'
}

// create the modal-div for displaying errors on the DOM
export const createModalDivForError = (
  error: ErrorObject,
  type: string = 'semantic'
): HTMLElement => {
  const div1: HTMLElement = document.createElement('div')
  div1.id = 'myDomModal'
  div1.className = 'myDomModal'

  const div2: HTMLElement = document.createElement('div')
  div2.className = 'dom-modal-content'

  const span1: HTMLElement = document.createElement('span')
  span1.id = 'domCloseSpan'
  span1.className = 'dom-close'
  span1.textContent = '\u00D7'

  const h5: HTMLElement = document.createElement('h5')
  if (type === 'semantic')
    h5.textContent = 'Semantic issues concerning this element'
  else if (type === 'styles')
    h5.textContent = 'Styling issues against the configuration'
  else if (type === 'density') h5.textContent = 'Issues with respect to density'

  h5.className = 'custom-modal-h5'
  if (error.elementName === 'html') {
    h5.textContent =
      'General info regarding the usage of semantic elements on this website'
  }

  div2.appendChild(span1)
  div2.appendChild(h5)

  const ul1: HTMLElement = document.createElement('ul')
  error.messages.map((message) => {
    const newList = document.createElement('li')
    newList.className = 'error-modal-li-text'
    newList.textContent = message
    ul1.appendChild(newList)
  })
  div2.appendChild(ul1)

  if (error.possibleFixes.length > 0) {
    const div3 = document.createElement('div')
    div3.style.marginTop = '25px'
    const fixh5 = document.createElement('h5')
    fixh5.className = 'custom-modal-h5'
    fixh5.textContent = 'Suggested possible fixes'
    div3.appendChild(fixh5)

    const fixUl = document.createElement('ul')
    error.possibleFixes.forEach((message) => {
      const newList = document.createElement('li')
      newList.textContent = message
      fixUl.appendChild(newList)
    })
    div3.appendChild(fixUl)
    div2.appendChild(div3)
  }

  const buttonDiv = document.createElement('div')
  buttonDiv.className = 'error-modal-button-div'

  const closeButton: HTMLButtonElement = document.createElement('button')
  closeButton.type = 'button'
  closeButton.className = 'custom-bootstrap-close-button'
  closeButton.textContent = 'Close'

  buttonDiv.appendChild(closeButton)
  div2.appendChild(buttonDiv)
  div1.appendChild(div2)

  span1.onclick = function () {
    div1.style.display = 'none'
    document.querySelector('html').removeChild(div1)
  }
  closeButton.onclick = function () {
    div1.style.display = 'none'
    document.querySelector('html').removeChild(div1)
  }

  return div1
}

// recursively get the path for an element in the DOM tree
export function getPath(
  element: HTMLElement,
  pathMap: Map<HTMLElement, string>
): string {
  if (element.tagName.toLowerCase() === 'html') {
    return 'html'
  }

  if (pathMap.has(element)) {
    return pathMap.get(element)
  }

  const parent = element.parentNode as HTMLElement
  let path = getPath(parent, pathMap) + ' > ' + element.tagName.toLowerCase()

  // If the element has an ID, add it to the path
  if (element.id) {
    path += '#' + element.id
    return path
  }

  if (element.className) {
    path += '.' + element.className
    return path
  }

  // If the element has siblings of the same tag name, add the index to the path
  if (parent) {
    const siblings = parent.getElementsByTagName(element.tagName)
    const siblingsLength = siblings.length
    if (siblingsLength > 1) {
      for (let i = 0; i < siblings.length; i++) {
        if (siblings[i] === element) {
          path += ':nth-child(' + (i + 1) + ')'
          break
        }
      }
    }
  }

  pathMap.set(element, path)
  return path
}

// set the spacing parameters for default density
export const spaciousDensityParam = {
  buttonSpacing: '25px',
  headerAndMainSpacing: '30px',
  headerRowSlotsSpacing: '30px',
  headerRowSpacing: '20px',
}

// set the spacing parameters for compact density
export const compactDensityParam = {
  buttonSpacing: '15px',
  headerAndMainSpacing: '20px',
  headerRowSlotsSpacing: '20px',
  headerRowSpacing: '10px',
}

// convert the numbers in pixels to actual numbers
export function convertPixelStringToNumber(pixels: string): number {
  if (!pixels) return 0

  const splitArray = pixels.split('p')
  if (splitArray[0]) {
    return Number(splitArray[0])
  }

  return 0
}

// create an alert-div for informing mutations on website
export const createDivForAlert = (): HTMLElement => {
  const div1 = document.createElement('div')
  div1.id = 'mutationsAlertDiv'
  div1.className = 'mutation-alert-div'

  const div2 = document.createElement('div')
  div2.className = 'mutation-alert-container-div'

  const para1 = document.createElement('p')
  para1.id = 'mutationsAlertPara'
  para1.className = 'mutations-alert-para'
  para1.innerText =
    'The website got mutated, refresh the new tab for latest results!'

  const span1: HTMLElement = document.createElement('span')
  span1.id = 'mutationsAlertSpan'
  span1.className = 'mutations-alert-span'
  span1.textContent = '\u00D7'

  para1.appendChild(span1)
  div2.appendChild(para1)

  div1.appendChild(div2)

  span1.onclick = function () {
    div1.style.display = 'none'
    document.querySelector('html').removeChild(div1)
  }

  return div1
}

// convert a length unit to pixels
export function convertValueToPixels(
  element: HTMLElement,
  value: string
): number {
  if (value.endsWith('px')) {
    const splitArray = value.split('p')
    return parseFloat(splitArray[0])
  } else if (value.endsWith('rem')) {
    const splitArray = value.split('r')
    let defaultFontSize = 16
    const documentFontSize = getComputedStyle(document.documentElement).fontSize

    if (documentFontSize && documentFontSize !== '') {
      defaultFontSize = parseFloat(documentFontSize)
    }

    if (isNaN(defaultFontSize) || isNaN(parseFloat(splitArray[0]))) {
      return 0
    }

    return parseFloat(splitArray[0]) * defaultFontSize
  } else if (value.endsWith('em')) {
    const splitArray = value.split('e')
    let defaultFontSize = 16

    if (element.tagName.toLowerCase() === 'html')
      return parseFloat(splitArray[0]) * defaultFontSize

    if (!element.parentElement)
      return parseFloat(splitArray[0]) * defaultFontSize

    const parentFontSize = getComputedStyle(element.parentElement).fontSize
    if (parentFontSize && parentFontSize !== '') {
      const parentFontSizeInNumber = parseFloat(parentFontSize)
      defaultFontSize = parentFontSizeInNumber
    }

    return parseFloat(splitArray[0]) * defaultFontSize
  } else if (value === '0') {
    return 0
  } else if (value.endsWith('vh')) {
    const height = window.innerHeight
    const splitArray = value.split('v')
    let widthInPixels = parseFloat(splitArray[0]) * height
    widthInPixels /= 100

    return widthInPixels
  } else if (value.endsWith('vw')) {
    const width = window.innerWidth
    const splitArray = value.split('v')
    let widthInPixels = parseFloat(splitArray[0]) * width
    widthInPixels /= 100

    return widthInPixels
  } else {
    return parseFloat(value)
  }
}

// after traversing the DOM, update it with errors and warnings
export function updateDOMWithErrors(
  type: string = 'semantic',
  mapToTraverse: Map<HTMLElement, ErrorObject>,
  elementsCountMap: Map<string, number>
): void {
  if (type === 'semantic') checkForPresenceOfSemanticElements(elementsCountMap)

  mapToTraverse.forEach((error: ErrorObject, tag: HTMLElement) => {
    const targetElement: Element = error.element

    const rect: DOMRect = targetElement.getBoundingClientRect()

    const x: number = rect.left + window.scrollX
    const y: number = rect.top + window.scrollY + 10

    if (x >= 0 && x <= window.innerWidth && y >= 0) {
      const iconElement: HTMLElement = document.createElement('i')
      assignStylesToElement(iconElement, x, y, error.color, type)

      const divForBulbIcon = document.createElement('div')
      divForBulbIcon.className = 'bulb-icon-general-errors-div'

      if (type === 'semantic' && error.elementName === 'html') {
        iconElement.className = 'fa-regular fa-lightbulb fa-2xl'
        overrideStylesForBulbIcon(iconElement)

        divForBulbIcon.appendChild(iconElement)
      }

      // add the modal opening action to the icon
      iconElement.addEventListener('click', function () {
        const modalDiv = createModalDivForError(error, type)
        document.querySelector('html').appendChild(modalDiv)
        modalDiv.style.display = 'block'
      })

      const htmlTag: HTMLElement = document.querySelector('html')
      if (error.elementName !== 'html') htmlTag.appendChild(iconElement)
      else if (type !== 'styles') htmlTag.appendChild(divForBulbIcon)

      const element: HTMLElement = error.element
      const elementStyles = getComputedStyle(element)
      if (
        type !== 'density' &&
        elementStyles.getPropertyValue('border-width') === '0px'
      )
        element.style.border = '0.1px solid ' + error.color
    }
  })
}

// create an alert div for showing error messages and push to dom
export const createDivForErrorMessages = (
  message: string,
  color: string = 'info'
): void => {
  const div1 = document.createElement('div')
  div1.className = 'error-alert-main-div'

  const div2 = document.createElement('div')
  div2.className = 'error-alert-container-div'

  if (color === 'info') {
    div2.classList.add('error-alert-container-info')
  } else if (color === 'danger') {
    div2.classList.add('error-alert-container-danger')
  } else {
    div2.classList.add('error-alert-container-success')
  }

  const para1 = document.createElement('p')
  para1.className = 'error-alert-para'
  para1.textContent = message

  div2.appendChild(para1)
  div1.appendChild(div2)

  document.querySelector('html').appendChild(div1)
  setTimeout(() => {
    document.querySelector('html').removeChild(div1)
  }, 5000)
}
