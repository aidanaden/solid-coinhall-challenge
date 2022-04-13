import { For, Show } from 'solid-js'
import { formatNumerToString, formatTokenPrice } from '../../../functions'
import { TokenData } from '../../../interfaces'
import DeleteButton from '../../DeleteButton'
import TableContainer from '../TableContainer'

export default function index(props) {
  return (
    <TableContainer>
      <table class="table-normal w-full relative shadow-xl">
        <thead>
          <tr class="bg-et-dark-100 sticky top-0">
            <th></th>
            <th>Name</th>
            <th>Ticker</th>
            <th>Price</th>
            <th>Supply</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="max-h-96 overflow-y-scroll">
          <For each={props.tokens}>
            {(tokenData: TokenData) => (
              <tr class="bg-et-light-100">
                <th>{props.tokens.indexOf(tokenData) + 1}</th>
                <td>{tokenData.name}</td>
                <td>{tokenData.ticker}</td>
                <Show when={tokenData.price} fallback={<td>?</td>}>
                  <td>{formatTokenPrice(tokenData.price)}</td>
                </Show>
                <td>{formatNumerToString(tokenData.supply)}</td>
                <td>
                  <DeleteButton
                    removeTokenFromStorage={props.removeTokenFromStorage}
                    address={tokenData.address}
                  />
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </TableContainer>
  )
}
