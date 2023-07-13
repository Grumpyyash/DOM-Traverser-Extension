import { checkForDiv } from '../src/ContentScript/checkElements'
import { checkForFormInDiv } from '../src/ContentScript/semanticHelper'

jest.mock('../src/ContentScript/semanticHelper')

describe('checkForDiv calls', () => {
  test('the checkForFormInDiv function', () => {
    const div = document.createElement('div')
    checkForDiv(div, 0)
    expect(checkForFormInDiv).toBeCalledWith(div)
  })
})
