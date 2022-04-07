import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  Show,
} from 'solid-js'

import { ENTER_KEY } from './constants'
import createLocalStore from './store/createLocalStore'
import { TokenInfoResponse } from './interfaces'
import createTerraLcd from './store/createTerraLcd'
import TokenTable from './components/TokenTable'
import TokenGrid from './components/TokenGrid'
import GridButton from './components/GridButton'
import ListButton from './components/ListButton'
import ErrorAlert from './components/ErrorAlert'

const lcd = await createTerraLcd()

const App: Component = () => {
  const [displayModeList, setDisplayModeList] = createSignal(true)
  const [errorAlert, setErrorAlert] = createSignal('')
  const {
    state,
    addTokenToStorage,
    containsTokenAddress,
    removeTokenFromStorage,
  } = createLocalStore({
    tokens: [],
  })

  //add token addy data to local store
  const addToken = ({ target, keyCode }) => {
    const tokenAddy = target.value.trim()
    if (keyCode == ENTER_KEY && tokenAddy) {
      lcd.wasm
        .contractQuery(tokenAddy, { token_info: {} })
        .then((tokenInfoResponse: TokenInfoResponse) => {
          if (!containsTokenAddress(tokenAddy)) {
            addTokenToStorage(tokenInfoResponse, tokenAddy)
          } else {
            setErrorAlert('Token address has already been added!')
          }
        })
        .catch((err) => {
          setErrorAlert(`${err}!`)
        })

      target.value = ''
    }
  }

  // const getBalance = ({ target, keyCode }) => {
  //   const title = target.value.trim()
  //   if (keyCode == ENTER_KEY && title) {
  //     lcd.bank.balance(address).then((val) => {
  //       const [balance] = val
  //       balance.map((coin) => {
  //         console.log(coin.denom.slice(1))
  //         console.log(coin.mul(1 / 1000000).amount.toString())
  //       })
  //     })
  //     target.value = ''
  //   }
  // }

  createEffect(() => {
    console.log(errorAlert())
    const time = setTimeout(() => {
      setErrorAlert('')
    }, 3000)
    onCleanup(() => clearTimeout(time))
  })

  return (
    <main class="h-full min-h-[100vh]">
      <div
        class="max-w-2xl mx-auto text-center
        p-4 h-full min-h-[100vh] flex flex-col"
      >
        <div class="max-w-lg w-full mx-auto mb-8">
          <p
            class="text-2xl md:text-4xl text-center
            py-16 font-semibold text-gray-300"
          >
            Coinhall challenge
          </p>
          <input
            class="input w-full self-center input-bordered "
            placeholder="Enter address"
            onKeyDown={addToken}
          />
        </div>
        <div class="w-full text-right mb-3 flex flex-row space-x-2 justify-end">
          <ListButton
            onClick={() => setDisplayModeList(true)}
            disabled={displayModeList()}
          />
          <GridButton
            onClick={() => setDisplayModeList(false)}
            disabled={!displayModeList()}
          />
        </div>
        <Show
          when={state.tokens.length > 0 && displayModeList()}
          fallback={
            <TokenGrid
              removeTokenFromStorage={removeTokenFromStorage}
              tokens={state.tokens}
            />
          }
        >
          <TokenTable
            removeTokenFromStorage={removeTokenFromStorage}
            tokens={state.tokens}
          />
        </Show>
        <Show when={errorAlert() !== ''}>
          <ErrorAlert error={errorAlert()} when={errorAlert() !== ''} />
        </Show>
      </div>
    </main>
  )
}

export default App
