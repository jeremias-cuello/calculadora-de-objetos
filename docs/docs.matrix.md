# Matrix

## Constructor

- [x] developed
- [] tested

Parametros:

    rowsParam: cantidad de filas
    columnsParam: cantidad de filas
    nameParam: nombre matrix
    valuesParam: matriz de numeros

LLamadas. Se puede inicializar una matriz de tres formas posibles

    1. Sin parametros.
        Matriz(): incializa una matriz de:
            rows = 1
            columns = 1
            mx: matriz de rows x columns inicializada completamente con `null`
            name = 'n/n'

    2. Parametros: filas, columnas y nombre
        Matriz(rowParam, columnsParams, nameParam, valuesParam) inicializa una matriz de:
            rows = rowParam
            columns = columnsParams
            name = nameParam
            mx: mx: matriz de rows x columns inicializada completamente con `null`

    3. Parametros: filas, columnas, nombre y valores
        Matriz(rowParam, columnsParams, nameParam, valuesParam) inicializa una matriz de:
            rows = rowParam
            columns = columnsParams
            name = nameParam
            mx: valuesParam

La interfaz de la Matriz solo usa el punto 2. luego guarda los valores de las celdas en otro instante.

## isTringular

- [x] developed
- [x] tested

Hay 2(dos) tipos de matrices triangular, superior e inferior. Esto se determina si la matriz tiene ceros por debajo de la diagonal principal (superior) o por otro lado tiene ceros por arriba de la diagonal principal (inferior). Una matriz puede tener incluso ceros por arriba y por abajo, en ese entonces se llama matriz diagonal o matriz escalar, sin embargo tambien puede no ser triangular.

La diagonal principal es el conjunto de celdas cuyas coordenadas son a[n;n], es decir, `MxA[0][0]`, `MxA[1][1]`, `MxA[2][2]`, etc.

Nota: Las matrices triangulares son otro clase de matrices que tambien tiene propiedes que incumben en el cálculo de el determinante.

## isEscalar

- [x] developed
- [x] tested

Esta propiedad la setea el método isTriangular.

## isIdentity

- [x] developed
- [x] tested

Determina si una matriz es identidad o no.

isIdentity => isEscalar

Esto significa que ser identidad implica ser escalar, por este entonces primero se valida que sea isEscalar una matriz para saber si sera isIdentity.

## subMx(row, col)

- [] developed
- [] tested

Retorna una submatriz de la matriz. Se remueve de la matriz original la columna `col` y la fila `row`. La matriz es de (rows-1 x columns-1).

## cofactor

- [] developed
- [] tested

Es una operacion de las celdas.

cof(a[i;j]) = (-1)^(i + j) * det(subMx(i, j))

a[i;j] : celda en la fila `i` y columna `j`

Cuando actua SubMx dá la posibilidad que la matriz sea de 2x2 facilitando el calculo del determinante.

## determinant

- [] developed
- [] tested

El cálculo del determinante es aplicable a matrices cuadradas.

La perfomance del cálculo del determinante es posible mejorarlo sabiendo algunas condiciones de la matriz.

    1. Si es de 1x1 el determinante es igual a la única celda que tiene la matriz.

    2. Si es de 2x2 el determinante es
        det(a) = a(1;1) * a(2;2) - a(2;1) * a(1;2)

    3. Si la matriz es triangular sea superior o inferioir o ambas el resultado es la multiplicación de los coeficientes (celdas) de la diagonal principal.
        acc = 1 / det(a) = acc * a(i;i), 1 < i < tam

    4. Hasta este punto la matriz es de tam >= 3 y no es triangular, aqui ya se utiliza el desarrollo de La Place. El desarrollo de la Place consiste en modificar la matriz (achicandola y en ese efecto poder ser triangular o poder llegar a 2.) utilizando los conceptos de cofactor y submatriz o matriz menor sentenciando a ese submatriz un determinante. Existen dos formas de hacerlo, desarrollo por fila o por columna, es una sumatoria de los coeficientes de una fila o columna, pero a cada termino se lo debe multiplicar por su cofator, recuerdese que esto es para calcular el determinante y el cofactor tiene un determinante "dentro".

## transpose

- [x] developed
- [x] tested

Este metodo devuelve la matriz como esta pero intercambiando los elementos `a[i][j]` por `a[j][i]` y cambiando el orden de la matriz si era de `rows x columns` sera de `columns x rows`.

## isSquare

- [x] developed
- [x] tested

Determina si la matriz es cuadrada o no.

## sum(...mxs)

- [x] developed
- [x] tested

Parametros:

    Mxs: arreglo de matrices sumandos.

Devuelve la suma de todas las matrices sumandos.

### _sum(mxA, mxB)

