import {
  Component,
  createEffect,
  createResource,
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
import Tab from './components/Tab'
import { NetworkMode } from './enums'

const App: Component = () => {
  const [networkMode, setNetworkMode] = createSignal(NetworkMode.TEST)
  const [lcd, { refetch }] = createResource(async () => {
    console.log('getting resource!')
    return await createTerraLcd(networkMode())
  })
  const [addressModeToken, setAddressModeToken] = createSignal(true)
  const [displayModeList, setDisplayModeList] = createSignal(true)
  const [errorAlert, setErrorAlert] = createSignal('')
  const {
    state,
    getModeToken,
    addTokenToStorage,
    containsTokenAddress,
    removeTokenFromStorage,
  } = createLocalStore({
    tokens: [],
  })

  const handleSearch = ({ target, keyCode }) => {
    if (addressModeToken()) {
      addToken({ target, keyCode })
    } else {
      addWalletAddress({ target, keyCode })
    }
  }

  //add token addy data to local store
  const addToken = ({ target, keyCode }) => {
    const tokenAddy = target.value.trim()
    if (keyCode == ENTER_KEY && tokenAddy) {
      lcd()
        .wasm.contractQuery(tokenAddy, { token_info: {} })
        .then((tokenInfoResponse: TokenInfoResponse) => {
          if (!containsTokenAddress(tokenAddy, networkMode())) {
            addTokenToStorage(tokenInfoResponse, tokenAddy, networkMode())
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

  const addWalletAddress = ({ target, keyCode }) => {
    const walletAddress = target.value.trim()
    if (keyCode == ENTER_KEY && walletAddress) {
      lcd()
        .bank.balance(walletAddress)
        .then((val) => {
          const [balance] = val
          balance.map((coin) => {
            console.log(coin.denom.slice(1))
            console.log(coin.mul(1 / 1000000).amount.toString())
          })
        })
        .catch((err) => {
          setErrorAlert(`${err}!`)
        })
      target.value = ''
    }
  }

  const handleNetworkChange = (e) => {
    const newNetworkMode = e.target.value
    console.log('network value changed to: ', newNetworkMode)
    setNetworkMode(newNetworkMode)
  }

  createEffect(() => {
    console.log(errorAlert())
    const time = setTimeout(() => {
      setErrorAlert('')
    }, 3000)
    onCleanup(() => clearTimeout(time))
  })

  createEffect(() => {
    networkMode()
    refetch()
  })

  return (
    <main class="h-full min-h-[100vh]">
      <div
        class="max-w-2xl mx-auto text-center
        p-4 h-full min-h-[100vh] flex flex-col"
      >
        <div class="max-w-lg w-full mx-auto mb-12">
          <p
            class="text-2xl md:text-4xl text-center
            py-16 font-semibold text-gray-300"
          >
            Coinhall challenge
          </p>
          <div class="flex flex-row space-x-2">
            <input
              class="input w-full self-center input-bordered "
              placeholder="Enter address"
              onKeyDown={handleSearch}
            />
            <select
              value={networkMode()}
              class="select select-bordered max-w-xs"
              onChange={handleNetworkChange}
            >
              <option selected>{NetworkMode.TEST}</option>
              <option>{NetworkMode.MAIN}</option>
            </select>
          </div>
        </div>
        <div class="w-full mb-3 flex flex-row justify-between ">
          <Tab
            condition={addressModeToken}
            setCondition={setAddressModeToken}
          />
          <div class="text-right flex flex-row space-x-2 justify-end">
            <ListButton
              onClick={() => setDisplayModeList(true)}
              disabled={displayModeList()}
            />
            <GridButton
              onClick={() => setDisplayModeList(false)}
              disabled={!displayModeList()}
            />
          </div>
        </div>
        <Show
          when={state.tokens.length > 0 && displayModeList()}
          fallback={
            <TokenGrid
              removeTokenFromStorage={removeTokenFromStorage}
              tokens={getModeToken(networkMode())}
            />
          }
        >
          <TokenTable
            removeTokenFromStorage={removeTokenFromStorage}
            tokens={getModeToken(networkMode())}
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
