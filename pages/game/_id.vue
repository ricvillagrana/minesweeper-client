<template>
  <div v-if="board && game">
    <nuxt-link class="py-2 text-red-500" to="/">← Back to all games.</nuxt-link>
    <p class="text-sm">Dimensions: {{ game.rows }} * {{ game.cols }}</p>
    <p class="text-sm">Bombs: {{ game.bombs }}</p>
    <p
      :class="`bg-${resultColors[game.result]}-100 text-${resultColors[game.result]}-500`"
      class="rounded py-1 px-2 text-xs w-24 text-center"
      >
      {{ game.result.toUpperCase() }}
    </p>
    <div class="flex flex-col">
      <div v-for="(row, rowKey) in board" :key="rowKey" class="flex flex-row">
        <p
          v-for="(cell, colKey) in row"
          :key="colKey"
          :class="`w-${cellSize} h-${cellSize} text-${cellColor(cell)} bg-${cellBg(cell)}`"
          class="border-solid border border-gray-500 flex justify-center items-center text-xs"
          :data-coord="[rowKey, colKey]"
          @click="reveal"
          @contextmenu="flag"
        >
          {{ show(cell) }}
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>
      Cannot load such game.
      <nuxt-link class="text-red-500" to="/">Go back.</nuxt-link>
    </p>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      cellSize: 6,
      resultColors: {
        playing: 'blue',
        looser: 'red',
        winner: 'teal'
      }
    }
  },
  methods: {
    async reveal (e) {
      e.preventDefault()

      if (this.game.result === 'playing') {
        const coord = e.target.getAttribute('data-coord').split(',')
        const id = this.$route.params.id

        await this.$store.commit('games/exec', { id, coord, action: 'reveal' })
      }
    },
    async flag (e) {
      e.preventDefault()

      const content = e.target.textContent.trim()
      const flagSymbol = { F: 'unflag', '': 'flag' }
      const isValidSymbol = Object.keys(flagSymbol).some(s => s === content)

      if (isValidSymbol && this.game.result === 'playing') {
        const coord = e.target.getAttribute('data-coord').split(',')
        const flag = flagSymbol[content]
        const id = this.$route.params.id

        await this.$store.commit('games/exec', { id, coord, action: flag })
      }
    },
    show (cell) {
      const toShow = {
        hidden: ' ',
        bomb: 'B',
        exploded_bomb: 'x',
        flag: 'F'
      }
      return toShow[cell] || cell
    },
    cellColor (cell) {
      const color = {
        0: 'blue-500',
        1: 'teal-500',
        2: 'teal-700',
        3: 'purple-500',
        4: 'purple-600',
        5: 'yellow-700',
        6: 'red-400',
        7: 'red-400',
        8: 'red-400',
        flag: 'white',
        bomb: 'red-500',
        exploded_bomb: 'white'
      }
      return color[cell] || cell
    },
    cellBg (cell) {
      const color = {
        hidden: 'gray-200',
        flag: 'blue-300',
        bomb: 'red-200',
        exploded_bomb: 'red-500'
      }
      return color[cell] || cell
    }
  },
  computed: {
    ...mapState({
      game: state => state.games.current,
      board: state => state.games.board
    })
  },
  async beforeMount () {
    await this.$store.commit('games/fetch', this.$route.params.id)
    await this.$store.commit('games/fetchBoard', this.$route.params.id)
  }
}
</script>
