import { Matrix } from "../models/models.matrix.js";
let selectedMx = false;

//#region devTools

const autoLoadMxs = () => {
    const mxs = [
        [3, 4, 'MxA'],
        [5, 3, 'MxB', [
            [5, 4, 6],
            [9, 6, 8],
            [1, 0, 4],
            [8, 1, 6],
            [7, 6, 0]
        ]],
        [5, 3, 'MxC', [
            [5, 7, 9],
            [0, 3, 5],
            [1, 0, -6],
            [4, 1, 5],
            [5, 1, -3]
        ]],
        [2, 2, 'MxD'],
        [4, 4, 'MxE'],
        [7, 3, 'MxF'],
        [3, 3, 'MxG'],
        [5, 5, 'MxH'],
        [7, 7, 'MxI'],
        [10, 10, 'MxJ'],
        [5, 3, 'MxL', [
            [2, 3, 5],
            [5, 7, 6],
            [1, 2, 6],
            [3, 8, 4],
            [1, 8, 0]
        ]],
        [3, 7, 'MxK'],
        [5, 3, 'MulmxA', [
            [3, 5, 7],
            [2, 4, 8],
            [9, 8, 5],
            [6, 7, 3],
            [5, 9, 5]
        ]],
        [3, 4, 'MulmxB', [
            [8, 4, 7, 5],
            [2, 1, 9, 3],
            [1, 8, 4, 7]
        ]],
        [4, 2, 'MulmxC', [
            [3, 5],
            [2, 4],
            [9, 8],
            [6, 7],
        ]],
        [2, 1, 'MulmxD', [
            [2],
            [5]
        ]],
        [2, 2, 'SquareA']
    ];

    mxs.forEach(mx => {
        inpRows.value = mx[0];
        inpColumns.value = mx[1];
        inpName.value = mx[2];
        btnSave.click();
    });

    const mxsToFill = mxs.filter(mx => mx[3]);
    mxsToFill.forEach((mx) => {
        const divSelected = divListMatrices.children[mxs.indexOf(mx)];
        divSelected.click();
        const cells = [...document.querySelectorAll('.cell')];
        for (let i = 0; i < mx[0]; i++)
            for (let j = 0; j < mx[1]; j++)
                cells[(i * mx[1]) + j].value = mx[3][i][j];
        selectedMx = divSelected;
        btnSaveValues.disabled = false;
        btnSaveValues.click();
    });
};

/**
 * @param {[number]} indexs
 * @param {string} operation { 'sum', 'substract', 'multiply' }
 */
const autoOperarMxs = (indexs, operation) => {
    // sacar las matrices en lista para operar
    [...ulListMxSelectedOperations.children]
        .filter(e => e.tagName === 'LI')
        .map(li => [...li.children].filter(e => e.tagName === 'BUTTON')[0])
        .forEach(btn => btn.click())

    selectListOperations.value = operation;
    selectListOperations.dispatchEvent(new Event('change'))
    indexs.forEach(ind => {
        selectListMxsOperations.value = ind;
        selectListMxsOperations.dispatchEvent(new Event('change'));
    });
    btnOperations.click();
}

// autoCompletar valores para hagilizar desarrollo
document.addEventListener('DOMContentLoaded', () => {
    autoLoadMxs();
    autoOperarMxs([1, 10], 'subtract');
    autoOperarMxs([12, 13, 14, 15], 'multiply');
})

//#endregion

//#region constants

// Matrix
const inpRows = document.querySelector('#inpRows');
const inpColumns = document.querySelector('#inpColumns');
const inpName = document.querySelector('#inpName');
const lblSave = document.querySelector('#lblSave');
const btnSave = document.querySelector('#btnSave');
let saveResult = false;

