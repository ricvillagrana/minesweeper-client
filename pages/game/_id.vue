<template>
  <div v-if="board">
    <div class="flex flex-col">
      <div v-for="(row, rowKey) in board" :key="rowKey" class="flex flex-row">
        <p
          v-for="(cell, colKey) in row"
          :key="colKey"
          :class="`w-${cellSize} h-${cellSize} text-${cellColor(cell)} bg-${cellBg(cell)}`"
          class="border-solid border border-gray-500 flex justify-center items-center text-xs"
        >
          {{ show(cell) }}
        </p>
      </div>
    </div>
    <nuxt-link class="text-red-500" to="/">Back to all games.</nuxt-link>
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
    await this.$store.commit('games/fetchBoard', this.$route.params.id)
  }
}
</script>
