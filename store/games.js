export const state = () => ({
  games: [],
  current: null,
  board: null
})

export const mutations = {
  create (state, payload) {
    state.games = [payload.game, ...state.games]
    state.current = payload.game
    state.board = payload.board
  },
  fetch (state, payload) {
    state.games = payload.games
    state.current = payload.games[0]
  },
  fetchBoard (state, payload) {
    state.board = payload.board
    state.game = payload.game
    state.current = payload.game
  },
  clean (state) {
    state.games = []
    state.current = null
    state.board = null
  },
  async exec (state, payload) {
    const { data } = await this.$axios.post(
      `/games/${payload.id}/${payload.action}`,
      payload
    )

    state.games = state.games.map(game =>
      game.id === data.game.id ? data.game : game
    )
    state.current = state.games.filter(game => game.id === payload.id)[0]
    state.board = data.board
  }
}
