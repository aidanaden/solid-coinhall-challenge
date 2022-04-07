import DeleteButton from '../DeleteButton'

export default function TokenCard(props) {
  return (
    <div
      class="rounded-lg bg-et-light-100 p-4 flex flex-row
    justify-between text-left transition-all duration-250
    hover:scale-105 group hover:cursor-pointer group-hover:cursor-pointer"
    >
      <div class="flex flex-col justify-between">
        <label class="text-2xl line-clamp-2 font-bold mb-2">{props.name}</label>
        <label class="text-xs">${props.ticker}</label>
      </div>
      <div class="flex flex-col justify-between space-y-2">
        <DeleteButton
          removeTokenFromStorage={props.removeTokenFromStorage}
          address={props.address}
        />
        <div class="flex flex-col">
          <label class="uppercase text-xs text-et-info-100 text-right">
            supply:
          </label>
          <label class="text-xs">{props.supply}</label>
        </div>
      </div>
    </div>
  )
}
