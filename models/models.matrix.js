class Matrix {
    /**
     * @param {number} rowsParam cantidad de filas
     * @param {number} columnsParam cantidad de columnas
     * @param {[...[number]]} valuesParam valores
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

    get isSquare() {
        return this.rows === this.columns;
    }

    /**
     * @return {{sup : Boolean, inp : Boolean}}
     */
    get isTriangular() {
        console.group('isTriangular');

        console.log(`this.rows = ${this.rows}`);
        console.log(`this.columns = ${this.columns}`);

        let supResult = true, infResult = true;

        console.group('superior');
        if(this.rows === 1) supResult = false;
        for (let col = 0; col < this.columns && supResult; col++){
            for (let row = col + 1; row < this.rows && supResult; row++){
                console.log(`(${row} x ${col} = ${this.mx[row][col]})`);
                supResult = this.mx[row][col] == 0;
            }
        }
        console.groupEnd('superior');

        console.group('inferior');
        if(this.columns === 1) infResult = false;
        for (let row = 0; row < this.rows && infResult; row++) {
            for (let col = row + 1; col < this.columns && infResult; col++) {
                console.log(`(${row} x ${col} = ${this.mx[row][col]})`);
                infResult = this.mx[row][col] == 0;
            }
        }
        console.groupEnd('inferior');

        console.groupEnd('isTriangular');
        return { sup: supResult, inf: infResult }
    }

    get mx(){ return this._mx; }
    set mx(value){
        if(value.length === this.rows && value[0].length === this.columns)
            this._mx = value;
        else throw new Error('Filas y columnas no coincidentes con los coeficientes.');
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

    get determinante() {
        //DEV:
        if (!this.isSquare) throw new Error("La matriz no es cuadrada.");
        const { sup, inf } = this.isTiangular;
        if(sup || inf){
            const diaPrin = this.mx.map((row, indRow) => row[indRow]);
            return diaPrin.reduce((acc, numCurr) => acc * numCurr, 1);
        }
    }

    transpose() {
        const mxNew = Matrix(this.columns, this.rows);

        for (let i = 0; i < this.mx.rows; i++) {
            for (let j = 0; j < this.mx.columns; j++) {
                mxNew.mx[j][i] = this.mx[i][j];
            }
        }

        return mxNew;
    };

    /**
     * @param {Matrix} mxA Sumando
     * @param {Matrix} mxB Sumando
     * @returns Matriz Suma
     */
    static sum(mxA, mxB){
        const mxResult = new Matrix(mxA.rows, mxA.rows, `Suma${mxA.name}${mxB.name}`);

        for (let i = 0; i < mxResult.rows; i++)
            for (let j = 0; j < mxResult.columns; j++)
                mxResult.mx[i][j] = mxA.mx[i][j] + mxB.mx[i][j];

        return mxResult;
    }

    static sumAll(...Mxs){
        if(!Mxs.length) throw new Error('Lista de matrices vacia');

        let mxAcc = Mxs[0];

        for (let i = 1; i < Mxs.length; i++) {
            mxAcc = this.sum(mxAcc, Mxs[i]);
        }

        mxAcc.name = 'Suma';
        return mxAcc;
    }

    static ismultiplyable = (mxA, mxB) => mxA.columns === mxB.rows;
    static ismultiplyableAll = (...Mxs) => {
        if(!Mxs.length) return false;

        let acc = true;

        for (let i = 0; (i < Mxs.length) && acc; i++) {
            const posNext = i + 1;
            if (posNext >= Mxs.length) break;

            const curr = Mxs[i];
            const next = Mxs[posNext];
            curr.rows = Mxs[0].rows; // la fila de 1er Mx se conserva
            acc &&= this.ismultiplyable(curr, next);
        }

        return acc;
    };

    toString(){
        return `Nombre: ${this.name}\nFilas: ${this.rows}\nColumnas ${this.columns}\n`;
    }

    //#region metodos de lista
    static _list = [];
    static get list() { return this._list }
    static find(searchName){
        const listMxs = this._list.filter(({name}) => name === searchName || name.includes(searchName) );
        return listMxs;
    }
    static add(mxNew){
        this._list.push(mxNew);
    }
    static delete(indexMx){
        this._list.splice(indexMx, 1);
    }
    static update(indexMx){
        _list[indexMx].name = mxUpdate.name;
        _list[indexMx].rows = mxUpdate.rows;
        _list[indexMx].columns = mxUpdate.columns;
        _list[indexMx].mx = mxUpdate.mx;
    }
    //#endregion
}

export { Matrix };
