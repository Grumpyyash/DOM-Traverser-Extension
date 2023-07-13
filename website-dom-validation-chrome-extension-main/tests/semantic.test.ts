import {
  checkForHStructure,
  checkDivForReplacement,
  isArticleValidByParent,
  checkForValidChildren,
  checkFooterLastElement,
  checkHeaderForNesting,
} from '../src/ContentScript/semanticHelper'

import {
  isChildValidForAside,
  checkForSummaryInDetails,
  checkAttributeForTime,
  areNavChildrenValid,
  checkForValidInput,
  checkFormValidity,
  checkForAudioVideoChildren,
} from '../src/Helpers/generalSemanticHelpers'

// test for correct <h> structure
describe('test for proper <h> structure', () => {
  const wrapperDiv = document.createElement('div')
  const h1 = document.createElement('h1')
  const h2 = document.createElement('h2')
  wrapperDiv.appendChild(h1)
  wrapperDiv.appendChild(h2)
  test('the given div does follow correct order of headings', () => {
    expect(checkForHStructure(h1)).toBe(true)
  })
  test('the given div contradicts the correct order of headings, <h2> appears before new <h1>', () => {
    const newH1 = document.createElement('h1')
    wrapperDiv.appendChild(newH1)
    expect(checkForHStructure(newH1)).toBe(false)
  })
})

// test for a div which can be replaced as it only contained text and img elements
describe('test for checking if a <div> is replacable', () => {
  test('the <div> is only used as a wrapepr for texts and images, replace it with more semantic elements', () => {
    const wrapperDiv = document.createElement('div')
    const h1 = document.createElement('h1')
    const para1 = document.createElement('p')
    const para2 = document.createElement('p')
    const img1 = document.createElement('img')
    wrapperDiv.appendChild(h1)
    wrapperDiv.appendChild(para1)
    wrapperDiv.appendChild(img1)
    wrapperDiv.appendChild(para2)
    expect(checkDivForReplacement(wrapperDiv)).toBe(true)
  })
})

// test for a div which contains other than simple text elements
describe('test for checking if a <div> is replacable', () => {
  test('the <div> contains specific elements like - <form> etc, could be intenional', () => {
    const wrapperDiv = document.createElement('div')
    const h1 = document.createElement('h1')
    const form1 = document.createElement('form')
    wrapperDiv.appendChild(h1)
    wrapperDiv.appendChild(form1)
    expect(checkDivForReplacement(wrapperDiv)).toBe(false)
  })
})

// test for an <article> whose parent is <body> tag
describe('test for parent of an <article> tag', () => {
  const wrapperContainer = document.createElement('body')
  test('the <article> tag is a direct child of <body> and is valid', () => {
    const articleTag = document.createElement('article')
    wrapperContainer.appendChild(articleTag)
    expect(isArticleValidByParent(articleTag)).toEqual({
      isError: false,
      element: articleTag,
    })
  })
  test('the <article> tag is a direct child of <div> which is a contradiction', () => {
    const div1 = document.createElement('div')
    const articleTag2 = document.createElement('article')
    div1.appendChild(articleTag2)
    wrapperContainer.appendChild(div1)
    expect(isArticleValidByParent(articleTag2)).toEqual({
      isError: true,
      element: div1,
    })
  })
})

// test for a <main> tag whose children are <header> and <footer>
describe('test for the children of a <main> tag', () => {
  const main = document.createElement('main')
  test('this <main> tag contains <header> and <footer> as its children, which is invalid', () => {
    const header = document.createElement('header')
    const footer = document.createElement('footer')
    main.appendChild(header)
    main.appendChild(footer)
    expect(checkForValidChildren(main)).toEqual({
      isError: true,
      element: header,
    })
  })
  test('this <main> tag does not contain elements like <header> and <footer>', () => {
    const main2 = document.createElement('main')
    const h1 = document.createElement('h1')
    const section = document.createElement('section')
    main2.appendChild(h1)
    main2.appendChild(section)
    expect(checkForValidChildren(main2)).toEqual({
      isError: false,
      element: main2,
    })
  })
})

// test for nesting and valid parents of <header> tags
describe('test for nesting and valid parents of <header> tags', () => {
  const body = document.createElement('body')
  const main = document.createElement('main')
  const header = document.createElement('header')
  main.appendChild(header)
  body.appendChild(main)
  test('this <header> has no invalid nesting and its parent does not have multiple headers', () => {
    expect(checkHeaderForNesting(header)).toEqual({
      isError: false,
      tags: [],
      moreHeaders: false,
    })
  })
  test('this <header> has <div> as its parent which also has multiple headers', () => {
    const div = document.createElement('div')
    const header1 = document.createElement('header')
    const header2 = document.createElement('header')
    div.appendChild(header1)
    div.appendChild(header2)
    body.appendChild(div)
    expect(checkHeaderForNesting(header1)).toEqual({
      isError: true,
      tags: ['div'],
      moreHeaders: true,
    })
  })
})