- [x] developed
- [x] tested

Devuelve la suma de dos matrices sumandos.
Las condiciones para que dos matrices se pueden sumar son:
que todas las matrices sean del mismo orden (o tamaño, pero se entiende mas por orden). Puede confundirse tamaño por orden, una matriz puede tener 15 celdas de tamaño pero esto puede ser de orden (3 x 5) o (5 x 3) aqui no es lo mismo (3 x 5) que (5 x 3). Las matrices deben respetar el mismo orden.

## scalarMultiplication

- [x] developed
- [x] tested

Es multiplicar cada coeficiente o celda (es lo mismo) de una matriz por un número.

## sustraction(..mxs)

- [x] developed
- [x] tested

Para restar no hay tal metodo, se utiliza la siguiente proposición:

    MxA - MxB = MxA + (-MxB)

Notese que (-MxB) es una multiplicación escalar

    (-1) * MxB

## matrixMultiplication

- [x] developed
- [x] tested

Es la multiplicacion entre matrices, las condiciones para que las matrices puedan ser multiplicables son

    multiplicar(MxA, MxB) <=> MxA.columns = MxB.rows

La multiplicación entre matrices resulta ser otra matriz de orden (MxA.rows x MxB.columns)

![some text](https://jeremiascuello.000webhostapp.com/CDN/calculadora-de-objetos/multiplicacionMatricial.png)

### ismultiplyable(mxA, mxB)

Determina si MxA es multiplicable por MxB

La multiplicacion de matrices no es conumutativa generalmente

    MxA * MxB != MxB * MxA

Esto quiere decir que el orden es importante (como la resta de numeros).

### ismultiplyableAll(...mxs)

Determina si las matrices de mxs son multiplicables, para saber si una matriz es multiplicable por otra es sencillo pero tener en cuenta que se deben correlacionar el orden de la multiplicacion de las matrices que se desea hacer con la determinacion de multiplicidad entre ellas. Es decir, si la multiplicacion es `MxA * MxB * MxC * MxD` entonces la determinacion para saber si son multiplicables debe tener el mismo orden (MxA; MxB; MxC; MxD). Tambien tener en cuenta que cada multiplicacion que se hace es una nueva matriz, por lo tanto hacer una verificacion de multiplicidad entre las matrices de esta forma seria incorrecto:

1. verificar ismultiplyable(MxA, MxB)
2. verificar ismultiplyable(MxB, MxC)
3. verificar ismultiplyable(MxC, MxD)

Esta mal porque la multiplicacion de `MxA * MxB = MxOtra1`

1. verificar ismultiplyable(MxA, MxB)
2. verificar ismultiplyable(MxOtra1, MxC)
3. verificar ismultiplyable(MxOtra2, MxD)

Como no son tan diferentes MxOtra1 de MxB no hace falta realizar la operacion de multiplicacion entre ellas para determinar la multiplicidad con MxC, pues solo lo que cambia es su fila, mas alla de todo lo unico que nos interesa en cuestion son las filas y columnas de las matrices. Como `MxA * MxB = una matriz de (MxA.rows x MxB.columns)` y anteriormente (en EJ. incorrecto) usabamos MxB pues para "transformarla" en MxOtra1 solo debemos setearle la fila a que sea igual la la fila de su matriz predecesor ya que asi seria la matriz resultante de multiplicar `MxA * MxB`. Pero al mismo tiempo esto no hace falta (jsjsjs) pues la funcion isMultiplyable solo verificara la columna de la primera matriz con la segunda y asi sucesivamente.

La multiplicación se define como la suma de multiplicaciones de una fila de la primer matriz por la columna de la segunda matriz, se multiplica cada coeficiente en el orden de izquierda a derecha para la fila de la primera matriz con el coeficiente de la columna de la segunda matriz en orden de arriba para abajo uno a uno.

![some text](https://jeremiascuello.000webhostapp.com/CDN/calculadora-de-objetos/multiplicacionMatricialDefinicion.png)

## getMxInverse

- [] developed
- [] tested

La matriz inversa se obtiene solo con matrices cuadradas y no todas las tienen. Símbolo: MxA^(-1) es una matriz tal que cumple

    MxA * MxA^(-1) = MxId | MxId es escalar de coeficientes = 1 del mismo orden que MxA

una matriz tiene inversa si el determinante de esa matriz es distinto de cero. Esto es porque la formula para determinar la inversa de una matriz es la siguiente:

    MxA^(-1) = Adj(MxA) / det(MxA)

    Adj(MxA) = transpose( cof(Mxa) )  <transpose ya esta explicado>
    cof(MxA): es la sustitucion de cada termina de la matriz por su cofactor
    Nota: det(MxA) = | MxA | (en simbolo)
