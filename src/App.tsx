import { Component, createEffect, createSignal, Show } from 'solid-js'

import { ENTER_KEY } from './constants'
import createLocalStore from './store/createLocalStore'
import { TokenInfoResponse } from './interfaces'
import createTerraLcd from './store/createTerraLcd'
import TokenTable from './components/TokenTable'
import TokenGrid from './components/TokenGrid'
import GridButton from './components/GridButton'
import ListButton from './components/ListButton'

const lcd = await createTerraLcd()

const App: Component = () => {
  const [displayModeList, setDisplayModeList] = createSignal(true)
  const { state, addTokenToStorage, removeTokenFromStorage } = createLocalStore(
    {
      tokens: [],
    }
  )

  //add token addy data to local store
  const addToken = ({ target, keyCode }) => {
    const tokenAddy = target.value.trim()
    if (keyCode == ENTER_KEY && tokenAddy) {
      lcd.wasm
        .contractQuery(tokenAddy, { token_info: {} })
        .then((tokenInfoResponse: TokenInfoResponse) => {
          addTokenToStorage(tokenInfoResponse, tokenAddy)
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
    console.log(displayModeList())
  })

  return (
    <section class="max-w-2xl mx-auto text-center px-4">
      <p class="text-2xl md:text-4xl text-green-700 text-center py-20">
        Hello tailwindasdasdsa!
      </p>
      <input
        class="input max-w-lg w-full self-center input-bordered mb-8"
        placeholder="Enter address"
        onKeyDown={addToken}
      />
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
    </section>
  )
}

export default App
