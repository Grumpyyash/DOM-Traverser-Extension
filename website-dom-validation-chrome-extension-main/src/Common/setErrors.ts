import {
  errorsMap,
  stylesErrorsMap,
  densityErrorsMap,
} from '../ContentScript/contentScript'

// set the errorsMap upon receiving a new error
export function setErrorsMap(
  elementName: string,
  element: HTMLElement,
  message: string,
  possibleFix: string = null,
  color: string = 'red',
  posX: number = -1,
  posY: number = -1,
  path: string = ''
): void {
  if (errorsMap.has(element)) {
    errorsMap.get(element).messages.push(message)
    if (possibleFix) {
      errorsMap.get(element).possibleFixes.push(possibleFix)
    }
  } else {
    const errorObject = {
      elementName: elementName,
      element: element,
      messages: [message],
      color: color,
      posX: posX,
      posY: posY,
      path: path,
      possibleFixes: possibleFix ? [possibleFix] : [],
    }
    errorsMap.set(element, errorObject)
  }
}

// set the styles error map on receiving a new error
export function setStylesErrorMap(
  elementName: string,
  element: HTMLElement,
  message: string,
  color: string = 'red',
  posX: number = -1,
  posY: number = -1,
  path: string = ''
): void {
  if (stylesErrorsMap.has(element)) {
    stylesErrorsMap.get(element).messages.push(message)
  } else {
    const errorObject = {
      elementName: elementName,
      element: element,
      messages: [message],
      color: color,
      posX: posX,
      posY: posY,
      path: path,
      possibleFixes: ['Please follow the styles configuration file strictly'],
    }
    stylesErrorsMap.set(element, errorObject)
  }
}

// set the density error map
export function setDensityErrorsMap(
  elementName: string,
  element: HTMLElement,
  message: string,
  color: string = 'red',
  posX: number = -1,
  posY: number = -1,
  path: string = ''
): void {
  if (densityErrorsMap.has(element)) {
    densityErrorsMap.get(element).messages.push(message)
  } else {
    const errorObject = {
      elementName: elementName,
      element: element,
      messages: [message],
      color: color,
      posX: posX,
      posY: posY,
      path: path,
      possibleFixes: ['Please follow the density configuration file strictly'],
    }
    densityErrorsMap.set(element, errorObject)
  }
}
