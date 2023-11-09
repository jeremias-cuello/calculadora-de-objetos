# Matrix

## Constructor

- [x] developed

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

Hay 2(dos) tipos de matrices triangular, superior e inferior. Esto se determina si la matriz tiene ceros por debajo de la diagonal principal (superior) o por otro lado tiene ceros por arriba de la diagonal principal (inferior). Una matriz puede tener incluso ceros por arriba y por abajo, en ese entonces se llama matriz diagonal o matriz escalar, sin embargo tambien puede no ser triangular tambien.

Las matrices triangulares son otro clase de matrices que tambien tiene propiedes que incumben en el cálculo de el determinante.

## isEscalar

- [ ] developed

Esta propiedad la setea el método isTriangular.

## determinant

- [ ] developed

El cálculo del determinante es aplicable a mtrices cuadradas, asi que primero se deberia determinar eso.
La perfomance del cálculo del determinante es posible mejorarlo sabiendo algunas condiciones de la matriz.

    1. Si es de 1x1 el determinante es igual a la única celda que tiene la matriz.

    2. Si es de 2x2 el determinante es
        det(a) = a(1;1) * a(2;2) - a(2;1) * a(1;2)

    3. Si la matriz es triangular sea superior o inferioir o ambas el resultado es la multiplicaciones de los coeficientes de la diagonal principal.
        acc = 1 / det(a) = acc * a(i;i), 1 < i < tam

    4. Hasta este punto la matriz es de tam >= 3 y no es triangular, aqui ya se utiliza el desarrollo de La Place. El desarrollo de la Place consiste en modificar la matriz (achicandola y en ese efecto poder ser triangular o poder llegar a 2.) utilizando los conceptos de cofactor y submatriz o matriz menor sentenciando a ese submatriz un determinante.

## transpose

- [x] developed

Este metodo devuelve la matriz como esta pero intercambiando los elementos `a[i][j]` por `a[j][i]` y cambiando el orden de la matriz si era de `rows x columns` sera de `columns x rows`.

## isSquare

- [x] developed

Determina si la matriz es cuadrada o no.

## sum(mxA, mxB)

- [x] developed

Devuelve la suma de dos matrices sumandos.
Las condiciones para que dos matrices se pueden sumar son:
que todas las matrices sean del mismo orden (o tamaño, pero se entiende mas por orden). Puede confundirse tamaño por orden, una matriz puede tener 15 celdas de tamaño pero esto puede ser de orden (3 x 5) o (5 x 3) aqui no es lo mismo (3 x 5) que (5 x 3). Las matrices deben respetar el mismo orden.

## sumAll(...Mxs)

- [x] developed

Parametros:

    Mxs: arreglo de matrices sumandos.

Devuelve la suma de todas las matrices sumandos.

## Multiplicación escalar-matriz

- [ ] developed

Es multiplicar cada coeficiente o celda (es lo mismo) de una matriz por un número.

## Resta

- [] developed

Para restar no hay tal metodo, se utiliza la siguiente proposición:

    MxA - MxB = MxA + (-MxB)

Notese que (-MxB) es una multiplicación escalar

    (-1) * MxB

## Multiplicación Matricial

- [ ] developed

Es la multiplicacion entre matrices, las condiciones para que las matrices puedan ser multiplicables son

    multiplicar(MxA, MxB) si y solo si MxA.columns = MxB.rows

La multiplicación entre matrices resulta ser otra matriz de orden (MxA.rows x MxB.columns)

![some text](https://jeremiascuello.000webhostapp.com/CDN/calculadora-de-objetos/multiplicacionMatricial.png)

La multiplicacion de matrices no es conumutativa generalmente

    MxA * MxB != MxB * MxA

Esto quiere decir que el orden es importante (como la resta de numeros). La multiplicación se define como la suma de multiplicaciones de una fila de la primer matriz por la columna de la segunda matriz, se multiplica cada coeficiente en el orden de izquierda a derecha para la fila de la primera matriz con el coeficiente de la columna de la segunda matriz en orden de arriba para abajo uno a uno.

![some text](https://jeremiascuello.000webhostapp.com/CDN/calculadora-de-objetos/multiplicacionMatricialDefinicion.png)

## getMxInverse

- [ ] developed

La matriz inversa se obtiene solo con matrices cuadradas y no todas las tienen. Símbolo: MxA^(-1) es una matriz tal que cumple

    MxA * MxA^(-1) = MxId | MxId es escalar de coeficientes = 1 del mismo orden que MxA

una matriz tiene inversa si el determinante de esa matriz es distinto de cero.
