import { Matrix } from "../model/matrix.class.js";

let selectedMx = false;

//#region devTools

const loadMxs = () => {
    const mxs = [
        [3, 4, 'MxA'],
        [5, 3, 'MxB'],
        [2, 2, 'MxD'],
        [3, 4, 'MxE'],
        [7, 3, 'MxF'],
        [4, 3, 'MxG']
    ];

    mxs.forEach(mx => {
        inpRows.value = mx[0];
        inpColumns.value = mx[1];
        inpName.value = mx[2];
        btnSave.click();
    });
};

// autoCompletar valores para hagilizar desarrollo
document.addEventListener('DOMContentLoaded', () => {
    loadMxs();
})

//#endregion

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
const btnSaveValues = document.querySelector('#saveValues');
const mxDisMx = {
    elm: document.querySelector('#vlvDisplayMx'),
    fill({ mx, rows, columns }){
        let sizeHTML = this.elm.children.length;
        const sizeNew = mx.length * mx[0].length;

        // agregar o sacar celdas
        if (sizeHTML > sizeNew) {
            while(this.elm.children.length != sizeNew){
                this.elm.removeChild(this.elm.lastChild);
            }
        } else if (sizeHTML < sizeNew) {
            while (sizeHTML != sizeNew) {
                const inp = document.createElement('input');
                inp.classList.add('celda');
                inp.addEventListener('change', changeCells)
                inp.type = 'number';
                this.elm.appendChild(inp);
                sizeHTML++;
            }
        }

        // setear valores de celdas
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
            this.fill(mx);
        } else this.elm.classList.add('hidden');
    }
}

// Suma
const selectListMxSuma = document.querySelector('#listMxsOperatonSuma');
const ulListMxSelectedSuma = document.querySelector('#listMxSelectedSuma');

// Resta
const selectListMxResta = document.querySelector('#listMxsOperatonResta');
const ulListMxSelectedResta = document.querySelector('#listMxSelectedResta');

// Determinante
const mxSelectedDet = document.querySelector('#inpMxSelected-determinant');

// Cuadrado Magico
const mxSelectedSqr = document.querySelector('#inpMxSelected-magicSquare');

//#endregion

//#region UI Functions

const removeMxListOperation = e => {
    const index = e.target.id.replace('quitMxSelected', '');
    const li = e.target.parentNode;
    const ul = li.parentNode;
    const operation = e.target.parentNode.id.includes('Suma'); // true: suma ; false: resta
    const name = li.childNodes[0].textContent;

    if(ul.firstChild === li && ul.children.length > 1)
        ul.removeChild(li.nextSibling);
    if(ul.children.length > 1 && ul.firstChild !== li){
        ul.removeChild(li.previousSibling);
    }
    ul.removeChild(li);
    if(ul.children.length === 0){
        ul.classList.add('hidden');
    }

    const option = document.createElement('option');
        option.value = index;
        option.innerText = name;

    if(operation) selectListMxSuma.appendChild(option);
    else selectListMxResta.appendChild(option);
}

const selectItemOperation = e => {
    const select = e.target;
    const indexMx = select.value;
    const itemSelected = select.options[select.selectedIndex];
    const operation = e.target.id.includes('Suma') ? 'Suma' : 'Resta';

    select.removeChild(itemSelected);
    const listMx = select.parentNode.children[1];
    listMx.classList.remove('hidden');
    const button = document.createElement('button');
        button.classList.add('listMxs__button-quit');
        button.id = `quitMxSelected${indexMx}`;
        button.innerText = 'X';
        button.addEventListener('click', removeMxListOperation);
    const li = document.createElement('li');
        li.classList.add('listMxsOperation__item');
        li.id = `mxOperation${operation}${indexMx}`;
        li.innerText = itemSelected.innerText;
        li.appendChild(button);

    if(listMx.children.length > 0){
        const hr = document.createElement('hr');
            hr.classList.add('line');
        listMx.appendChild(hr);
    }

    listMx.appendChild(li);

}

const changeCells = () => {
    btnSaveValues.classList.remove('control__button-desactivated');
    btnSaveValues.disabled = false;
}

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
    const result = rows > 0 && columns > 0 && name.match(regExpName);

    if(!result) return 'Campos incorrectos.';
    if(name.length > 10) return 'Nombre muy largo.';

    for (let i = 0; i < Matrix.list.length; i++)
        if(name === Matrix.list[i].name)
            return 'Nombre repetido.';

    return false;
};

const loadList = () => {

    // borra todas las matrices de las listas
    while (divListMatrices.firstChild || selectListMxResta.firstChild || selectListMxSuma.firstChild || ulListMxSelectedSuma.firstChild || ulListMxSelectedResta.firstChild){
        if(ulListMxSelectedSuma.firstChild) ulListMxSelectedSuma.removeChild(ulListMxSelectedSuma.firstChild);
        if(ulListMxSelectedResta.firstChild) ulListMxSelectedResta.removeChild(ulListMxSelectedResta.firstChild);
        if(divListMatrices.firstChild) divListMatrices.removeChild(divListMatrices.firstChild);
        if(selectListMxResta.firstChild) selectListMxResta.removeChild(selectListMxResta.firstChild);
        if(selectListMxSuma.firstChild) selectListMxSuma.removeChild(selectListMxSuma.firstChild);
    }

    ulListMxSelectedSuma.classList.add('hidden');
    ulListMxSelectedResta.classList.add('hidden');

    let option = document.createElement('option');
        option.value = -1;
        option.innerText = 'Seleccione Matrices';
    selectListMxSuma.appendChild(option);
    option = document.createElement('option');
        option.value = -1;
        option.innerText = 'Seleccione Matrices';
    selectListMxResta.appendChild(option);

    // carga todas las matrices desde lista nueva o modificada
    Matrix.list.forEach( (mx, index) => {
        // lista de seleccion
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

        // listas de operacion
        option = document.createElement('option');
            option.value = index;
            option.innerText = mx.name;
        selectListMxResta.appendChild(option);
        option = document.createElement('option');
            option.value = index;
            option.innerText = mx.name;
        selectListMxSuma.appendChild(option);
    });

    selectedMx = false;
    mxSelectedDet.value = mxSelectedSqr.value = "";
    lblDisMx.innerText = "Seleccione una matriz";
    mxDisMx.visible(false);
}

//#endregion

//#region Acciones

// Guardar celdas
btnSaveValues.addEventListener('click', () => {
    if(!selectedMx) return;
    const { mx, rows, columns} = Matrix.list[selectedMx.id];
    const cellsValue = [...mxDisMx.elm.children]
        .map(inp => inp.value.trim() !== '' ? parseFloat(inp.value) : null);

    for (let i = 0; i < rows; i++)
        for (let j = 0; j < columns; j++)
            mx[i][j] = cellsValue[i * columns + j];

    btnSaveValues.disabled = true;
    btnSaveValues.classList.add('control__button-desactivated');
})

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
    const msg = isValidated(rows, columns, name);
    if (msg){
        lblSave.innerHTML = msg;
        return;
    }
    else lblSave.innerHTML = "";

    const mx = new Matrix(rows, columns, name);

    Matrix.add(mx);
    loadList();
    inpRows.value = inpColumns.value = inpName.value = '';
})

selectListMxSuma.addEventListener('change', selectItemOperation);
selectListMxResta.addEventListener('change', selectItemOperation);

//#endregion
