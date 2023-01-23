/**
 * Let circleRadius be the radius of the circle inscribing]
 * hexagon, and is also the side length of that hexagon
 */
const circleRadius = 1;

/**
 * @param {number} sideLength
 * @param {number} splitCounter
 * 
 * @return {number}
 */
function getNGonSideLength(sideLength, splitCounter) {
    if (splitCounter <= 0) {
        return sideLength;
    }

    const halfSide = sideLength / 2;
    //Liu hui used Gou gu (Pythagoras's theorem repeatedly)
    const perpendicular = Math.sqrt((circleRadius ** 2) - (halfSide ** 2));
    const excessRadius = circleRadius - perpendicular;
    const splitSideLength = Math.sqrt((excessRadius ** 2) + (halfSide ** 2));
    return getNGonSideLength(splitSideLength, splitCounter - 1);
}

/**
 * @param {number} splitCount 
 * @return {number}
 */
function getNGonSideCount(splitCount) {
    // Liu hui began by hexagon inscribed circle
    const hexagonSideCount = 6;
    // Once every split iteration, we made n - gon: 6, 12, 24, 48 etc...
    return hexagonSideCount * (splitCount ? 2 ** splitCount : 1);
}

/**
 * Calculate pi's value using lui hui's theorem
 * 
 * @param {number} splitCount - the number of times
 * we're gonna split hexagon. Once every iteration, it's 
 * gonna be 6, 12, 24, 48, 96, 192 and so on.
 * 
 * @return {number}
 */
export default function luiHui(splitCount = 1) {
    const nGonSideLength = getNGonSideLength(circleRadius, splitCount - 1);
    const nGonSideCount = getNGonSideCount(splitCount - 1);
    const nGonPerimeter = nGonSideLength * nGonSideCount;
    const approximateCircleArea = (nGonPerimeter / 2) * circleRadius;
    return approximateCircleArea / (circleRadius ** 2);
}