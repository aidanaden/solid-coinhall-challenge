import { For } from 'solid-js'
import { formatTokenSupply } from '../../functions'
import { TokenData } from '../../interfaces'
import DeleteButton from '../DeleteButton'

export default function index(props) {
  return (
    <div class="overflow-x-auto mb-4">
      <table class="table table-compact w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Ticker</th>
            <th>Supply</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <For each={props.tokens}>
            {(tokenData: TokenData) => (
              <tr>
                <th>{props.tokens.indexOf(tokenData) + 1}</th>
                <td>{tokenData.name}</td>
                <td>{tokenData.ticker}</td>
                <td>{formatTokenSupply(tokenData.supply)}</td>
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
    </div>
  )
}
