import DeleteButton from '../DeleteButton'

export default function TokenCard(props) {
  return (
    <div
      class="rounded-lg bg-et-light-100 p-4 flex flex-row
    justify-between text-left transition-all duration-250 text-gray-400
    hover:scale-105 group hover:cursor-pointer"
    >
      <div class="flex flex-col justify-between">
        <h3 class="text-xl line-clamp-2 font-bold mb-2 text-gray-100">
          {props.name}
        </h3>
        <p class="text-xs font-semibold">${props.ticker}</p>
      </div>
      <div class="flex flex-col justify-between space-y-2">
        <DeleteButton
          removeTokenFromStorage={props.removeTokenFromStorage}
          address={props.address}
        />
        <div class="flex flex-col">
          <p class="uppercase text-xs text-et-info-100 text-right">supply:</p>
          <p class="text-xs">{props.supply}</p>
        </div>
      </div>
    </div>
  )
}
