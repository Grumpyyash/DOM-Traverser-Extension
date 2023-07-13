import { setStylesErrorMap } from '../Common/setErrors'
import { colorCombination } from '../Interface/interface'
import { convertValueToPixels } from '../Common/utility'
import { createDivForErrorMessages } from '../Common/utility'
import { styleChecksErrorMessage } from '../Messages/consoleMessages'
import { stylesList } from '../Common/globalConstants'

// styles related to length with different units to be converted into pixels
export const stylesHavingLengthUnits: string[] = [
  'border-radius',
  'border-width',
  'margin-left',
  'margin-right',
  'margin-top',
  'margin-bottom',
  'max-height',
  'max-width',
  'min-height',
  'min-width',
  'padding-left',
  'padding-right',
  'padding-top',
  'padding-bottom',
  'letter-spacing',
  'outline-offset',
  'outline-width',
  'gap',
  'font-size',
  'line-height',
]

// elements which have specific styles, not to check global styles
export const elementsWithSpecificStyles: string[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'input',
  'button',
  'a',
]

// message for the styles error
const stylesErrorMessage = (
  elementName: string,
  key: string,
  value: string
): string => {
  const message =
    '<' +
    elementName +
    '> tag had ' +
    key +
    ': ' +
    value +
    ', which violates configuration'
  return message
}

// convert an array of values to pixels
export function convertValueArraysToPixels(
  element: HTMLElement,
  values: string[]
): number[] {
  let newArray: number[] = []
  values.forEach((value) => {
    const newValue = convertValueToPixels(element, value)
    newArray.push(newValue)
  })
  return newArray
}

// check styles for elements with length values for e.g px, rem, em etc
export function checkForDifferentUnits(
  element: HTMLElement,
  elementValue: string,
  allowedValues: string[]
): boolean {
  let result = false

  if (elementValue.endsWith('%')) {
    return allowedValues.includes(elementValue)
  } else if (elementValue.endsWith('auto')) {
    return allowedValues.includes(elementValue)
  } else if (elementValue.endsWith('none')) {
    return allowedValues.includes(elementValue)
  } else if (elementValue.endsWith('normal')) {
    return allowedValues.includes(elementValue)
  }

  const elementValueInPixels: number = convertValueToPixels(
    element,
    elementValue
  )
  const modifiedAllowedValuesInPixels: number[] = convertValueArraysToPixels(
    element,
    allowedValues
  )

  if (modifiedAllowedValuesInPixels.includes(elementValueInPixels))
    result = true
  return result
}

// get the rgba values from hex code
export const getRgbFromHex = (hex: string): colorCombination => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  let stringToBePassedToGrbConverter: string = ''

  if (hex.length === 9) {
    const alpha = parseInt(hex.slice(7, 9), 16)
    const opacity = Math.round((alpha / 255) * 100) / 100

    stringToBePassedToGrbConverter =
      'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')'
  } else {
    stringToBePassedToGrbConverter = 'rgb(' + r + ', ' + g + ', ' + b + ')'
  }

  const colorInRgb = getRgbaForColor(stringToBePassedToGrbConverter)
  return colorInRgb
}

// get the rgba values from string rgba
export const getRgbaForColor = (color: string): colorCombination => {
  let eachColor: colorCombination = {
    red: 0,
    green: 0,
    blue: 0,
    opacity: 1,
  }
  const textSeparator = color.split('(')
  const bracketSepataor = textSeparator[1].split(')')
  const commaSeparator = bracketSepataor[0].split(',')

  eachColor.red = parseFloat(commaSeparator[0])
  eachColor.green = parseFloat(commaSeparator[1])
  eachColor.blue = parseFloat(commaSeparator[2])

  if (commaSeparator.length > 3) {
    eachColor.opacity = parseFloat(commaSeparator[3])
  }
  return eachColor
}

// check for border color which can also be transparent or currentcolor
export const checkForBorderColor = (
  element: HTMLElement,
  currentPropertyValue: string,
  values: string[]
): boolean => {
  let isError = false
  const elementStyles = getComputedStyle(element)
  if (
    currentPropertyValue === elementStyles.getPropertyValue(stylesList.COLOR) ||
    currentPropertyValue === stylesList.ZERO_OPACITY_BLACK
  ) {
    isError = false
  } else {
    const isValidColor = checkForColorStyles(currentPropertyValue, values)
    if (!isValidColor) isError = true
  }

  return isError
}

