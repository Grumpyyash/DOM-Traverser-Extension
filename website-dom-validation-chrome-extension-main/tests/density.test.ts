import {
  checkForButtonSpacing,
  checkForHeaderDensity,
  checkForHeaderRowSpacing,
} from '../src/ContentScript/densityHelper'
import {
  createDivForErrorMessages,
  convertValueToPixels,
} from '../src/Common/utility'
import { spaciousDensityParam } from '../src/Common/utility'

jest.mock('../src/Common/utility')

describe('the checkForButtonSpacing function', () => {
  const button1 = document.createElement('button')
  button1.textContent = 'Button'
  button1.style.position = 'absolute'
  button1.style.left = '10px'
  button1.style.top = '10px'

  test('does not call the convertValueToPixels function as return early because of no button sibling', () => {
    checkForButtonSpacing(button1, spaciousDensityParam)
    expect(convertValueToPixels).toHaveBeenCalledTimes(0)
  })

  const button2 = document.createElement('button')
  button1.textContent = 'Button'
  button1.style.position = 'absolute'
  button1.style.left = '40px'
  button1.style.top = '40px'

  test('calls the convertValueToPixels as it has a button element as sibling', () => {
    const div = document.createElement('div')
    div.appendChild(button1)
    div.appendChild(button2)

    checkForButtonSpacing(button1, spaciousDensityParam)
    expect(convertValueToPixels).toHaveBeenCalledWith(
      button1,
      spaciousDensityParam.buttonSpacing
    )
  })
})

describe('the checkForHeaderDensity function', () => {
  const header = document.createElement('header')
  test('does not fall into createDivForErrorMessages block as the config is correct', () => {
    checkForHeaderDensity(header, {
      buttonSpacing: '10px',
      headerAndMainSpacing: '20px',
      headerRowSlotsSpacing: '30px',
      headerRowSpacing: '40px',
    })
    expect(createDivForErrorMessages).toBeCalledTimes(0)
  })
})

describe('the checkForHeaderRowSpacing function', () => {
  const rowElement = document.createElement('div')
  rowElement.textContent = 'This is the first row in header'
  test('does not call convertValueToPixels function as it has no next header-row sibling', () => {
    checkForHeaderRowSpacing(rowElement, {
      buttonSpacing: '10px',
      headerAndMainSpacing: '20px',
      headerRowSlotsSpacing: '15px',
      headerRowSpacing: '10px',
    })
    // total count of call is 1 because it gets called above in one of the tests
    expect(convertValueToPixels).toHaveBeenCalledTimes(1)
  })

  const nextRowElement = document.createElement('div')
  nextRowElement.textContent = 'This is the second row in header'

  const div = document.createElement('div')

  test('calls convertValueToPixels function as it has a next sibling element', () => {
    div.appendChild(rowElement)
    div.appendChild(nextRowElement)
    checkForHeaderRowSpacing(rowElement, {
      buttonSpacing: '10px',
      headerAndMainSpacing: '20px',
      headerRowSlotsSpacing: '15px',
      headerRowSpacing: '10px',
    })
    // total count of call becomes 2 because it gets called above in one of the tests
    expect(convertValueToPixels).toHaveBeenCalledTimes(2)
  })
})
