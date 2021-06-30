import parseCliboard from '../src/index.js'
import { createClipboardEvent, createTableHTML } from './helpers.js'

describe('Pasting', () => {
  it('inserts values', () => {
    const data = 'DATA'
    const table = document.createElement('table')
    table.innerHTML = '<tr><td><input></td></tr>'
    table.addEventListener('paste', parseCliboard)

    table.querySelector('input').dispatchEvent(createClipboardEvent(data))

    expect(table.querySelector('input').value).toEqual(data)
  })

  it('replaces existing values', () => {
    const data = 'NEW'
    const table = document.createElement('table')
    table.innerHTML = '<tr><td><input value="OLD"></td></tr>'
    table.addEventListener('paste', parseCliboard)

    table.querySelector('input').dispatchEvent(createClipboardEvent(data))

    expect(table.querySelector('input').value).toEqual(data)
  })

  it('populates exact cells', () => {
    const data = 'A1\tB1\nA2\tB2'
    const table = document.createElement('table')
    table.innerHTML = createTableHTML(2, 2)
    table.addEventListener('paste', parseCliboard)

    table.querySelector('input').dispatchEvent(createClipboardEvent(data))

    const inputs = table.querySelectorAll('input')
    expect(Array.from(inputs).map(i => i.value).join('')).toEqual('A1B1A2B2')
  })
})
