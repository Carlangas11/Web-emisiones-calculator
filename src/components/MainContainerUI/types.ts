import { ReactNode } from 'react'

export type MainContainerProps = {
  children: ReactNode
  title?: string
  bg?: string
  fontSize?: string
  fontSizeSubtitle?: string
  rightSection?: JSX.Element
  subtitle?: string
}
