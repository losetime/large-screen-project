/**
 * @desc 二维码颜色
 */
export const formatQRcodeColor = (codeColor: string) => {
  switch (codeColor) {
    case 'green':
      return '#1BC38F'
    case 'yellow':
      return '#FFBC00'
    case 'red':
      return '#FF5434'
  }
}
