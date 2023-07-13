// fixes related to div
export const divOneChildMessageFix: string =
  'You can remove this div as it is just a wrapper for one child'

export const divLevelMessageFix: string =
  'You can consider combining a few elements on the same level to remove nesting'

export const divParentMessageFix: string =
  'Consider replacing this <div> with elements like - <section> or <article>'

export const formInDivMessageFix: string =
  'Consider replacing this <div> with <form> or <formgroup> as it contains form-elements'

export const navInDivMessageFix: string =
  'Consider replacing this <div> with <nav> as it contains nav or link elements'

// fixes related to span
export const spanWrapperMessageFix: string =
  'Consider replacing this <span> with <p>'

export const spanChildMessageFix: string =
  'This <span> tag is just used to force its children in the same line, use css to acheive it'

// fixes related to article
export const articleParentErrorMessageFix: string =
  'Consider removing this <article> tag from its parent and make it direct child of <body>, <section> or <main>'

// fixes related to <main> tag
export const multipleMainFix =
  'Consider removing <main> tags from your website to make its total count equal to 1'

export const mainAsBodyChildFix =
  'Consider making this <main> tag a direct child of the <body> tag'

export const validChildrenMainMessageFix: string =
  'Consider removing tags like <header>, <footer> from this <main> tag'

// fixes related to <header> tag
export const headerParentMessageFix: string =
  'Consider making this <header> a direct child of generic elements like - <body>, <main> etc'

export const headerNestingMessageFix: string =
  'Consider removing the multiple instances of header tags in a section and check if its parent elements are valid'

export const MultipleHeaderFix: string =
  'Consider removing more occurances of <header> tags to make their count equal to 1'

// fixes related to <footer> tag
export const footerParentMessageFix: string =
  'Consider making this <footer> a direct child of generic elements like - <body>, <main> etc'

export const multipleFooterMessageFix: string =
  'Consider removing more occurances of <footer> tags to make their count equal to 1'

export const lastElementMessageFix: string =
  'Consider making this <footer> the last element of its corresponding parent'

// fixes related to <section> tag
export const noChildSectionMessageFix: string =
  'There are no children of this <section>, consider removing this as it is used just as a wrapper'

export const headingsInSectionMessageFix: string =
  'Consider adding <heading> tags in this <section> or replace it with another semantic wrapper'

export const sectionParentMessageFix: string =
  'Consider making this <section> a direct child of generic elements like - <body>, <main> etc'

// fixes related to <aside> tag
export const validChildInAsideFix =
  'Consider removing the children of <aside> which are not-textual, or image'

// fixes related to <details> tag
export const summaryPresentInDetailsMessageFix: string =
  'Consider adding a <summary> tag to this <details> tag'

// fixes related to <summary> tag
export const summaryParentMessageFix: string =
  'Consider using this <summary> tag only as a child of a <details> tag'

export const summaryValidByChildrenMessageFix: string =
  'Comsider removing non-textual elements from this <summary> tag'

// fixes related to the <time> tag
export const timeAttributeMessageFix: string =
  'Please consider adding a datetime-attribute to this <time> tag'

export const wrongDateTimeAttributeFix: string =
  'Consider replacing the datetime-attribute with a Date.parse() parsable string'

// fixes related to the <nav> tag
export const navChildrenMessageFix =
  'Consider replacing the children of this <nav> which is not navigation-related, like - <a>, <li> etc'

// fixes related to the <figure> tag
export const figcaptionPresentFigureMessageFix: string =
  'Add a <figcaption> inside of this <figure> tag'

export const figureChildrenFix =
  'Consider removing elements other than images, figcaption etc from this <figure> tag'

// fixes related to the <br> tag
export const brTagFix =
  'consider removing this <br> and achieving the same using css'

// fixes related to the <hr> tag
export const hrTagFix =
  'consider removing this <hr> and achieving the same using css'

// fixes related to the <img> tag
export const noImgAltPresentMessageFix: string =
  'Add a valid *alt* attribute to this <img> element'

// fixes related to the <input> tag
export const validInputMessageFix: string =
  'Add name, id, and type attributes to this <input> tag'

// fixes related to non-textual elements
export const nonTextSourceElementsFix: string =
  'Make sure to add source to these non-textual elements'

export const nonTextCaptionElementsFix: string =
  'Make sure to add captions using <track> to these non-textual elements'

export const nonTextFallbackElementsFix: string =
  'Make sure to add fallback support e.g. download options to these non-textual elements'

export const nonTextTrackElementsFix: string =
  'Make sure to add correct "kind" of <track> e.g. kind="subtitle" or kind="captions" to these non-textual elements'

// messages related to error-handling
export const localStorageErrorMessage =
  'There was an error setting the DOM of the website in local store, please check if' +
  ' you have given permissions to the chrome localstore, or report this error'

export const errorInGettingMutationsCount =
  'There was an error in getting count of mutations from the chrome local store' +
  'please check if you have given permissions for using chrome localstore, or report this error'

export const errorInSettingErrorsMapInStorage =
  'There was an error in setting the map of errors in the chrome local store' +
  'please check if you have given permissions for using chrome localstore, or report this error'

export const errorInReceivingMessageInContentScript =
  'There was an error in receiving messages to content-script of the chrome extension, please ' +
  'try again, or report this error'

export const errorInSendingMessageFromPopupToBackground =
  'There was an error in sending messages to background from the popup of extension, please ' +
  'try again, or report this error'

export const errorInSendingMessageFromPopupToContentScript =
  'There was an error in sending messages to content-script from the popup of extension, please ' +
  'try again, or report this error'

// general element level nesting message
export const generalElementMessage = (
  element: string,
  level: number
): string => {
  return (
    'This <' +
    element +
    '> tag has an overall nesting of ' +
    level +
    ' levels, it can decrese readibilty, increase complexity, impact performances and pose' +
    ' challenges to accessibility, please consider removing the extreme nesting'
  )
}
