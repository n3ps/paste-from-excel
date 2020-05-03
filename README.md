# paste-from-excel

Utility to allow pasting data intact from Excel (or any spreadsheet) into an HTML table with editable elements.

Requires a table with input elements or elements with contenteditable set to true.

## Install
```
npm install paste-from-excel
```

## Usage with libraries

### Material UI \<Table\>
```jsx
import parse from 'paste-from-excel'

const handlePaste = (e) => {
  return parse(e)
}

return (
  <TableContainer onPaste={ handlePaste }>
    <Table>
    /* TableCells with inputs */
    </Table>
  </TableContainer>
)
```

### React-Table
```jsx
import parse from 'paste-from-excel'

const handlePaste = (e) => {
  const options = {
    rowSelector: '.rt-tr-group',
    cellSelector: '.rt-td'
  }

  return parse(e, options)
}

return (
  <div onPaste={ handlePaste }>
    <ReactTable
      data={data}
      columns={columns}
    />
  </div>
)
```

## Usage with plain HTML
```html
<script src="https://cdn.jsdelivr.com/gh/n3ps/paste-from-excel/dist/paste-from-excel.min.js">

<table id="my-table">
  <tr>
    <td><input /></td>
    <td><input /></td>
  </tr>
</table>

<script>
  var myTable = document.querySelector('#my-table')
  myTable.addEventListener('paste', handlePaste)

  function handlePaste (e) {
    return window.PasteFromExcel(e)
  }
</script>
```

### Options

rowSelector
- Sets the selector to identify a "row". Default: `tr`

cellSelector
- Sets the selector to identify a "cell". Default: `td`

inputSelector
- Sets the selector for the element that act on the paste event, and to find suceeding "editable elements". Default: `input`
