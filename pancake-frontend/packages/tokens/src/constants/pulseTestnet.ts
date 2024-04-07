import { ChainId } from '@pancakeswap/chains'
import { WETH9 } from '@pancakeswap/sdk'
import { USDC, USDT } from './common'

export const pulseTestnetTokens = {
  weth: WETH9[ChainId.PULSE_TESTNET],
  usdc: USDC[ChainId.PULSE_TESTNET],
  usdt: USDT[ChainId.PULSE_TESTNET],
}
