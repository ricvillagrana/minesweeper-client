<template>
  <div class="bg-gray-900 h-screen w-screen">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
      <div class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0">
        <div class="m-8 flex flex-col w-full">
          <div class="header flex flex-col md:flex-row items-center justify-between w-full">
            <h1 class="text-4xl">
              Minesweeper
            </h1>
            <div>
              <p>
                {{ user.name }}
                (<a class="text-red-500 cursor-pointer" @click="logout">Logout</a>)
              </p>
            </div>
          </div>
          <div class="flex-col">
            <nuxt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'default',
  middleware: 'authenticated',
  computed: {
    ...mapState({
      user: state => state.user.data
    })
  },
  methods: {
    logout () {
      this.$axios.setToken(false)
      this.$store.commit('user/logout')
      this.$store.commit('games/clean')
      this.$router.push('/login')
    }
  }
}
</script>
