import { createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import { LOCAL_STORAGE_KEY } from '../constants'
import { NetworkMode } from '../enums'
import { TokenData, TokenInfoResponse } from '../interfaces'

export interface LocalStoreParams {
  tokens: TokenData[]
}

export default function createLocalStore(value: LocalStoreParams) {
  // load stored todos on init
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
  const [state, setState] = createStore(stored ? JSON.parse(stored) : value)

  // JSON.stringify creates desps on every iterable field
  createEffect(() =>
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
  )

  const containsTokenAddress = (address: string, network: NetworkMode) => {
    return (
      state.tokens.filter(
        (t: TokenData) => t.address == address && t.network == network
      ).length !== 0
    )
  }

  const addTokenToStorage = (
    tokenInfoResponse: TokenInfoResponse,
    tokenAddress: string,
    network: NetworkMode,
    price?: number
  ) => {
    const tokenName = tokenInfoResponse.name
    const tokenTicker = tokenInfoResponse.symbol
    const tokenSupply =
      tokenInfoResponse.total_supply / Math.pow(10, tokenInfoResponse.decimals)

    const tokenData = {
      address: tokenAddress,
      name: tokenName,
      ticker: tokenTicker,
      supply: tokenSupply,
      network: network,
      price: price,
    }

    setState('tokens', (tokens) => [tokenData, ...tokens])
  }

  const removeTokenFromStorage = (address: string, network: NetworkMode) => {
    setState('tokens', (tokens) =>
      tokens.filter((t) => t.address !== address && t.network !== network)
    )
  }

  // const updateTokenFromStorage = (
  //   address: string,
  //   network: NetworkMode,
  //   updatedTokenData: TokenData
  // ) => {
  //   setState('tokens', (t) => t.address === address && t.network === network, {
  //     ...updatedTokenData,
  //   })
  // }

  const getModeToken = (network: NetworkMode) => {
    console.log('network: ', network)
    return state.tokens.filter((t) => t.network === network)
  }

  // const updateTokenPrice = (t: TokenData) => {
  //   fetchTokenPrice(t.ticker).then((tokenPrice) => {
  //     const updatedToken = { ...t, price: tokenPrice }
  //     console.log('updated token data: ', updatedToken)
  //     return updatedToken
  //   })
  // }

  const updateTokensByNetwork = (
    updatedTokens: TokenData[],
    network: NetworkMode
  ) => {
    setState('tokens', (tokens) => [
      ...tokens.filter((t) => t.network !== network),
      ...updatedTokens,
    ])
  }

  return {
    state,
    getModeToken,
    addTokenToStorage,
    containsTokenAddress,
    removeTokenFromStorage,
    updateTokensByNetwork,
  }
}
