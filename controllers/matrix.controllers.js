import { Matrix } from "../model/matrix.class.js";

let selectedMx = false;

// autoCompletar valores para hagilizar desarrollo
document.addEventListener('DOMContentLoaded', () => {
    inpRows.value = 3;
    inpColumns.value = 4;
    inpName.value = 'MxA';
    btnSave.click();
    inpRows.value = 5;
    inpColumns.value = 3;
    inpName.value = 'MxB';
    btnSave.click();
    inpRows.value = 2;
    inpColumns.value = 2;
    inpName.value = 'MxD';
    btnSave.click();
    inpRows.value = 3;
    inpColumns.value = 4;
    inpName.value = 'MxE';
    btnSave.click();
    inpRows.value = 7;
    inpColumns.value = 3;
    inpName.value = 'MxF';
    btnSave.click();
    inpRows.value = 4;
    inpColumns.value = 3;
    inpName.value = 'MxG';
    btnSave.click();
})

//#region constants

// Matrix
const inpRows = document.querySelector('#inpRows');
const inpColumns = document.querySelector('#inpColumns');
const inpName = document.querySelector('#inpName');
const lblSave = document.querySelector('#lblSave');
const btnSave = document.querySelector('#btnSave');

// Display Matriz
const divListMatrices = document.querySelector('.listMxs');
const lblDisMx = document.querySelector('#lblDisplayMx');
const mxDisMx = {
    elm: document.querySelector('#vlvDisplayMx'),
    fill({ mx, rows, columns }){
        let sizeHTML = this.elm.children.length;
        const sizeNew = mx.length * mx[0].length;

        if (sizeHTML > sizeNew) {
            while(this.elm.children.length != sizeNew){
                this.elm.removeChild(this.elm.lastChild);
            }
        } else if (sizeHTML < sizeNew) {
            while (sizeHTML != sizeNew) {
                const inp = document.createElement('input');
                inp.classList.add('celda');
                inp.type = 'number';
                this.elm.appendChild(inp);
                sizeHTML++;
            }
        }

        const inputs = this.elm.children;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const value = mx[i][j];
                inputs[(i * columns) + j].value = value;
            }
        }
    },
    visible(mx){
        if(mx){
            this.elm.style.gridTemplateRows = `repeat(${mx.rows}, 25px)`;
            this.elm.style.gridTemplateColumns = `repeat(${mx.columns}, 25px)`;
            this.elm.classList.remove('hidden');
            this.fill(mx)
        } else this.elm.classList.add('hidden');
    }
}

// Determinante
const mxSelectedDet = document.querySelector('#inpMxSelected-determinant');

// Cuadrado Magico
const mxSelectedSqr = document.querySelector('#inpMxSelected-magicSquare');

//#endregion

//#region Functions Aditionals

const selectMxInList = e => {
    let divSelected = e.target;
    const { tagName, parentNode } = e.target;

    switch (tagName) {
        case 'BUTTON': return;
        case 'P': divSelected = parentNode; break;
    }

    if(selectedMx === divSelected) return;
    if(selectedMx !== false) selectedMx.classList.remove('listMxs__item-selected');

    selectedMx = divSelected;
    selectedMx.classList.add('listMxs__item-selected');
    lblDisMx.innerText = mxSelectedDet.value = mxSelectedSqr.value = selectedMx.childNodes[1].innerText;

    const mx = Matrix.list[selectedMx.id];
    mxDisMx.visible(mx);

}

const isValidated = (rows, columns, name) => {
    const regExpName = /^[a-zA-Z]+$/;

    return rows > 0 && columns > 0 && name.match(regExpName);
};

const loadList = () => {

    // borra todas las matrices de la lista
    while (divListMatrices.firstChild)
        divListMatrices.removeChild(divListMatrices.firstChild);

    // carga todas las matrices desde lista nueva o modificada
    Matrix.list.forEach( (mx, index) => {
        const divMx = document.createElement('div');
            divMx.classList.add('listMxs__item');
            divMx.id = index;
            divMx.addEventListener('click', selectMxInList, false);

        const p = document.createElement('p');
            p.innerText = `${mx.name}(${mx.rows}x${mx.columns})`;

        const btnDelete = document.createElement('button');
            btnDelete.classList.add('listMxs__button-quit');
            btnDelete.innerText = 'X';
            btnDelete.id = index;
            btnDelete.addEventListener('click', deleteMxOnList);

        divMx.appendChild(btnDelete);
        divMx.appendChild(p);
        divListMatrices.appendChild(divMx);
    });

    selectedMx = false;
    mxSelectedDet.value = mxSelectedSqr.value = "";
    lblDisMx.innerText = "Seleccione una matriz";
    mxDisMx.visible(false);
}

//#endregion

//#region Acciones

// Borrar
const deleteMxOnList = e => {
    Matrix.delete(e.target.id);
    loadList();

    if(Matrix.list.length < 1){
        lblDisMx.innerHTML = "Debes crear una matriz";
    }

    e.stopPropagation();
}

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
})

//#endregion

divListMatrices.addEventListener('click', () => { }, true);
