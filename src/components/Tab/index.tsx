export default function index(props) {
  return (
    <div
      class="tabs tabs-boxed px-1 space-x-1
          border-et-info-100/40 border-[2px] rounded-lg
          bg-transparent justify-center align-middle"
    >
      <button
        class={`tab-md px-2 justify-center transition-all
              duration-150 ease-in rounded-md capitalize font-semibold ${
                props.condition() ? 'bg-et-light-100' : 'text-et-info-100/60'
              }`}
        onClick={() => props.setCondition(true)}
      >
        token
      </button>
      <button
        class={`tab-md px-2 justify-center transition-all
              duration-150 ease-in rounded-md capitalize font-semibold ${
                !props.condition() ? 'bg-et-light-100' : 'text-et-info-100/60'
              }`}
        onClick={() => props.setCondition(false)}
      >
        wallet
      </button>
    </div>
  )
}
