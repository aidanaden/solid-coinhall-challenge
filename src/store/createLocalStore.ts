import { createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import { LOCAL_STORAGE_KEY } from '../constants'
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

  const containsTokenAddress = (address: string) => {
    return (
      state.tokens.filter((t: TokenData) => t.address == address).length !== 0
    )
  }

  const addTokenToStorage = (
    tokenInfoResponse: TokenInfoResponse,
    tokenAddress: string
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
    }

    setState('tokens', (tokens) => [tokenData, ...tokens])
  }

  const removeTokenFromStorage = (address: string) => {
    setState('tokens', (tokens) => tokens.filter((t) => t.address !== address))
  }

  return {
    state,
    addTokenToStorage,
    containsTokenAddress,
    removeTokenFromStorage,
  }
}
