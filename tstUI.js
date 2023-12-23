
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
        [3, 3, 'MxG', [
            [5, 7, 6],
            [6, 4, 8],
            [1, 3, 6]
        ]],
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
    // autoOperarMxs([1, 10], 'subtract');
    // autoOperarMxs([12, 13, 14, 15], 'multiply');
})

//#endregion
