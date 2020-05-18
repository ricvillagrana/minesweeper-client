export default function ({ store, redirect }) {
  if (window.localStorage.getItem('minesweeper-client')) {
    const { data } = JSON.parse(window.localStorage.getItem('minesweeper-client')).user

    if (!data.id) {
      return redirect('/login')
    }
  }
}
