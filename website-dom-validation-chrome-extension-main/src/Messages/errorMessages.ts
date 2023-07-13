import { ErrorObjectForForm, ErrorObjectForInput } from '../Interface/interface'

// messages regarding <div>
export const divEmptyChildrenMessage: string =
  'This <div> does not have any child, remove it from DOM unless you plan to populate it later or ' +
  'if you do have plain text written directly inside it, consider wrapping it with <p>'

export const divOneChildMessage: string =
  'Here the <div> is used as a wrapper around a single child, ' +
  'consider removing it if possible, or if you have plain text written directly inside it, consider ' +
  'wrapping it inside <p> tag'

export const divLevelMessage = (level: number): string => {
  return (
    'This <div> element is nested ' +
    level +
    ' levels deep, this much deeper' +
    ' nesting of elements is not recommended considering readibility and semanticity'
  )
}

export const divParentMessage: string =
  'This <div> element is a direct child of the <body> tag, please consider replacing it with a semantic ' +
  'HTML element like <main> or <section>'

export const divReplacableMessage: string =
  'Looks like this <div> element is used as a wrapepr for elements like - text, images and links, consider' +
  ' replacing it more semantic element, if possible'

export const generalDivMessage: string =
  '<div> elements are considered to be a non-semantic element as they do not convey any specific info about them' +
  ', this website had many <div> elements being used, please review them and remove if possible'

export const formInDivMessage: string =
  'This <div> tag is probably used to wrap tags like <input> or <form>, since <div> elements do not convey' +
  ' any semantic meaning, consider to relace it with suitable elements like <form> or formgroup'

export const navInDivMessage: string =
  'This <div> element is probably used to wrap elements like - <nav> and links, consider replacing it ' +
  'with more semantic elements like <nav>'

export const asideInDivMessage: string =
  'This <div> element is probably being used as a sidebar, consider replacing it with a more semantic element like - <aside>'

// messages reagrding <span>
export const spanWrapperMessage: string =
  'Here, the <span> element is only used as a wrapper for text, please consider replacing this' +
  ' with a semantic element like <p>'

export const spanChildMessage: string =
  'This <span> tag is used to force its children in the same line, please consider replacing the <span>' +
  'if used only for that purpose, and achieve that using css, or repalce it with generic tags like <section>'

export const generalSpanMessage: string =
  '<span> elements are considered non-semantic and they do not convey any specific info about their use, this' +
  ' website has <span> elements, please review their uses and consider alternatives if possible'

// messages regarding <h> tags
export const hLowerTagsMessage = (tag: string): string => {
  return (
    tag +
    ' tag should not occur below a smaller <h> tag in the same section, please follow html structure'
  )
}

export const presenceOfHigherHTags = (tag: string, before: string): string => {
  return (
    tag +
    'tag has been used without using ' +
    before +
    ' tags before in this elements wrapper section, see if it is intentional'
  )
}

// messages reagrding article
export const articleParentErrorMessage = (parent: string): string => {
  return (
    'An <article> tag should not be nested with any tag other than <section> or <body>' +
    ', this was nested within a <' +
    parent +
    '> tag'
  )
}

export const articleNestingMessage: string =
  'An <article> must be a standalone section, nesting is not recommended'

export const articleSemanticMessage: string =
  'The website does not use any <article> tag, it is recommended to use <article> tag to' +
  ' replace non-semantic elements like <div> which are used for standalone content, ' +
  'like blog post, news article'

// messages regarding the <main> tag
export const validChildrenMainMessage = (child: string): string => {
  return (
    'Tags like <header>, <footer> should not be nested within <main>, this one had <' +
    child +
    '> tag as its child'
  )
}

export const mainSemanticMessage: string =
  'The website does not use any <main> tag, it is recommended to use <main> tag to' +
  ' replace non-semantic elements like <div> which are used as a wrapper for main-content of website'

export const multipleMainTagMessage: string =
  'There are multiple instances of <main> tag on the website, please avoid that'

export const mainParentErrorMessage: string =
  '<main> tag is used to wrap the entire page context, it must be an immediate child of the <body> tag' +
  ', here it was violated'

// messages regarding the <header> tag
export const headerParentMessage = (parent: string): string => {
  return (
    '<header> tag should be an introductory tag for a section or body, here it was found inside <' +
    parent +
    '> tag'
  )
}

export const headerNestingMessage = (tags: string[]): string => {
  let message =
    '<header> tags should not be nested within any other random HTML tags for e.g, this is nested within <'
  tags.forEach((tag) => {
    message += tag + ' '
  })
  message += '> tags'

  return message
}

