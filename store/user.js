const initialData = {
  id: '',
  name: '',
  username: ''
}

export const state = () => ({
  data: initialData
})

export const mutations = {
  login (state, user) {
    state.data = user
  },
  logout (state) {
    state.data = initialData
  }
}
