export const state = () => ({
  games: [],
  current: null,
  board: null
})

export const mutations = {
  async create (state, payload) {
    const { data } = await this.$axios.post('/games', payload)

    state.games = [data.game, ...state.games]
    state.current = data.game
  },
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
