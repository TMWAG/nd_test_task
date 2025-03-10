/**
 * Use to get unique id for your inputs
 * @param [notUniquePart='input-id'] Provide to change not unique part of returning id
 * @returns {string}
 */
export default function getInputId(notUniquePart: string = 'input-id'): string {
  return `${notUniquePart}-${Math.floor(Math.random() * 1000)}`
}
