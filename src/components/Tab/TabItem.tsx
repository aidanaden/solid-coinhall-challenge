export default function TabItem(props) {
  return (
    <button
      class={`tab-md px-2 justify-center transition-all
              duration-150 ease-in rounded-md ${
                props.condition() ? 'bg-et-light-100' : ''
              }`}
      onClick={props.setCondition}
    >
      {props.children}
    </button>
  )
}