export const headerSemanticMessage: string =
  'The website does not use any <header> tag, it is recommended to use <header> tag to' +
  ' replace non-semantic elements like <div> which are used at the top level of website'

export const multipleHeaderErrorMessage: string =
  'It is recommended to have a single <header> tag at a section or body level, found multiple here'

// messages reagrding <footer> tag
export const footerParentMessage = (parent: string): string => {
  return (
    'A <footer> tag should not be wrapped around by any arbitrary element, it represents the ' +
    'main content of a section or body, here it was wrapped with a ' +
    parent +
    ' tag'
  )
}

export const multipleFooterMessage: string =
  'There are multiple instances of <footer> tag on the website, please review their needs' +
  ' as footer represents the end of the main-content of a section'

export const lastElementMessage = (element: string): string => {
  return (
    'A <footer> tag should be the last element of its corresponding parent, there is a <' +
    element +
    '> tag after the <footer> in this section'
  )
}

export const footerSemanticMessage: string =
  'The website does not use any <footer> tag, it is recommended to use <footer> tag to' +
  ' replace non-semantic elements like <div> which are used for bottom section of a page'

// messages regarding <section> tag
export const noChildSectionMessage: string =
  'A section element should be meaningful by standalone, this <section> element' +
  ' did not have any child, if you have direct text inside this, wrap them with <p> tags'

export const headingsInSectionMessage: string =
  '<section> tags represent a somewhat independent section of the whole content, it is expected' +
  ' to contain heading tags like <h1>, <h2> etc. which was missing here'

export const sectionParentMessage = (parent: string): string => {
  return (
    '<section> tag should be direct child of a generic container like <body> or <main>, but it was the child of <' +
    parent +
    '> tag here'
  )
}

export const sectionSemanticMessage: string =
  'The website does not use any <section> tag, it is recommended to use <section> tag for grouping' +
  ' related content or dividing a page into sections, consider replacing <div> with <section> if possible' +
  ''

// messages regarding <aside> tag
export const asideParentMessage = (parent: string): string => {
  return (
    'The <aside> element should be used to represent portions whose content is indirectly related to the ' +
    'main-content, it should be direct child of <body>, <main> or other generic tags, but here it was child of <' +
    parent +
    '>'
  )
}

export const validChildAsideParentMessage = (child: string): string => {
  return (
    'The <aside> element should be used to represent small content sideways to the main-content' +
    ' it is recommeded to have tags like images, texts, links etc, but this one had <' +
    child +
    '> tag as one of its children'
  )
}

export const asideSemanticMessage: string =
  'The website does not use any <aside> tag, it is recommended to use <aside> tag to' +
  ' replace non-semantic elements like <div> which are used for secondary content or sidebars'

// messages regarding <details> and <summary> element
export const summaryPresentInDetailsMessage: string =
  'The <details> tag should only be used for expandable content that is related to a specific element, ' +
  'it must have a <summary> tag, this element violates it'

export const summaryParentMessage: string =
  'The <summary> element should be used within a <details> element to provide a' +
  'summary or heading for the content that can be expanded or collapsed, ' +
  'here it was missing'

export const summaryValidByChildrenMessage: string =
  'The <summary> element should only contain phrasing content, which includes inline ' +
  'elements and text nodes. It should not contain block-level elements such as <div>, ' +
  '<p>, or other structural elements, as was the case here'

// messages regarding the <time> element
export const timeAttributeMessage: string =
  'The <time> tag should have a *datetime* attribute as it is used to translate the ' +
  'time into a machine-readable format so that browsers can offer to add date reminders ' +
  'through the calendar, and search engines can produce smarter search results, here it was missing'

export const timeSemanticMessage: string =
  'The website does not use any <time> tag, it is recommended to use <time> tag to' +
  ' replace non-semantic elements like <div> which are used for representing dates, times, or durations'

// message regarding the <nav> element
export const validParentNavMessage = (parent: string): string => {
  return (
    'The <nav> element is used to represent the primary navigation of the page, therefore ' +
    'should be direct child of generic containers like <body>, <main> etc, ' +
    'here it was wrapped with <' +
    parent +
    '> tag'
  )
}

export const navSemanticMessage: string =
  'The website does not use any <nav> tag, it is recommended to use <nav> tag to' +
  ' replace non-semantic elements like <div> which are used as a wrapper for links or menus'

export const validChildrenNavMessage = (child: string): string => {
  return (
    'The children of the <nav> element should be navigation-related elements, ' +
    'this tag violates it as it had <' +
    child +
    '> element as child'
  )
}

