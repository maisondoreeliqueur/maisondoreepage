import React from 'react'
import { Separator, SeparatorProps } from '../Separator'

export const SeparatorBlock: React.FC<SeparatorProps> = (props) => {
  return <Separator {...props} />
}

export { Separator }
export type { SeparatorProps }
export default SeparatorBlock
