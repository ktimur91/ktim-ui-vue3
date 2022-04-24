/*
 * Обязательные атрибуты:
 * data-btn="uniqId"
 * data-body="uniqId"
 *
 * Аргументы:
 * uniqId = ""
 * direction = "ltr"
 * isSetFocus = false
 */
import { nextTick } from 'vue'

export default async function calcDropDown(uniqId, direction, isSetFocus = false) {
  // Ширина высота вьюпорта
  // const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  // Получаем координаты кнопки
  const btnElement = document.querySelector(`[data-dropdown-btn="${uniqId}"]`)
  const coordsBtn = btnElement.getBoundingClientRect()

  // Ждем пока откроется тело
  await nextTick()

  // Если надо то ставим фокус
  if (isSetFocus) {
    const el = document.getElementById(uniqId)
    if (el) el.focus()
  }

  // Вставляем полученые координаты кнопки в тело
  const bodyElement = document.querySelector(`[data-dropdown-body="${uniqId}"]`)
  if (bodyElement) {
    const coordsBody = bodyElement.getBoundingClientRect()
    // bodyElement.style.top = coordsBtn.bottom + 5 + 'px'
    bodyElement.style.top =
      vh / 2 > coordsBtn.bottom ? coordsBtn.bottom + 2 + 'px' : coordsBtn.top - coordsBody.height - 2 + 'px'

    if (direction === 'rtl') {
      bodyElement.style.left = coordsBtn.right - coordsBody.width + 'px'
    } else if (direction === 'ltr') {
      bodyElement.style.left = coordsBtn.left + 'px'
    } else {
      bodyElement.style.width = coordsBtn.width + 'px'
      bodyElement.style.left = coordsBtn.left + 'px'
    }
  }
}
