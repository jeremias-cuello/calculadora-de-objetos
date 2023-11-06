import { Matrix } from '../models.matrix.js';

function tstIsTriangular() {

    const mxSup = new Matrix(11, 4, 'n/n', [
        [5, 2, 4, 5],
        [0, 5, 6, 8],
        [0, 0, 3 ,5],
        [8, 0, 0, 6],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]);

    const mxSupOtro = new Matrix(4, 8, 'n/n', [
        [5, 4, 3, 4, 5, 5, 5, 6],
        [0, 6, 5, 3, 5, 8, 7, 5],
        [0, 0, 5, 6, 8, 3, 3, 9],
        [0, 0, 0, 5, 7, 6, 2, 7]
    ]);

    const mxSupOtro2 = new Matrix(4, 1, 'n/n', [
        [5],
        [0],
        [0],
        [0]
    ]);

    const mxNiSupNiInf = new Matrix(1, 1, 'n/n', [
        [654]
    ]);

    const mxInf = new Matrix(1, 7, 'n/n', [
        [654, 0, 0, 0, 0, 0, 0]
    ]);

    const mxInfOtro = new Matrix(5, 4, 'n/n', [
        [7, 0, 0, 0],
        [5, 5, 0, 0],
        [5, 6, 6, 0],
        [3, 6, 5, 1],
        [5, 4, 3, 4]
    ]);

    const mxInfOtro2 = new Matrix(5, 9, 'n/n', [
        [7, 0, 0, 0, 0, 0, 0, 0, 0],
        [5, 5, 0, 0, 0, 0, 0, 0, 0],
        [5, 6, 6, 0, 0, 0, 0, 0, 0],
        [3, 6, 5, 1, 0, 0, 0, 0, 0],
        [5, 4, 3, 4, 0, 0, 0, 0, 0]
    ]);

    const mxNiSupNiInfOtro = new Matrix(4, 3, 'n/n', [
        [5, 3, 4],
        [1, 5, 1],
        [7, 6, 6],
        [4, 0, 4]
    ]);

    const mxSupAndInf = new Matrix(7, 7, 'escalar/diagonal', [
        [6, 0, 0, 0, 0, 0, 0],
        [0, 5, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 9, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 7, 0],
        [0, 0, 0, 0, 0, 0, 9]
    ])

    console.group('mxSup.isTriangular');
        console.log(mxSup.isTriangular);
    console.groupEnd('mxSup.isTriangular');

    console.group('mxSupOtro.isTriangular');
        console.log(mxSupOtro.isTriangular);
    console.groupEnd('mxSupOtro.isTriangular');

    console.group('mxSupOtro2.isTriangular');
        console.log(mxSupOtro2.isTriangular);
    console.groupEnd('mxSupOtro2.isTriangular');

    console.group('mxNiSupNiInf.isTriangular');
        console.log(mxNiSupNiInf.isTriangular);
    console.groupEnd('mxNiSupNiInf.isTriangular');

    console.group('mxInf.isTriangular');
        console.log(mxInf.isTriangular);
    console.groupEnd('mxInf.isTriangular');

    console.group('mxInfOtro.isTriangular');
        console.log(mxInfOtro.isTriangular);
    console.groupEnd('mxInfOtro.isTriangular');

    console.group('mxInfOtro2.isTriangular');
        console.log(mxInfOtro2.isTriangular);
    console.groupEnd('mxInfOtro2.isTriangular');

    console.group('mxNiSupNiInfOtro.isTriangular');
        console.log(mxNiSupNiInfOtro.isTriangular);
    console.groupEnd('mxNiSupNiInfOtro.isTriangular');

    console.group('mxSupAndInf.isTriangular');
        console.log(mxSupAndInf.isTriangular);
    console.groupEnd('mxSupAndInf.isTriangular');
}

tstIsTriangular();
