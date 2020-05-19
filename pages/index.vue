<template>
  <div class="flex flex-col-reverse md:flex-row">
    <div class="flex flex-col w-full md:w-1/2 overflow-y-scroll h-64 md:h-128 xl:h-128">
      <p class="flex justify-center items-center h-full text-gray-500" v-if="games && games.length === 0">
        No games yet!
      </p>
      <div
        v-for="(game, key) in games"
        :key="key"
        class="py-2 px-3 my-1 flex flex-row bg-gray-100"
      >
        <div class="flex flex-col w-1/2">
          <p class="text-sm">Dimensions: {{ game.rows }} * {{ game.cols }}</p>
          <p class="text-sm">Bombs: {{ game.bombs }}</p>
          <p class="text-sm">Date: {{ game.created_at }}</p>
        </div>
        <div class="flex flex-col justify-center items-center w-1/2">
          <button
            :class="buttonColor(game.result)"
            class="px-3 py-1 mb-2 rounded text-sm"
            @click="$router.push(`/game/${game.id}`)"
            >
            {{ game.result == 'playing' ? 'Play' : 'View' }}
          </button>
          <p
            :class="`bg-${resultColors[game.result]}-100 text-${resultColors[game.result]}-500`"
            class="rounded py-1 px-2 text-xs"
          >
            {{ game.result.toUpperCase() }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center w-full md:w-1/2 h-64 md:h-128" v-if="current_game">
      <h1 class="text-xl font-bold">Current game</h1>
      <p
        :class="`bg-${resultColors[current_game.result]}-100 text-${resultColors[current_game.result]}-500`"
        class="rounded py-1 px-2 text-xs"
      >
        {{ current_game.result.toUpperCase() }}
      </p>
      <p>Dimensions: {{ current_game.rows }} * {{ current_game.cols }}</p>
      <p>Bombs: {{ current_game.bombs }}</p>
      <button
        :class="buttonColor(current_game.result)"
        class="px-3 py-1 rounded"
        @click="$router.push(`/game/${current_game.id}`)"
      >
        {{ current_game.result == 'playing' ? 'Continue' : 'View' }}
      </button>
        <p class="my-2">Or</p>
      <button
        class="px-3 py-1 rounded bg-blue-500 text-white"
        @click="openModal"
      >
        Start new game
      </button>
    </div>
    <div class="flex flex-col justify-center items-center w-full md:w-1/2 h-64" v-else>
      <button class="px-3 py-1 rounded bg-blue-500 text-white" @click="openModal">
        Start new game
      </button>
    </div>
    <sweet-modal ref="gameConfig">
      <h2 class="text-3xl font-bold">New game</h2>
      <form class="form-horizontal w-3/4 mx-auto" @submit="create">
        <div class="flex flex-col mt-4">
          <div class="flex flex-col items-start my-2">
            <label for="rows">Rows</label>
            <input
              id="rows"
              v-model="gameConfig.rows"
              type="number"
              class="flex-grow w-full mt-2 h-8 py-5 px-3 rounded border border-grey-400"
              name="rows"
              required
              placeholder="Rows, e.g. 10"
            >
          </div>
          <div class="flex flex-col items-start my-2">
            <label for="rows">Cols</label>
            <input
              id="cols"
              v-model="gameConfig.cols"
              type="number"
              class="flex-grow w-full mt-2 h-8 py-5 px-3 rounded border border-grey-400"
              name="cols"
              required
              placeholder="Cols, e.g. 10"
            >
          </div>
          <div class="flex flex-col items-start my-2">
            <label for="rows">Bombs</label>
            <input
              id="bombs"
              v-model="gameConfig.bombs"
              type="number"
              min="2"
              :max="gameConfig.rows * gameConfig.cols /2"
              class="flex-grow w-full mt-2 h-8 py-5 px-3 rounded border border-grey-400"
              name="bombs"
              required
              placeholder="Cols, e.g. 10"
            >
          </div>
        </div>
            <div class="flex flex-col mt-8">
              <button type="submit" class="bg-red-500 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded">
                Create now!
              </button>
            </div>
      </form>
    </sweet-modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      resultColors: {
        playing: 'blue',
        looser: 'red',
        winner: 'teal'
      },
      gameConfig: {
        cols: 10,
        rows: 8,
        bombs: 20
      }
    }
  },
  methods: {
    ...mapMutations({
      createGame: 'games/create'
    }),
    openModal () {
      console.log(this.$refs.modal)
      this.$refs.gameConfig.open()
    },
    async create (e) {
      e.preventDefault()

      const { data } = await this.$axios.post('/games', this.gameConfig)

      this.createGame(data)
      const currentId = this.$store.state.games.current.id

      this.$router.push(`/game/${currentId}`)
    },
    buttonColor (result) {
      return `bg-${this.resultColors[result]}-500 text-white`
    }
  },
  computed: {
    ...mapState({
      games: state => state.games.games,
      current_game: state => state.games.current
    })
  },
  async beforeCreate () {
    const { data } = await this.$axios.get('/games')
    this.$store.commit('games/fetch', data)
  }
}
</script>
