const validationRules = {
    email: {
      presence: {
        allowEmpty: false,
        message: '^Please enter an email address'
      },
      email: {
        message: '^Invalid email address'
      }
    },
    
    password: {
      presence: {
        allowEmpty: false,
        message: '^Please enter a password'
      },
      length: {
        minimum: 5,
        message: '^Your password must be at least 5 characters'
      }
    },

    confirmPassword: {
        presence: {
            allowEmpty: false,
            message: '^Please enter your password again'
        },
        equality: "password"
    }
  }
  
  export default validationRules;