

const useFormatDate = () => {
 
const setDateFormat = (value) =>{
  const dateFormat = new Date(value);
  return (`${dateFormat.getDate()} ${dateFormat.toLocaleString('default', { month: 'long' })} ${dateFormat.getFullYear()}`)
}
  
  return [setDateFormat];
}

export default useFormatDate;
