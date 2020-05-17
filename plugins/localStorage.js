import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'minesweeper-client',
      paths: ['user']
    })(store)
  })
}
