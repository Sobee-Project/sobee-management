export function cartesianProduct(arrays: any[][]): any[][] {
    // Base case: if there's no array, return an empty array
    if (arrays.length === 0) return [[]]

    // Recursive case: get the first array and the product of the rest
    const firstArray = arrays[0]
    const restProduct = cartesianProduct(arrays.slice(1))

    // Combine the first array with the rest product
    const result: any[][] = []
    for (let i = 0; i < firstArray.length; i++) {
        for (let j = 0; j < restProduct.length; j++) {
            result.push([firstArray[i], ...restProduct[j]])
        }
    }

    return result
}
