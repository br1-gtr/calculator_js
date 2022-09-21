const display = document.getElementById('display');
const displayOp = document.getElementById('displayOp');
const keys = document.getElementById('keys');

let valueOne = "0";
let valueTwo;
let valueState = false; 
let aux; //Aplica para bloquear operadores antes de ingresar un valor.
let dotState = false;
let result;
let op;
let er = false;

const clearCalculator = () => { //Reset displays
    location.reload(); 
}

const setValue = (v) => {
    if (!valueState) { //Asigna valor de display a valueOne
        if (valueOne === "0" && v !== "." || valueOne === result && valueTwo === undefined ){ //Validación de cero o estado
            //console.log("check222");
            valueOne = v;
            display.textContent = valueOne;
        } else {
            if (v === '.' && dotState === false && valueOne.length < 9){ //Validación de coma y asignacion de valores
                valueOne = valueOne.concat(v);
                display.textContent = valueOne;
                dotState = true;
            } else if (v !== '.' && valueOne.length < 9){
                valueOne = valueOne.concat(v);
                display.textContent = valueOne;
            }
        }
    } else { //Asigna valor de display a valueTwo
        if(valueTwo === undefined){ //Validación de cero o estado
            valueTwo = v;
            display.textContent = valueTwo;
        }else {
            if (v === '.' && dotState === false && valueTwo.length < 9){ //Validación de coma y asignacion de valores
                valueTwo = valueTwo.concat(v);
                display.textContent = valueTwo;
                dotState = true;
            } else if (v !== '.' && valueTwo.length < 9){
                valueTwo = valueTwo.concat(v);
                display.textContent = valueTwo;
            }
        }
    }
    aux = true;
}
getOperator = (v) => {
    if(valueTwo){ //Si existe valueTwo realiza la operacion para continuar concatenando operaciones sin necesidad de ejecutar el "="
        ejecuteOp();
    }
    if(aux !== undefined){
        op = v;
        displayOp.textContent = op;
        valueState = true;
    }
    dotState = false;       
}
 ejecuteOp = () => {
    valueOne = Number(valueOne)
    valueTwo = Number(valueTwo)
    switch (op){
            case '+':
                result = valueOne + valueTwo; 
                break;
            case '-':
                result = valueOne - valueTwo; 
                break;
            case 'X':
                result = valueOne * valueTwo; 
                break;
            case '/':
                (valueTwo === 0) ? (display.textContent = "Error",
                                    er = true,
                                    setTimeout(()=>{
                                        alert("Error") 
                                        clearCalculator()
                                    },15))
                                 :result = valueOne / valueTwo; 
                break;        
    }
    console.log(result);
    result = !Number.isInteger(result) ? Number.parseFloat(result).toFixed(2) : result;
    console.log(result);
    if(result.toString().length > 8){
        display.textContent = "Error";
        setTimeout(()=>{
            alert("Error");
            clearCalculator()
        },15)
    }else if(er === false){
        display.textContent = result;
        displayOp.textContent = ""
        valueOne = result; //El total(result) pasa a resultado y se transforma a valueTwo en undefined para realizar nueva op
        valueTwo = undefined;
        valueState = false; //En caso de ingresar un valor en vez de un signo,se asigna a valueOne
        op = undefined;
    }
}

const main = (e) => {
    const target = e.target;
    const dtTarget = target.dataset;
    if(dtTarget.num){
        //console.log(target.textContent);
        setValue(target.textContent);
    }
    if(dtTarget.math){ 
        getOperator(target.textContent);
    }
    if(dtTarget.op){
        if (dtTarget.op === "clear") {
            clearCalculator()
        } else {
            if(valueOne !== '0' && valueTwo !== undefined){ //Previene la ejecucion de la operacion al precionar "=" en caso  de no contar con ambos valores asignados
                ejecuteOp()
            }    
        }
    }
}

keys.addEventListener('click', e => {
    const target = e.target;
    const dtTarget = target.dataset;
    if(dtTarget.num){
        //console.log(target.textContent);
        setValue(target.textContent);
    }
    if(dtTarget.math){ 
        getOperator(target.textContent);
    }
    if(dtTarget.op){
        if (dtTarget.op === "clear") {
            clearCalculator()
        } else {
            if(valueOne !== '0' && valueTwo !== undefined){ //Previene la ejecucion de la operacion al precionar "=" en caso  de no contar con ambos valores asignados
                ejecuteOp()
            }    
        }
    }
});
/* Funcionalidad TECLADO / in progress...
const body = document.querySelector('BODY')
body.addEventListener('keypress', e =>{
    console.log('tecla ',e.key);
})
let regExp00 = /[0-9*+/.-]/
let numero00 = '.';
console.log(regExp00.test(numero00));
*/