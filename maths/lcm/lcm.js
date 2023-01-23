import euclideanAlgoRecursive from "../euclideanAlgorithm/euclideanAlgoRecursive/euclideanAlgoRecursive";

/**
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 */
export default function lcm(n1, n2){
    return ((n1 === 0) || (n2 === 0)) ? 0 : Math.abs(n1 * n2) / euclideanAlgoRecursive(n1, n2);
}