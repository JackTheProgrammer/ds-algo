/**
 * Time complexity: O(discs)
 *
 * @param {number} discs
 * @param {string} sourceRod
 * @param {string} auxiliaryRod
 * @param {string} destinationRod
 */
export default function brahmaTower(discs, sourceRod, auxiliaryRod, destinationRod){
    if(discs === 0){
        console.log(`${discs}, ${sourceRod}, ${auxiliaryRod}, ${destinationRod}`);
        return;
    }

    console.log(`${discs}, ${sourceRod}, ${auxiliaryRod}, ${destinationRod}`);

    brahmaTower(discs - 1, sourceRod, auxiliaryRod, destinationRod);

    brahmaTower(discs - 1, auxiliaryRod, destinationRod, sourceRod);
}