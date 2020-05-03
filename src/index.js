export default function parseCliboard (e, options) {
  const {
    rowSelector = 'tr',
    cellSelector = 'td',
    inputSelector = 'input'
  } = options || {}

  if (!e || !e.target || !e.clipboardData) return
  if (e.target.parentNode.querySelector(inputSelector) !== e.target) return

  let currentInput = e.target
  let currentCell = e.target.closest(cellSelector)
  let currentRow = e.target.closest(rowSelector)

  if (!currentCell | !currentRow) return

  e.preventDefault()
  const startIndex = Array.from(currentRow.querySelectorAll(cellSelector)).indexOf(currentCell)
  
  const data = parseData(e.clipboardData.getData('text/plain'))
  
  for (const row of data) {
    for (const value of row) {
      currentInput.contentEditable === 'true'
        ? currentInput.innerText = value
        : currentInput.value = value

      const inputEvent = new Event('input', { bubbles: true })
      currentInput.dispatchEvent(inputEvent)

      const blurEvent = new Event('blur', { bubbles: true })
      currentInput.dispatchEvent(blurEvent)

      // Column overflow
      currentCell = currentInput.closest(cellSelector)
      if (!currentCell || !currentCell.nextElementSibling) break

      // Non-input element
      currentInput = currentCell.nextElementSibling.querySelector(inputSelector)
      if (!currentInput) break
    }

    // Row overflow
    currentRow = currentRow.nextElementSibling
    if (!currentRow) break

    // Non-table cell element
    currentCell = currentRow.querySelectorAll(cellSelector)[startIndex]
    if (!currentCell) break

    // Non-input element
    currentInput = currentCell.querySelector(inputSelector)
    if (!currentInput) break
  }
}

function parseData (data) {
  return data.split(/\r\n|\n|\r/).map(row => row.split('\t'))
}
