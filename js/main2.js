!function () { const e = document.querySelector("#input"), t = document.querySelector("#textExample"), n = function (e) { const t = []; let n = [], o = 0; for (const s of e) { o += 1; let e = s; " " === e && (e = "º"), "\n" === e && (e = "¶\n"), n.push({ id: o, label: e, original: s, success: !0 }), (n.length >= 70 || "¶\n" === e) && (t.push(n), n = []) } n.length > 0 && t.push(n); return t }("Рыба ТЕКСТ поможет\nдизайнеру, верстальщику, вебмастеру сгенерировать\nнесколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.\nПо своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен."); let o = 1, s = null, c = !1, r = 0, i = 0; function a(t) { e !== document.activeElement && (e.focus(), e.dispatchEvent(new KeyboardEvent(t.type, t))) } function d(e) { const t = document.createElement("div"); t.classList.add("line"); for (const n of e) { const e = document.createElement("span"); e.textContent = n.label, t.append(e), o > n.id ? e.classList.add("done") : n.success || e.classList.add("hint") } return t } function u() { for (let e = 0; e < n.length; e++)for (const t of n[e]) if (o === t.id) return e } function l() { const e = u(); t.innerHTML = ""; for (let o = 0; o < n.length; o++) { const s = d(n[o]); t.append(s), (o < e || o > e + 2) && s.classList.add("hidden") } } l(), e.focus(), e.addEventListener("keydown", function (t) { const a = u(), d = document.querySelector(`[data-key="${t.key.toLowerCase()}"]`), f = document.querySelector(`[data-code="${t.code}"]`); "Shift" !== t.key && "CapsLock" !== t.key && (r += 1), c || (c = !0, s = Date.now()); const y = function () { for (const e of n) for (const t of e) if (o === t.id) return t }(); if (t.key.startsWith("F") && t.key.length > 1) return; d && !d.classList.contains("hint") ? d.classList.add("hint") : d && d.classList.remove("hint"), f && f.classList.add("hint"); const m = t.key === y.original, h = "Enter" === t.key && "\n" === y.original; if (m || h) o += 1, l(); else { if (t.preventDefault(), "Shift" !== t.key && "CapsLock" !== t.key) { i += 1; for (const e of n) for (const t of e) t.original === y.original && (t.success = !1) } l() } if (a !== u()) { e.value = "", t.preventDefault(); const n = Date.now() - s; document.querySelector("#wordsSpeed").textContent = Math.round(6e4 * r / n), document.querySelector("#errorProcent").textContent = Math.floor(1e4 * i / r) / 100 + "%", c = !1, r = 0, i = 0 } }), e.addEventListener("keyup", function (e) { const t = document.querySelector(`[data-key="${e.key.toLowerCase()}"]`), n = document.querySelector(`[data-code="${e.code}"]`); "capslock" !== e.key.toLowerCase() && (t && t.classList.remove("hint"), n && n.classList.remove("hint")) }), e.addEventListener("focusout", () => { document.addEventListener("keydown", a) }) }();