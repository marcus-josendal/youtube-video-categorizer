<template>
    <div>
    <h1>Dashboard</h1>

        <div class="tabs">
            <ul>
                <li class="is-active"><a>Newest</a></li>
                <li v-for="category in categories"><a>{{ category.title }}</a></li>
            </ul>
        </div>
    </div>

</template>

<script>


    export default {
        name: "dashboard",
        inject: ['db'],
        data () {
            return {
                categories: []
            }
        },
        firestore () {
            return {
                categories: this.db.collection('categories')
            }
        }
    }
</script>

<style scoped>

</style>