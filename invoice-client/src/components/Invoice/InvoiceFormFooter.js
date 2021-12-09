import React from 'react'

const InvoiceFormFooter = ({status}) => {
    return (
        
        <div className="menu-invoice-footer">
          <div className="first-col">
            <button className=" btn-form btn-discard"> Discard</button>
          </div>
          
          <div className="second-col"> 
             <button className=" btn-form btn-draft"> Save as Draft</button>
          <button className=" btn-form btn-save" type="submit"> Save & Send</button>
          </div>
         
        </div>
    )
}

export default InvoiceFormFooter;
