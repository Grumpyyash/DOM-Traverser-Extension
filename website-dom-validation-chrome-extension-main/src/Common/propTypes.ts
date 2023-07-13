// prop-types for the popup page
export type PopupProps = {
  isMessageError: boolean
  showfileFormatError: boolean
  showCheckInput: boolean
  isFileInput: boolean
  isCheckboxClicked: boolean
  isSelectOpen: boolean
  comapctDensity: boolean
  defaultDensity: boolean
  isDensityFileInput: boolean
  customDensity: boolean
  handleAlertClose: (event: React.MouseEvent<HTMLElement>) => void
  handleShowFileFormatClose: () => void
  handleTraverseDom: (e: React.MouseEvent<HTMLElement>) => void
  handleCheckStyles: (e: React.MouseEvent<HTMLElement>) => void
  handleDownloadFile: () => void
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleStylesSubmit: (event: React.MouseEvent<HTMLElement>) => void
  handleCheckDensity: (event: React.MouseEvent<HTMLElement>) => void
  handleDensityFileInputChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  handleDensityCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  handleDensitySubmit: () => void
  openFormTab: () => void
}

// prop-types for semantics new page
export type SemanticsProps = {
  objectsArray: any[]
  handleHightlight: (path: string) => void
  handleShowPath: (path: string) => void
  handleClosePath: () => void
  openFormTab: () => void
  websiteUrl: string
  errorsCount: number
  showPath: boolean
  currentPath: string
  handleW3C: () => void
  showW3cErrors: boolean
  w3cErrors: {
    error: any[]
    info: any[]
    warning: any[]
  }
}

// prop-types for the check-styles new tab
export type StylesProps = {
  objectsArray: any[]
  handleHightlight: (path: string) => void
  handleShowPath: (path: string) => void
  handleClosePath: () => void
  openFormTab: () => void
  websiteUrl: string
  errorsCount: number
  showPath: boolean
  currentPath: string
}

// prop-types for the check-density new tab
export type DensityProps = {
  objectsArray: any[]
  handleHightlight: (path: string) => void
  handleShowPath: (path: string) => void
  handleClosePath: () => void
  openFormTab: () => void
  websiteUrl: string
  errorsCount: number
  showPath: boolean
  currentPath: string
}
