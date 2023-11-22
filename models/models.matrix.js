class Matrix {
    /**
     * @param {number} rowsParam cantidad de filas
     * @param {number} columnsParam cantidad de columnas
     * @param {[...[number]]} valuesParam matriz
     */
    constructor(rowsParam, columnsParam, nameParam, valuesParam) {
        if(valuesParam !== undefined && rowsParam !== undefined && columnsParam !== undefined && nameParam !== undefined){
            this.rows = rowsParam;
            this.columns = columnsParam;
            this.mx = valuesParam;
            this.name = nameParam;
        } else if(rowsParam !== undefined && columnsParam !== undefined && nameParam !== undefined){
            this.rows = rowsParam;
            this.columns = columnsParam;
            this.mx = Array.from({length: this.rows}, () => Array.from({length: this.columns}).fill(null));
            this.name = nameParam;
        }
        else {
            this.rows = 1;
            this.columns = 1;
            this.mx = Array.from({length: this.rows}, () => Array.from({length: this.columns}).fill(null));
            this.name = 'n/n';
        }
    }

    get mx(){ return this._mx; }
    set mx(value){
        if(value.length === this.rows && value[0].length === this.columns)
            this._mx = value;
        else throw new Error('Filas y columnas no coincidentes con los coeficientes.');
    }

    get mxString(){
        let result = '\n';

        for (let i = 0; i < this.rows; i++) {
            result += `  [${this.mx[i].join(', ')}]\n`;
        }

        return result;
    }

    get rows() { return this._rows; }
    set rows(value) {
        if(value > 0) this._rows = value;
        else throw new Error("Valor de fila incorrecto");
    }

    get columns() { return this._columns; }
    set columns(value) {
        if (value > 0) this._columns = value;
        else throw new Error("Valor de columna incorrecto");
    }

    get isSquare() { return this.rows === this.columns; }

    get isIdentity(){
        if(!this.isSquare || !this.isEscalar) return false;

        let result = true;

        for (let i = 0; i < this.rows && result; i++)
            result &&= this.mx[i][i] === 1;

        return result;
    }

    get isEscalar() {
        if(typeof this._isEscalar === 'undefined') {
            this.isTriangular;
            return this._isEscalar;
        }
        else return this._isEscalar;
    }

    /**
     * @return {{sup : Boolean, inp : Boolean}}
     */
    get isTriangular() {
        let supResult = true, infResult = true;

        if(this.rows === 1) supResult = false;
        for (let col = 0; col < this.columns && supResult; col++)
            for (let row = col + 1; row < this.rows && supResult; row++)
                supResult = this.mx[row][col] == 0;

        if(this.columns === 1) infResult = false;
        for (let row = 0; row < this.rows && infResult; row++)
            for (let col = row + 1; col < this.columns && infResult; col++)
                infResult = this.mx[row][col] == 0;

        this._isEscalar = (supResult && infResult) || (this.rows == 1 && this.columns == 1) || (this.mx[0][0] == 1);
        return { sup: supResult, inf: infResult }
    }

    get determinante() {
        if (!this.isSquare) throw new Error("La matriz no es cuadrada.");
        const { sup, inf } = this.isTiangular;
        if(sup || inf){
            return this.mx
                .map( (row, indRow) => row[indRow])
                .reduce( (acc, cell) => acc * cell, 1);
        }
    }

    get transpose() {
        const mxNew = new Matrix(this.columns, this.rows, 'MxTranspose');

        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.columns; j++)
                mxNew.mx[j][i] = this.mx[i][j];

        return mxNew;
    };

    /**
     * @param  {...Matrix} mxs Arreglo de Matrix
     * @returns Matriz suma
     */
    static sum(...mxs){
        /**
         * @param {Matrix} mxA Sumando
         * @param {Matrix} mxB Sumando
         * @returns Matriz Suma
         */
        const _sum = (mxA, mxB) => {
            if(mxA.rows !== mxB.rows || mxA.columns !== mxB.columns) throw new Error('Orden de matrices diferentes.');
            const mxResult = new Matrix(mxA.rows, mxA.columns, 'n/n');

            for (let i = 0; i < mxResult.rows; i++)
                for (let j = 0; j < mxResult.columns; j++)
                    mxResult.mx[i][j] = mxA.mx[i][j] + mxB.mx[i][j];

            return mxResult;
        }

        if(mxs.length < 2) throw new Error('Cantidad de matrices insuficientes.');

        let mxAcc = mxs[0];

        for (let i = 1; i < mxs.length; i++)
            mxAcc = _sum(mxAcc, mxs[i]);

        mxAcc.name = mxs.length <= 3 ? mxs.map(mx => mx.name).join(' + ') : 'SumaResultante';

        return mxAcc;
    }

    static sustraction(...mxs){
        const frsItem = mxs.shift();
        const mxAux = mxs.map(mx => {
            const res = mx.scalarMultiplication(-1);
            res.name = mx.name;
            return res;
        });
        const mxsSustraction = [frsItem].concat(mxAux);
        const mxResult = this.sum(...mxsSustraction);

        mxResult.name = mxsSustraction.length <= 3 ? mxsSustraction.map(mx => mx.name).join(' - ') : 'RestaResultante';

        return mxResult;
    }

    /**
     * @param  {...Matrix} mxs
     * @returns Matriz producto
     */
    static matrixMultiplication = (...mxs) => {

        const isMultiplyableAll = (...mxs) => {

            let acc = true;

            for (let i = 0; i < mxs.length && acc; i++) {
                const posNext = i + 1;
                if (posNext >= mxs.length) break;

                const curr = mxs[i];
                const next = mxs[posNext];
                acc &&= curr.columns === next.rows;
            }

            return acc;
        };

        const multiplication = (mxA, mxB) => {
            const mxResult = new Matrix(mxA.rows, mxB.columns, 'n/n');

            // inicializando
            mxResult.mx = mxResult.mx.map(row => row.fill(0));

            const common = mxA.columns || mxB.rows; // mxA.columns == mxB.rows
            for (let i = 0; i < mxA.rows; i++)
                for (let j = 0; j < common; j++)
                    for (let k = 0; k < mxB.columns; k++)
                        mxResult.mx[i][k] += mxA.mx[i][j] * mxB.mx[j][k];

            return mxResult;
        }

        if(mxs.length < 2) throw new Error('Matrices insuficientes');
        if(!isMultiplyableAll(...mxs)) throw new Error('Matrices no multiplicables');

        let mxResult = mxs[0];
        for (let i = 1; i < mxs.length; i++)
            mxResult = multiplication(mxResult, mxs[i]);

        mxResult.name = mxs.length <= 3 ? mxs.map(mx => mx.name).join(' x ') : 'ProductoResultante';

        return mxResult;
    }

    /**
     * @param {Matrix} mx
     * @param {number} scalar
     * @returns Matriz producto
     */
    scalarMultiplication = scalar => {
        const mxResult = new Matrix(this.rows, this.columns, `${scalar}*${this.name}`);
        mxResult.mx = this.mx.map(row => row.map(cell => cell * scalar));
        return mxResult;
    }

    subMx(rowToDelete, colToDelete){
        if(this.rows <= 1 || this.columns <= 1) throw new Error(`No se puede determinar una sub-matriz de (${this.rows} x ${this.columns})`);

        const mxResult = new Matrix(this.rows - 1, this.columns - 1, `Sub${this.name}[${rowToDelete};${colToDelete}]`);

        const mxAux = this.mx;
        mxAux.splice(rowToDelete, 1);
        mxAux.forEach(row => row.splice(colToDelete, 1));
        mxResult.mx = mxAux;

        return mxResult;
    }

    toString(name){
        const nombre = typeof name === 'undefined' ? 'Nombre' : name;
        return `\n${nombre}: ${this.name}\n` +
        `Filas: ${this.rows}\n` +
        `Columnas: ${this.columns}\n` +
        `Matriz: ${this.mxString}`;
    }

    //#region metodos de lista
    static _list = [];
    static get list() { return this._list }
    static add(mxNew){
        this._list.push(mxNew);
    }
    static delete(indexMx){
        this._list.splice(indexMx, 1);
    }
    //#endregion
}

export { Matrix };
