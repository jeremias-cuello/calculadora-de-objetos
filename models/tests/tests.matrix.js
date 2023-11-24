import { Matrix } from '../models.matrix.js';

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillCells({rows, columns}, min, max) {
    const mxResult = Array.from({length: rows}, () => Array.from({length: columns}));

    for (let i = 0; i < rows; i++)
        for (let j = 0; j < columns; j++)
            mxResult[i][j] = rnd(min, max);

    return mxResult;
}

function tstTranspose(){
    const mxsTest = [
        new Matrix(2, 2, 'Mx0', [
            [5, 3],
            [1, 4]
        ]),
        new Matrix(11, 4, 'Mx1', [
            [5, 2, 4, 5],
            [0, 5, 6, 8],
            [0, 0, 3 ,5],
            [0, 0, 0, 6],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]),
        new Matrix(4, 8, 'Mx2', [
            [5, 4, 3, 4, 5, 5, 5, 6],
            [0, 6, 5, 3, 5, 8, 7, 5],
            [0, 0, 5, 6, 8, 3, 3, 9],
            [0, 0, 0, 5, 7, 6, 2, 7]
        ]),
        new Matrix(4, 1, 'Mx3', [
            [5],
            [0],
            [0],
            [0]
        ]),
        new Matrix(4, 2, 'Mx4', [
            [5, 1],
            [0, 5],
            [0, 6],
            [0, 7]
        ])
    ];

    mxsTest.forEach(mx => {
        console.group(`${mx.name} Original`);
        console.log(mx.mx);
        console.groupEnd(`${mx.name} Original`);
        console.group(`${mx.name} Traspuesta`);
        console.log(mx.transpose.mx);
        console.groupEnd(`${mx.name} Traspuesta`);
    })
}

function tstIsTriangularIsEscalarIsIdentity() {

    const mxsTest = [
        new Matrix(11, 4, 'mxSup1', [
            [5, 2, 4, 5],
            [0, 5, 6, 8],
            [0, 0, 3 ,5],
            [0, 0, 0, 6],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]),
        new Matrix(4, 8, 'mxSup2', [
            [5, 4, 3, 4, 5, 5, 5, 6],
            [0, 6, 5, 3, 5, 8, 7, 5],
            [0, 0, 5, 6, 8, 3, 3, 9],
            [0, 0, 0, 5, 7, 6, 2, 7]
        ]),
        new Matrix(4, 1, 'mxSup3', [
            [5],
            [0],
            [0],
            [0]
        ]),
        new Matrix(1, 7, 'mxInf1', [
            [654, 0, 0, 0, 0, 0, 0]
        ]),
        new Matrix(5, 4, 'mxInf2', [
            [7, 0, 0, 0],
            [5, 5, 0, 0],
            [5, 6, 6, 0],
            [3, 6, 5, 1],
            [5, 4, 3, 4]
        ]),
        new Matrix(5, 9, 'mxInf3', [
            [7, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 5, 0, 0, 0, 0, 0, 0, 0],
            [5, 6, 6, 0, 0, 0, 0, 0, 0],
            [3, 6, 5, 1, 0, 0, 0, 0, 0],
            [5, 4, 3, 4, 0, 0, 0, 0, 0]
        ]),
        new Matrix(1, 1, 'mxNiSupNiInf1', [
            [654]
        ]),
        new Matrix(4, 3, 'mxNiSupNiInf2', [
            [5, 3, 4],
            [1, 5, 1],
            [7, 6, 6],
            [4, 0, 4]
        ]),
        new Matrix(4, 6, 'mxNiSupNiInf3', [
            [5, 3, 4, 5, 3, 4],
            [1, 5, 1, 1, 5, 1],
            [7, 6, 6, 7, 6, 6],
            [4, 0, 4, 4, 0, 4]
        ]),
        new Matrix(1, 1, 'mxNiSupNiInf4Identity', [
            [1]
        ]),
        new Matrix(7, 7, 'mxSupAndInf', [
            [6, 0, 0, 0, 0, 0, 0],
            [0, 5, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0],
            [0, 0, 0, 9, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 7, 0],
            [0, 0, 0, 0, 0, 0, 9]
        ])
    ];

    mxsTest.forEach(mx => {
        console.group(`${mx.name} (${mx.rows}x${mx.columns})`);
        console.log(`mx.isTriangular = `, mx.isTriangular);
        console.log(`mx.isEscalar = ${mx.isEscalar}`);
        console.log(`mx.isIdentity = ${mx.isIdentity}`);
        console.groupEnd(mx.name);
    })
}

