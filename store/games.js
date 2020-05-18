export const state = () => ({
  games: [],
  current: null,
  board: null
})

export const mutations = {
  async fetch (state) {
    const { data } = await this.$axios.get('/games')
    state.games = data.games
    state.current = data.games[0]
  },
  async fetchBoard (state) {
    const { data } = await this.$axios.get(`/games/${state.current.id}`)
    state.current = data.game
    state.board = data.board
  }
}
