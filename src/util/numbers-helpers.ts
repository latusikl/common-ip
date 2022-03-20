class NumbersHelpers {
    toUint32(value: number): number {
        return value >>> 0
    }
}

export default new NumbersHelpers();
