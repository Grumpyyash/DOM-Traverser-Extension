const highlightErrorMessage =
  'There was an error highlighting the element on DOM!'
const highlightSuccessMessage =
  'The element has been highlighted using blue colors!'
const formTabErrorMessage = 'The feedback form tab could not be opened!'
const fetchW3cErrorMessage =
  'The w3c accessibility insights could not be fetched!'
const chromeStoreErrorMessage =
  'The url, DOM, and errors could not be fetched from store!'
const tabIdStoreErrorMessage = 'An error storing the tab id of website!'
const semanticContentScriptErrorMessage =
  'An error while checking the semantics of website!'
const websiteUrlStoreErrorMessage =
  'An error storing the url of website in chrome store!'
const semanticToBackgroundErrorMessage =
  'An error in checking semantics from popup to background'
const stylesFileParsingErrorMessage =
  'The config file provided could not be parsed!'
const stylesToBackgroundErrorMessage =
  'Error in checking styles from popup to background'
const stylesToContentScriptErrorMessage =
  'Error in checking style from popup to content-script'
const densityToBackgroundErrorMessage =
  'Error checking density from popup to background'
const densityToContentScriptErrorMessage =
  'Error checking density from popup to content-script'
const infoTabBackgroundErrorMessage =
  'Error opening info tab from popup to background'
const configDownloadErrorMessage =
  'Error downloading the config for check-styles'
const mutationsSetErrorMessage = 'Mutations count could not be saved in chrome'
const mutationsFetchErrorMessage =
  'Mutations count could not be fetched from chrome'
const domAndMutationSetErrorMessage =
  'Website Dom and mutation count could not be stored in chrome'
const errorsStoreErrorMessage = 'Errors could not be stored in chrome store!'
const styleChecksErrorMessage =
  'Styles check could not be performed, the config file provided seems in an invalid format, please look at the sample file provided and try again'
const densityCheckErrorMessage =
  'The density validation could not be performed, please strictly follow the config pattern provided'
const densityFileParsingErrorMessage =
  'The config file provided could not be parsed'
const noErrorsFoundMessage =
  'There were no violations found, it may be due to incorrect or unusual configuration provided'

export {
  highlightErrorMessage,
  highlightSuccessMessage,
  formTabErrorMessage,
  fetchW3cErrorMessage,
  chromeStoreErrorMessage,
  tabIdStoreErrorMessage,
  semanticContentScriptErrorMessage,
  websiteUrlStoreErrorMessage,
  semanticToBackgroundErrorMessage,
  stylesFileParsingErrorMessage,
  stylesToBackgroundErrorMessage,
  stylesToContentScriptErrorMessage,
  densityToBackgroundErrorMessage,
  densityToContentScriptErrorMessage,
  infoTabBackgroundErrorMessage,
  configDownloadErrorMessage,
  mutationsSetErrorMessage,
  mutationsFetchErrorMessage,
  domAndMutationSetErrorMessage,
  errorsStoreErrorMessage,
  styleChecksErrorMessage,
  densityCheckErrorMessage,
  densityFileParsingErrorMessage,
  noErrorsFoundMessage,
}
