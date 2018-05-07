require('./bootstrap');

window.Vue = require('vue');

// auto scroll
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

// nofitication
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
Vue.use(Toaster, {timeout: 2000})


Vue.component('message', require('./components/Message.vue'));

const app = new Vue({
    el: '#app',
    data: {
    	message: '',
    	chat: {
    		message: [],
            user: [],
            color: [],
            time: []
    	},
        typing: '',
        numberOfUsers: 0
    },
    watch: {
        message () {
            Echo.private('chat').whisper('typing', {
                name: this.message
            });
        }
    },
    methods: {
    	send() {
    		if (this.message.length != 0) {

                this.chat.user.push('you');
                this.chat.color.push('success');
                this.chat.time.push(this.getTime());
                this.chat.message.push(this.message);
                axios.post('/send', {
                    message: this.message,
                    chat: this.chat
                })
                .then(response => {
                    this.message = '';
                }).catch(error => {
                    console.log(error)
                })
    		}
    	},
        getTime () {
            let time = new Date()
            return time.getHours() + ':' + time.getMinutes();
        },
        getOldMessage () {
            axios.get('/get-old-message')
            .then(response => {
                if (response.data != '') {
                    this.chat = response.data
                }
            })
            .catch(error => {
                console.log(error)
            });
        },
        deleteSession () {
            axios.delete('/delete-session').then(response => {
                this.chat = {
                    message: [],
                    user: [],
                    color: [],
                    time: []
                }
                this.$toaster.success('Chat history is deleted')
            }).catch(error => {
                console.log(error)
            })
        }
    },
    mounted () {
        this.getOldMessage();

        Echo.private('chat').listen('ChatEvent', (e) => {
            this.chat.user.push(e.user);
            this.chat.color.push('warning');
            this.chat.message.push(e.message);
            this.chat.time.push(this.getTime());

            axios.post('/save-to-session', {
                chat: this.chat
            })
            .catch(error => {
                console.log(error)
            });
        })
        .listenForWhisper('typing', (e) => {
            this.typing = '';
            if (e.name != '') {
                this.typing = 'typing...';
            }
        });

        Echo.join('chat')
        .here((users) => {
            this.numberOfUsers = users.length
        })
        .joining((user) => {
            this.numberOfUsers += 1;
            this.$toaster.success(user.name + ' is joined the chat room')
        })
        .leaving((user) => {
            this.numberOfUsers -= 1;
            this.$toaster.warning(user.name + ' is leaved the chat room')
        });
    }
});