function tstIsSquare(){
    const mxsTest = [
        new Matrix(1, 1, 'Mx0', [
            [5]
        ]),
        new Matrix(2, 2, 'Mx1', [
            [5, 0],
            [6, 8]
        ]),
        new Matrix(3, 4, 'Mx2', [
            [5, 0, 5, 9],
            [4, 3, 7, 4],
            [6, 8, 0, 6]
        ]),
        new Matrix(3, 3, 'Mx3', [
            [5, 0, 9],
            [4, 3, 9],
            [6, 8, 9]
        ])
    ];

    mxsTest.forEach(mx => {
        console.group(mx.name);
        console.log(mx.isSquare);
        console.groupEnd(mx.name);
    })
}

function tstSum() {
    const mxsTest = [
        // [
        //     new Matrix(5, 3, 'SeRompe')
        // ],
        [
            new Matrix(7, 5, 'MxA1'),
            new Matrix(7, 5, 'MxA2')
        ],
        [
            new Matrix(5, 2, 'MxB1'),
            new Matrix(5, 2, 'MxB2'),
            new Matrix(5, 2, 'MxB3')
        ],
        [
            new Matrix(9, 4, 'MxC1'),
            new Matrix(9, 4, 'MxC2'),
            new Matrix(9, 4, 'MxC3'),
            new Matrix(9, 4, 'MxC4'),
            new Matrix(9, 4, 'MxC5')
        ]
    ];

    mxsTest.forEach(mxSumandos => {
        mxSumandos.forEach(mx => mx.mx = fillCells(mx, -20, 50));
    });

    // mxsTest.forEach(mxSumandos => mxSumandos.forEach(mx => console.log(mx)))

    mxsTest.forEach(mxSumandos => {
        console.group(`sumandos ${mxSumandos[0].name[2]}:`);
            mxSumandos.forEach((mxSum, index) => {
                console.log(mxSum.mx);
                if(index < mxSumandos.length - 1) console.log('[+]');
                else console.log('resultado');
            })
            console.log(Matrix.sum(...mxSumandos));
        console.groupEnd(`sumandos ${mxSumandos[0].name[2]}:`);
    })
}

function tstMatrixMultiplication() {
    const mxsTest = [
        new Matrix(5, 3, 'mxA', [
            [3, 5, 7],
            [2, 4, 8],
            [9, 8, 5],
            [6, 7, 3],
            [5, 9, 5]
        ]),
        new Matrix(3, 4, 'mxB', [
            [8, 4, 7, 5],
            [2, 1, 9, 3],
            [1, 8, 4, 7]
        ]),
        new Matrix(4, 2, 'mxC', [
            [3, 5],
            [2, 4],
            [9, 8],
            [6, 7],
        ]),
        new Matrix(2, 1, 'mxD', [
            [2],
            [5]
        ])
    ];

    // mxsTest.forEach(mx => mx.mx = fillCells(mx, -5, 5));
    /* const mxA = mxsTest[0];
    const mxB = mxsTest[1];

    let mxResult = Matrix.matrixMultiplication(mxA, mxB);
    console.log(mxResult);
    mxResult = Matrix.matrixMultiplication(mxResult, mxsTest[2]);
    console.log(mxResult);
    mxResult = Matrix.matrixMultiplication(mxResult, mxsTest[3]);
    console.log(mxResult); */

    const mxResult = Matrix.matrixMultiplication(...mxsTest);
    console.log(mxResult);
}

function tstScalarMultiplication() {
    const mxsTest = [
        new Matrix(2, 3, 'mxA'),
        new Matrix(5, 1, 'mxB'),
        new Matrix(3, 6, 'mxC'),
        new Matrix(1, 5, 'mxD'),
        new Matrix(8, 9, 'mxE'),
        new Matrix(1, 7, 'mxF')
    ];

    mxsTest.forEach(mx => mx.mx = fillCells(mx, -20, 50));
    mxsTest.forEach(mx => {
        const scalar = rnd(-6, 5);
        const result = mx.scalarMultiplication(scalar);

        console.log(mx.toString('matriz'));
        console.log(`scalar: ${scalar}`);
        console.log(result.toString('resultado'));
    });
}

function tstSustraction(){
    const mxsTest = [
        // [
        //     new Matrix(5, 3, 'SeRompe')
        // ],
        [
            new Matrix(7, 5, 'MxA1'),
            new Matrix(7, 5, 'MxA2')
        ],
        [
            new Matrix(5, 2, 'MxB1'),
            new Matrix(5, 2, 'MxB2'),
            new Matrix(5, 2, 'MxB3')
        ],
        [
            new Matrix(9, 4, 'MxC1'),
            new Matrix(9, 4, 'MxC2'),
            new Matrix(9, 4, 'MxC3'),
            new Matrix(9, 4, 'MxC4'),
            new Matrix(9, 4, 'MxC5')
        ]
    ];

    mxsTest.forEach(mxSumandos => {
        mxSumandos.forEach(mx => mx.mx = fillCells(mx, -20, 50));
    });

    mxsTest.forEach(mxSumandos => {
        console.group(`sumandos ${mxSumandos[0].name[2]}:`);
            mxSumandos.forEach((mxSum, index) => {
                console.log(mxSum.mx);
                if(index < mxSumandos.length - 1) console.log('[-]');
                else console.log('resultado');
            })
            console.log(Matrix.sustraction(...mxSumandos));
        console.groupEnd(`sumandos ${mxSumandos[0].name[2]}:`);
    })
}

