module.exports = {
    add: (num1, num2) => {
        if (isNaN(num1) || isNaN(num2)) {
            throw new Error( "Valores inválidos");
        }
        return num1 + num2;
    },
    sustraction: (num1, num2) => {
        if (isNaN(num1) || isNaN(num2)) {
            throw new Error( "Valores inválidos");
        }
        return num1 - num2;
    },
    multiplication: (num1, num2) => {
        if (isNaN(num1) || isNaN(num2)) {
            throw new Error( "Valores inválidos");
        }
        return num1 * num2;
    },
    division: (dividend, divisor) => {
        if (isNaN(dividend) || isNaN(divisor)) {
            throw new Error( "Valores inválidos");
        } if (divisor == 0) {
            throw Error( "División por cero");
        }
        return dividend / divisor;
    },
    sumArray: (values) => {
        if (values instanceof Array) {
            let sumaArray = values.reduce((acumulador, numero) => acumulador + numero);
            if (isNaN(sumaArray)) {
                throw new Error( "Valores inválidos");
            }//Retornar suma de array
            return sumaArray;
        }
    },
}

