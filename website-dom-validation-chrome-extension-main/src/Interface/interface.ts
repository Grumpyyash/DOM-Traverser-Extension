export interface ErrorObject {
  elementName: string
  element: HTMLElement
  messages: string[]
  color: string
  posX: number
  posY: number
  path: string
  possibleFixes: string[]
}

export interface ErrorObjectForElement {
  isError: boolean
  element: HTMLElement
}

export interface ErrorObjectForHeader {
  isError: boolean
  tags: string[]
  moreHeaders: boolean
}

export interface ErrorObjectForFooter {
  isLast: boolean
  elementName: string
}

export interface ErrorObjectForTime {
  isAttributePresent: boolean
  isAttributeValid: boolean
}

export interface ErrorObjectForFigure {
  isFigcaptionPresent: boolean
  tags: string[]
}

export interface ErrorObjectForInput {
  isError: boolean
  typePresent: boolean
  idPresent: boolean
  namePresent: boolean
}

export interface ErrorObjectForForm {
  isError: boolean
  actionPresent: boolean
  buttonPresent: boolean
}

export interface DensityInterace {
  buttonSpacing: string
  headerAndMainSpacing: string
  headerRowSlotsSpacing: string
  headerRowSpacing: string
}

export interface ErrorObjectForAudioVideo {
  sourcePresent: boolean
  anchorPresent: boolean
  trackPresent: boolean
  trackKindCorrect: boolean
}

export interface colorCombination {
  red: number
  green: number
  blue: number
  opacity: number
}

export interface ErrorObjectInAccordion {
  elementName: string
  elementErrors: ErrorObject[]
}
