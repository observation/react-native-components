import React from 'react'
import { View } from 'react-native'

import Pets from '../assets/pets.svg'
import Potplants from '../assets/potplants.svg'
import Selfies from '../assets/selfies.svg'
import Slash from '../assets/slash.svg'
import Log from '../lib/Log'
import theme from '../styles/theme'

type Props = {
  type: 'no_pets' | 'no_potplants' | 'no_selfies'
}

const width = 60
const height = 48

const Pictogram = ({ type }: Props) => {
  Log.debug('Pictogram', type)
  return (
    <View>
      {type === 'no_pets' && <Pets width={width} height={height} />}
      {type === 'no_potplants' && <Potplants width={width} height={height} />}
      {type === 'no_selfies' && <Selfies width={width} height={height} />}
      <Slash width={width} height={height} style={theme.absolute} />
    </View>
  )
}

export default Pictogram
