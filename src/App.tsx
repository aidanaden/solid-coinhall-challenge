import {
  Component,
  createEffect,
  createResource,
  createSignal,
  onCleanup,
  onMount,
  Show,
} from 'solid-js'

import {
  ANC_MAIN_ADDRESS,
  ASTRO_MAIN_ADDRESS,
  ENTER_KEY,
  MARS_MAIN_ADDRESS,
} from './constants'
import createLocalStore from './store/createLocalStore'
import { TokenData, TokenInfoResponse } from './interfaces'
import createTerraLcd from './store/createTerraLcd'
import TokenTable from './components/Tables/TokenTable'
import TokenGrid from './components/TokenGrid'
import GridButton from './components/GridButton'
import ListButton from './components/ListButton'
import ErrorAlert from './components/ErrorAlert'
import Tab from './components/Tab'
import { NetworkMode } from './enums'
import { fetchTokenPrice } from './functions'
import WalletTable from './components/Tables/WalletTable'
import { on } from 'solid-js'

const App: Component = () => {
  const [networkMode, setNetworkMode] = createSignal(NetworkMode.MAIN)
  const [lcd, { refetch }] = createResource(async () => {
    console.log('getting resource!')
    return await createTerraLcd(networkMode())
  })
  const [addressModeToken, setAddressModeToken] = createSignal(true)
  const [displayModeList, setDisplayModeList] = createSignal(true)
  const [errorAlert, setErrorAlert] = createSignal('')
  const [walletTokens, setWalletTokens] = createSignal([])
  const {
    state,
    getModeToken,
    addTokenToStorage,
    containsTokenAddress,
    removeTokenFromStorage,
    updateTokensByNetwork,
  } = createLocalStore({
    tokens: [],
  })

  const handleSearch = (props) => {
    if (addressModeToken()) {
      addToken(props)
    } else {
      addWalletAddress(props)
    }
  }

  const queryAddTokenToStorage = (tokenAddy: string) => {
    lcd()
      .wasm.contractQuery(tokenAddy, { token_info: {} })
      .then(async (tokenInfoResponse: TokenInfoResponse) => {
        // Check if token exists in store
        if (!containsTokenAddress(tokenAddy, networkMode())) {
          if (networkMode() === NetworkMode.MAIN) {
            // Get token price if mainnet
            const tokenPrice = await fetchTokenPrice(tokenInfoResponse.symbol)
            addTokenToStorage(
              tokenInfoResponse,
              tokenAddy,
              networkMode(),
              tokenPrice
            )
          } else {
            // Skip token price if testnet
            addTokenToStorage(tokenInfoResponse, tokenAddy, networkMode())
          }
        } else {
          setErrorAlert('Token address has already been added!')
        }
      })
      .catch((err) => {
        setErrorAlert(`${err}!`)
      })
  }

  //add token addy data to local store
  const addToken = ({ target, keyCode }) => {
    const tokenAddy = target.value.trim()
    if (keyCode == ENTER_KEY && tokenAddy) {
      queryAddTokenToStorage(tokenAddy)
      target.value = ''
    }
  }

  // Set wallet tokens data
  const addWalletAddress = ({ target, keyCode }) => {
    const walletAddress = target.value.trim()
    if (keyCode == ENTER_KEY && walletAddress) {
      lcd()
        .bank.balance(walletAddress)
        .then((val) => {
          const balanceTokens = []
          const [balance] = val
          balance.map((coin) => {
            const coinData = {
              token: coin.denom.slice(1),
              amount: coin.mul(1 / 1000000).amount.toString(),
            }
            balanceTokens.push(coinData)
          })
          setWalletTokens(balanceTokens)
        })
        .catch((err) => {
          setErrorAlert(`${err}!`)
        })
      target.value = ''
    }
  }

  // Handle network change
  const handleNetworkChange = (e) => {
    const newNetworkMode = e.target.value
    console.log('network value changed to: ', newNetworkMode)
    setNetworkMode(newNetworkMode)
  }

  // Display error pop-up for 3s
  createEffect(() => {
    console.log(errorAlert())
    const time = setTimeout(() => {
      setErrorAlert('')
    }, 3000)
    onCleanup(() => clearTimeout(time))
  })

  // Re-fetch LCD based on network mode (mainnet/testnet)
  createEffect(() => {
    networkMode()
    refetch()
  })

  // Add default mainnet tokens if empty (only run when lcd updated)
  createEffect(
    on(
      lcd,
      () => {
        console.log('checking if default token exists')
        if (
          networkMode() === NetworkMode.MAIN &&
          getModeToken(NetworkMode.MAIN).length === 0
        ) {
          console.log('adding default tokens')
          queryAddTokenToStorage(ASTRO_MAIN_ADDRESS)
          queryAddTokenToStorage(MARS_MAIN_ADDRESS)
          queryAddTokenToStorage(ANC_MAIN_ADDRESS)
        }
      },
      { defer: true }
    )
  )

  // Update token prices in mainnet
  onMount(() => {
    if (networkMode() === NetworkMode.MAIN) {
      const mainTokens = getModeToken(NetworkMode.MAIN)
      Promise.all(
        mainTokens.map(async (token: TokenData) => {
          const updatedPrice = await fetchTokenPrice(token.ticker)
          return { ...token, price: updatedPrice }
        })
      ).then((updatedTokens) => {
        console.log('updating token prices with: ', updatedTokens)
        updateTokensByNetwork(updatedTokens, NetworkMode.MAIN)
      })
    }
  })

  return (
    <main class="h-full min-h-[100vh]">
      <div
        class="max-w-2xl mx-auto text-center
        p-4 h-full min-h-[100vh] flex flex-col"
      >
        {/* Header section */}
        <div class="max-w-lg w-full mx-auto mb-12">
          <div class="text-center py-16">
            <h1 class="text-2xl md:text-4xl font-semibold text-gray-300 mb-4">
              Coinhall challenge
            </h1>
            <p class="text-gray-500">
              Price refreshes on first load, <br></br>
              defaults with astro + mars + anc mainnet tokens
            </p>
          </div>
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
        {/* Controls section */}
        <div class="w-full mb-8 md:mb-4 flex flex-row justify-between ">
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
        {/* Table/Grid section */}
        <Show
          when={!addressModeToken()}
          fallback={
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
          }
        >
          <Show
            when={walletTokens().length > 0 && displayModeList()}
            fallback={<></>}
          >
            <WalletTable tokens={walletTokens()} />
          </Show>
        </Show>
        <Show when={errorAlert() !== ''}>
          <ErrorAlert error={errorAlert()} />
        </Show>
      </div>
    </main>
  )
}

export default App
