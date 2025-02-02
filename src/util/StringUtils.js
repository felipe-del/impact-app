export function capitalizeFirstLetter(str) {
    if (typeof str !== 'string') return str; // Asegura que el input sea una cadena de texto.

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
