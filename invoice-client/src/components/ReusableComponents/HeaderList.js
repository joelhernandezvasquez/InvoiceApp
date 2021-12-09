import React,{useState,useEffect,useRef} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useToogle from '../Hooks/useToogle';
import UseScreenSize from '../Hooks/UseScreenSize';
import { connect } from 'react-redux';
import { filterInvoices } from '../../actions';


const HeaderList = ({routingName,link,count,filterInvoices,overlay}) => {
  
  const [toggleFilterOptions,toogleFilter] = useToogle(false);
  const [selectedOption,setSelectedOption] = useState(null);
  const filterContainerRef = useRef();
  const screenWidth = UseScreenSize();
  
  useEffect(() => {
    document.body.addEventListener("click",(event)=>{
        if(filterContainerRef.current && filterContainerRef.current.contains(event.target))
        {
          return;
        }
        toogleFilter(false);
    })
  }, [])

  useEffect(() => {
     
    if(selectedOption == null) return;

    
    const updateSelectedOption = async () =>{
      filterInvoices(selectedOption)  
     }

     updateSelectedOption();
  }, [selectedOption])
  
  const selectFilterOption = (e) =>{
     setSelectedOption(e.target.dataset.paymentStatus);
    
    setTimeout(() => {
      toogleFilter(false);
      e.target.checked = false;
     }, 300);


  }

  const closeFilterOption = (e) =>{
    
     if(e.target.matches("span") || e.target.matches("li"))
     {
       e.stopPropagation();
     }
     else
     {
      toogleFilter();
     }
  }
  
  const renderInvoiceCount = () =>{
   if (count == 0) return 'No '
   if(count < 2) return 'There is '
    
  return 'There are '
     
  }
  return (
        
        <div className="header-list">
            <div className="header-list_routing-info">
              <h2 className="routing-name">{routingName}</h2>
              <p className="count-info"> <span> {screenWidth > 767? renderInvoiceCount():(count < 1 &&'No')}  { count>0? count:''} </span> {routingName}</p>
            </div>

            <div className="header-list_btn-containers">
              {routingName ==="Invoice" &&(
                 <div ref={filterContainerRef} className="filter-container" onClick ={(e)=> closeFilterOption(e) }>
                 <label> {screenWidth > 767? 'Filter by status':' Filter'}  </label>
                 <i class={`fa fa-chevron-down dropdown-icon ${toggleFilterOptions?'rotate':''}`}  aria-hidden="true"></i>
                 <div className={`filter-options ${toggleFilterOptions?'show':''}`}>
                    <ul className="filter-options-items" onChange = {(e)=> selectFilterOption(e)}>
                      <li className="item">
                        <input type="checkbox" id="ch-draft" checked={selectedOption ==='Draft'?true:''} data-payment-status = "Draft" />
                        <label for="ch-draft" >
                           <svg viewBox="0 0 20 15">
                           <path d="M0 8l2-2 5 5L18 0l2 2L7 15z" fill-rule="nonzero" />
                           </svg>
                        </label>
                        <span className="label-name">Draft</span>
                        
                      </li>

                      <li className="item">
                        <input type="checkbox" id="ch-pending" checked={selectedOption ==='Pending'?true:''} data-payment-status = "Pending" />
                        <label for="ch-pending" >
                           <svg viewBox="0 0 20 15">
                           <path d="M0 8l2-2 5 5L18 0l2 2L7 15z" fill-rule="nonzero" />
                           </svg>
                        </label>
                        <span className="label-name">Pending</span>
                        
                      </li>

                      <li className="item">
                        <input type="checkbox" id="ch-paid" checked={selectedOption ==='Paid'?true:''}  data-payment-status = "Paid"/>
                        <label for="ch-paid" >
                           <svg viewBox="0 0 20 15">
                           <path d="M0 8l2-2 5 5L18 0l2 2L7 15z" fill-rule="nonzero" />
                           </svg>
                        </label>
                        <span className="label-name">Paid</span>
                        
                      </li>
                    </ul>
                 </div>
             </div>

              )}
              
            
              <Link to={link} className="create-btn">
                <div className="btn-container">
                    <div className="plus-sign-container">
                      <i class="fa fa-plus" id="plus-sign" aria-hidden="true"></i>
                    </div>
                    <span> {screenWidth > 767? `New ${routingName}`:'New'}</span>
                </div>
              </Link>
            </div>
        </div>
    )
}
HeaderList.propTypes = {
    routingName:PropTypes.string.isRequired,
    link:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired
}
const mapStateToProps = (state) =>{
  return{}
}

export default connect(mapStateToProps,{filterInvoices}) (HeaderList);
