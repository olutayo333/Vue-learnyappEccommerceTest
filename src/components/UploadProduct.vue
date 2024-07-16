<template>
    <div class="container-fluid mt-5">
         <div class="row">
                <div class="col-lg-6 ">
                    <button class="btn btn-outline-success w-100 " @click="showupload"> Upload Product </button> 
                </div>
                <div class="col-lg-6">
                    <button class="btn btn-outline-success w-100 mx-3 my-1" @click="closeupload">Dashboard </button>
                </div>  
        </div> <br>
        <div class="row">
            <div class="col-lg-9  my-1  py-1">
                <input type="text" placeholder="Search Product By Name" class="form-control" @change="searchFunction" v-model="searchkeyword">
            </div>
            <div class="col-lg-2">
                <button @click="searchFunction" class="btn btn-lg btn-success"> Search </button>
            </div>
        </div> <hr>
        
        <div v-if="onloadstatus" class="row">
            <div class="col-lg-4 my-1 col-lg-2 col-md-3" v-for="each in myArray" :key="each.email" >
                <!-- <div v-if="productArray.length > 0"> -->
                    <div  class="card shadow mx-auto text-left " style="" >
                        <p><button class="btn"><img class="mx-auto d-flex" width="100%"   :src=each.productImage alt=""></button></p>
                        <!-- <img :src=each.productImage alt=""> -->
                        <div class="card-body">
                            <!-- <img class="mx-auto my-2 d-flex" width="180" height="150"  src={{each.product_image}} alt=""> -->
                            <!-- <p><img src={{each.productImage}} alt=""></p> -->
                            <p class="fs-5"> <b>#{{each.productPrice}}</b></p>
                            <p> {{each.productName}}</p>
                            <p>
                                <button @click="editProduct(each)" class="btn btn-small btn-warning me-1">Edit</button> 
                                <button @click="deleteProduct(each)" class="btn btn-small btn-danger ms-1">Delete</button>
                            </p>   
                        </div>
                    </div>
                    <!-- <div v-if="productArray.length<=0">
                        <p>No Products have uploaded yet </p>
                    </div> -->
                <!-- </div> -->
            </div>
        </div>
    
            <!-- UPLOAD PRODUCT -->
        <div class="row">
            <div v-if="uploadStatus" class="col-lg-10 col-11 shadow px-3 py-4  mx-auto ">
                <h1 class="my-4 text-center text-success"><u>Add Product</u></h1>
                <p><span>Upload Product image </span> <input type="file" @change="onFileChange($event)" accept="image/*" name="productImage"></p>
                <input type="text" class="form-control mx-auto my-2" placeholder="Product Name" v-model="productName" name="productName">
                
                <input type="number" class="form-control mx-auto my-2" placeholder="Price" v-model="productPrice" name="productPrice" min="1">
                <!-- <input type="text" class="form-control mx-auto my-2" placeholder="Description" [(ngModel)]= "productDescription" name="productDescription" > -->
                <textarea class="form-control mx-auto my-2" placeholder="Product Description" v-model="productDescription" name="productDescription"></textarea>
                <select class=" my-2 btn btn-small btn-white w-75  mx-auto ms-5 " value={{all}} style="z-index: 1; " v-model="productCategory" name="productCategory">
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Kids Products">Kids Products</option>
                        <option value="Automobile">Automobile</option>
                        <option value="Clothing & Fashion">Clothing & Fashion</option>
                        <option value="Food & Beverages">Food & Beverages</option>
                        <option value="Health & Beauty">Health & Beauty</option>
                </select> 
                
                <input type="number" class="form-control mx-auto my-2" placeholder="Quantity" v-model="productQuantity" name="productQuantity" min="1" >
                
                <button @click="addProduct" class="btn btn-success w-100" > Add Product  </button> <hr>
                <hr>
            </div>
        </div>

        <!-- Edit Product -->
        <div class="row">
            <div v-if="editproductstatus" class="col-lg-10 col-11 shadow px-3 py-4  mx-auto ">
                <h1 class="my-4 text-center text-success"><u>Edit Product</u></h1>
                <img class="mx-auto " width="75%"  :src=editproductImage alt="">
                <p><span>Edit Product image </span> <input type="file" @change="onFileChange($event)" accept="image/*" name="productImage"></p>
                <input type="text" class="form-control mx-auto my-2"  value={{editproductName}} v-model="editproductName" name="productName">    
                <input type="number" class="form-control mx-auto my-2" value={{editproductPrice}} v-model="editproductPrice" name="productPrice" min="1">
                <!-- <input type="text" class="form-control mx-auto my-2" placeholder="Description" [(ngModel)]= "productDescription" name="productDescription" > -->
                <textarea class="form-control mx-auto my-2" value={{editproductDescription}} v-model="editproductDescription" name="productDescription"></textarea>
                <select class=" my-2 btn btn-small btn-white w-75  mx-auto ms-5 " value={{all}} style="z-index: 1; " v-model="editproductCategory" name="productCategory">
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Kids Products">Kids Products</option>
                        <option value="Automobile">Automobile</option>
                        <option value="Clothing & Fashion">Clothing & Fashion</option>
                        <option value="Food & Beverages">Food & Beverages</option>
                        <option value="Health & Beauty">Health & Beauty</option>
                </select> 
                
                <input type="number" class="form-control mx-auto my-2" value={{editproductQuantity}} v-model="editproductQuantity" name="productQuantity" min="1" >
                
                <button @click="confrimedit" class="btn btn-success w-100" > Confirm Edit  </button> <hr>
            </div>

        </div>
    </div>
    
