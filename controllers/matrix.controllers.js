import { Matrix } from "../model/matrix.class.js";

let selectedMx = false;
// const listMatrices = [];

// Matrix
const inpRows = document.querySelector('#inpRows');
const inpColumns = document.querySelector('#inpColumns');
const inpName = document.querySelector('#inpName');
const lblSave = document.querySelector('#lblSave');
const btnSave = document.querySelector('#btnSave');

// Display Matriz
const divListMatrices = document.querySelector('.listMxs');
const lblDisMx = document.querySelector('#lblDisplayMx');

const deleteMxOnList = e => {
    Matrix.delete(e.target.id);
    loadList();

    if(Matrix.list.length < 1){
        lblDisMx.innerHTML = "Debes crear una matriz";
    }
}

const clickMxOnList = e => {
    selectedMx = e.target;
    console.log(selectedMx);
}

document.addEventListener('DOMContentLoaded', () => {
    inpRows.value = 3;
    inpColumns.value = 4;
    inpName.value = 'MxA';
    btnSave.click();
    inpRows.value = 5;
    inpColumns.value = 3;
    inpName.value = 'MxB';
    btnSave.click();
    inpRows.value = 4;
    inpColumns.value = 2;
    inpName.value = 'MxC';
    btnSave.click();
})

const isValidated = (rows, columns, name) => {
    const regExpName = /^[a-zA-Z]+$/;

    return rows > 0 && columns > 0 && name.match(regExpName);
};

// Agregar
btnSave.addEventListener('click', () => {
    const rows = inpRows.value;
    const columns = inpColumns.value;
    const name = inpName.value;

    inpName.focus();
    if (!isValidated(rows, columns, name)){
        lblSave.innerHTML = "Campos incorrectos.";
        return;
    }
    else lblSave.innerHTML = "";

    const mx = new Matrix(rows, columns, name);

    Matrix.add(mx);
    loadList();
    inpRows.value = inpColumns.value = inpName.value = '';
    if(Matrix.list.length > 0){
        lblDisMx.innerHTML = "Seleccione una matriz";
    }
})

divListMatrices.addEventListener('click', () => { }, true);

//#region Functions Aditionals

function loadList(){

    // borrar todas las matrices de la lista
    while (divListMatrices.firstChild)
        divListMatrices.removeChild(divListMatrices.firstChild);

    // cargar todas las matrices desde lista nueva o modificada
    Matrix.list.forEach( (mx, index) => {
        const divMx = document.createElement('div');
        divMx.classList.add('listMxs__item');
        divMx.id = index;
        // hay otro evento para borrar la matriz que debe ejecutarse primero, por eso false
        divMx.addEventListener('click', clickMxOnList, false);

        const p = document.createElement('p');
        p.innerText = mx.name;

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('listMxs__button-quit');
        btnDelete.innerText = 'X';
        btnDelete.id = index;
        btnDelete.addEventListener('click', deleteMxOnList);

        divMx.appendChild(btnDelete);
        divMx.appendChild(p);
        divListMatrices.appendChild(divMx);
    });
}

//#endregion
