const colorInput = document.getElementById('color-picker')
const modeNames = document.getElementById('mode-select')
const colorBtn = document.getElementById('get-button')
const colorPaletteContainer = document.getElementById('color-palette-container')
const hexFooter = document.getElementById('hex-footer')
const themeToggle = document.getElementById('theme-toggle')

const themeIcon = document.getElementById('theme-icon')

themeToggle.addEventListener('click', () => {
  if (themeIcon.classList.contains('spinning')) return

  themeIcon.classList.add('spinning')

  // At 180deg midpoint: swap image + toggle dark so theme fades in during second half of spin
  setTimeout(() => {
    const isDark = document.body.classList.toggle('dark')
    themeIcon.src = isDark ? 'theme_dark.png' : 'theme_light.png'
  }, 300) // half of 600ms animation

  themeIcon.addEventListener('animationend', () => {
    themeIcon.classList.remove('spinning')
  }, { once: true })
})

const modeChoices = [
  'monochrome', 'monochrome-dark', 'monochrome-light',
  'analogic', 'complement', 'analogic-complement', 'triad', 'quad'
]

modeNames.innerHTML = modeChoices
  .map(mode => `<option value="${mode}">${mode[0].toUpperCase() + mode.slice(1)}</option>`)
  .join('')

colorBtn.addEventListener('click', getColorScheme)

function getColorScheme() {
  const hex = colorInput.value.slice(1)
  const mode = modeNames.value

  fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${mode}&count=5`)
    .then(res => res.json())
    .then(data => renderColors(data))
}

function renderColors(data) {
  const colors = data.colors

  colorPaletteContainer.innerHTML = colors
    .map(c => `<div class="color-palette" style="background-color: ${c.hex.value}"></div>`)
    .join('')

  hexFooter.innerHTML = colors
    .map(c => `<span class="color-palette-value" data-copy="${c.hex.value}" onclick="copyToClipboard(this)">${c.hex.value}</span>`)
    .join('')
}

function copyToClipboard(el) {
  navigator.clipboard.writeText(el.dataset.copy)
    .then(() => {
      el.classList.add('copy-text')
      el.innerText = 'Copied'

      setTimeout(() => {
        el.classList.remove('copy-text')
        el.innerText = el.dataset.copy
      }, 1000)
    })
    .catch(err => console.error('Could not copy text:', err))
}