function tstSubMx() {
    const mxsTest = [
        new Matrix(5, 3, 'mxA'),
        new Matrix(2, 2, 'mxB'),
        new Matrix(8, 6, 'mxC'),
        new Matrix(2, 10, 'mxD'),
    ];

    mxsTest.forEach(mx => mx.mx = fillCells(mx, 1, 5));

    mxsTest.forEach(mx => {
        console.log(mx.toString());
        const rowToDelete = rnd(0, mx.rows - 1);
        const colToDelete = rnd(0, mx.columns - 1);

        console.log(`rowToDelete = ${rowToDelete}`);
        console.log(`colToDelete = ${colToDelete}`);
        const res = mx.subMx(rowToDelete, colToDelete);
        console.log(res.toString());
    })
}

function tstCofactor() {
    const mxsTest = [
        new Matrix(3, 3, 'mxA', [
            [9, 7, 2],
            [5, 3, 9],
            [3, 8, 5]
        ]),
        new Matrix(3, 3, 'mxA', [
            [5, -2, 4],
            [6, 7, -3],
            [3, 0, 2]
        ])
    ];

    const mx = mxsTest[1];
    for (let i = 0; i < mx.rows; i++) {
        for (let j = 0; j < mx.columns; j++) {
            console.log(i, j);
            const result = mx.cofactor(i, j);
            console.log(`cofactor ${result}`);
        }
    }

}

function tstcofactorMx() {
    const mxsTest = [
        new Matrix(3, 3, 'mxA', [
            [9, 7, 2],
            [5, 3, 9],
            [3, 8, 5]
        ]),
        new Matrix(3, 3, 'mxB', [
            [5, -2, 4],
            [6, 7, -3],
            [3, 0, 2]
        ])
        // , new Matrix(2, 4, 'MxC')
    ];

    // mxsTest[2].mx = fillCells(mxsTest[2], -10, 50);

    mxsTest.forEach(mx => {
        console.log(mx.toString('original'));
        const cftMx = mx.cofactorMx;
        console.log(cftMx.toString());
        const adjointMx = mx.adjoinMx;
        console.log(adjointMx.toString());
    })
}

function tstDeterminant() {
    const mxsTest = [
        new Matrix(1, 1, '(1x1)'),
        new Matrix(1, 1, '(1x1)'),
        new Matrix(2, 2, '(2x2)'),
        new Matrix(2, 2, '(2x2)'),
        new Matrix(3, 3, '(3x3)', [
            [5, 3, 6],
            [9, 2, 8],
            [1, 4, 7],
        ]),
        new Matrix(3, 3, '(3x3)', [
            [-5, 11, 11],
            [-5, 16, 3],
            [20, 19, 13]
        ]),
        new Matrix(4, 4, '(4x4)', [
            [19, -3, 14, -8],
            [-9, -6, 17, 19],
            [7, -8, 6, -4],
            [-8, 0, -1, -8]
        ]),
        new Matrix(4, 4, '(4x4)', [
            [7, 6, 16, -6],
            [10, 4, 6, 7],
            [3, 0, 2, 19],
            [9, -7, 0, -3]
        ]),
        new Matrix(5, 5, 'LaPlace(5x5)', [
            [17, -3, -2, 9, 6],
            [2, -3, 5, 5, -4],
            [-3, -2, 2, -8, 1],
            [3, -2, -2, 0, 18],
            [15, 14, -8, 17, -10]
        ]),
        new Matrix(5, 5, 'LaPlace(5x5)', [
            [15, -3, -4, -10, 7],
            [0, 0, 11, 12, 8],
            [19, 12, 17, 18, 5],
            [3, -9, 4, -5, -8],
            [9, -5, 11, 8, 17]
        ])
    ];

    const expected = [86787, -55978];

    /* mxsTest.forEach(mx => {
        if(mx.mx[0][0] === null){
            mx.mx = fillCells(mx, -10, 20)
        }
    }) */;

    for (let i = 8; i < 10; i++) {
        const mxA = mxsTest[i];
        console.log(mxA.toString());
        const result = mxA.determinant
        console.log(`determinante: ${result}`);
        if(expected[i-8] === result){
            console.log('PASOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
        } else {
            console.log('no paso :(');
        }
    }
}

tstDeterminant();
