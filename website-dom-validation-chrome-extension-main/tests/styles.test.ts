import {
  convertPixelStringToNumber,
  convertValueToPixels,
} from '../src/Common/utility'

import {
  convertValueArraysToPixels,
  checkForDifferentUnits,
  getRgbFromHex,
  getRgbaForColor,
  checkForBorderColor,
} from '../src/ContentScript/stylesHelper'

// test for converting a pixel string to number value of pixel
describe('test for converting pixel string to pixel value in number', () => {
  test('the value of "25px" in number is 25', () => {
    const pixelStr = '25px'
    expect(convertPixelStringToNumber(pixelStr)).toBe(25)
  })
  test('the value of "string" is NaN', () => {
    const pixelStr = 'random_string'
    expect(convertPixelStringToNumber(pixelStr)).toBeNaN()
  })
})

// test for converting a random length unit to its corresponding pixel value
describe('test for converting a length unit to corresponding pixel value', () => {
  const dummyElement = document.createElement('div')
  test('the value of "30px" is 30', () => {
    const length = '30px'
    expect(convertValueToPixels(dummyElement, length)).toBe(30)
  })
  test('the value of "2rem" is 32', () => {
    const length = '2rem'
    expect(convertValueToPixels(dummyElement, length)).toBe(32)
  })
  test('the value of a random string "randomrem" is 0 as it gives NaN', () => {
    const length = 'randomrem'
    expect(convertValueToPixels(dummyElement, length)).toBe(0)
  })
  test('the value of "2em" with parents font-size as 12px gives 24', () => {
    const h1 = document.createElement('h1')
    const div = document.createElement('div')
    div.style.fontSize = '12px'
    div.appendChild(h1)
    const length = '2em'
    expect(convertValueToPixels(h1, length)).toBe(24)
  })
  test('the value of "0" is 0', () => {
    const length = '0'
    expect(convertValueToPixels(dummyElement, length)).toBe(0)
  })
  test('the value of "29.37" is 29.37', () => {
    const length = '29.37'
    expect(convertValueToPixels(dummyElement, length)).toBeCloseTo(29.37, 2)
  })
})

// test for converting the array of length units into pixel values
describe('test for converting a length unit array into pixel values', () => {
  const valueArray = ['20px', '1rem', '3em', '0', '12.93px']
  const h1 = document.createElement('h1')
  const div = document.createElement('div')
  div.style.fontSize = '10px'
  div.appendChild(h1)
  test('the value in pixel for the value array is [20, 16, 30, 0, 12.93]', () => {
    expect(convertValueArraysToPixels(h1, valueArray)).toEqual([
      20, 16, 30, 0, 12.93,
    ])
  })
})

// test for checking if a given length unit value belongs to an allowed array
describe('test for checking if a length unit value belongs to an allowed array', () => {
  let allowedValues = ['10', '20', '30', '40', '50']
  const h1 = document.createElement('h1')
  const div = document.createElement('div')
  div.style.fontSize = '10px'
  div.appendChild(h1)
  test('a unit of "20px" lies in the allowed array', () => {
    const length = '20px'
    expect(checkForDifferentUnits(h1, length, allowedValues)).toBe(true)
  })
  test('a unit of "20%" has to be exactly in the allowed values to be true', () => {
    const length = '20%'
    allowedValues = ['10', '20%', '2rem', '4em']
    expect(checkForDifferentUnits(h1, length, allowedValues)).toBe(true)
  })
  test('a "20%" length unit is not present in the allowed values', () => {
    const length = '20%'
    allowedValues = ['10', '20px', '2rem', '4em']
    expect(checkForDifferentUnits(h1, length, allowedValues)).toBe(false)
  })
  test('a unit of "auto" often used for margins and paddings has to be exactly in the allowed values to be true', () => {
    const length = 'normal'
    allowedValues = ['10', '20%', '2rem', '4em']
    expect(checkForDifferentUnits(h1, length, allowedValues)).toBe(false)
  })
  test('a "3rem" length unit corresponds to 48px', () => {
    const length = '3rem'
    allowedValues = ['10', '20px', '2rem', '4em', '48px']
    expect(checkForDifferentUnits(h1, length, allowedValues)).toBe(true)
  })
  test('a "2em" length unit corresponds to 20px as parent div has font-size of 10px', () => {
    const length = '3rem'
    allowedValues = ['10', '20px', '2rem', '4em', '48px']
    expect(checkForDifferentUnits(h1, length, allowedValues)).toBe(true)
  })
})

// test the values of converting a hex code color to rgb string
describe('convert a hex code color to rgb string', () => {
  test('the rgb string for "#7f11e0" is "rgb(127, 17, 224)"', () => {
    const hex = '#7f11e0'
    expect(getRgbFromHex(hex)).toEqual({
      red: 127,
      green: 17,
      blue: 224,
      opacity: 1,
    })
  })
  test('the rgb string for "#6f21c0cd" is "rgba(111, 33, 192, 0.8)"', () => {
    const hex = '#6f21c0cd'
    expect(getRgbFromHex(hex)).toEqual({
      red: 111,
      green: 33,
      blue: 192,
      opacity: 0.8,
    })
  })
})

// test the conversion of a color from rgba string to the rgba object of key-value
describe('test the conversion of an rgba-string to the rgba object for computation', () => {
  test('the rgba value object for certain rgba string is', () => {
    const rgbaString = 'rgba(111, 33, 192, 0.8)'
    expect(getRgbaForColor(rgbaString)).toEqual({
      red: 111,
      green: 33,
      blue: 192,
      opacity: 0.8,
    })
  })
  test('the rgba value object for certain rgba string without opacity is', () => {
    const rgbaString = 'rgba(111, 33, 192)'
    expect(getRgbaForColor(rgbaString)).toEqual({
      red: 111,
      green: 33,
      blue: 192,
      opacity: 1,
    })
  })
})

// test if a color lies in the allowed colors array if checking for border
describe('test if certain border color lies in the allowed colors array', () => {
  const div = document.createElement('div')
  const allowedColors = [
    '#3352FF',
    '#33FF3F',
    '#33FFD4',
    'var(--spr-ui-06, #E6E6E9)',
    'var(--spr-ui-focus-reverse, rgba(255, 255, 255, 0.2))',
  ]
  div.style.color = 'rgba(51, 82, 255, 1)'
  test('the border color of this <div> is same as currentcolor, so there is no error', () => {
    div.style.border = '2px solid rgba(51, 82, 255, 1)'
    expect(
      checkForBorderColor(div, 'rgba(51, 82, 255, 1)', allowedColors)
    ).toBe(false)
  })
  test('the border color of this <div> is "var(--spr-ui-06, #E6E6E9)", which should give no error', () => {
    div.style.border = '2px solid var(--spr-ui-06, #E6E6E9)'
    expect(
      checkForBorderColor(div, 'rgba(230, 230, 233, 1)', allowedColors)
    ).toBe(false)
  })
  test('the border color of this <div> is "rgba(0, 0, 0, 0)", which by default gives no error', () => {
    div.style.border = '2px solid rgba(0, 0, 0, 0)'
    expect(checkForBorderColor(div, 'rgba(0, 0, 0, 0)', allowedColors)).toBe(
      false
    )
  })
  test('the border color of this <div> is "var(--spr-ui-focus-reverse, rgba(255, 255, 255, 0.2))", which is correct', () => {
    div.style.border =
      '2px solid var(--spr-ui-focus-reverse, rgba(255, 255, 255, 0.2))'
    expect(
      checkForBorderColor(div, 'rgba(255, 255, 255, 0.2)', allowedColors)
    ).toBe(false)
  })
})
