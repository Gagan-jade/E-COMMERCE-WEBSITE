const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignup")
const userSignInController = require("../controller/user/userSignIn")
const userDetailsController = require("../controller/user/userDetails")
const authToken = require("../middleware/authToken")
const userLogout = require("../controller/user/userLogout")
const allUsers = require("../controller/user/allUsers")
const updateUser = require("../controller/user/updateUser")
const UploadProductController = require("../controller/product/uploadProduct")
const getProductController = require("../controller/product/getProduct")
const updateProductController = require("../controller/product/updateProduct")
const getCategoryProduct = require("../controller/product/getCategoryProductOne")
const getProductDetails = require("../controller/product/getProductDetails")
const countAddToCartProduct = require("../controller/user/countAddToCartProduct")
const addToCartController = require("../controller/user/addToCartController")
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct")
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct")
const searchProduct = require("../controller/product/searchProduct")
const addToCartViewProduct = require("../controller/user/addToCartViewProduct")
const filterProductController = require('../controller/product/filterProduct')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//For the admin
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//Products

router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//Cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProdcut",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

module.exports = router


