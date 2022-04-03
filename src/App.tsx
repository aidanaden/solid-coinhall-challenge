import { Component, For, Show } from 'solid-js'

import { ENTER_KEY } from './constants'
import createLocalStore from './store/createLocalStore'
import { formatTokenSupply } from './functions'
import { TokenData, TokenInfoResponse } from './interfaces'
import createTerraLcd from './store/createTerraLcd'

const lcd = await createTerraLcd()

const App: Component = () => {
  // const address = 'terra1luagdjcr9c9yvp3ak4d7chjm5gldcmgln5rku5'
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

  return (
    <section class="max-w-lg mx-auto">
      <p class="text-4xl text-green-700 text-center py-20">
        Hello tailwindasdasdsa!
      </p>
      <input
        class="input w-full input-bordered mb-4"
        placeholder="Enter address"
        onKeyDown={addToken}
      />
      <Show when={state.tokens.length > 0}>
        <ul class="w-full mb-2 ">
          <For each={state.tokens}>
            {(tokenData: TokenData) => (
              <li class="flex flex-row justify-between p-4 border-[1px] ">
                <div class="flex flex-row space-x-6 self-center">
                  <div class="w-40 truncate">{tokenData.name}</div>
                  <div class="w-16 uppercase">{tokenData.ticker}</div>
                  <div class="w-32">{formatTokenSupply(tokenData.supply)}</div>
                </div>

                <button
                  class="bg-transparent hover:text-gray-500 duration-200 border-none p-2 self-center"
                  onClick={[removeTokenFromStorage, tokenData.address]}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
      <div>{`${state.tokens.length} token(s) left`}</div>
    </section>
  )
}

export default App
