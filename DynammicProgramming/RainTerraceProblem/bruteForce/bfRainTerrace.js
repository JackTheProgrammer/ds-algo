/**
 * @param {number[]} terracesHeight
 * @return {number}
 */
export default function bfRainTerrace(terracesHeight) {
    let waterAmount = 0;

    for (let terraceIndex = 0; terraceIndex < terracesHeight.length; terraceIndex += 1) {
        // Get let most highest terrace
        let leftHighestValue = 0;
        for (let leftTerraceIndex = terraceIndex - 1; leftTerraceIndex >= 0; leftTerraceIndex -= 1) {
            leftHighestValue = Math.max(leftHighestValue, terracesHeight[leftTerraceIndex]);
        }

        let rightMaxValue = 0;
        // Get the maximum right terrace
        for (let rightTerraceIndex = terraceIndex + 1; rightTerraceIndex < terracesHeight.length; rightTerraceIndex += 1) {
            rightMaxValue = Math.max(rightMaxValue, terracesHeight[rightTerraceIndex]);
        }

        // Add current terrace water amount
        const terraceBoundaryLevel = Math.min(leftHighestValue, rightMaxValue);
        if (terraceBoundaryLevel > terracesHeight[terraceIndex]) {
            // If terrace boundary exceeds current terrace height, then water
            // can be stored in it
            waterAmount += terraceBoundaryLevel - terracesHeight[terraceIndex];
        }
    }

    return waterAmount;
}