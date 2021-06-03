import num from './num'

export default {
  isEmpty: (data) => {
    if (data === null) return true;
    if (data === undefined) return true;
    if (data === false) return true;
    if (data === '') return true;
    if (data === '0') return true;
    if (data === 0) return true;
    if (typeof data === 'object') {
      if (Array.isArray(data)) return data.length === 0;
      if (Object.keys(data).length > 0) return false;
      if (
        typeof Object.getOwnPropertySymbols !== 'undefined' &&
        Object.getOwnPropertySymbols(data).length > 0
      )
        return false;
      if (data.valueOf().length !== undefined)
        return data.valueOf().length === 0;
      if (typeof data.valueOf() !== 'object') return this.isEmpty(data.valueOf());
    }
    return false;
  },

  byteToUnit: (byteSize, returnUnit = 'MB', withUnit = true, digits = 1) => {
    let formattedSize = byteSize
    const lowerUnit = returnUnit.toLowerCase()
    const units = ['b', 'kb', 'mb', 'gb']
    const targetUnitIdx = units.findIndex(unit => unit === lowerUnit)
    if (targetUnitIdx != -1) {
      for (let i = 0, n = targetUnitIdx; i < n; i++) {
        formattedSize = formattedSize / 1024
      }
      formattedSize = num.orgFloor(formattedSize, digits)
      if (withUnit) {
        formattedSize += returnUnit
      }
      return formattedSize
    }
  },
}
