export interface TokenData {
  address: string
  name: string
  ticker: string
  supply: number
}

export interface TokenInfoResponse {
  decimals: number
  name: string
  symbol: string
  total_supply: number
}
