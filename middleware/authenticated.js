export default function ({ store, redirect }) {
  if (!store.state.user.data.id) {
    return redirect('/login')
  }
}
