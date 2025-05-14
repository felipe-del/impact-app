/**
 * Function to capitalize the first letter of a string and convert the rest to lowercase.
 * @param {string} str - The string to be modified.
 * @return {string} - The modified string with the first letter capitalized and the rest in lowercase.
 */
export function capitalizeFirstLetter(str) {
    if (typeof str !== 'string') return str; // Asegura que el input sea una cadena de texto.

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
