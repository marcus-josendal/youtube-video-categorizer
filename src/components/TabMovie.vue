<template>
    <div class="columns is-multiline">
        <div class="card column is-4" v-for="movie in movies" :key="movie.id">
            <div class="card-image">
                <iframe :src="embedable(movie.url)" width="100%" height="200"></iframe>
            </div>

            <div class="content">
                {{ movie.title }}
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        inject: ['db'],
        name: 'TabMovie',
        props: {
            category: String,
            categories: Array
        },
        data () {
            return {
                movies: []
            }
        },
        mounted () {
            if(this.$props.category === 'Newest') {
                for(let i = 0; i < this.$props.categories.length; i++) {
                    this.db.collection('categories').doc(this.$props.categories[i].id).collection('movies').get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((collection) => {
                                if(this.movies.length < 7) {
                                    this.movies.push({
                                        title: collection.data().title,
                                        url: collection.data().url
                                    })
                                }
                            })
                        })
                }
            }
        },
        firestore () {
            if(this.$props.category !== 'Newest') {
                return {
                    movies: this.db.collection('categories').doc(this.$props.category).collection('movies')
                }
            }
        },
        methods: {
            embedable (url) {
                console.log(url.split('=')[1])
                return 'https://youtube.com/embed/' + url.split('=')[1]
            }
        }
    }
</script>

<style scoped>

</style>