import radianToDegree from "../radianToDegree/radianToDegree";

export default class ComplexNumber{
    /**
     * z = re + im * i
     * z = radius * (e ** (i * phase))
     * 
     * @param {number} [im]
     * @param {number} [re]
     */
    constructor({im = 0, re = 0} = {}){
        this.im = im;
        this.re = re;
    }

    /**
     * @param {number | ComplexNumber} number 
     * @return {ComplexNumber}
     */
    toComplexNumber(number){
        if(number instanceof ComplexNumber){
            return number;
        }
        return ComplexNumber({re: number});
    }

    /**
     * @param {number | ComplexNumber} addend
     * @return {ComplexNumber}
     */
    add(addend){
        const complexAddend = this.toComplexNumber(addend);
        return ComplexNumber({
            re: this.re + complexAddend.re,
            im: this.im + complexAddend.im
        });
    }

    /**
     * @param {number | ComplexNumber} subtrahend 
     * @return {ComplexNumber}
     */
    subtract(subtrahend){
        const complexSubtrahend = this.toComplexNumber(subtrahend);
        return ComplexNumber({
            re: this.re - complexSubtrahend.re,
            im: this.im - complexSubtrahend.im
        });
    }

    /**
     * @param {number | ComplexNumber} multiplicand 
     * @return {ComplexNumber}
     */
    multiply(multiplicand){
        const complexMultiplicand = this.toComplexNumber(multiplicand);
        return ComplexNumber({
            re: this.re * complexMultiplicand.re,
            im: this.im * complexMultiplicand.im
        });
    }

    conjugate(number){
        const complexNumber = this.toComplexNumber(number);
        return ComplexNumber({
            re: complexNumber.re,
            im: -1 * complexNumber.im
        });
    }

    /**
     * @param {number | ComplexNumber} divider 
     * @return {ComplexNumber}
     */
    divide(divider){
        const complexDivider = this.toComplexNumber(divider);
        const dividerConjugate = this.conjugate(complexDivider);
        const complexDividend = this.multiply(dividerConjugate);
        const finalComplexDivider = (complexDivider.re ** 2) - (complexDivider.im ** 2);

        return ComplexNumber({
            re: complexDividend.re/finalComplexDivider,
            im: complexDividend.im/finalComplexDivider
        });
    }

    /**
     * @returns {number}
     */
    getRadius(){
        return Math.sqrt((this.re ** 2) + (this.im ** 2));
    }

    getPhase(inRadians = true){
        let phase = Math.atan(Math.abs(this.im) / Math.abs(this.re));

        if (this.re < 0 && this.im > 0) {
            phase = Math.PI - phase;
        } else if (this.re < 0 && this.im < 0) {
            phase = -(Math.PI - phase);
        } else if (this.re > 0 && this.im < 0) {
            phase = -phase;
        } else if (this.re === 0 && this.im > 0) {
            phase = Math.PI / 2;
        } else if (this.re === 0 && this.im < 0) {
            phase = -Math.PI / 2;
        } else if (this.re < 0 && this.im === 0) {
            phase = Math.PI;
        } else if (this.re > 0 && this.im === 0) {
            phase = 0;
        } else if (this.re === 0 && this.im === 0) {
            // More correctly would be to set 'indeterminate'.
            // But just for simplicity reasons let's set zero.
            phase = undefined;
        }

        if(!inRadians){
            phase = radianToDegree(phase);
        }

        return phase;
    }

    /**
     * 
     * @param {boolean} inRadians 
     * @returns {{radius: number, phase: number}}
     */
    getPolarForm(inRadians = true){
        return {
            radius: this.getRadius(),
            phase: this.getPhase(inRadians)
        }
    }
}