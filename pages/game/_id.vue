<template>
  <div v-if="board">
    <div class="flex flex-col">
      <div v-for="(row, rowKey) in board" :key="rowKey" class="flex flex-row">
        <p
          v-for="(cell, colKey) in row"
          :key="colKey"
          :class="`w-${cellSize} h-${cellSize}`"
          class="border-solid border border-gray-500 flex justify-center items-center text-xs"
        >
          {{ cell }}
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
  computed: {
    ...mapState({
      game: state => state.games.current,
      board: state => state.games.board
    })
  },
  async beforeMount () {
    await this.$store.commit('games/fetch')
    await this.$store.commit('games/fetchBoard')
  }
}
</script>
