import { For } from 'solid-js'
import { formatNumerToString } from '../../../functions'
import TableContainer from '../TableContainer'

export default function index(props) {
  return (
    <TableContainer>
      <table class="table-normal w-full relative shadow-xl">
        <thead>
          <tr class="bg-et-dark-100 sticky top-0">
            <th></th>
            <th>Token</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody class="max-h-96 overflow-y-scroll">
          <For each={props.tokens}>
            {(tokenData: { token: string; amount: string }) => (
              <tr class="bg-et-light-100">
                <th>{props.tokens.indexOf(tokenData) + 1}</th>
                <td class="uppercase">{tokenData.token}</td>
                <td>{formatNumerToString(parseFloat(tokenData.amount))}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </TableContainer>
  )
}
