<template>
<div>
    <v-navigation-drawer app clipped v-model="nav" @click="$emit('ToggleNavbar')">
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title text-center">
                    <v-avatar size="150">
                        <img :src="`/img/${userInfo.GenderName}.png`" :alt="userInfo.Gender" onerror="this.onerror=null;this.src='img/nopic.png';">
                    </v-avatar>
                </v-list-item-title>
                <v-list-item-subtitle class="my-3 text-center">

                    <span style="font-weight:bold;">{{userInfo.FirstName}} {{userInfo.LastName}}</span><br>
                    <!-- <span style="font-weight:bold;">{{`${$store.state.user.LastName}, ${$store.state.user.FirstName} ${$store.state.user.MiddleName.length > 0 ? $store.state.user.MiddleName.substr(0,1).toUpperCase()+'.' : null }`}}</span><br>
                    <span style="font-weight:bold;">{{$store.state.user.SectionsName}}</span><br>
                    <span style="font-weight:bold;">{{$store.state.user.TeamName}}</span> -->
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
            <template v-for="item in items">
                <v-list-item v-if="!item.sub" :key="item.title" link :to="item.to" color="#208895">
                    <template>
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </template>

                </v-list-item>
                <v-list-group v-else :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action color="#208895">
                    <template v-slot:activator>
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item v-for="Sub in item.sub" :key="Sub.title" link :to="Sub.to">
                        <v-list-item-icon>
                            <v-icon>{{ Sub.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="Sub.name"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </template>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-btn block color="#208895" @click="logout()"> Logout </v-btn>
            </div>
        </template>
    </v-navigation-drawer>

</div>
</template>

<script>
export default {
    props: ['nav'],
    data() {
        return {
            test: [],
            clickIncrement: 0,
            right: null,
            items: [{
                    title: 'Chats',
                    to: '/Chats',
                    path: '/Chats',
                    name: 'Chats',
                    icon: 'mdi-chat',
                },
                {
                    title: 'Settings',
                    permission: 'all',
                    icon: 'mdi-cog',
                    sub: [{
                        title: 'Users',
                        to: '/Settings/Users',
                        path: '/Settings/Users',
                        name: 'Users',
                        icon: 'mdi-account',
                    }]
                },
            ],
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfoLiveChat
        }
    },
    created() {

    },
    methods: {
        checkPrependZero() {
            return `http://adminsql1/photos/037758.jpg`
        },
        logout() {
            this.$socket.emit('offline',this.userInfo.UserID);
            this.$store.commit('SET_USERDATA', {})
            this.$router.push('/')
        },
    }
}
</script>

<style scoped>
.v-list-item__icon {
    margin-right: 10px !important;
}

.v-list>a,
a {
    text-decoration: none;
}

.v-application--is-ltr .v-list--dense.v-list--nav .v-list-group--no-action>.v-list-group__items>.v-list-item {
    padding-left: 30px;
}
</style>
