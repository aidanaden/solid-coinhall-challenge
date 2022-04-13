import { MAIN_PRICE_API } from '../constants'

export function formatNumerToString(tokenSupply: number): string {
  return tokenSupply.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function formatTokenPrice(tokenPrice: number): string {
  return `$${tokenPrice.toFixed(3)}`
}

export async function fetchTokenPrice(ticker: string) {
  const priceData = await fetch(`${MAIN_PRICE_API}${ticker}`)
  const priceJson = await priceData.json()
  const tokenPrice = priceJson['prices'][ticker]['price']
  return tokenPrice
}
