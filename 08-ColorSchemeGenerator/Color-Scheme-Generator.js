/* colorPicker */
const colorInput = document.getElementById('color-picker')
const modeNames = document.getElementById('mode-select')
const colorBtn = document.getElementById('get-button')
const colorPaletteContainer = document.getElementById('color-palette-container')

// MODE CHOICE

const modeChoices = ['monochrome', 'monochrome-dark', 'monochrome-light', 'analogic', 'complement', 'analogic-complement', 'triad', 'quad']

let modeChoicesHtml = ``

modeChoices.forEach(mode => {
  let modeUpperCase = mode[0].toUpperCase() + mode.slice(1)

  modeChoicesHtml += `
    <option value="${mode}">${modeUpperCase}</option>
  `
})

modeNames.innerHTML = modeChoicesHtml


colorBtn.addEventListener('click', getColorScheme)

function getColorScheme() {

  const modeNamesValue = modeNames.value
  const colorInputHexValue = colorInput.value.slice(1)

  fetch(`https://www.thecolorapi.com/scheme?hex=${colorInputHexValue}&format=json&mode=${modeNamesValue}&count=5`)
    .then(res => res.json())
    .then(data => {
      renderColors(data)
    })
}

function renderColors(data) {

  const colorsArr = data.colors

  let colorHtml = ``

  colorsArr.forEach(color => {

    const colorHexValue = color.hex.value

    colorHtml += `
      <div class="color-palette-column">
        <div class="color-palette" style="background-color: ${colorHexValue}"></div>
        <div class="color-palette-value">
          <span data-copy='${colorHexValue}' onclick='copyToClipboard(this)'>${colorHexValue}</span>
        </div>
      </div>
    `
  })

  colorPaletteContainer.innerHTML = colorHtml
}

function renderColorValue(text) {
  text.parentElement.classList.remove('copy-text')
  getColorScheme()
}

function copyToClipboard(text) {
  console.log(text)
  navigator.clipboard.writeText(text.dataset.copy)
    .then(() => {

      text.parentElement.classList.add('copy-text')

      text.innerText = `Copied`

      setTimeout(() => {
        renderColorValue(text)
      }, 1000)

      console.log('Text copied to clipboard')
    })
    .catch(err => console.error('Could not copy text: ', err));
}