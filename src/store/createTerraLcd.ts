import { Coins, LCDClient } from '@terra-money/terra.js'

export default async function createTerraLcd(mode) {
  if (mode === 'testnet') {
    // Fetch gas prices and convert to `Coin` format.
    const gasPrices = await (
      await fetch('https://bombay-fcd.terra.dev/v1/txs/gas_prices')
    ).json()
    const gasPricesCoins = new Coins(gasPrices)

    const lcd = new LCDClient({
      URL: 'https://bombay-lcd.terra.dev/',
      chainID: 'bombay-12',
      gasPrices: gasPricesCoins,
      gasAdjustment: '1.5',
    })
    return lcd
  } else if (mode === 'mainnet') {
    const lcd = new LCDClient({
      URL: 'https://lcd.terra.dev',
      chainID: 'colombus-5',
    })
    return lcd
  }
}