// test for a <footer> tag which is the last element of the body
describe('test for the <footer> to be the last visual element of body', () => {
  const body = document.createElement('body')
  const footer = document.createElement('footer')
  const script = document.createElement('script')
  body.appendChild(footer)
  body.appendChild(script)
  test('this <footer> is the last visual element of the <body>, it may contain <style> or <script> tag', () => {
    expect(checkFooterLastElement(footer)).toEqual({
      isLast: true,
      elementName: '',
    })
  })
  test('this <footer> tag conatins a <div> after it, which is not standard', () => {
    const div = document.createElement('div')
    body.appendChild(footer)
    body.appendChild(div)
    expect(checkFooterLastElement(footer)).toEqual({
      isLast: false,
      elementName: 'div',
    })
  })
})

// test for an <aside> tag to have valid children like - <a>, <li>, <p>
describe('test for the <aside> to have valid children', () => {
  const aside = document.createElement('aside')
  const para = document.createElement('p')
  const a = document.createElement('a')
  aside.appendChild(para)
  aside.appendChild(a)
  test('this <aside> element has valid children, <a> and <p>', () => {
    expect(isChildValidForAside(aside)).toEqual({
      isError: false,
      element: aside,
    })
  })
  test('this <aside> element has invalid child as <nav>, which is not recommended', () => {
    const nav = document.createElement('nav')
    aside.appendChild(nav)
    expect(isChildValidForAside(aside)).toEqual({
      isError: true,
      element: nav,
    })
  })
})

// test for the presence of <summary> tag in <details> tag
describe('test for the <details> tag to have a <summary> child', () => {
  test('this <details> tag does not have a <summary> tag as its child', () => {
    const details = document.createElement('details')
    const para = document.createElement('p')
    details.appendChild(para)
    expect(checkForSummaryInDetails(details)).toBe(false)
  })
})

// test for the <time> tag to contain a valid datetime attribute
describe('test for the presence of a valid datetime attribute in <time>', () => {
  test('this <time> tag has a datetime attribute but it is not valid', () => {
    const time = document.createElement('time')
    time.setAttribute('datetime', 'random_string')
    expect(checkAttributeForTime(time)).toEqual({
      isAttributePresent: true,
      isAttributeValid: false,
    })
  })
})

// test for children of <nav> elements, they should be navigation related
describe('test for the children of <nav> elements', () => {
  test('this <nav> element has a <div> and a <span> tag, which is not recommended', () => {
    const span = document.createElement('span')
    const div = document.createElement('div')
    const nav = document.createElement('nav')
    nav.appendChild(span)
    nav.appendChild(div)
    expect(areNavChildrenValid(nav)).toEqual({
      isError: true,
      element: span,
    })
  })
})

// test for the correct format of <input> tags
describe('test for the correct usage and attributes of <input> tag', () => {
  const input = document.createElement('input')
  input.setAttribute('name', 'name')
  test('this <input> tag has a name but misses a type and id attribute', () => {
    expect(checkForValidInput(input)).toEqual({
      isError: true,
      typePresent: false,
      namePresent: true,
      idPresent: false,
    })
  })
  test('this <input> tag has all of the three attributes', () => {
    input.setAttribute('type', 'text')
    input.setAttribute('id', 'input1')
    expect(checkForValidInput(input)).toEqual({
      isError: false,
      typePresent: true,
      namePresent: true,
      idPresent: true,
    })
  })
})

// test for a <form> element to contain action attribute and a submit option
describe('test for the correct use of <form> element', () => {
  const form = document.createElement('form')
  form.setAttribute('action', '/')
  const input1 = document.createElement('input')
  const input2 = document.createElement('input')
  form.appendChild(input1)
  form.appendChild(input2)
  test('this <form> has an action attribute but lacks a submit option', () => {
    expect(checkFormValidity(form)).toEqual({
      isError: true,
      actionPresent: true,
      buttonPresent: false,
    })
  })
  test('this <form> has both action attribute and a submit option', () => {
    input1.setAttribute('type', 'submit')
    expect(checkFormValidity(form)).toEqual({
      isError: false,
      actionPresent: true,
      buttonPresent: true,
    })
  })
})

// test for presence of proper attributes in non-text elements
describe('test for presence of mandatory attributes in non-text elements', () => {
  const audio = document.createElement('audio')
  const source = document.createElement('source')
  audio.appendChild(source)
  test('this <audio> tag has a <source> present but misses <track> and fallback support', () => {
    expect(checkForAudioVideoChildren(audio)).toEqual({
      sourcePresent: true,
      trackPresent: false,
      anchorPresent: false,
      trackKindCorrect: false,
    })
  })
  test('this <audio> tag has <source>, <track>, track-kind and fallback support provided', () => {
    const track = document.createElement('track')
    track.setAttribute('kind', 'captions')
    const anchorSupport = document.createElement('a')
    audio.appendChild(track)
    audio.appendChild(anchorSupport)
    expect(checkForAudioVideoChildren(audio)).toEqual({
      sourcePresent: true,
      trackPresent: true,
      anchorPresent: true,
      trackKindCorrect: true,
    })
  })
})
