
import PropTypes from 'prop-types';

const EmptyData = ({description,illustration}) => {

    return (
        <div className="empty-data-container">
         <img className="empty-data-illustration" src={illustration} alt="illustration"/>
          <div className="empty-data-content">
              <h2 className="empty-data-content-title">There is nothing here</h2>
              <div className="content-description-container">
                <p className="empty-data-content-description"> Create {description} by clicking the <span> New </span>
                    button and get started.
                </p>
              </div>
              
          </div>
        </div>
    )
}

EmptyData.propTypes ={
    description:PropTypes.string.isRequired,
   illustration:PropTypes.string.isRequired,
  
}

export default EmptyData;
