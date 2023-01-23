import swap from '../../Algorithm/sorting/swap';

export default class Knapsack{
    /**
     * @typedef {import('./KnapsackItem').default} KnapsackItem
     * 
     * @param {KnapsackItem[]} itemsList
     * @param {number} weightLimit
     */
    constructor(itemsList, weightLimit){
        /**
         * @type {KnapsackItem[]}
         */
        this.selectedItems = [];

        /**
         * @type {KnapsackItem[]}
         */
        this.itemsList = itemsList;

        /**
         * @type {number}
         */
        this.weightLimit = weightLimit;
    }

    sortItemsByWeight(){
        /**
         * @param {KnapsackItem[]} itemsArray 
         * @param {number} lowerBound 
         * @param {number} upperBound 
         * @return {number} - the ending position after the sorting
         */
        const partition = (itemsArray, lowerBound, upperBound) => {
            let pivot = itemsArray[lowerBound];
            let start = lowerBound;
            let end = upperBound;

            while(start < end){
                while(itemsArray[start].weight <= pivot.weight){
                    start += 1;
                }

                while(itemsArray[end].weight > pivot.weight){
                    end -= 1;
                }

                if(start < end){
                    swap(itemsArray[start], arr[end]);
                }
            }

            swap(itemsArray[end], pivot);

            return end;
        }

        /**
         * Quicksort approach
         * 
         * @param {KnapsackItem[]} itemsArray 
         * @param {number} upperBound 
         * @param {number} lowerBound 
         * @return {KnapsackItem[]} sorted array w.r.t item's weight.
         */
        const sortByWeight = (itemsArray, lowerBound = 0, upperBound = itemsArray.length - 1) => {
            if(upperBound > lowerBound){
                let pos = partition(itemsArray, lowerBound, upperBound);
                sortByWeight(itemsArray, lowerBound, pos - 1);
                sortByWeight(itemsArray, pos + 1, upperBound);
            }

            return itemsArray;
        };

        sortByWeight(this.itemsList);
    }

    sortItemsByValue(){
        /**
         * @param {KnapsackItem[]} itemsArr 
         * @param {number} lowerBound 
         * @param {number} upperBound 
         * @return {number}
         */
        const partition = (itemsArr, lowerBound, upperBound) => {
            let pivot = itemsArr[lowerBound];
            let start = lowerBound;
            let end = upperBound;

            while(start < end){
                while(itemsArr[start].value <= pivot.value){
                    start += 1;
                }

                while(itemsArr[end].value > pivot.value){
                    end -= 1;
                }

                swap(itemsArr[start], itemsArr[end]);
            }

            swap(itemsArr[end], pivot);

            return end;
        };

        /**
         * @param {KnapsackItem[]} itemsArr 
         * @param {number} lowerBound 
         * @param {number} upperBound 
         * @returns {KnapsackItem[]}
         */
        const sortingByVal = (itemsArr, lowerBound = 0, upperBound = itemsArr.length - 1) => {
            if(lowerBound < upperBound){
                let pos = partition(itemsArr, lowerBound, upperBound);
                sortingByVal(itemsArr, lowerBound, pos + 1);
                sortingByVal(itemsArr, pos - 1, upperBound);
            }

            return itemsArr;
        };

        sortingByVal(this.itemsList);
    }

    sortingByValuePerWeightRatio(){
        /**
         * @param {KnapsackItem[]} itemsArr 
         * @param {number} lowerBound 
         * @param {number} upperBound 
         * @return {number}
         */
        const partition = (itemsArr, lowerBound, upperBound) => {
            let pivot = itemsArr[lowerBound];
            let start = lowerBound;
            let end = upperBound;

            while(start < end){
                while(itemsArr[start].getValuePerWeight() <= pivot.getValuePerWeight()){
                    start += 1;
                }

                while(itemsArr[end].getValuePerWeight() > pivot.getValuePerWeight()){
                    end -= 1;
                }

                swap(itemsArr[start], itemsArr[end]);
            }

            swap(itemsArr[end], pivot);

            return end;
        };

        /**
         * @param {KnapsackItem[]} itemsArr 
         * @param {number} lowerBound 
         * @param {number} upperBound 
         * @returns {KnapsackItem[]}
         */
        const sortingByVal = (itemsArr, lowerBound = 0, upperBound = itemsArr.length - 1) => {
            if(lowerBound < upperBound){
                let pos = partition(itemsArr, lowerBound, upperBound);
                sortingByVal(itemsArr, lowerBound, pos + 1);
                sortingByVal(itemsArr, pos - 1, upperBound);
            }

            return itemsArr;
        };

        sortingByVal(this.itemsList);
    }

