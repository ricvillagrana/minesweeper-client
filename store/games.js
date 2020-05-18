export const state = () => ({
  games: [],
  current: null
})

export const mutations = {
  async fetch (state) {
    const { data } = await this.$axios.get('/games')
    state.games = data.games
    state.current = data.games[0]
  }
}
