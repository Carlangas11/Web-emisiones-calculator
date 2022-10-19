export const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Alcance 3'
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
    title: {
      display: true,
      text: 'Alcance 3'
    }
  }
}
