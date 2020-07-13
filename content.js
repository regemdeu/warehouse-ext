const styleHTML = `<style>.extension-content {z-index:100000;padding: 10px;border: 1px solid #ddd;background-color: #f9f9f9;width: 60px;height: 60px;transition: width 0.3s ease-in-out, height 0.3s ease-in-out, border-radius 0.3s ease-in-out;-webkit-transition:width .3s ease-in-out, height 0.3s ease-in-out, border-radius 0.3s ease-in-out;border-radius: 50%;overflow:hidden;position: fixed;display: block;top: 100%;left: 100%;transform: translate(calc(-100% + -20px), calc(-100% + -20px));;box-sizing: border-box;animation-duration: 1s;animation-timing-function: ease-in-out;}.extension-title {margin:0 0 5px;font-family: sans-serif;opacity: 0;transition: opacity 0.3s ease-in-out;-webkit-transition: opacity 0.3 ease-in-out;white-space: nowrap;}.extension-actions {display: flex;flex-direction: column;align-items: flex-start;opacity: 0;transition: opacity 0.3s ease-in-out;-webkit-transition: opacity 0.3 ease-in-out;}.extension-button {cursor:pointer;font-size: 11px;font-family: 'Roboto', sans-serif;padding: 2px 4px;background-color: transparent;border: 1px solid #aaa;border-radius: 4px;margin-bottom: 4px;white-space: nowrap;}.extension-button-1 {color: #3c763d;}.extension-button-2 {color: #a94442;}.extension-button-3 {color: #31708f;}.extension-button:hover {background-color: rgba(0, 0, 0, 0.075);}.extension-img {pointer-events: none;width: 50px;height: 50px;position: absolute;top: 50%;left: 50%;display: block;transform: translate(-50%, -50%);transition: opacity 0.3s ease-in-out;-webkit-transition: opacity 0.3 ease-in-out;opacity: 1;}.extension-content:hover {width: 180px;height: 120px;border-radius: 8px;}.extension-content:hover .extension-title, .extension-content:hover .extension-actions {opacity: 1;transition: opacity 0.3s ease-in-out;-webkit-transition: opacity 0.3 ease-in-out;}.extension-content:hover .extension-img {opacity: 0;}@keyframes success {50% {background-color: lime;}}@keyframes fail {50% {background-color: red;}}</style>`
const extHTML = `<div id="extension-content" class="extension-content"><p class="extension-title">Отправить на склад</p><div class="extension-actions"><button class="extension-button extension-button-1" id="extension-button-1">Синтетическое УПП</button><button class="extension-button extension-button-2" id="extension-button-2">Анкерный</button><button class="extension-button extension-button-3" id="extension-button-3">Насыпное УПП</button></div><img class="extension-img" src="data:image/png;base64,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" alt="На склад"></div>`

document.body.insertAdjacentHTML('afterbegin', styleHTML)
document.body.insertAdjacentHTML('beforeend', extHTML)

const extEl = document.getElementById('extension-content')

const button1 = document.getElementById('extension-button-1')
const button2 = document.getElementById('extension-button-2')
const button3 = document.getElementById('extension-button-3')

addListenerToButton(button1, '1')
addListenerToButton(button2, '2')
addListenerToButton(button3, '5')

function addListenerToButton(button, mount) {
  button.addEventListener('click', () => processData(mount))
}

async function processData(mount) {
  const arr = window.location.pathname.split('/')
  const productNum = arr[arr.length - 1]
  const f = new FormData()
  f.append('draw','1')
  f.append('columns[0][data]','type')
  f.append('columns[0][name]','')
  f.append('columns[0][searchable]','true')
  f.append('columns[0][orderable]','true')
  f.append('columns[0][search][value]','')
  f.append('columns[0][search][regex]','false')
  f.append('columns[1][data]','place')
  f.append('columns[1][name]','')
  f.append('columns[1][searchable]','true')
  f.append('columns[1][orderable]','false')
  f.append('columns[1][search][value]','')
  f.append('columns[1][search][regex]','false')
  f.append('columns[2][data]','hasImg')
  f.append('columns[2][name]','')
  f.append('columns[2][searchable]','false')
  f.append('columns[2][orderable]','false')
  f.append('columns[2][search][value]','')
  f.append('columns[2][search][regex]','false')
  f.append('columns[3][data]','color')
  f.append('columns[3][name]','')
  f.append('columns[3][searchable]','true')
  f.append('columns[3][orderable]','false')
  f.append('columns[3][search][value]','')
  f.append('columns[3][search][regex]','false')
  f.append('columns[4][data]','detailArt')
  f.append('columns[4][name]','')
  f.append('columns[4][searchable]','true')
  f.append('columns[4][orderable]','true')
  f.append('columns[4][search][value]','')
  f.append('columns[4][search][regex]','false')
  f.append('columns[5][data]','count')
  f.append('columns[5][name]','')
  f.append('columns[5][searchable]','true')
  f.append('columns[5][orderable]','true')
  f.append('columns[5][search][value]','')
  f.append('columns[5][search][regex]','false')
  f.append('columns[6][data]','detailWeight')
  f.append('columns[6][name]','')
  f.append('columns[6][searchable]','true')
  f.append('columns[6][orderable]','true')
  f.append('columns[6][search][value]','')
  f.append('columns[6][search][regex]','false')
  f.append('order[0][column]','1')
  f.append('order[0][dir]','asc')
  f.append('order[1][column]','4')
  f.append('order[1][dir]','asc')
  f.append('start','0')
  f.append('length','10000')
  f.append('search[value]','')
  f.append('search[regex]','false')
  
  extEl.style.pointerEvents = 'none'
  extEl.style.pointerEvents
  let response = await fetch(`https://i.nash-dvor.com/api/products/${productNum}/packs/dt`, {body: f, method: 'POST'})
  if(!response.ok) {
    extEl.style.animationName = 'fail'
    setTimeout(() => {
      extEl.style.pointerEvents = ''
      extEl.style.animationName = ''
    }, 1500)
    return
  }
  let {data} = await response.json()
  const mountedData = data.filter(d => !d.mount || d.mount == mount || d.mount == '4' || d.mount == '3')

  response = await fetch(`https://i.nash-dvor.com/api/products/${productNum}`)
  if(!response.ok) {
    extEl.style.animationName = 'fail'
    setTimeout(() => {
      extEl.style.pointerEvents = ''
      extEl.style.animationName = ''
    }, 1500)
    return
  }
  data = await response.json()
  const invoice = data.art

  response = await fetch(`https://warehouseapi.iopk.in/v1/js-parser-item-template`, {body: JSON.stringify({data: mountedData, invoice}), method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json'},})
  extEl.style.animationName = response.ok ? 'success' : 'fail'
  setTimeout(() => {
    extEl.style.pointerEvents = ''
    extEl.style.animationName = ''
  }, 1500)
}