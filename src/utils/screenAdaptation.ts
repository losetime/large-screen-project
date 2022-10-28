export default function autoAdjustHtml() {
  const baseHeight = 2160
  const baseWidth = 3840
  //设计稿宽高比
  const baseRate: any = (baseWidth / baseHeight).toFixed(5)

  function setAppStyle() {
    const clientWidth = document.body.clientWidth
    const clientHeight = document.body.clientHeight
    const currentRate = (clientWidth / clientHeight).toFixed(5)
    let scaleWidth, scaleHeight
    if (currentRate > baseRate) {
      //更宽
      scaleWidth = ((clientHeight * baseRate) / baseWidth).toFixed(5)
      scaleHeight = (clientHeight / baseHeight).toFixed(5)
    } else {
      //更高
      scaleHeight = (clientWidth / baseRate / baseHeight).toFixed(5)
      scaleWidth = (clientWidth / baseWidth).toFixed(5)
    }
    const appDom = document.getElementById('app')
    if (appDom) {
      if (clientHeight < 864) {
        appDom.style.transform = `scale(${scaleWidth}, ${scaleHeight}) translate(-75%, -100%)`
      } else {
        appDom.style.transform = `scale(${scaleWidth}, ${scaleHeight}) translate(-75%, -75%)`
      }
    }
  }
  setAppStyle()
  window.onresize = setAppStyle
}
