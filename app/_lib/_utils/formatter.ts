export const commaFormatter = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
/**
 * @param num - number to be formatted
 * @param fractionDigits - number of decimal places
 * @param prefix - prefix to be added to the formatted number
 * @param postfix - postfix to be added to the formatted number
 * @returns {*|string} formatted number
 * @description This function formats a number to a more readable format
 */
export const numFormatter = (num: number, fractionDigits: number = 0, prefix: string = "", postfix: string = "") => {
  const options = {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }

  if (num > 999 && num < 1000000) {
    const formattedNum = (num / 1000).toLocaleString(undefined, options)
    return `${prefix}${formattedNum}k${postfix}`
  } else if (num > 1000000) {
    const formattedNum = (num / 1000000).toLocaleString(undefined, options)
    return `${prefix}${formattedNum}m ${postfix}`
  } else if (num < 900) {
    return `${prefix}${num} ${postfix}`
  }
}
