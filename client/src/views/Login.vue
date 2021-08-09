<template>
<v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-card class="mx-auto elevation-20 " style="border-radius: 10px; background-color:white;" width="700px">
            <v-row no-gutters>
                <v-col cols="12" md="6" sm="6" style="background-color:white; border-radius: 10px 0px 0px 10px; border-bottom: 20px solid white; border-top: 20px solid white;">
                    <!-- <v-row no-gutters>-->
                    <v-col class="mt-10 ">
                        <v-img src="img/logo3.png" alt="Import Process"></v-img>
                    </v-col>
                    <!--  </v-row> -->

                    <div style="width: 100%; text-align:center; font-style: italic; text-decoration: underline;">
                        Your messaging buddy!
                    </div>
                </v-col>
                <v-col cols="12" md="6" sm="6" class="px-5">
                    <v-card-title class="mt-8 text-center" style="display:inherit; font-size: 20px; font-weight: bold;">
                        Login
                    </v-card-title>
                    <v-card-text class="text--primary mt-5">
                        <v-text-field type="text" label="Username" prepend-icon="mdi-account" :error="error" :error-messages="errorMsg" v-model="user.Username" @keyup.enter="login()"></v-text-field>
                        <v-text-field type="password" label="Password" prepend-icon="mdi-lock" :error="error" :error-messages="errorMsg" v-model="user.Password" @keyup.enter="login()"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn raised block :disabled="!user.Username || !user.Password" @click="login()" color="#81cfcf" :loading="loading">Submit</v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-card>
    </v-layout>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            error: false,
            errorMsg: null,
            user: {},
            loading: false
        }
    },
    methods: {
        login() {
            this.loading = true
            let user = {
                ...this.user,
                Password: this.$md5(this.user.Password)
            }
            this.$axios.post(`${this.$api}/login`, user)
                .then(res => {                    
                    this.loading = false
                    this.error = false
                    this.$store.commit('SET_USERDATA',res.data)
                    this.$router.push('Chats')
                }).catch(({response }) => {
                    if (response) {
                        this.errorMsg = response.data.errorMsg
                        this.error = true
                    }
                    this.loading = false
                })

        }
    }
}
</script>

<style>

</style>
