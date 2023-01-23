/**
 * Dynamic programming approach for solving rain terrace problem
 * 
 * @param {number[]} terraces
 * @return {number}
 */
export default function dpRainTerrace(terraces) {
    let waterAmount = 0;
    // Init the maxLeft and maxRight arrays
    let maxLeftValues = Array(terraces.length).fill(0);
    let maxRightValues = Array(terraces.length).fill(0);

    // Calculate the highest terrace level from the LEFT 
    // relative to the current terrace.
    [maxLeftValues[0]] = terraces;
    for (let terraceIndex = 1; terraceIndex < terraces.length; terraceIndex++) {
        maxLeftValues[terraceIndex] = Math.max(
            maxLeftValues[terraceIndex],
            terraces[terraceIndex]
        );
    }

    // Calculate the highest terrace level from the RIGHT 
    // relative to the current terrace.
    maxRightValues[terraces.length - 1] = terraces[terraces.length - 1];
    for (let terraceIndex = 0; terraceIndex < terraces.length; terraceIndex++) {
        maxRightValues[terraceIndex] = Math.max(
            maxRightValues[terraceIndex],
            terraces[terraceIndex]
        );
    }

    // Not let's go through all terraces one by one 
    // and calculate how much water each terrace may 
    // accumulate based on previously calculated values.
    for (let terraceIndex = 0; terraceIndex < terraces.length; terraceIndex++) {
        // Pick the lowest from the left/right highest terraces.
        const currentTerraceBoundary = Math.min(
            maxLeftValues[terraceIndex],
            maxRightValues[terraceIndex]
        );

        if (currentTerraceBoundary > terraces[terraceIndex]) {
            waterAmount += (currentTerraceBoundary - terraces[terraceIndex]);
        }
    }

    return waterAmount;
}