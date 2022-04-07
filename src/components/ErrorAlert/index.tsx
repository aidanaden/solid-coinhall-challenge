export default function index(props) {
  return (
    <div
      class={`alert alert-error rounded-lg text-sm sticky bottom-4
      mt-4 lg:mt-8 block transition duration-500 opacity-100 hidden:opacity-0
      w-full self-center z-10 md:max-w-lg mx-auto`}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{props.error}</span>
      </div>
    </div>
  )
}
