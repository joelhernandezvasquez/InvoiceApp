const mongoose = require('mongoose');
const Invoice = mongoose.model('invoices');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app =>{
     
// @route   POST /api/invoices
// @desc     store invoices to the database
// @access  Private
    app.post('/api/invoices',requireLogin,async(req,res)=>{
        
        const {invoiceNumber,dueDate,customer,totalAmount,status} = req.body;

        try{
           const invoice = await Invoice.findById({invoiceNumber})
          if(invoice) return res.status(201).json({msg:'Invoice already exist '}) 
          
          const newInvoice = await new Invoice({invoiceNumber,dueDate,customer,totalAmount,status}).save()
          return res.status(200).json(newInvoice);
          
        }
        catch(err)
        {
            console.error(err)
          res.status(500).json({ msg: 'internal server error' })
        }
    })

// @route   GET /api/get/invoices
// @desc     fetch all invoices
// @access  Private
    app.get('/api/get/invoices',requireLogin, async(req,res)=>{
       try{
           const invoices = await Invoice.find({}).sort({date:-1});
           return res.json(invoices);
       }
       catch(err)
       {
        console.error(err)
        res.status(500).json({ msg: 'internal server error' })
       }
})

}