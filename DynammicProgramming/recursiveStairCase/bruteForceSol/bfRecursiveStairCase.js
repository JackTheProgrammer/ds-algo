/**
 * @param {number} stairNum
 * @return {number}
 */
export default function bfRecursiveStairCase(stairNum) {
    if (stairNum === 0) {
        // You're already at 0th stair, there's zero way
        // to go down
        return 0;
    }
    if (stairNum === 1) {
        // There's one to go.
        return 1;
    }
    if (stairNum === 2) {
        // There're 2 ways: (1 + 1) or (2)
        return 2;
    }
    // Sum up the no. of 1st and second step from the stairNum which'll yield
    // the total steps to be taken from the stair specified
    return bfRecursiveStairCase(stairNum - 1) + bfRecursiveStairCase(stairNum - 2);
}