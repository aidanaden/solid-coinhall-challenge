import { For } from 'solid-js'
import { formatNumerToString, formatTokenPrice } from '../../functions'
import { TokenData } from '../../interfaces'
import TokenCard from './TokenCard'

export default function index(props) {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <For each={props.tokens}>
        {(tokenData: TokenData) => (
          <TokenCard
            name={tokenData.name}
            ticker={tokenData.ticker}
            price={tokenData.price ? formatTokenPrice(tokenData.price) : '?'}
            supply={formatNumerToString(tokenData.supply)}
            removeTokenFromStorage={props.removeTokenFromStorage}
            address={tokenData.address}
          />
        )}
      </For>
    </div>
  )
}
