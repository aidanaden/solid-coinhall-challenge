import { NetworkMode } from '../enums'

export interface TokenData {
  address: string
  name: string
  ticker: string
  supply: number
  network: NetworkMode
  price?: number
}

export interface TokenInfoResponse {
  decimals: number
  name: string
  symbol: string
  total_supply: number
}
