
import React,{useState,useEffect} from 'react';

const Pagination = ({totalItem,rangePerPage,setPage}) => {
    
    const numbersPage = [];
    const[currentPage,setCurrentPage] = useState(1);
    
   for(let i=1;i<=Math.ceil(totalItem/rangePerPage);i++)
   {
       numbersPage.push(i);
   }
   
   useEffect(()=>{
     setPage(currentPage);
   },[currentPage])

   
    return (
        <div className="pagination">
          <ul className="pagination-items">
           <i className= {`fa fa-chevron-left arrow ${currentPage===1?'disactive':null}`} aria-hidden="true" onClick = { currentPage!==1?()=> setCurrentPage(currentPage - 1):null} ></i>
         
          { numbersPage.map(number =>{
              return (
                
               <div className={`item ${currentPage===number?'current-page':null}`} onClick = {()=> setCurrentPage(number)}>
                   <li>{number}</li>
               </div>
               
              )
          }) }

           <i class={`fa fa-chevron-right arrow ${currentPage === numbersPage.length ? 'disactive':null}`} aria-hidden="true"  onClick = {currentPage!==numbersPage.length? ()=> setCurrentPage(currentPage + 1):null}></i>
          </ul>
         
        </div>
    )
}

export default Pagination;
