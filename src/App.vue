<template>
  <div id="app">

    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          VueTube
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>


        <div class="navbar-menu">
          <div class="navbar-start">
            <router-link to="/" class="navbar-item">Home</router-link>
            <router-link to="/about" class="navbar-item">About</router-link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped" v-if="!isAuthenticated">
                <p class="control">
                  <router-link to="/signup" class="button is-primary">Sign-Up</router-link>
                </p>

                <p class="control">
                  <router-link to="/login" class="button is-info">Log in</router-link>
                </p>
              </div>

              <div class="field" v-else>
                  <div class="field is-grouped">
                  <p class="control">
                    <button @click="showCategoryForm = !showCategoryForm" class="button is-primary">Add Category</button>
                  </p>
                  <p class="control">
                    <button @click="logout" class="button is-danger">Log out</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="modal" :class="{ 'is-active' : showCategoryForm  }">
        <div class="modal-background"></div>
        <div class="modal-content">
          <form @submit.prevent="addCategory">
            <div class="field">
              <input type="text" class="input" v-model="title">
            </div>

            <div class="field">
              <button class="button is-success">Add</button>
            </div>
          </form>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="showCategoryForm = !showCategoryForm"></button>
      </div>

    <router-view/>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default{
      name: "App",
      inject: ['db'],
      data() {
          return {
              isAuthenticated: false,
              showCategoryForm: false,
              title: ''
          }
      },
      created () {
          firebase.auth().onAuthStateChanged(user => {
              if(user) {
                  this.isAuthenticated = true
              }
          })
      },
      methods: {
          addCategory() {
             const category = {
                 title: this.title
             }

             this.db.collection('categories').add(category)
              .catch(() => console.log(error))

            this.showCategoryForm = false;
            this.title = ''

          },
          logout () {
              firebase.auth().signOut()
                  .then(() => {
                      this.isAuthenticated = false
                      this.$router.push('/login')
                  })
          }
      }
  }
</script>

<style lang="scss">
  @import "../node_modules/bulma/css/bulma.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