</template>

<script>
 import axios from 'axios';
 import UserLogin from '../views/UserLoginView.vue';
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

        uploadStatus:false,
        //https://nodejs-lernyappeccommercce.onrender.com
        // dashboardURL: "http://localhost:7000/user/getdashboard",
        // productsURL: "http://localhost:7000/user/allproducts",
        // productsUploadURL: "http://localhost:7000/user/productupload",
        //  deleteURL:"http://localhost:7000/user/deleteproduct",
        //  editURL:"http://localhost:7000/user/editproduct",
        dashboardURL: "https://nodejs-lernyappeccommerceserver.onrender.com/user/getdashboard",
        productsURL: "https://nodejs-lernyappeccommerceserver.onrender.com/user/allproducts",
        productsUploadURL: "https://nodejs-lernyappeccommerceserver.onrender.com/user/productupload",
        deleteURL:"https://nodejs-lernyappeccommerceserver.onrender.com/user/deleteproduct",
        editURL:"https://nodejs-lernyappeccommerceserver.onrender.com/user/editproduct",

        productName:"", productPrice:"", productDescription:"", productCategory:"", productQuantity:"", all:"",
        productImageBase64:"", productImageURL:"", email:"",
        productArray:[], myArray:[], searchArray:[], searchkeyword:"",
        editproductName:"", editproductPrice:"", editproductCategory:"", editproductQuantity:"", 
        editproductDescription:"", editproductImage:"", filterStatus:false,
        editproductstatus:false, onloadstatus:true, editproductID:""

    }
 },
 
 mounted(){
            let token = localStorage.token;
            this.email = JSON.parse(localStorage['email'])
            axios.get(this.dashboardURL,{ headers: { "Authorization": `Bearer ${token}`,  "Content-Type": "application/json", "Accept": "application/json" } })
            .then((response)=>{
                //console.log(response);
                if(!response.data.status){
                    alert("Login expired")
                    this.$router.push('/login')
                }
                else{
                    this.name = response.data.user.name;
                    this.phonenumber= response.data.user.phonenumber;
                    
                    axios.get(this.productsURL, { headers: {"Content-Type": "application/json", "Accept": "application/json" }})
                    .then((response)=>{
                        this.productArray= response.data.result
                        this.myArray= this.productArray.filter((u)=>((u.email).match(this.email)))
                        //console.log(this.myArray);
                    })
                }
            })
         
    },

 methods: {
    reload(){
            let token = localStorage.token;
            this.email = JSON.parse(localStorage['email'])
            axios.get(this.dashboardURL,{ headers: { "Authorization": `Bearer ${token}`,  "Content-Type": "application/json", "Accept": "application/json" } })
            .then((response)=>{
                //console.log(response);
                if(!response.data.status){
                    alert("Login expired")
                    this.$router.push('/login')
                }
                else{
                    this.name = response.data.user.name;
                    this.phonenumber= response.data.user.phonenumber;
                    
                    axios.get(this.productsURL, { headers: {"Content-Type": "application/json", "Accept": "application/json" }})
                    .then((response)=>{
                        this.productArray= response.data.result
                        this.myArray= this.productArray.filter((u)=>((u.email).match(this.email)))
                        //   console.log(this.myArray);
                    })
                }
            })
         
    },
    //Converting product Image to Base 64
    onFileChange(e){ 
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file)
        reader.onload=()=>{
        //console.log(reader.result);
        this.productImageBase64=reader.result; //console.log(this.productImage);
        this.generateURL();
        } 
    },
       //Converting product Image to Base 64 for edited product
        onFileChangeEdit(e){ 
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file)
        reader.onload=()=>{
        //console.log(reader.result);
        this.productImageBase64=reader.result; //console.log(this.productImage);
        this.generateURLEdit();
        } 
    },

    //GENERATING IMAGE URL
    generateURL(){
    let obj={myfile:this.productImageBase64}
    axios.post("https://node-modularized.onrender.com/user/upload", obj)
    .then((response)=>{
        //console.log(response)
      if(response.status){
        this.productImageURL=response.data.result.url; 
      }
      else if(!response.status){
        alert("Image Upload failed")
        }
        })
    .catch((err)=>{console.log(err);})
    } ,
    
    //GENERATING IMAGE URL for edited products
    generateURLEdit(){
    let obj={myfile:this.productImageBase64}
    axios.post("https://node-modularized.onrender.com/user/upload", obj)
    .then((response)=>{
        //console.log(response)
      if(response.status){
        this.editproductImage=response.data.result.url; 
      }
      else if(!response.status){
        alert("Image Upload failed")
        }
        })
    .catch((err)=>{console.log(err);})
    } ,
    
    addProduct(){
        let obj ={  
                  productName:this.productName, productPrice:this.productPrice, email:this.email,
                  productCategory:this.productCategory, productQuantity:this.productQuantity,
                  productDescription:this.productDescription, productImage:this.productImageURL,  
                }
        if(this.productImageURL){
            axios.post(this.productsUploadURL, obj)
            .then((response)=>{
                console.log(response);
                if(response.data.status){
                    this.productName=""; this.productPrice=""; this.productCategory=""; 
                    this.productQuantity=""; this.productDescription=""; this.productImageURL="";
                    alert(response.data.message)
                    this.closeupload();
                    this.reload();
                }
                else{
                    alert("Product Upload Failed")
                }
            })
            .catch((err)=>{console.log(err);}) 
        }
        else{
            alert("Please wait for image to upload")
        }
    },
    editProduct(each){
    //    productName, productPrice, productCategory, productQuantity, productDescription; productImage
        this.onloadstatus=false; this.editproductstatus= true; 
        this.editproductID = each._id;
        this.editproductName=each.productName; this.editproductPrice=each.productPrice;
        this.editproductCategory=each.productCategory; this.editproductQuantity=each.productQuantity;
        this.editproductDescription=each.productDescription; this.editproductImage=each.productImage;
        
        //console.log(this.editproductImage);
          
    },
    
    confrimedit(){
       let obj ={  
                  productName:this.editproductName, productPrice:this.editproductPrice, email:this.email,
                  productCategory:this.editproductCategory, productQuantity:this.editproductQuantity,
                  productDescription:this.editproductDescription, productImage:this.editproductImage, productID:this.editproductID 
                }
                if(this.editproductImage){
                    axios.post(this.editURL, obj)
                    .then((response)=>{
                        console.log(response);
                        if(response.data.status){
                            this.productName=""; this.productPrice=""; this.productCategory=""; 
                            this.productQuantity=""; this.productDescription=""; this.productImageURL="";
                            alert(response.data.message)
                            this.reload();
                            this.closeupload();
                            
                        }
                        else{
                            alert("Product Upload Failed")
                        }
                    })
                    .catch((err)=>{console.log(err);}) 
                }
                else{
                    alert("Please wait for image to upload")
                }
    },

    deleteProduct(each){
         let productID = each._id
         let obj = {email:this.email, id:productID}
         axios.post(this.deleteURL, obj)
         .then((response)=>{
            console.log(response);
            if(response.data.status){
                alert("Product Deleted Successfully")
                this.reload()
            }
            else{
                alert("Could not Delete Product")
            }
         })
    },

    showupload(){
       this.uploadStatus=true;
       this.onloadstatus=false;
       this.filterStatus=false;
       this.editProduct=false;
    },
    closeupload(){
        this.uploadStatus=false;
        this.onloadstatus=true;
        this.editproductstatus=false;
        this.filterStatus=false;
    },
    showedit(){
        this.editproductstatus=true;
         this.uploadStatus=false;
         this.filterStatus=false;
         this.onloadstatus=false
    },
    searchFunction(){
        console.log(this.searchkeyword);
         this.searchArray= this.myArray.filter((u)=>(((u.productName).toLowerCase()).match((this.searchkeyword).toLowerCase())))
         console.log(this.searchArray);
    },
    showFilter(){
        this.filterStatus = true;
        this.uploadStatus=false;
        this.onloadstatus=false;
        this.editproductstatus=false;
    },
 }

}
</script>
