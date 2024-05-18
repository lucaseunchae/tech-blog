export default function sum(arr: number[]) {
  let result = 0

  arr.forEach((num) => {
    result += num
  })

  return result
}
