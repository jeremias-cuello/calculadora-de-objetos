# Matrix

## Constructor

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

Hay 2(dos) tipos de matrices triangular, superior. Esto se determina si la matriz tiene ceros por debajo de la diagonal principal (superior) o por otro lado tiene ceros por arriba de la diagonal principal (inferior). Una matriz puede tener incluso ceros por arriba y por abajo, en ese entonces se llama matriz diagonal o matriz escalar.

Las matrices triangulares son otro clase de matrices que tambien tiene propiedes que incumben en el cálculo de el determinante.

## determinant

El cálculo del determinante es aplicable a mtrices cuadradas, asi que primero se deberia determinar eso.
La perfomance del cálculo del determinante es posible mejorarlo sabiendo algunas condiciones de la matriz.

    1. Si es de 1x1 el determinante es igual a la única celda que tiene la matriz.

    2. Si es de 2x2 el determinante es
        det(a) = a(1;1) * a(2;2) - a(2;1) * a(1;2)

    3. Si la matriz es triangular sea superior o inferioir o ambas el resultado es la multiplicaciones de los coeficientes de la diagonal principal.
        acc = 1 / det(a) = acc * a(i;i), 1 < i < tam

    4. Hasta este punto la matriz es de tam >= 3 y no es triangular, aqui ya se utiliza el desarrollo de La Place. El desarrollo de la Place consiste en modificar la matriz (achicandola y en ese efecto poder ser triangular o poder llegar a 2.) utilizando los conceptos de cofactor y submatriz o matriz menor sentenciando a ese submatriz un determinante.

## transpose

Este metodo devuelve la matriz como esta pero intercambiando los elementos `a[i][j]` por `a[j][i]` y cambiando el orden de la matriz si era de `rows x columns` sera de `columns x rows`.
