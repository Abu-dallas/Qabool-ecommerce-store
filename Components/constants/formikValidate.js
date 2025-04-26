export const validateAdminReg = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Name is Required";
  }
  if (!values.email) {
    errors.email = "Email is Required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be greater than 5";
  }
  if (!values.phone) {
    errors.phone = "Phone Number is required";
  }
  if (!values.cpassword) {
    errors.cpassword = "Confirm your password";
  } else if (values.cpassword !== values.password) {
    errors.cpassword = "Password does not match";
  }

  return errors;
};

export const validateProduct = (values) => {
  let errors = {};
  if (!values.title) {
    errors.title = "Title is Required";
  }
  if (!values.price) {
    errors.price = "Price is required";
  }
  if (!values.description) {
    errors.description = "Description is required";
  }

  return errors;
};

export const validateEditAdmin = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Name is Required";
  }
  if (!values.email) {
    errors.email = "Email is Required";
  }
  if (!values.phone) {
    errors.phone = "Phone Number is required";
  }
  return errors;
};

export const validateLogin = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "enter your email";
  }
  if (!values.password) {
    errors.password = "password is required";
  }

  return errors;
};
