interface IPartitionFunction<T> {
  (element: T): boolean;
}

/**
 * Partitions an array in to two arrays based on `isValid` function
 * @param array Array to partition
 * @param isValid Function to test each item against
 */
export const partition = <T>(array: T[], isValid: IPartitionFunction<T>): T[][] => {
  return array.reduce(([pass, fail]: T[][], elem) => {
    return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
  }, [[], []]);
}