// Display Matriz
const divListMatrices = document.querySelector('.listMxs');
const lblDisMx = document.querySelector('#lblDisplayMx');
const btnSaveValues = document.querySelector('#saveValues');
const btnSaveMatrix = document.querySelector('#saveMatrix');
const mxDisMx = {
    elm: document.querySelector('#vlvDisplayMx'),
    mxVisible: null,
    visible(matrix, isResult){
        if(matrix){
            this.mxVisible = matrix;
            lblDisMx.innerText = matrix.name;
            const { mx, rows, columns } = matrix;
            this.elm.style.gridTemplateRows = `repeat(${rows}, 25px)`;
            this.elm.style.gridTemplateColumns = `repeat(${columns}, 25px)`;
            this.elm.classList.remove('hidden');
            let cntInps = this.elm.children.length;
            const cntCells = mx.length * mx[0].length;

            // agregar o sacar celdas
            if (cntInps > cntCells)
                while(this.elm.children.length > cntCells)
                    this.elm.removeChild(this.elm.lastChild);
            else if (cntInps < cntCells)
                while (cntInps < cntCells) {
                    const inp = document.createElement('input');
                    inp.classList.add('cell');
                    inp.addEventListener('change', changeCells)
                    inp.type = 'number';
                    this.elm.appendChild(inp);
                    cntInps++;
                }

            // setear valores de celdas
            const inputs = this.elm.children;
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    const value = mx[i][j];
                    inputs[(i * columns) + j].value = value;
                }
            }

            if(isResult) {
                inpMxSelected.value = '';
                btnSaveValues.classList.add('hidden');
                btnSaveMatrix.classList.remove('hidden');
                [...document.querySelectorAll('.cell')]
                    .forEach(inp => inp.setAttribute('readonly', true))
            } else {
                inpMxSelected.value = matrix.name;
                btnSaveValues.classList.remove('hidden');
                btnSaveMatrix.classList.add('hidden');
                [...document.querySelectorAll('.cell')]
                    .forEach(inp => inp.removeAttribute('readonly'))
            }
        } else {
            this.mxVisible = null;
            this.elm.classList.add('hidden');
            inpMxSelected.value = '';
            lblDisMx.innerText = "Seleccione una matriz";
        }
    }
}

// Operaciones
const selectListOperations = document.querySelector('#listOperations');
const selectListMxsOperations = document.querySelector('#listMxsOperations');
const ulListMxSelectedOperations = document.querySelector('#listMxSelectedOperations');
const btnOperations = document.querySelector('#btnOperations');
const lblOperations = document.querySelector('#lblOperations');

// Operaciones Unarias
const selectListOperationsUnary = document.querySelector('#listOperations');
const inpMxSelected = document.querySelector('#mxSelectedOpertaionsUnary');
const btnOperationsUnary = document.querySelector('#btnOperationsUnary');

//#endregion

//#region UI Functions

const removeMxListOperation = e => {
    const index = e.target.id.replace('quitMxSelected', '');
    const li = e.target.parentNode;
    const ul = li.parentNode;
    const name = li.childNodes[0].textContent;

    if(ul.firstChild === li && ul.children.length > 1) ul.removeChild(li.nextSibling);
    if(ul.children.length > 1 && ul.firstChild !== li) ul.removeChild(li.previousSibling);
    ul.removeChild(li);
    if(ul.children.length === 0) ul.classList.add('hidden');

    const option = document.createElement('option');
        option.value = index;
        option.innerText = name;

    selectListMxsOperations.appendChild(option);
}

const selectItemOperation = e => {
    const select = e.target;
    const indexMx = select.value;
    const itemSelected = select.options[select.selectedIndex];

    select.removeChild(itemSelected);
    const listMx = ulListMxSelectedOperations;
    listMx.classList.remove('hidden');
    const button = document.createElement('button');
        button.classList.add('listMxs__button-quit');
        button.id = `quitMxSelected${indexMx}`;
        button.innerText = 'X';
        button.addEventListener('click', removeMxListOperation);
    const li = document.createElement('li');
        li.classList.add('listMxsOperation__item');
        li.id = `mxOperation${indexMx}`;
        li.innerText = itemSelected.innerText;
        li.appendChild(button);

    if(listMx.children.length > 0){
        const hr = document.createElement('hr');
            hr.classList.add('line');
        listMx.appendChild(hr);
    }

    listMx.appendChild(li);
}

function changeSelectOperations(){
    if(selectListOperations.value < 0) { // selectListOperations.value : { -1, 'sum', etc.}
        btnOperations.classList.add('hidden');
        lblOperations.innerText = '';
    }
    else btnOperations.classList.remove('hidden')
}

const changeCells = () => {
    btnSaveValues.classList.remove('control__button-desactivated');
    btnSaveValues.disabled = false;
}

const selectMxInList = e => {
    const { tagName, parentNode } = e.target;
    const divSelected = tagName === 'P' ? parentNode : e.target;

    if(selectedMx === divSelected) return;
    if(selectedMx !== false) selectedMx.classList.remove('listMxs__item-selected');

    selectedMx = divSelected;
    selectedMx.classList.add('listMxs__item-selected');

    const index = selectedMx.id.replace('mxList', '');
    const mx = Matrix.list[index];
    mxDisMx.visible(mx);
}

const isValidated = (rows, columns, name) => {
    const regExpName = /^[a-zA-Z]+$/;
    const result = rows > 0 && columns > 0 && name.match(regExpName);

    if(!result) return 'Campos incorrectos.';
    if(name.length > 10) return 'Nombre muy largo.';

    for (let i = 0; i < Matrix.list.length; i++)
        if(name.toLowerCase() === Matrix.list[i].name.toLowerCase())
            return 'Nombre repetido.';

    return false;
};

