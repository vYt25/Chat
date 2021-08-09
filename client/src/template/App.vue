<template>
<div class="overflow-hidden" >
  
  <v-app id="inspire" class="foreground-color">
    <router-view  name="header" />    
    <v-main app>
      <router-view/>
    </v-main>  
  </v-app>
  </div>
</template>
<script>
    export default {
      methods:{
        GotoLogin(){
          this.$router.push({name: 'Login'})
        },
      }
    }
</script>
<style scoped>
.foreground-color{
  background-color: #c9c7c7;
}
</style>