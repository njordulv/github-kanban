export const getRoundedNumber = (number: number) => {
  let million = 1000000
  let thousand = 1000

  if (number > million) {
    return `${Math.floor(number / million)} M`
  } else if (number > thousand) {
    return `${Math.floor(number / thousand)} K`
  }
  return number
}
