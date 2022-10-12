export const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Emisiones por alcance'
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
      text: 'Emisiones por área'
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
