import * as XLSX from 'xlsx'

// type  jsonType = {
//     Alcance: string
//     Nivel 2: string
// }

export const excelToJson = (file: File, setExcel: (excel: any) => void) => {
  const reader = new FileReader()

  reader.readAsArrayBuffer(file)
  reader.onloadend = e => {
    const data = new Uint8Array(e?.target?.result as unknown as ArrayBuffer)
    const wb = XLSX.read(data, { type: 'array' })

    const excel = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
      raw: true
    })

    setExcel(excel)
  }
}
