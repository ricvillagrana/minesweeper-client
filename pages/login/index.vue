<template>
  <div class="bg-gray-900 h-screen w-screen">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
      <div class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0" style="height: 500px">
        <div class="flex flex-col w-full md:w-1/2 p-4">
          <div class="flex flex-col flex-1 justify-center mb-8">
            <h1 class="text-4xl text-center font-thin">
              Welcome to Minesweeper
            </h1>
            <div class="w-full mt-4">
              <form class="form-horizontal w-3/4 mx-auto" @submit="onSubmit">
                <div class="flex flex-col mt-4">
                  <input
                    id="name"
                    ref="name"
                    v-model="name"
                    type="text"
                    class="flex-grow mt-2 h-8 py-5 px-3 rounded border border-grey-400"
                    name="name"
                    :required="allowRegister"
                    placeholder="Name"
                    v-show="allowRegister"
                  >
                  <p v-if="allowRegister" class="text-sm text-red-700">Please, type your name to register.</p>
                  <input
                    id="username"
                    ref="username"
                    v-model="username"
                    type="text"
                    class="flex-grow mt-2 h-8 py-5 px-3 rounded border border-grey-400"
                    name="username"
                    required
                    autofocus
                    placeholder="Username"
                  >
                </div>
                <div class="flex flex-col mt-8">
                  <button type="submit" class="bg-red-500 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded">
                    Enter and play now!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="hidden md:block md:w-1/2 rounded-r-lg" style="background: url('https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'); background-size: cover; background-position: center center;" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'public',
  data () {
    return {
      username: '',
      name: '',
      allowRegister: false
    }
  },
  beforeMount () {
    if (this.$store.state.user.data.id !== '') {
      this.$router.push('/')
    }
  },
  methods: {
    async onSubmit (e) {
      e.preventDefault()

      const user = this.allowRegister
        ? { username: this.username, name: this.name }
        : { username: this.username }

      const response = await this.$axios.$post('/users/sign_in', { user })

      if (response.user.id === null) {
        this.allowRegister = true
      }

      this.$axios.setToken(response.user.id)
      this.$store.commit('user/login', response.user)
      this.$router.push('/')
    }
  }
}
</script>
