<template>
<v-container fluid>
    <v-row no-gutters>
        <v-col cols="12" sm="3" md="3" lg="3" class="px-1">
            <v-card id="contacts-panel">
                <v-list dense>
                    <v-subheader>Online</v-subheader>
                    <v-list-item-group v-model="selected" color="primary" @change="Conversation(users[selected].UserID)">
                        <v-list-item v-for="(user, i) in users" :key="i">
                                <v-avatar size="35">
                                    <v-img :src="`/img/${user.GenderName.toString().toLowerCase()}.png`"></v-img>
                                </v-avatar>

                            <v-list-item-content class="ml-3">
                                <v-list-item-title class="text-bold" v-text="FullName(user)"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon >
                                <v-icon x-small color="green lighten-2">mdi-checkbox-blank-circle</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-col>
        <v-col cols="12" sm="9" md="9" lg="9" class="px-1">
            <v-card id="chat-panel" class="" v-if="selectedUser">
                <v-toolbar dense>
                    <span>
                        {{FullName(selectedUser)}}'s Conversation
                    </span>
                </v-toolbar>
                <v-card-text class="bg-conversation scroll" id="scrolldown">
                    <ul class="messages clearfix">
                        <li :class="FormatMessages(msg)" v-for="(msg,index) in messages" :key="index">
                            <template v-if="msg.Sender == userInfo.UserID">
                                {{msg.Message}}
                                <v-avatar size="35">
                                    <v-img :src="`/img/${userInfo.GenderName}.png`"></v-img>
                                </v-avatar>
                            </template>
                            <template v-else>
                                <v-avatar size="35">
                                    <v-img :src="`/img/${users[selected].GenderName}.png`"></v-img>
                                </v-avatar>
                                {{msg.Message}}
                            </template>
                        </li>
                    </ul>
                </v-card-text>
                <v-card-actions>
                    <v-row no-gutters>
                        <v-text-field dense hide-details outlined rounded v-model="msg" @keyup.enter="SendMsg(msg)"></v-text-field>
                        <v-btn icon large color="primary" @click="SendMsg(msg)">
                            <v-icon>mdi-send</v-icon>
                        </v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            msg: null,
            selected: null,
            users: [],
            online: [],
            sockets: [],
            messages: [],
        }
    },
    computed: {
        selectedUser() {
            return this.filteredUsers[this.selected]
        },
        url() {
            return `${this.$api}/chat`
        },
        userInfo() {
            return this.$store.state.userInfoLiveChat
        },
        filteredUsers() {
            return this.users.filter(rec => {
                return (!this.userInfo.UserID ? rec : rec.UserID != this.userInfo.UserID)
            })
        }
    },
    created() {
        this.$socket.emit('online', this.userInfo.UserID);
        this.$socket.on('online', (data) => {
            this.ProcessOnline(data)
        });
        this.$socket.on('privateMsg', () => {
            if(!this.selected){
                this.Conversation(this.users[this.selected].UserID)
            }else{
                alert()
            }
        });
    },
    methods: {
        ScrollDown(){
            setTimeout(()=>{
                const container = this.$el.querySelector("#scrolldown");
                container.scrollTop = container.scrollHeight;
            },100)
        },
        FormatMessages(msg){
            return this.userInfo.UserID == msg.Sender ? "right from" : "to"
        },
        async Conversation(user) {
            if (user) {
                await this.$axios.get(`${this.$api}/chats?users=${this.userInfo.UserID},${user}`)
                    .then(res => {
                        this.messages = res.data
                        this.ScrollDown()
                    })
            }
        },
        async SendMsg(msg) {
            await this.$axios.post(`${this.$api}/chats`, {
                    msg: msg,
                    to: this.users[this.selected].UserID,
                    from: this.userInfo.UserID,
                })
                .then(() => {
                    this.$socket.emit('privateMsg', {
                        msg: msg,
                        to: this.sockets[this.selected],
                    })
                    this.msg = null
                    this.Conversation(this.users[this.selected].UserID)                    
                })
        },

        ProcessOnline(data) {
            this.online = []
            this.sockets = []
            let keys = Object.keys(data)
            keys.forEach(key => {
                let userID = data[key]
                if (userID != this.userInfo.UserID) {
                    this.online.push(userID)
                    this.sockets.push(key)
                }
            })
            this.Initialize(this.online)
        },
        FullName(user) {
            return `${user.FirstName} ${user.LastName}`
        },
        Initialize(online) {
            this.$axios.post(`${this.$api}/users/details`, online)
                .then(res => {
                    this.users = res.data
                })
        }
    }
}
</script>

<style>
.to {
    color: black;
    background-color: #ECEFF1;
}

.from {
    color: white;
    background-color: #263238;
}

.scroll {
    overflow-y: scroll
}

li {
    display: block;
    clear: both;
}

.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.clearfix {
    display: inline-block;
}

* html .clearfix {
    height: 1%;
}

.clearfix {
    display: block;
}

section#chat-box {
    background: #fff;
    padding: 10px;
    margin: 0 auto;
}

ul.messages {
    padding: 10px;
    list-style-type: none;
}

ul.messages li {
    display: block;
    position: relative;
    float: left;
    min-width: 25px;
    border-radius: 15px;
    padding: 8px;
    margin-bottom: 8px;
}

ul.messages li:after,
ul.messages li:before {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}

ul.messages li:after {
    border-color: rgba(166, 172, 186, 0);
    margin-top: -16px;
}

ul.messages li:before {
    border-color: rgba(0, 0, 0, 0);
    border-right-color: transparent;
    border-width: 26px;
    margin-top: -26px;
}

ul.messages>.right {
    float: right;
}

ul.messages li:nth-child(2n):after,
ul.messages li:nth-child(2n):before {
    border-right-color: transparent;
    left: 90%;
}

ul.messages li:nth-child(2n):before {
    border-left-color: transparent;
}

#contacts-panel,
#chat-panel {
    height: calc(100vh - 75px) !important;
}

.text-bold {
    font-weight: bold;
}

.bg-conversation {
    background-color: rgb(228, 224, 224);
    height: calc(100vh - 180px) !important;
}
</style>
