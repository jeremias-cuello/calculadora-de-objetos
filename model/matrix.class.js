class Matrix {
    /**
     * @param {number} rowsParam cantidad de filas
     * @param {number} columnsParam cantidad de columnas
     * @param {[...[number]]} valuesParam valores
     */
    constructor(rowsParam, columnsParam, nameParam, valuesParam) {
        if(valuesParam !== undefined && rowsParam !== undefined && columnsParam !== undefined && nameParam !== undefined){
            this._rows = rowsParam;
            this._columns = columnsParam;
            this.mx = valuesParam;
            this.name = nameParam;
        } else if(rowsParam !== undefined && columnsParam !== undefined && nameParam !== undefined){
            this._rows = rowsParam;
            this._columns = columnsParam;
            this.name = nameParam;
            this.mx = [[]];
        }
        else {
            this._rows = 1;
            this._columns = 1;
            this.mx = [[]];
        }
    }

    get rows() { return this._rows; }
    set rows(value) {
        if (value > 0) return value;
        else throw new Error("Valor de fila incorrecto");
    }

    get columns() { return this._columns; }
    set columns(value) {
        if (value > 0) return value;
        else throw new Error("Valor de columna incorrecto");
    }

    get isSquare() {
        this._rows === this._columns;
    }

    get determinante() {
        if (!this.isSquare) return;


    }

    transpose() {
        const mxNew = Matrix(this._columns, this._rows);

        for (let i = 0; i < this.mx.rows; i++) {
            for (let j = 0; j < this.mx.columns; j++) {
                mxNew.mx[j][i] = this.mx[i][j];
            }
        }

        return mxNew;
    };

    /**
     * @param {Matrix} mxA
     * @param {Matrix} mxB
     */
    static ismultiplyable = (mxA, mxB) => mxA.columns === mxB.rows;
    /**
     * @param {[Matrix]} Mxs
     */
    static ismultiplyable = (...Mxs) => {
        let acc = true;

        for (let i = 0; (i < Mxs.length) && acc; i++) {
            const posNext = i + 1;
            if (posNext >= Mxs.length) break;

            const curr = Mxs[i];
            const next = Mxs[posNext];
            curr.rows = Mxs[0].rows; // la fila de 1er Mx se conserva
            acc = acc && this.ismultiplyable(curr, next);
        }

        return acc;
    };

    toString(){
        return `Nombre: ${this.name}\nFilas: ${this._rows}\nColumnas ${this._columns}\n`;
    }

    static _list = [];

    static get list(){
        return this._list;
    }
    static find(searchName){

        const listMxs = [];

        this._list.forEach(mx => {

            if(mx.name === searchName || mx.name.includes(searchName)){
                listMxs.push(mx);
            }
        });

        return listMxs;
    }
    /**
     * @param {Matrix} mxNew
     */
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
}

export { Matrix };
