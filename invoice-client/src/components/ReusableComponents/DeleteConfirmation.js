
import PropTypes from 'prop-types';

const DeleteConfirmation =  ({message,cancelAction,deleteAction}) => {
    return (
        <div className='dialog'>
        <h1 className='dialog-title'>Confirm Deletion</h1>
        <p className='dialog-description'>
          {message}
        </p>
        <div className='dialog-btn-container'>
          <button id='dialog-cancel-btn' onClick={() => cancelAction()}>
            Cancel
          </button>
          <button id='dialog-delete-btn' onClick={() => deleteAction()}>
            Delete
          </button>
        </div>
      </div>
    )
}

DeleteConfirmation.propTypes ={
   message:PropTypes.string.isRequired,
   cancelAction:PropTypes.func.isRequired,
   deleteAction:PropTypes.func.isRequired
}

export default DeleteConfirmation;
