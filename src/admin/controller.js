/***************************** HANDLED BUSINESS LOGIC IN THIS CONTROLLER FILE ***************************/
const {verifyToken} = require('../middlewares/auth')
const discountModel = require('./models')
const userModel = require('../signup/models')
const PurchaseDetails = require('../cart/checkout/models')
// const productModel = require('../products/models')


/***************************** GENERATE DISCOUNT CODE FUNCTION, ONLY ADMIN IS AUTHORIZED ***************************/
const generateDiscountCode = async(req, res)=>{
  try {
    const newDiscountCode = new discountModel() // CRRATES NEW DISCOUNT DETAILS
    newDiscountCode.orderNumber = req.body.orderNumber // AT WHAT ORDER NUMBER, USER CAN AVAIL THAT COUPON
    newDiscountCode.discountPercentage = req.body.discountPercentage
    const couponCode = Math.random().toString(36).toUpperCase().substring(2, 15) // LOGIC TO GENERTAE RANDOM COUPON WITH CHARS AND NUMBERS
    newDiscountCode.discountCoupon = couponCode
    await newDiscountCode.save() // SAVE THAT DISCOUNT DETAILS IN THE DATABSE
    return res.status(200).json({
      status: 200,
      data: newDiscountCode
    })
  } catch (error) {
    return res.status(500).send("Something Went Wrong")
  }
}
/***************************** GET TOTAL PURCHASE DETAILS FROM THE DATABASE, ONLY ADMIN IS AUTHORIZED ***************************/
const getTotalPurchaseDetails = async(req, res)=>{
  try {
    const purchaseDetails = await PurchaseDetails.find({}) // FETCH ALL PURCHASE DETAILS
    let totalAmount = 0;
    let discountAmount = 0;
    let countOfItemsPurchased = 0;
    let discountCouponCodes = [];
    for(var i = 0; i<purchaseDetails.length; i++){ // LOOP TO ADD TOTAL AMOUNT, DISCOUNT AMOUNT, COUPON CODE USED AND COUNT OF ITEMS PURCHASED
      totalAmount += purchaseDetails[i].totalAmount;
      discountAmount += purchaseDetails[i].discountedAmount;
      countOfItemsPurchased += purchaseDetails[i].itemDetails.length;
      if(purchaseDetails[i].discountCouponUsed){
        discountCouponCodes.push(purchaseDetails[i].discountCouponUsed);
      }
    }
    res.status(200).json({
      status: 200,
      message: "Total Purchase details",
      totalAmount,
      discountAmount,
      countOfItemsPurchased,
      discountCouponCodes
    })
  } catch (error) {
    return res.status(500).send("Something Went Wrong")
  }
}

module.exports = {generateDiscountCode, getTotalPurchaseDetails}