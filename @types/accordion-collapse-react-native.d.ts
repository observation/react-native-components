declare module 'accordion-collapse-react-native' {
  import { TouchableOpacityProps } from 'react-native'

  type CollapseProps = {
    isExpanded: boolean
    disabled?: boolean
    onToggle: (isExpanded: boolean) => void
    handleLongPress?: () => void
    touchableOpacityProps?: TouchableOpacityProps
    children?: React.ReactNode
  }
  const Collapse = (_props: CollapseProps) => React.ReactNode

  type CollapseHeaderProps = {
    children?: React.ReactNode
  }
  const CollapseHeader = (_props: CollapseHeaderProps) => React.ReactNode

  type CollapseBodyProps = {
    children?: React.ReactNode
  }
  const CollapseBody = (_props: CollapseBodyProps) => React.ReactNode

  export { Collapse, CollapseHeader, CollapseBody }
}