// function to check for the color of elements
const checkForColorStyles = (
  elementColor: string,
  allowedColors: string[]
): boolean => {
  let isCorrect = false

  const elementColorInRgba = getRgbaForColor(elementColor)
  allowedColors.forEach((color) => {
    let allowedCombination: colorCombination = {
      red: 0,
      green: 0,
      blue: 0,
      opacity: 1,
    }

    if (color.startsWith('var')) {
      const rgbaSeparatedString = color.split('rgba')
      if (rgbaSeparatedString.length === 2) {
        let lastString = rgbaSeparatedString[1].slice(0, -1)
        lastString = 'rgba' + lastString
        allowedCombination = getRgbaForColor(lastString)
      } else {
        const hexSeparatedString = color.split('#')
        if (hexSeparatedString.length === 2) {
          let lastString = hexSeparatedString[1].slice(0, -1)
          lastString = '#' + lastString
          allowedCombination = getRgbFromHex(lastString)
        }
      }
    } else if (color.startsWith('#')) {
      allowedCombination = getRgbFromHex(color)
    } else if (color.startsWith('rgb')) {
      allowedCombination = getRgbaForColor(color)
    }

    let isThisColorValid = true
    for (const key in elementColorInRgba) {
      if (elementColorInRgba[key] !== allowedCombination[key]) {
        isThisColorValid = false
        break
      }
    }

    if (isThisColorValid) isCorrect = true
  })
  return isCorrect
}

function checkStylesForSpecificElements(
  element: HTMLElement,
  stylesMap: { [k: string]: string[] | any }
): void {
  const elementName = element.tagName.toLowerCase()
  const styles = stylesMap[elementName]
  const elementStyles = getComputedStyle(element)

  for (const property in styles) {
    const currentPropertyValue = elementStyles.getPropertyValue(property)

    let isError: boolean = false
    const values = styles[property]
    if (stylesHavingLengthUnits.includes(property)) {
      const isValidUnit = checkForDifferentUnits(
        element,
        currentPropertyValue,
        values
      )
      if (!isValidUnit) isError = true
    } else {
      if (property === stylesList.BORDER_COLOR) {
        const isBorderError = checkForBorderColor(
          element,
          currentPropertyValue,
          values
        )
        if (isBorderError) isError = true
      } else if (
        property === stylesList.COLOR ||
        property === stylesList.BACKGROUND_COLOR
      ) {
        const isValidColor = checkForColorStyles(currentPropertyValue, values)
        if (!isValidColor) isError = true
      } else {
        if (!values.includes(currentPropertyValue)) isError = true
      }
    }
    if (isError) {
      const message = stylesErrorMessage(
        elementName,
        property,
        currentPropertyValue
      )
      setStylesErrorMap(elementName, element, message)
    }
  }
}

// traverse the DOM of the website
function traverseDomForStyles(
  element: HTMLElement,
  stylesMap: { [k: string]: string[] | any }
): void {
  if (!element) return

  const elementName = element.tagName.toLowerCase()
  const elementStyles = getComputedStyle(element)

  if (elementsWithSpecificStyles.includes(elementName)) {
    checkStylesForSpecificElements(element, stylesMap)
  } else {
    for (const key in stylesMap) {
      const value = stylesMap[key]
      let elementCurrentPropertyValue = elementStyles.getPropertyValue(key)

      let isError: boolean = false
      if (elementCurrentPropertyValue !== '') {
        if (stylesHavingLengthUnits.includes(key)) {
          const isValidUnit = checkForDifferentUnits(
            element,
            elementCurrentPropertyValue,
            value
          )
          if (!isValidUnit) isError = true
        } else {
          if (key === stylesList.BORDER_COLOR) {
            const isBorderError = checkForBorderColor(
              element,
              elementCurrentPropertyValue,
              value
            )
            if (isBorderError) isError = true
          } else if (
            key === stylesList.COLOR ||
            key === stylesList.BACKGROUND_COLOR
          ) {
            const isValidColor = checkForColorStyles(
              elementCurrentPropertyValue,
              value
            )
            if (!isValidColor) isError = true
          } else {
            if (!value.includes(elementCurrentPropertyValue)) isError = true
          }
        }
      }
      if (isError) {
        const message = stylesErrorMessage(
          elementName,
          key,
          elementCurrentPropertyValue
        )
        setStylesErrorMap(elementName, element, message)
      }
    }
  }

  // Traverse child nodes recursively
  for (let i = 0; i < element.children.length; i++) {
    const child = element.children[i] as HTMLElement
    if (child.nodeType === Node.ELEMENT_NODE) {
      const childStyles = getComputedStyle(child)
      if (
        childStyles.getPropertyValue(stylesList.DISPLAY) !== 'none' &&
        childStyles.getPropertyValue(stylesList.VISIBILITY) !== 'hidden'
      ) {
        traverseDomForStyles(child, stylesMap)
      }
    }
  }
}

// function for validating the styles of elements based on configuration
export function checkStyles(
  htmlTag: HTMLElement,
  stylesMap: { [k: string]: string[] | any }
) {
  try {
    traverseDomForStyles(htmlTag, stylesMap)
  } catch (error) {
    createDivForErrorMessages(styleChecksErrorMessage, 'danger')
  }
}
