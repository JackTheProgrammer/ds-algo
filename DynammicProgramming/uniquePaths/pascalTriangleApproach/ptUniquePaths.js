import pascalTriangleIterative from "../../../maths/pascalTriangle/pascalTriangleIterative";

/**
 * @param {number} width 
 * @param {number} height 
 * @returns {number}
 */
export default function pascalTriangleUniquePaths(width, height){
    const pascalLine = width + height - 2;
    const pascalLineIndex = Math.min(width, height) - 1;

    return pascalTriangleIterative(pascalLine)[pascalLineIndex];
}