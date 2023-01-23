import PolynomialHash from "../../../hashing/PolynomialHash";

/**
 * @param {string} text 
 * @param {string} word 
 * @return {number}
 */
export default function rabinKarp(text, word){
    const polynomialHash = new PolynomialHash();
    const wordHash = polynomialHash.hash(word);

    let prevFrame = null; 
    let currentFrameHash = null;

    for(let charIndex = 0 ; charIndex < text.length; charIndex++){
        let currentFrame = text.substring(charIndex, word.length);
        if(currentFrameHash === null){
            currentFrameHash = polynomialHash.hash(currentFrame);
        } else {
            currentFrameHash = polynomialHash.roll(
                currentFrameHash, 
                prevFrame, 
                currentFrame
            );
        }
        prevFrame = currentFrame;

        // Check if current frame's hash and seeking word's hash are equal. 
        // If they're then check if current frame word and seeking word are equal or 
        // not, in case of hash collision, there won't be any match
        if(currentFrameHash === wordHash){
            if(currentFrame === word){
                return charIndex;
            }
        }
    }
    return -1;
}