export default function index(props) {
  return (
    <div
      class="overflow-y-scroll max-h-[512px] 
      scrollbar-thumb-et-light-100 md:-mr-4 md:-mb-4
      scrollbar-track-et-dark-100 md:scrollbar-thumb-rounded
      md:scrollbar-thin md:scrollbar-thumb-et-light-100 md:pr-4
      md:scrollbar-thumb-rounded-lg text-gray-300"
    >
      {props.children}
    </div>
  )
}
