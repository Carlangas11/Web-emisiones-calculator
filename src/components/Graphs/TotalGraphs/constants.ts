export const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const totaldata = context.dataset.data.reduce((a: number, b: number) => a + b)
          const percentage = ((context.parsed.y / totaldata) * 100).toFixed(2)
          return `${Number(context.parsed.y.toFixed()).toLocaleString()} tonCO2eq (${percentage}%)`
        }
      }
    }
  }
}

export const optionsPie = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem: any) => {
          const totaldata = tooltipItem.dataset.data.reduce((a: number, b: number) => a + b)
          const percentage = ((tooltipItem.parsed * 100) / totaldata).toFixed(2)
          return `${Number(tooltipItem.parsed.toFixed()).toLocaleString()} tonCO2eq (${percentage}%)`
        }
      }
    }
  }
}

export const headerTitle = [
  'TONCO2eq',
  'Alcance 1',
  'Alcance 2',
  'Alcance 3',
  'Total general'
]
