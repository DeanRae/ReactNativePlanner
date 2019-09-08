import validatejs from "validate.js";
import validationRules from './validationRules';

/**
 * Uses validate.js to validate the given fields. Fields are expected to come 
 * in key, value pairs with the key matching one of the keys found in 
 * validationRules. 
 * 
 * It works by extracting the given fields' keys and using those keys to
 * extract only the needed validation constraints from the validationRules. 
 * 
 * It then validates the given fields against those constraints using 
 * validate.js and returns the errors with key,error pairs. Else, if no
 * errors, with key,'' pairs.
 * @param {*} fields 
 */
export const validate = (fields) => {
    const fieldConstraints = {};

    // define the constraints for the validation
    Object.keys(fields).map(field => {
        fieldConstraints[field] = validationRules[field];
    });

    let result = validatejs(fields, fieldConstraints);

    if (!result) {
        // return empty errors
        result =  Object.keys(fields)
        .reduce((obj, field) => (obj[field] = '', obj), {}); // create new object with same keys but empty pairs
    }

    return result;
}