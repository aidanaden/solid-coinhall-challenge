import { For } from 'solid-js'
import { formatTokenSupply } from '../../functions'
import { TokenData } from '../../interfaces'
import DeleteButton from '../DeleteButton'

export default function index(props) {
  return (
    <div
      class="overflow-y-scroll max-h-[512px] 
      scrollbar-thumb-et-light-100 md:-mr-4
      scrollbar-track-et-dark-100 md:scrollbar-thumb-rounded
      md:scrollbar-thin md:scrollbar-thumb-et-light-100 md:pr-4
      md:scrollbar-thumb-rounded-lg text-gray-300"
    >
      <table class="table-normal w-full relative shadow-xl">
        <thead>
          <tr class="bg-et-dark-100 sticky top-0">
            <th></th>
            <th>Name</th>
            <th>Ticker</th>
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
