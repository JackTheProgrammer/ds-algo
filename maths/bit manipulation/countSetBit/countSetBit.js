/**
 * @param {number} number 
 * @returns {number}
 */
export default function countSetBit(number){
    let setCountBit = 0;
    while(number){
        //add number's last bit to the set counter
        setCountBit += (number & 1);
        //right shift bitwise to investigate further bits of the number
        number >>= 1;
    }
    return setCountBit;
}