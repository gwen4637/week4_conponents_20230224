import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.esm-browser.min.js';
import templatePagination from './template-pagination.js';

let productModal = '';
let delProductModal = '';


const app = createApp({
    data(){
        return{
            site:'https://vue3-course-api.hexschool.io/v2/',
            path:'gwen-hexschool-class',
            products:{},
            tempProduct:{
                imagesUrl:[],
            },
            isNew:false,
            pages:{},
        }
    },
    methods:{
        //登入check
        checkLogin(){
            const url = `${this.site}api/user/check`;
            axios.post(url)
            .then((res)=>{
                this.getProduct();
            })
            .catch((err)=>{
                alert(err.data.message);
                window.location = 'login.html';
            })
        },
        //取得商品列表
        getProduct(num = 1){
            const url = `${this.site}api/${this.path}/admin/products/?page=${num}`;
            axios.get(url)
            .then((res)=>{
                this.products = res.data.products;
                this.pages = res.data.pagination;
            })
            .catch((err)=>{
                alert(err.data.message);
            })
        },
        //openModel
        openModal(status,product){
            if(status == 'create'){
                this.isNew = true;
                this.tempProduct = {
                    imagesUrl:[],
                };
                productModal.show();
            }else if(status == 'edit'){
                this.isNew = false;
                this.tempProduct = {...product};
                productModal.show();
            }else if(status == 'delete'){
                this.tempProduct = {...product};
                delProductModal.show();
            }
        },
        //更新商品列表 //新增//編輯
        updateProduct(){
            let url = `${this.site}api/${this.path}/admin/product`;
            let method = 'post';

            //edit
            if(this.isNew == false){
                url = `${this.site}api/${this.path}/admin/product/${this.tempProduct.id}`;
                method = 'put';
            }
            axios[method](url,{data:this.tempProduct})
            .then((res)=>{
                this.getProduct();
                alert(res.data.message);
                productModal.hide();
            })
            .catch((err)=>{
                alert(err.data.message);
            })
        },
        //刪除商品
        deleteProduct(){
            const url = `${this.site}api/${this.path}/admin/product/${this.tempProduct.id}`;
            axios.delete(url)
            .then((res)=>{
                this.getProduct();
                alert(res.data.message);
                delProductModal.hide();
            })
            .catch((err)=>{
                alert(err.data.message);
            })
        }
    },
    components:{
        templatePagination,
    },
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)gwenCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();

        // openModel 初始化
        productModal = new bootstrap.Modal('#productModal');
        delProductModal = new bootstrap.Modal('#delProductModal');
    }
})

app.component('templateProModal',{
    props:['tempProduct','updateProduct'],
    template: '#templateProModal'
    }
)
app.component('templateDelModel',{
    props:['deleteProduct'],
    template: '#templateDelModel'
    }
)

app.mount("#app");
