import { defaultConfig } from '@tamagui/config/v5'
import { createTamagui ,createTokens} from 'tamagui'

const tokens = createTokens({
  size: {
    sm: 8,
    md: 16,
    lg: 24,
  },
  space: {
    sm: 8,
    md: 16,
    lg: 24,
  },
})
export const tamaguiConfig = createTamagui({defaultConfig, tokens})

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}


export default tamaguiConfig