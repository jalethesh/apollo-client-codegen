/**
 * Decode Id for Generic Item
 * @param encodedId string, example: "R2VuZXJpY0l0ZW1PYmplY3Q6MjEwNzEy"
 * @returns decoded integer, example: 123455
 */
export default function getGenericId(encodedId: string) {
  return parseInt(atob(encodedId).split(':')[1]);
}
