import { config } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";


const customTokens = {
  ...config.tokens,
  color: {
    ...config.tokens.color,
    propifyRed: '#ff1a1a',
    propifyRedDark: '#cc0000',
    propifyMuted: '#cc9999',
    propifySubtle: '#bb8c8c',
    propifyFaint: '#663333',
    propifyBg: '#110000',
    propifyBgDark: '#0a0000',
  },
}
const tamaguiConfig = createTamagui({ ...config,tokens: customTokens });

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
export { tamaguiConfig };