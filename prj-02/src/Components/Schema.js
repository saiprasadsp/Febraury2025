export const billerSchemas={
    CreditCard:{
        fields:[
            {
                name:'cardnumber',label:'card Number',type:'text',required:true
            },
            {
                name:'expirydate',label:'Expiry Date',type:'text',required:true
            },
            {
                name:'cvv',label:'CVV',type:'password   ',required:true
            },
        ]
    },
    MobilePostPaid:{
        fields:[{
                name:'mobilenumber',label:'Mobile Number',type:'text',required:true
            }]
    }
}