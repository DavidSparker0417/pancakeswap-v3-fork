import { ChainId } from '@pancakeswap/chains'
import { GetContractReturnType, PublicClient, getContract, Address } from 'viem'

import { MULTICALL_ADDRESS, MULTICALL3_ADDRESSES, MULTICALL3_ADDRESS } from './constants/contracts'
import { iMulticallABI } from './abis/IMulticall'

type Params = {
  chainId: ChainId
  client?: PublicClient
}

export function getMulticallContract({
  chainId,
  client,
}: Params): GetContractReturnType<typeof iMulticallABI, PublicClient> {
  const address = MULTICALL_ADDRESS[chainId]
  console.log(`[DAVID] getMulticallContract :: chain=${chainId}, address=${address}`)
  if (!address) {
    throw new Error(`PancakeMulticall not supported on chain ${chainId}`)
  }

  return getContract({ abi: iMulticallABI, address, publicClient: client })
}

export function getMulticall3ContractAddress(chainId?: ChainId): Address {
  const mtcall=  MULTICALL3_ADDRESSES[chainId || ChainId.BSC] || MULTICALL3_ADDRESS
  console.log(`[DAVID] getMulticall3ContractAddress :: mtcall=${mtcall}`)
  return mtcall
}