// messages reagarding the <figure> and <figcaption> elements
export const figcaptionPresentFigureMessage: string =
  'A <figure> tag is commonly used as a wrapper to the images or illustrations, ' +
  'and should contain the <figcaption> tag in it, here it is missing'

// message regarding children of figure tags
export const validChildrenFigureMessage = (tags: string[]): string => {
  let message: string =
    'A <figure> tag should be used to semantically represent images, and should not contain ' +
    'tags other than <img> and <figcaption>, this one has other tags like - '
  tags.map((tag: string) => {
    message += '<' + tag + '> '
  })
  return message
}

// message regarding missing datetime in time tag
export const dateTimeAttributeMissing =
  'This <time> tag had an invalid formatted *datetime* attribute'

export const figureSemanticMessage: string =
  'The website does not use any <figure> tag, it is recommended to use <figure> tag to' +
  ' replace non-semantic elements like <div> which are used for displaying images'

// messages for <site> elements
export const citeSemanticMessage: string =
  'The website does not use any <cite> tag, it is recommended to use <cite> tag to' +
  ' replace non-semantic elements like <span> which are used used to indicate work-title, author-name'

// messages for <address> elements
export const addressSemanticMessage: string =
  'The website does not use any <address> tag, it is recommended to use <address> tag to' +
  ' replace non-semantic elements like <div> and <span> which are used used for contact information.'

// messages for <br> and <hr> tags
export const brMessage: string =
  'The <br> element serves a purely presentational purpose, if you are using it purely for' +
  ' aesthetic reason, consider using css for controlling the layout and spacing of the elements'

export const hrMessage: string =
  'The <hr> tag is used to create a horizontal rule or a thematic break in the content, ' +
  'however it does not have a semantic meaning, consider using css border-styles for the same'

// messages regarding the <img> element
export const replaceImgByFigureMessage: string =
  'Consider repalcing this <img> element with a more semantic element like <figure> along with <figcaption>'

export const noImgAltPresentMessage: string =
  'The <img> elements should have an *alt* attribute present, they come in handy when the ' +
  'image fails to load or in cases of SEO and crawlers, this element did not have an *alt* attribute'

// regarding the use of deprecated html tags
export const deprecatedTagsMessage = (elementName: string): string => {
  let message = 'The <' + elementName + '> element is deprecated for use, '
  if (elementName === 'applet') {
    message +=
      'use alternative technologies like HTML5 Canvas or Web Components instead'
  } else if (elementName === 'frame') {
    message +=
      'use <iframe> or other modern techniques for including external content'
  } else if (elementName === 'frameset') {
    message +=
      'use alternative methods for dividing a document into frames, such as CSS layout techniques'
  } else if (elementName === 'noframe') {
    message +=
      'use alternative methods for providing content when frames are not supported or disabled'
  } else {
    message += 'use css styling to achieve the same functionality'
  }

  return message
}

// ragarding the <input> element
export const validInputMessage = (errorObj: ErrorObjectForInput): string => {
  let message = 'This <input> tag has a few attributes missing - '
  if (!errorObj.idPresent) {
    message += '"id" '
  }
  if (!errorObj.namePresent) {
    message += '"name" '
  }
  if (!errorObj.typePresent) {
    message += '"type" '
  }
  message += 'these attributes define the input clearly, please add them'

  return message
}

// message regarding the invalid form element
export const invalidFormMessage = (errorObj: ErrorObjectForForm): string => {
  let message = 'This <form> element had the following issues - '
  if (!errorObj.actionPresent) {
    message +=
      'it did not have a valid "action" method present, please consider adding it '
  }
  if (!errorObj.buttonPresent) {
    message += 'it also did not have a button or an input with type submit'
  }

  return message
}

// messages regarding the <audio> and <video> tags
export const noSourceMessage = (element: string): string =>
  'This <' +
  element +
  '> element did not have a source element specified, <source> elements are' +
  ' used to ensure compatability to different browsers so that it does not break'

export const noCaptionsMessage = (element: string): string =>
  'This <' +
  element +
  '> element did not have any captions included, it is recommended to include captions ' +
  'for non-text elements to improve accessibility, consider adding a <track> child'

export const wrongTrackPresent = (element: string): string =>
  'This <' +
  element +
  '> element did not have correct "kind" of track included, it is advised to' +
  ' include kind="subtitle" or kind="captions" in these non-text elements'

export const noFallbackGiven = (element: string): string =>
  'This <' +
  element +
  '> element did not provide any fallback support in case media did not load, it is' +
  ' recommended to include download options for e.g. with the non-text elements'
