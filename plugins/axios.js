export default ({ $axios }) => {
  if (window.localStorage.getItem('minesweeper-client')) {
    const { id } = JSON.parse(window.localStorage.getItem('minesweeper-client')).user.data
    $axios.setToken(id)
  }
}
