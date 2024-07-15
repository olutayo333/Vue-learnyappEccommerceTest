<template>
    <div class="container">
        <div class="row"> 
            <div class="col-lg-5 shadow rounded">
                <p class="fs-3 text-warning">Admin Registration </p>
                <form action="" @submit.prevent="signup">
                    <input type="text" class="form-control my-2" placeholder="Full Name" v-model="name" />
                    <input type="email" class="form-control my-2" placeholder="Email" v-model="email" />
                    <input type="number" class="form-control my-2" placeholder="Phone Number" v-model="phonenumber" />
                    <input type="password" class="form-control my-2" placeholder="Password" v-model="password" />
                    <!-- <p>I agree with <a href="">Terms and Conditions</a><span><input type="checkbox" v-model="terms"></span></p> -->
                    <button :disabled="!name && !email && phonenumber && !password" type="submit"  class=" shadow btn btn-warning w-100 mx-auto my-2"> 
                        Submit 
                    </button>
                </form>
                <p>Already have an account?<RouterLink to="/admin/login"> Login Here </RouterLink></p>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from "vue";
    import axios from 'axios';
    // import AdminLogin from '../views/AdminLoginView.vue'
    import UserLogin from '../views/UserLoginView.vue'
    import { RouterLink, RouterView, createRouter, createWebHistory } from "vue-router";
    
    export default {
    data(){
        return{
            router: createRouter({
                history:createWebHistory(),
                routes:[
                       {path:'/login', name:'login', component:UserLogin },
                        // {path:'/register', name:'register', component:UserRegister },
                ],    
            }),
           
            registerURL:"http://localhost:7000/user/register",
            //registerURL:"https://nodejs-mtn.onrender.com/adminregister",
            
            name: "", email : "", phonenumber : "", password : "",
        }
    },

    methods:{
           signup(){
                 
                let obj = {name:this.name, email:this.email, phonenumber:this.phonenumber, password:this.password}
                //console.log(obj);
                axios.post(this.registerURL, obj)
                .then(response=>{
                    //console.log(response);
                    if (response.data.status){
                        alert(response.data.message)
                        this.$router.push('login')
                    }
                    else{
                        alert(response.data.message)
                    }
                })
                .catch(error=>{
                    console.log(error);
                })


        },
    }
}

</script>