import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.esm-browser.min.js';

const app = {
    data(){
        return {
            site: 'https://vue3-course-api.hexschool.io/v2/',
            path: 'gwen-hexschool-class',
            user:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        login(){
            const url = `${this.site}admin/signin`
            axios.post(url,this.user)
            .then((res)=>{
                const { token,expired } = res.data;
                document.cookie = `gwenCookie=${token}; expires=${new Date(expired)};`;
                alert('登入成功');
                window.location = 'products.html';
            })
            .catch((err)=>{
                alert(err.data.message);
            })
        }
    },
    mounted(){
    }
}
createApp(app).mount('#app');
