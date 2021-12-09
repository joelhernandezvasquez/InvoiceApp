import axios from 'axios'

export const fetchCustomerNames = async () => {
  try {
    const response = await axios.get('/api/get/customers')

    return {
      success: true,
      data: response.data
    }
  } catch (err) {
    return {
      error: true,
      data: err
    }
  }
}

export const fetchCustomerInfo = async customerName => {
  try {
    const response = await axios.get(`/api/customer_name/${customerName}`)
    return {
      success: true,
      data: response.data
    }
  } catch (err) {
    return {
      error: true,
      data: err
    }
  }
}