    // Solve 0/1 knapsack problem
    // Dynamic Programming approach.
    solveZeroOneKnapsackProblem(){
        // We need to do two sorts because of equal weights but 
        // different values, we need to take the most valuable 
        // item first
        this.sortItemsByWeight();
        this.sortItemsByValue();

        // Init knapsack matrix
        const knapSackMatrix = Array(this.itemsList.length).fill(null).map(() => {
            return Array(this.weightLimit + 1).fill(null);
        });

        // Fill first rows with 0s, indicating that items with o weight can't 
        // be in knapsack
        for(let row = 0; row < this.itemsList.length; row += 1){
            knapSackMatrix[row][0] = 0;
        }

        // Fill the columns with maximum items list indicating that the maximum
        // values to start and least greatest to end i.e. the columns will have
        // weights in ascending order or in equatorial order.
        for(let weightIndex = 1; weightIndex <= this.weightLimit; weightIndex += 1){
            const itemIndex = 0;
            let itemWeight = this.itemsList[itemIndex].weight;
            let itemValue = this.itemsList[itemIndex].value;
            knapSackMatrix[itemIndex][weightIndex] = itemWeight <= itemValue ? weightIndex : 0;
        }

        // Go through combinations of how we may add items to knapsack and
        // define what weight/value we would receive using Dynamic Programming
        // approach.
        for(let itemIndex = 1; itemIndex <= this.itemsList.length; itemIndex++){
            for(let weightIndex = 1; weightIndex <= this.weightLimit; weightIndex += 1){
                const currentWeight = this.itemsList[itemIndex].weight;
                const currentValue = this.itemsList[itemIndex].value;

                if(currentWeight > weightIndex){
                    // If current item's weight exceeds that of allowed weight, than it
                    // can't be in knapsack and hence the maximum value possible is the 
                    // previous value in knapsack matrix.
                    knapSackMatrix[itemIndex][weightIndex] = knapSackMatrix[itemIndex][weightIndex - 1];
                } else {
                    // Else we'll need to consider the maximum value at this point by adding 
                    // the current value or just by keeping the previous item for current weight
                    knapSackMatrix[itemIndex][weightIndex] = Math.max(
                        currentValue + knapSackMatrix[itemIndex - 1][weightIndex - currentWeight],
                        knapSackMatrix[itemIndex - 1][weightIndex]
                    );
                }
            }
        }

        // Now we'll trace back the knapsack matrix to see what items we're 
        // going to add to knapsack
        let itemIndex = this.itemsList.length - 1;
        let weightIndex = this.weightLimit;

        while(itemIndex > 0){
            const currentItem = this.itemsList[itemIndex];
            const previousItem = this.itemsList[itemIndex - 1];

            // Check whether the value we acquire comes from the top ( previous item ) in 
            // knapsack matrix, if so, then we need to include it in knapsack
            if(
                knapSackMatrix[itemIndex][weightIndex] && 
                (
                    knapSackMatrix[itemIndex][weightIndex] === 
                    knapSackMatrix[itemIndex - 1][weightIndex]
                )
            ){
                // Check for the items with same weight but different values. We
                // need to add the item with highest value in selected items list.
                const prevSumValue = knapSackMatrix[itemIndex - 1][weightIndex];
                const prevPrevSumValue = knapSackMatrix[itemIndex - 2][weightIndex];

                if(
                    !prevSumValue ||
                    (
                        prevSumValue && 
                        prevSumValue !== prevPrevSumValue
                    )
                ){
                    this.selectedItems.push(previousItem);
                } else if(
                    knapSackMatrix[itemIndex - 1][weightIndex - currentItem.weight]
                ){ // move diagonal (kinda)
                    this.selectedItems.push(previousItem);
                    weight -= 1;
                }
            }
            itemIndex -= 1;
        }
    }

    get totalKnapsackValue(){
        return this.selectedItems.reduce((prev, curr) => {
            return prev.value + curr.value
        }, 0);
    }

    get totalKnapsackWeight(){
        return this.selectedItems.reduce((prev, curr) => {
            return prev + curr.weight;
        }, 0);
    }

    // Solve unbounded knapsack problem.
    // Greedy approach.
    solveUnboundKnapsackProblem(){
        this.sortItemsByValue();
        this.sortingByValuePerWeightRatio();

        for(let itemIndex = 0; i < this.itemsList.length; itemIndex += 1){
            if(this.totalKnapsackWeight < this.weightLimit){
                const currentItem = this.itemsList[itemIndex];

                // Detect how much items can be pushed in knapsack
                const availableWeight = this.totalKnapsackValue - this.weightLimit;
                const maxPossibleItemsCount = Math.floor(availableWeight / currentItem.weight);

                if(maxPossibleItemsCount > currentItem.itemsAmount){
                    // If there're more items to be added in knapsack than actually
                    // allowed, then update the quantity in which items will be added 
                    // to the amount of items
                    currentItem.quantity = currentItem.itemsAmount;
                } else if(maxPossibleItemsCount){
                    // In case if we haven't specified the quantity in which item(s)
                    // will be added in the knapsack, we can make the available items count 
                    // as the quantity in which the items will be added in knapsack
                    currentItem.quantity = maxPossibleItemsCount;
                }
                this.selectedItems.push(currentItem);
            }
        }
    }
}