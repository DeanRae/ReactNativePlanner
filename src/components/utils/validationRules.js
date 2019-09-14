const validationRules = {
  email: {
    presence: {
      allowEmpty: false,
      message: '^Please enter an email address. '
    },
    email: {
      message: '^Invalid email address '
    }
  },

  password: {
    presence: {
      allowEmpty: false,
      message: '^Please enter a password. '
    },
    length: {
      minimum: 6,
      message: '^Your password must be at least 6 characters '
    }
  },

  confirmPassword: {
    equality: "password"
  }
}

export default validationRules;