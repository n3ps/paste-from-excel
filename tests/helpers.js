// Until JSDOM supports `new ClipboardEvent('paste')`
export function createClipboardEvent (input) {
  const event = new Event('paste', { bubbles: true, cancelable: true })
  event.clipboardData = {
    getData () { return input }
  }
  return event
}

export function createTableHTML (rows, cols) {
  const result = ['table']
  for (let r = 1; r <= rows; r++) {
    result.push('<tr>')
    for (let c = 1; c <= cols; c++) {
      result.push(`<td><input id=${r}_${c}></td>`)
    }
    result.push('</tr>')
  }
  result.push('</table>')
  return result.join('')
}
