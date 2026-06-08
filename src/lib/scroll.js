export function scrollToId(id, offset = 80) {
  if (typeof window === "undefined") return
  const el = document.getElementById(id)
  if (!el) return

  const top = el.getBoundingClientRect().top + window.pageYOffset - Number(offset || 0)
  window.scrollTo({ top, behavior: "smooth" })
}

export default scrollToId
