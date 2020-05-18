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
  async fetchBoard (state, payload) {
    const { data } = await this.$axios.get(`/games/${payload}`)
    state.current = state.games.filter(game => game.id === payload)[0]
    state.board = data.board
  },
  async reveal (state, payload) {
    const { data } = await this.$axios.post(
      `/games/${payload.id}/reveal`,
      payload
    )

    state.games = state.games.map(game =>
      game.id === data.game.id ? data.game : game
    )
    state.current = state.games.filter(game => game.id === payload.id)[0]
    state.board = data.board
  }
}
