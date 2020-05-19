export default function ({ store }) {
  if (window.localStorage.getItem('minesweeper-client')) {
    const { data } = JSON.parse(window.localStorage.getItem('minesweeper-client')).user
    console.log(data)

    if (!data.id) {
      window.location = '/login'
    }
  }
}
