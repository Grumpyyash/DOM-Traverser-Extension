import {
  convertPixelStringToNumber,
  convertValueToPixels,
  createDivForErrorMessages,
} from '../Common/utility'
import { setDensityErrorsMap } from '../Common/setErrors'
import { DensityInterace } from '../Interface/interface'
import { Direction } from '../Common/globalConstants'
import { elementTags } from '../Common/globalConstants'
import {
  densityButtonGapMessage,
  densityColumnGapMessage,
  densityRowGapMessage,
  densityHeaderGapMessage,
} from '../Messages/densityMessages'
import { densityCheckErrorMessage } from '../Messages/consoleMessages'

// form the error message for density
export const densityErrorMessage = (
  expected: number,
  found: number,
  commonMessage: string
): string => {
  const message =
    commonMessage +
    ', expected spacing: ' +
    expected +
    'px, but found spacing: ' +
    found +
    'px'
  return message
}

// find the an element's content actual position
export function findElementPos(
  element: HTMLElement,
  direction: string = Direction.BOTTOM
): number {
  let currentElement = element
  if (direction === Direction.BOTTOM) {
    while (currentElement.lastElementChild) {
      currentElement = currentElement.lastElementChild as HTMLElement
    }
  } else {
    while (currentElement.firstElementChild) {
      currentElement = currentElement.firstElementChild as HTMLElement
    }
  }

  let elementPos: number = 0
  if (direction === Direction.BOTTOM)
    elementPos = currentElement.getBoundingClientRect().bottom
  else if (direction === Direction.TOP)
    elementPos = currentElement.getBoundingClientRect().top
  else if (direction === Direction.LEFT)
    elementPos = currentElement.getBoundingClientRect().left
  else if (direction === Direction.RIGHT)
    elementPos = currentElement.getBoundingClientRect().right

  const elementStyles = window.getComputedStyle(currentElement)
  const elementPaddingBottom = elementStyles.getPropertyValue(
    'padding-' + direction
  )

  let paddingInNumber = convertPixelStringToNumber(elementPaddingBottom)
  if (direction === Direction.BOTTOM || direction === Direction.RIGHT)
    paddingInNumber *= -1

  return elementPos + paddingInNumber
}

// check for the spacing between button and its next child button
export function checkForButtonSpacing(
  element: HTMLElement,
  densityParam: DensityInterace
): void {
  if (
    !densityParam.buttonSpacing ||
    !densityParam.headerAndMainSpacing ||
    !densityParam.headerRowSlotsSpacing ||
    !densityParam.headerRowSpacing
  ) {
    createDivForErrorMessages(densityCheckErrorMessage, 'danger')
    return
  }
  const currentPos = element.getBoundingClientRect().right
  if (!element.nextElementSibling) return

  const nextElement = element.nextElementSibling
  if (nextElement.tagName.toLowerCase() !== elementTags.BUTTON) return

  const nextPos = nextElement.getBoundingClientRect().left
  const spaceDiff = nextPos - currentPos
  const expectedSpacing = convertValueToPixels(
    element,
    densityParam.buttonSpacing
  )

  if (spaceDiff !== expectedSpacing) {
    const commonMessage = densityButtonGapMessage
    const message = densityErrorMessage(
      expectedSpacing,
      spaceDiff,
      commonMessage
    )
    setDensityErrorsMap(elementTags.BUTTON, element, message)
  }
}

// find the actual spacing betwen header and main tags
export function checkForGapBetweenHeaderAndMain(
  headerElement: HTMLElement,
  mainElement: HTMLElement,
  densityParam: DensityInterace
) {
  const headerLastElementBottom = findElementPos(
    headerElement,
    Direction.BOTTOM
  )
  const mainFirstElementTop = findElementPos(mainElement, Direction.TOP)

  const spacingDiff = mainFirstElementTop - headerLastElementBottom
  const expectedSpacing = convertValueToPixels(
    headerElement,
    densityParam.headerAndMainSpacing
  )
  if (spacingDiff !== expectedSpacing) {
    const commonMessage = densityHeaderGapMessage
    const message = densityErrorMessage(
      expectedSpacing,
      spacingDiff,
      commonMessage
    )
    setDensityErrorsMap(elementTags.HEADER, headerElement, message)
  }
}

// check for spacings between the columns in the row of header
export function checkForColumnSpacingInHeaderRow(
  columnElement: HTMLElement,
  densityParam: DensityInterace
): void {
  const nextColumn = columnElement.nextElementSibling as HTMLElement
  if (!nextColumn) return

  const currentColumnRight = findElementPos(columnElement, Direction.RIGHT)
  const nextColumnLeft = findElementPos(nextColumn, Direction.LEFT)

  const spaceDiff = nextColumnLeft - currentColumnRight
  const expectedSpacing = convertValueToPixels(
    columnElement,
    densityParam.headerRowSlotsSpacing
  )
  if (spaceDiff !== expectedSpacing) {
    const commonMessage = densityColumnGapMessage
    const message = densityErrorMessage(
      expectedSpacing,
      spaceDiff,
      commonMessage
    )
    setDensityErrorsMap('header-row-column', columnElement, message)
  }
}

// check for spacings between rows of header
export function checkForHeaderRowSpacing(
  rowElement: HTMLElement,
  densityParam: DensityInterace
): void {
  const children = rowElement.querySelectorAll(
    '[data-identifier="header-row-column"]'
  )

  for (let i = 0; i < children.length; i++) {
    const currentColumn = children[i] as HTMLElement
    checkForColumnSpacingInHeaderRow(currentColumn, densityParam)
  }

  const nextRowElement = rowElement.nextElementSibling as HTMLElement
  if (!nextRowElement) return

  const currentBottomPos = findElementPos(rowElement, Direction.BOTTOM)
  const nextTopPos = findElementPos(nextRowElement, Direction.TOP)

  const spacingDiff = nextTopPos - currentBottomPos
  const expectedSpacing = convertValueToPixels(
    rowElement,
    densityParam.headerRowSpacing
  )

  if (spacingDiff !== expectedSpacing) {
    const commonMessage = densityRowGapMessage
    const message = densityErrorMessage(
      expectedSpacing,
      spacingDiff,
      commonMessage
    )
    setDensityErrorsMap('header-row', rowElement, message)
  }
}

// check for the density of header element
export function checkForHeaderDensity(
  element: HTMLElement,
  densityParam: DensityInterace
): void {
  if (
    !densityParam.buttonSpacing ||
    !densityParam.headerAndMainSpacing ||
    !densityParam.headerRowSlotsSpacing ||
    !densityParam.headerRowSpacing
  ) {
    createDivForErrorMessages(densityCheckErrorMessage, 'danger')
    return
  }
  const mainElement = document.querySelector('[data-identifier="main"],main')
  if (mainElement)
    checkForGapBetweenHeaderAndMain(
      element,
      mainElement as HTMLElement,
      densityParam
    )

  const rowElements = element.querySelectorAll('[data-identifier="header-row"]')
  for (let i = 0; i < rowElements.length; i++) {
    const currentRow = rowElements[i] as HTMLElement
    checkForHeaderRowSpacing(currentRow, densityParam)
  }
}
