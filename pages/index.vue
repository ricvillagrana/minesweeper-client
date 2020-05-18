<template>
  <div class="flex flex-col-reverse md:flex-row">
    <div class="flex flex-col w-full md:w-1/2 overflow-y-scroll h-64 md:h-128 xl:h-128">
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
        class="rounded bg-red-100 text-red-500 py-1 px-2 text-xs"
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
      >
        Start new game
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      resultColors: {
        playing: 'blue',
        looser: 'red',
        winner: 'teal'
      }
    }
  },
  methods: {
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
  async beforeMount () {
    await this.$store.commit('games/fetch')
  }
}
</script>
