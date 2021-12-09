const mongoose = require('mongoose');
const Customer = mongoose.model('customers');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app =>{


// @route   GET /api/get/customer
// @desc     get all customers
// @access  Private

 app.get('/api/get/customers',requireLogin,async(req,res)=>{
     try{
        const customers = await Customer.find({}).sort({date:-1});
        res.status(200).json(customers);
     }
     catch(err)
     {
        console.error(err)
        res.status(500).json({ msg: 'internal server error' })
     }
 })

 // @route   GET /api/get/customer
// @desc     Get a customer
// @access  Private

 app.get('/api/customer/:id',requireLogin,async(req,res)=>{
     const customerID = req.params.id;
     
     try{
        const customer = await Customer.findById({_id:customerID});
        res.status(200).json(customer);
     }
     catch(err)
     {
        console.error(err)
        res.status(500).json({ msg: 'internal server error' })
     }
 })

 app.get('/api/customer_name/:name',requireLogin,async(req,res)=>{
   
     const customerName = req.params.name;
  
     try{
        const customer = await Customer.find({name:customerName});
        res.status(200).json(customer);
     }
     catch(err)
     {
      console.error(err)
      res.status(500).json({ msg: 'internal server error' })
     }
 })



  
// @route   POST /api/customer
// @desc     store customers to the database
// @access  Private

    app.post('/api/customers',requireLogin, async(req,res)=>{
        const {name,email,phoneNumber,registerDate,amountDue,address,status} = req.body;
      
        try{
             const customerName = await Customer.findOne({name})
             if(customerName) return res.status(201).json({msg:'Customer already exist'});
            
             const newCustomer = await new Customer({name,email,phoneNumber,registerDate,amountDue,address,status}).save()
               return res.status(200).json(newCustomer);
        } catch(err){
            console.error(err)
            res.status(500).json({ msg: 'internal server error' })
        }
    })

// @route   PUT /edit/customer
// @desc    Update customers to the database
// @access  Private
  app.put('/api/edit_customers',requireLogin, async(req,res)=>{
     const {_id,name,email,phoneNumber,status,address} = req.body;
      // console.log(req.body);
      //  console.log("hello from the route")
      const customerFields = {};
       if(name) {customerFields.name = name}
       if(email) {customerFields.email = email}
       if(phoneNumber){customerFields.phoneNumber = phoneNumber}
       if(status){customerFields.status = status}
       if(address) {customerFields.address = address}

     try{
        let customer = await Customer.findById({_id})
        if (!customer) return res.status(404).json({ msg: 'Customer Not Found' })

        customer = await Customer.findByIdAndUpdate(
         _id,
         {$set:customerFields},
         {new:true}
        )
        // console.log(customer)
        res.status(200).json(customer);
     }
     catch(err){
        console.error(err)
        res.status(500).json({ msg: 'internal server error' })
     }


  })

  // @route   GET/customer_names
  // @desc   get all customer names from database
  // @access  Private

 

  app.delete('/api/delete_customer/:id',async(req,res)=>{
      console.log(req.params.id);

      try{
         let customer = await Customer.findById(req.params.id)

         if(!customer) return res.status(404).json({msg:'Customer not found'});
         customer =  await Customer.findByIdAndDelete(req.params.id);
         res.status(200).json(customer._id);

      }
      catch(err)
      {
         console.error(err)
         res.status(500).json({ msg: 'internal server error' })
      }
  })
  


}