import React from 'react';


const InvoiceStats = ({numberOfStats,type,iconStats,graphicBar}) => {
    
    return (
        <div className="invoice-stats">
            <div className="statistics">
                <h2 className="numberStats">{numberOfStats}</h2>
                <span className="type-stats">{type}</span>
            </div>

            <div className="invoice-graphic-container">
               <img src={iconStats}  alt="icon stats"/>
            </div>

             <div className="graphic-bar-container">
              <img src={graphicBar} alt="graphic bar"/>
            </div> 
        </div>
    )
}

export default InvoiceStats;
