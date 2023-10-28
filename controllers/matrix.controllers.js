import { Matrix } from "../model/matrix.class.js";

let selectedMx = false;
const listMatrices = [];

// Matrix
const inpRows = document.querySelector('#inpRows');
const inpColumns = document.querySelector('#inpColumns');
const inpName = document.querySelector('#inpName');
const btnSave = document.querySelector('#btnSave');

// Display Matriz
const divListMatrices = document.querySelector('.listMxs');

const clickMxOnList = e => {
    selectedMx = e.target;
    console.log(selectedMx);
}

document.addEventListener('DOMContentLoaded', () => {
    inpRows.value = 3;
    inpColumns.value = 4;
    inpName.value = 'MxA';
})

btnSave.addEventListener('click', () => {
    const rows = inpRows.value;
    const columns = inpColumns.value;
    const name = inpName.value;

    const mx = new Matrix(rows, columns, name);

    listMatrices.push(mx);
    loadList();
    inpRows.value = inpColumns.value = inpName.value = '';
    inpName.focus();
})

divListMatrices.addEventListener('click', () => { }, true);

//#region Functions Aditionals

function loadList(){

    // borrar todas las matrices de la lista
    while (divListMatrices.firstChild)
        divListMatrices.removeChild(divListMatrices.firstChild);

    // cargar todas las matrices desde lista nueva o modificada
    listMatrices.forEach( (mx, index) => {
        const divMx = document.createElement('div');
        divMx.classList.add('listMxs__item');
        divMx.id = `Mx${index}`;
        divMx.innerText = mx.name;
        divMx.addEventListener('click', clickMxOnList);
        divListMatrices.appendChild(divMx);
    });
}

//#endregion
