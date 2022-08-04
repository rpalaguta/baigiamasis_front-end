const formValidation = (values, key) => {
  const errors = {}
  // console.log(values.name.length)
  switch (key) {
    case 'register':
      
      break;
    case 'newService':
      if (!values.name) {
        errors.name = 'Name is required!';
      } else if (5 > values.name.length || values.name.length > 100) {
        errors.name = 'Name must be between 5 and 100 symbols';
      }
      if (!values.description) {
          errors.description = 'Description is required!'
      } else if (10 > values.description.length || values.description.length > 255) {
        errors.description = 'Description must be between 10 and 255 symbols';
      }
    default:
      break;
  }
  
  return errors;
}

export default formValidation;