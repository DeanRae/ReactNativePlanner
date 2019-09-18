/**
 * Capitalizes first letter.
 */
export const firstLetterToUpperCase = (word) => {
    return word.replace(/^./, (str) => { return str.toUpperCase() });
};

/**
 * Splits camel casing.
 */
export const removeCamelCasing = (word) => {
    return word.replace(/([A-Z])/g, ' $1');
};

/**
 * Splits camel casing and capitalizes first letter.
 */
export const createTitleFromFieldName = (fieldName) => {
    return firstLetterToUpperCase(removeCamelCasing(fieldName));
}
