// Joon x Jin Works — language switch, theme toggle and the mail copy button. No dependencies.
// The page is complete without this file: both languages are in the markup and the <head>
// snippet already picked one.
;(function () {
  'use strict'

  var root = document.documentElement
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.lang-btn'))

  function applyLang(lang) {
    root.lang = lang
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang))
    })
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang')
      applyLang(lang)
      try {
        localStorage.setItem('joonjin-lang', lang)
      } catch (e) {
        // blocked storage: the switch still works for this visit
      }
    })
  })

  applyLang(root.lang === 'en' ? 'en' : 'ko')

  // ── theme: auto (follow the OS) -> dark -> light -> auto ──
  var THEME_KEY = 'joonjin-theme'
  var ORDER = ['auto', 'dark', 'light']
  // U+FE0E keeps the glyphs as text, not emoji
  var GLYPH = { auto: '\u25D0\uFE0E', dark: '\u263E\uFE0E', light: '\u2600\uFE0E' }
  var LABEL = {
    ko: { auto: '테마: 자동 (누르면 어두움)', dark: '테마: 어두움 (누르면 밝음)', light: '테마: 밝음 (누르면 자동)' },
    en: { auto: 'Theme: auto (switch to dark)', dark: 'Theme: dark (switch to light)', light: 'Theme: light (switch to auto)' }
  }
  var PAPER = { light: '#f5f1ea', dark: '#161512' }
  var themeBtn = document.querySelector('.theme-btn')
  var themeMetas = Array.prototype.slice.call(document.querySelectorAll('meta[name="theme-color"]'))
  themeMetas.forEach(function (m) {
    m.setAttribute('data-auto', m.getAttribute('content'))
  })

  function currentTheme() {
    var t = root.getAttribute('data-theme')
    return t === 'dark' || t === 'light' ? t : 'auto'
  }

  function paintTheme() {
    var state = currentTheme()
    // browser chrome follows the effective theme: an explicit pick overrides both media-scoped metas
    themeMetas.forEach(function (m) {
      m.setAttribute('content', state === 'auto' ? m.getAttribute('data-auto') : PAPER[state])
    })
    if (!themeBtn) return
    themeBtn.setAttribute('data-theme-state', state)
    themeBtn.setAttribute('aria-label', LABEL[root.lang === 'en' ? 'en' : 'ko'][state])
    themeBtn.firstElementChild.textContent = GLYPH[state]
  }

  if (themeBtn) {
    themeBtn.hidden = false
    themeBtn.addEventListener('click', function () {
      var next = ORDER[(ORDER.indexOf(currentTheme()) + 1) % ORDER.length]
      if (next === 'auto') root.removeAttribute('data-theme')
      else root.setAttribute('data-theme', next)
      try {
        if (next === 'auto') localStorage.removeItem(THEME_KEY)
        else localStorage.setItem(THEME_KEY, next)
      } catch (e) {
        // blocked storage: the choice still holds for this visit
      }
      paintTheme()
    })
    buttons.forEach(function (btn) {
      btn.addEventListener('click', paintTheme)
    })
  }
  paintTheme()

  // copy button only appears where the Clipboard API exists; the mailto link works regardless
  if (navigator.clipboard && window.isSecureContext) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
      var timer = 0
      btn.hidden = false
      btn.addEventListener('click', function () {
        navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(
          function () {
            btn.classList.add('is-done')
            clearTimeout(timer)
            timer = setTimeout(function () {
              btn.classList.remove('is-done')
            }, 1600)
          },
          function () {}
        )
      })
    })
  }
})()