const loadList = () => {

    // borra todas las matrices de las listas
    while (divListMatrices.firstChild || selectListMxsOperations.firstChild || ulListMxSelectedOperations.firstChild){
        if(divListMatrices.firstChild) divListMatrices.removeChild(divListMatrices.firstChild);
        if(selectListMxsOperations.firstChild) selectListMxsOperations.removeChild(selectListMxsOperations.firstChild);
        if(ulListMxSelectedOperations.firstChild) ulListMxSelectedOperations.removeChild(ulListMxSelectedOperations.firstChild);
    }

    ulListMxSelectedOperations.classList.add('hidden');

    let option = document.createElement('option');
        option.value = -1;
        option.innerText = 'Seleccione Matrices';
    selectListMxsOperations.appendChild(option);

    // carga todas las matrices desde lista nueva o modificada
    Matrix.list.forEach( (mx, index) => {
        // lista de seleccion
        const divMx = document.createElement('div');
            divMx.classList.add('listMxs__item');
            divMx.id = `mxList${index}`;
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
            option.innerText = `${mx.name}(${mx.rows}x${mx.columns})`;
            selectListMxsOperations.appendChild(option);
    });

    selectedMx = false;
    mxDisMx.visible(false);
}

//#endregion

//#region Acciones

// Guardar celdas
btnSaveValues.addEventListener('click', () => {
    if(!selectedMx) return;
    const index = selectedMx.id.replace('mxList', '');
    const { mx, rows, columns} = Matrix.list[index];
    const cellsValue = [...mxDisMx.elm.children]
        .map(inp => inp.value.trim() !== '' ? parseFloat(inp.value) : null);

    for (let i = 0; i < rows; i++)
        for (let j = 0; j < columns; j++)
            mx[i][j] = cellsValue[i * columns + j];

    btnSaveValues.disabled = true;
    btnSaveValues.classList.add('control__button-desactivated');
});

// Guardar Matriz Resultante
btnSaveMatrix.addEventListener('click', () => {
    // desactivar todo
    document.querySelector('#div-operations').classList.add('hidden');
    document.querySelector('#div-operationsUnary').classList.add('hidden');
    divListMatrices.classList.add('hidden');

    // preparar guardar matriz
    lblSave.innerText = '';
    inpRows.value = mxDisMx.mxVisible.rows;
    inpRows.setAttribute('readonly', true);
    inpColumns.value = mxDisMx.mxVisible.columns;
    inpColumns.setAttribute('readonly', true);
    inpName.focus();
    saveResult = true;
});

// Borrar Matriz
const deleteMxOnList = e => {
    Matrix.delete(e.target.id);
    loadList();

    if(Matrix.list.length < 1){
        lblDisMx.innerHTML = "Debes crear una matriz";
    }

    e.stopPropagation();
}

// Guardar Matriz
btnSave.addEventListener('click', () => {
    const rows = parseInt(inpRows.value);
    const columns = parseInt(inpColumns.value);
    const name = inpName.value;

    inpName.focus();
    const msg = isValidated(rows, columns, name);
    if (msg){
        lblSave.innerHTML = msg;
        return;
    }
    else lblSave.innerHTML = "";

    let mx = null;
    if(saveResult){
        mx = new Matrix(rows, columns, name, mxDisMx.mxVisible.mx);
        document.querySelector('#div-operations').classList.remove('hidden');
        document.querySelector('#div-operationsUnary').classList.remove('hidden');
        divListMatrices.classList.remove('hidden');
        inpColumns.removeAttribute('readonly');
        inpRows.removeAttribute('readonly');
        saveResult = false;
    } else {
        mx = new Matrix(rows, columns, name);
    }

    Matrix.add(mx);
    loadList();
    inpRows.value = inpColumns.value = inpName.value = '';
})

selectListMxsOperations.addEventListener('change', selectItemOperation);
selectListOperations.addEventListener('change', changeSelectOperations);

btnOperations.addEventListener('click', () => {
    const mxs = [...ulListMxSelectedOperations.children]
        .filter(li => li.tagName === 'LI')
        .map(li => {
            const index = li.id.replace('mxOperation', '');
            return Matrix.list[index];
    });

    if(selectedMx){
        selectedMx.classList.remove('listMxs__item-selected');
        selectedMx = false;
        inpMxSelected.value = '';
    }
    const operation = selectListOperations.options[selectListOperations.selectedIndex].innerText.toLowerCase();
    let mxResult = null;
    try {
        switch (operation) {
            case 'suma':
                mxResult = Matrix.sum(...mxs);
                break;
            case 'resta':
                mxResult = Matrix.sustraction(...mxs);
                break;
            case 'multiplicación matricial':
                mxResult = Matrix.matrixMultiplication(...mxs);
                break;
        }

        lblOperations.innerHTML = '';
    } catch (err) {
        lblOperations.innerHTML = err;
        mxDisMx.visible(false);
    }

    mxDisMx.visible(mxResult, true);
})

//#endregion
