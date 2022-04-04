import { Icon } from 'solid-heroicons'
import { viewList } from 'solid-heroicons/solid'

export default function index(props) {
  return (
    <button class="iconBtn" onClick={props.onClick} disabled={props.disabled}>
      <Icon path={viewList} class="w-5 h-5" />
    </button>
  )
}
