<template>
<v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="400">
    <template>
        <v-card>
            <v-toolbar :color="$themeColor" dark dense>
                <v-toolbar-title>
                    Register
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon small color="red lighten-2" @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container fluid>
                    <v-text-field class="my-2" label="First Name" outlined dense hide-details :color="$themeColor"  v-model="newObj.FirstName"></v-text-field>
                    <v-text-field class="my-2" label="Middle Name" outlined dense hide-details :color="$themeColor"  v-model="newObj.MiddleName"></v-text-field>
                    <v-text-field class="my-2" label="Last Name" outlined dense hide-details :color="$themeColor"  v-model="newObj.LastName"></v-text-field>
                    <v-select class="my-2" label="Gender" outlined dense hide-details :color="$themeColor" :item-color="$themeColor" :items="genders" item-text="GenderName" item-value="GenderID"  v-model="newObj.Gender"></v-select>
                    <v-divider></v-divider>
                    <v-text-field class="my-2" label="Username" outlined dense :color="$themeColor" :error="error" :error-messages="errorMsg" v-model="newObj.Username"></v-text-field>
                    <v-text-field class="my-2" label="Password" outlined dense :color="$themeColor" type="password"  v-model="newObj.Password"></v-text-field>
                    <v-btn dense block color="green lighten-2" :disabled="checkFields" @click="Save(newObj)">Save</v-btn>
                </v-container>
            </v-card-text>
        </v-card>
    </template>
</v-dialog>
</template>

<script>
export default {
    props: ['dialog'],
    computed:{
        checkFields(){
            return (!this.newObj.FirstName || !this.newObj.FirstName || !this.newObj.MiddleName || !this.newObj.LastName || !this.newObj.Gender || !this.newObj.Password || !this.newObj.Username) 
        }
    },
    data() {
        return {
            newObj: {},
            error: false,
            errorMsg:null,
            genders: [
                {
                    GenderID: 1,
                    GenderName: 'Male'
                },
                {
                    GenderID: 2,
                    GenderName: 'Female'
                },
            ]
        }
    },
    methods:{
        Save(newObj){  
            let obj = JSON.parse(JSON.stringify(newObj))          
            this.$set(obj,'UpdatedDate',this.$now)
            this.$set(obj, 'Password' , this.$md5(newObj.Password))
            this.$axios.post(`${this.$api}/users`,obj)
            .then(()=>{
                this.$emit('close',true)
                this.$toast.success('Registered!', 'Success')
                this.error=false
                this.errorMsg=null
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
