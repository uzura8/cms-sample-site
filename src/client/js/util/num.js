export default {
  /**
  * Truncate at any digit 
  * @param {number} value
  * @param {number} base: Digits to truncate （ex: 10 -> 10, 0.1 -> 0.1）
  * @return {number}
  */
  orgFloor :(value, base) => {
    return Math.floor(value * base) / base
  }
}
