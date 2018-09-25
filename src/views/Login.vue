<template>
    <div class="columns">
        <div class="column is-4 is-offset-4">
            <h1 class="title">Log In</h1>

            <form @submit.prevent="logIn">
                <div class="field">
                    <div class="control">
                        <input type="email" placeholder="Email" v-model="email" class="input"><br>
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <input type="password" placeholder="Password" v-model="password" class="input"><br>
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <button class="button is-success">Submit</button>
                    </div>
                </div>

                <article class="message is-danger" v-if="error">
                    <div class="message-body">
                        {{ error }}
                    </div>
                </article>
            </form>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: 'login',
        data () {
            return {
                email: '',
                password: '',
                isAuthenticated: false,
                error: null
            }
        },
        created () {
            firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    this.isAuthenticated = true

                    this.$router.push('/dashboard')
                }
            })
        },
        methods: {
            logIn() {
                console.log('Log in')

                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .catch(error => this.error = error.message)
            },
            logOut() {
                console.log('Log out')

                firebase.auth().signOut()
                    .then(() => {
                        this.isAuthenticated = false
                    })
            }
        }
    }
</script>