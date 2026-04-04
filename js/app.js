let activeCountry = null;
let activeSection = 'overview';

function renderCountries() {
  const grid = document.getElementById('countryGrid');
  grid.innerHTML = Object.entries(countries).map(([id, c]) =>
    `<button class="country-btn ${activeCountry===id?'active':''}" onclick="selectCountry('${id}')">
      <span class="flag">${c.flag}</span>${c.name}
    </button>`
  ).join('');
}

function renderTabs() {
  const t = document.getElementById('tabs');
  if (!activeCountry) { t.innerHTML = ''; return; }
  t.innerHTML = sections.map(s =>
    `<button class="tab-btn ${activeSection===s.id?'active':''}" onclick="selectTab('${s.id}')">${s.label}</button>`
  ).join('');
}

function selectCountry(id) {
  activeCountry = id;
  activeSection = 'overview';
  renderCountries();
  renderTabs();
  renderContent();
}

function selectTab(id) {
  activeSection = id;
  renderTabs();
  renderContent();
}

function renderContent() {
  const el = document.getElementById('content');
  if (!activeCountry) {
    el.innerHTML = '<div class="no-country"><span class="arrow">☝️</span>Выберите страну, куда едете</div>';
    return;
  }
  const c = countries[activeCountry];
  const renderers = { overview: renderOverview, culture: renderCulture, rights: renderRights, redflags: renderRedflags, money: renderMoney, faq: renderFaq, contacts: renderContacts, pack: renderPack, checklist: renderChecklist };
  el.innerHTML = renderers[activeSection](c);
}

function renderOverview(c) {
  return `
    <div class="stats-row">
      <div class="stat-box"><span class="num">${c.flag}</span><span class="label">${c.name}</span></div>
      <div class="stat-box"><span class="num" style="font-size:16px">${c.rate}</span><span class="label">${c.currency}</span></div>
    </div>
    <div class="info-card"><h3><span class="icon">💼</span> Востребованные профессии</h3><p>${c.professions}</p></div>
    <div class="info-card"><h3><span class="icon">💵</span> Минимальная зарплата</h3><p>${c.minWage}</p></div>
    <div class="info-card"><h3><span class="icon">📄</span> Документ на проживание</h3><p>${c.residenceDoc}</p></div>
    <div class="info-card"><h3><span class="icon">🌡️</span> Климат</h3><p>${c.climate}</p></div>
    <div class="info-card"><h3><span class="icon">⏰</span> Рабочее время</h3><p>${c.workHours}</p><p style="margin-top:6px"><strong>Сверхурочные:</strong> ${c.overtime}</p></div>`;
}

function renderCulture(c) {
  return `
    <div class="info-card culture-card">
      <h3><span class="icon">👗</span> Одежда</h3>
      <p>${c.dress}</p>
    </div>
    <div class="info-card" style="border-left:3px solid var(--accent)">
      <h3><span class="icon">🌙</span> Рамадан</h3>
      <p>${c.ramadan}</p>
    </div>
    <div class="info-card ${c.alcohol.includes('запрещён') || c.alcohol.includes('Запрещён') ? 'red-flag' : 'culture-card'}">
      <h3><span class="icon">🍷</span> Алкоголь</h3>
      <p>${c.alcohol}</p>
    </div>
    <div class="info-card culture-card">
      <h3><span class="icon">📸</span> Важно знать</h3>
      <p>${c.culture_extra}</p>
    </div>
    <div class="info-card red-flag">
      <h3><span class="icon">🚫</span> Категорически запрещено</h3>
      <ul>
        <li>Внебрачные отношения — <strong>уголовное наказание</strong></li>
        <li>Публичные проявления привязанности (поцелуи, объятия)</li>
        <li>Оскорбление религии, правителей, государства</li>
        <li>Фотографирование людей без разрешения</li>
        <li>Наркотики — <strong>вплоть до смертной казни</strong></li>
        <li>Участие в протестах и митингах</li>
      </ul>
    </div>
    <div class="info-card tip-card">
      <h3><span class="icon">💡</span> Советы</h3>
      <ul>
        <li>Приветствие: правая рука к сердцу + <strong>«Ас-саляму алейкум»</strong></li>
        <li>Левая рука считается нечистой — не передавайте ей предметы</li>
        <li>В пятницу многие заведения не работают днём</li>
        <li>Не обсуждайте политику и религию</li>
        <li>Будьте терпеливы — темп жизни может отличаться</li>
      </ul>
    </div>`;
}

function renderRights(c) {
  return `
    <div class="info-card tip-card"><h3><span class="icon">⚖️</span> Что гарантирует закон</h3>
      <ul>
        <li>Зарплата должна быть <strong>прописана в контракте</strong> и выплачиваться вовремя</li>
        <li>Сверхурочная работа <strong>оплачивается дополнительно</strong></li>
        <li>Вы имеете право на <strong>отдых, отпуск</strong> и выходные</li>
        <li>Принудительный труд и дискриминация <strong>запрещены</strong></li>
        <li>Работодатель обязан <strong>оформить документы</strong> за свой счёт</li>
      </ul>
    </div>
    <div class="info-card"><h3><span class="icon">📝</span> Что проверить в контракте</h3>
      <ul>
        <li><strong>Зарплату</strong> — точная сумма, валюта, сроки выплаты</li>
        <li><strong>Должность</strong> — совпадает ли с тем, что обещали</li>
        <li><strong>Рабочее время</strong> — часы, выходные, сверхурочные</li>
        <li><strong>Жильё и питание</strong> — кто обеспечивает, за чей счёт</li>
        <li><strong>Срок контракта</strong> — начало, конец, условия продления</li>
        <li><strong>Медицинское обслуживание</strong> — есть ли страховка</li>
      </ul>
    </div>
    <div class="info-card"><h3><span class="icon">🏛️</span> Куда жаловаться</h3>
      <p>Если работодатель нарушает ваши права — подайте жалобу в <strong>${c.laborName}</strong>. Можно онлайн, по телефону или лично.</p>
      <p style="margin-top:10px"><strong>Защита зарплаты:</strong> ${c.wageSystem}</p>
    </div>`;
}

function renderRedflags(c) {
  return `
    <div class="info-card red-flag"><h3><span class="icon">🚩</span> Стоп! Не соглашайтесь, если:</h3>
      <ul>
        <li>Вам <strong>не дают копию контракта</strong> или не объясняют его</li>
        <li>В контракте написана <strong>другая зарплата</strong>, чем обещали устно</li>
        <li>Обещают платить <strong>«наличкой» без документов</strong></li>
        <li>Работодатель <strong>забирает ваш паспорт</strong> — это незаконно!</li>
        <li>Просят <strong>подписать что-то на языке</strong>, который не понимаете</li>
        <li>Из зарплаты делают <strong>непонятные удержания</strong></li>
        <li>Заставляют работать <strong>у другого работодателя</strong>, чем в контракте</li>
        <li>Вас заставляют <strong>оплачивать разрешение на работу</strong></li>
      </ul>
    </div>
    <div class="info-card red-flag"><h3><span class="icon">⚠️</span> Признаки торговли людьми</h3>
      <ul>
        <li>Изъятие документов</li>
        <li>Ограничение свободы передвижения</li>
        <li>Угрозы, насилие, шантаж</li>
        <li>Невыплата зарплаты и долговая зависимость</li>
        <li>Принуждение к работе, на которую не соглашались</li>
      </ul>
      <p style="margin-top:12px;color:var(--danger);font-weight:700">→ Немедленно звоните в посольство или полицию!</p>
    </div>
    <div class="info-card tip-card"><h3><span class="icon">🛡️</span> Как себя защитить</h3>
      <ul>
        <li><strong>Никогда</strong> не отдавайте оригинал паспорта</li>
        <li>Храните <strong>копии всех документов</strong> отдельно + фото в телефоне</li>
        <li>Сохраняйте <strong>всю переписку</strong> с работодателем</li>
        <li>Запишите контакты посольства <strong>до вылета</strong></li>
        <li>Расскажите родственникам, <strong>куда и к кому</strong> едете</li>
      </ul>
    </div>`;
}

function renderMoney(c) {
  return `
    <div class="stats-row">
      <div class="stat-box"><span class="num" style="font-size:15px">${c.rate}</span><span class="label">${c.currency}</span></div>
      <div class="stat-box"><span class="num" style="font-size:13px">${c.minWage.length > 30 ? c.minWage.substring(0,28)+'…' : c.minWage}</span><span class="label">Мин. зарплата</span></div>
    </div>
    <div class="info-card tip-card"><h3><span class="icon">💰</span> Правила безопасности с деньгами</h3>
      <ul>
        <li>Получайте зарплату только <strong>на банковский счёт</strong> с подтверждением</li>
        <li>Сохраняйте <strong>все расчётные листки</strong> и выписки</li>
        <li>Переводите деньги домой через <strong>банки и лицензированные сервисы</strong></li>
        <li><strong>Не передавайте деньги</strong> через «знакомых»</li>
        <li><strong>Не храните всё наличными</strong> — разделите: счёт + наличные + резерв</li>
        <li>Никому не давайте <strong>карту и PIN-код</strong></li>
      </ul>
    </div>
    <div class="info-card red-flag"><h3><span class="icon">⚠️</span> Финансовые ловушки</h3>
      <ul>
        <li>Зарплата «в конверте» без документов — <strong>потом не докажете</strong></li>
        <li>Кредиты и займы на месте — <strong>долговая яма</strong></li>
        <li>«Выгодный обмен» через посредников — <strong>риск потери денег</strong></li>
        <li>Подписание финансовых документов <strong>без понимания содержания</strong></li>
      </ul>
    </div>`;
}

function renderFaq(c) {
  const faqs = [
    { q: '😰 А если работодатель заберёт паспорт?', a: 'Это <strong>незаконно</strong> во всех странах Залива. Ваш паспорт — это ваша собственность. Если забрали — фиксируйте факт и обращайтесь в ' + c.laborName + '. Это серьёзное нарушение, и закон на вашей стороне.' },
    { q: '😰 А если не заплатят зарплату?', a: 'Подайте жалобу в ' + c.laborName + ' (тел: ' + c.laborHotline + '). Во всех странах Залива есть системы контроля зарплат. Сохраняйте контракт и расчётные листки — это ваши доказательства.' },
    { q: '😰 А если захочу уехать домой?', a: 'Имеете право, но если контракт не закончен — читайте условия досрочного расторжения. Могут быть финансовые последствия (оплата визы, билета). Обсудите с агентством до принятия решения.' },
    { q: '😰 А если заболею?', a: 'Если есть медицинская страховка (проверьте контракт) — обращайтесь в больницу. Сообщите работодателю. Хронические болезни, о которых не сказали заранее — за ваш счёт.' },
    { q: '😰 А если условия не как обещали?', a: 'Сравните реальные условия с тем, что написано в контракте. Если контракт нарушен — жалуйтесь в ' + c.laborName + '. Если обещали устно, а в контракте другое — к сожалению, действует контракт.' },
    { q: '😰 Первый месяц очень тяжело — это нормально?', a: '<strong>Да, это нормально.</strong> Первые 2–4 недели — самые сложные: другой климат, еда, язык, одиночество. Большинство через это проходят. Дайте себе время — станет легче.' },
    { q: '😰 Могу ли я сменить работодателя?', a: 'Да, но только через <strong>официальные каналы</strong>. Самовольный уход грозит штрафами и чёрным списком стран Залива. Обсудите с агентством.' },
    { q: '😰 А если кто-то угрожает или применяет насилие?', a: 'Звоните в полицию: <strong>' + c.police + '</strong>. Потом — в посольство. Это не нормально и не ваша вина. Вас защитит закон.' },
  ];

  return faqs.map(f =>
    `<div class="faq-item" onclick="this.classList.toggle('open')">
      <div class="faq-q">${f.q}<span class="arrow">▼</span></div>
      <div class="faq-a">${f.a}</div>
    </div>`
  ).join('');
}

function renderContacts(c) {
  let html = `<div class="info-card"><h3><span class="icon">🆘</span> Экстренные службы</h3></div>`;
  html += `<div class="contact-item"><div><span class="label">Полиция</span></div><div class="value"><a href="tel:${c.police}">${c.police}</a></div></div>`;
  html += `<div class="contact-item"><div><span class="label">Скорая помощь</span></div><div class="value"><a href="tel:${c.ambulance}">${c.ambulance}</a></div></div>`;
  html += `<div class="divider"></div>`;
  html += `<div class="info-card"><h3><span class="icon">⚖️</span> Трудовые права — ${c.laborName}</h3></div>`;
  html += `<div class="contact-item"><div><span class="label">Телефон</span></div><div class="value" style="font-size:13px">${c.laborPhone}</div></div>`;
  html += `<div class="contact-item"><div><span class="label">Горячая линия</span></div><div class="value" style="font-size:14px">${c.laborHotline}</div></div>`;
  if (c.antiTrafficking) {
    html += `<div class="contact-item" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.06)"><div><span class="label">Торговля людьми</span></div><div class="value" style="color:var(--danger);font-size:13px">${c.antiTrafficking}</div></div>`;
  }
  html += `<div class="divider"></div>`;
  html += `<div class="embassy-card"><h3><span class="icon">🇰🇬</span> ${c.embassy}</h3>`;
  html += `<p style="margin-top:8px"><strong>Адрес:</strong> ${c.embassyAddr}</p>`;
  if (c.embassyPhone) html += `<p><strong>Телефон:</strong> <a href="tel:${c.embassyPhone}" style="color:var(--accent)">${c.embassyPhone}</a></p>`;
  if (c.embassyHotline) html += `<p><strong>Горячая линия:</strong> <a href="tel:${c.embassyHotline}" style="color:var(--accent)">${c.embassyHotline}</a></p>`;
  if (c.embassyEmail) html += `<p><strong>Email:</strong> <a href="mailto:${c.embassyEmail}" style="color:var(--accent)">${c.embassyEmail}</a></p>`;
  if (c.embassyNote) html += `<p style="margin-top:6px;color:var(--text-dim);font-style:italic">${c.embassyNote}</p>`;
  html += `</div>`;
  html += `<div class="info-card"><h3><span class="icon">🌐</span> Полезные ссылки</h3>
    <p><strong>Telegram: @legacy_kg</strong> — вакансии за рубежом</p>
    <p style="margin-top:6px"><strong>mfa.gov.kg</strong> — контакты посольств КР</p>
  </div>`;
  return html;
}

function renderPack(c) {
  return `
    <div class="info-card pack-card">
      <h3><span class="icon">📄</span> Документы</h3>
      <div class="pack-check"><span class="pack-icon">🛂</span><div class="pack-text"><strong>Загранпаспорт</strong> — проверьте срок (минимум 6 месяцев)</div></div>
      <div class="pack-check"><span class="pack-icon">📋</span><div class="pack-text"><strong>Копия контракта</strong> — бумажная + фото в телефоне</div></div>
      <div class="pack-check"><span class="pack-icon">📸</span><div class="pack-text"><strong>Фото всех документов</strong> — в облако (Google Drive / iCloud)</div></div>
      <div class="pack-check"><span class="pack-icon">🏥</span><div class="pack-text"><strong>Медицинские справки</strong> — результаты обследования</div></div>
      <div class="pack-check"><span class="pack-icon">📷</span><div class="pack-text"><strong>Фото 3×4</strong> — 4-6 штук на всякий случай</div></div>
    </div>
    <div class="info-card pack-card">
      <h3><span class="icon">👗</span> Одежда</h3>
      <div class="pack-check"><span class="pack-icon">👕</span><div class="pack-text"><strong>Закрытая одежда</strong> — плечи и колени. Это обязательно вне работы</div></div>
      <div class="pack-check"><span class="pack-icon">🧣</span><div class="pack-text"><strong>Шарф / палантин</strong> — пригодится для мечетей и консервативных мест</div></div>
      <div class="pack-check"><span class="pack-icon">👟</span><div class="pack-text"><strong>Удобная обувь</strong> — для работы на ногах весь день</div></div>
      <div class="pack-check"><span class="pack-icon">🧴</span><div class="pack-text"><strong>Солнцезащитный крем</strong> — SPF 50+, солнце очень агрессивное</div></div>
    </div>
    <div class="info-card pack-card">
      <h3><span class="icon">🔌</span> Техника и связь</h3>
      <div class="pack-check"><span class="pack-icon">🔌</span><div class="pack-text"><strong>Адаптер для розеток</strong> — ${c.plug}. Купите заранее!</div></div>
      <div class="pack-check"><span class="pack-icon">📱</span><div class="pack-text"><strong>SIM-карта</strong> — ${c.sim}</div></div>
      <div class="pack-check"><span class="pack-icon">🔋</span><div class="pack-text"><strong>Повербанк</strong> — для зарядки в дороге</div></div>
      <div class="pack-check"><span class="pack-icon">💳</span><div class="pack-text"><strong>Банковская карта</strong> — ${c.currency_tip}</div></div>
    </div>
    <div class="info-card pack-card">
      <h3><span class="icon">💊</span> Здоровье</h3>
      <div class="pack-check"><span class="pack-icon">💊</span><div class="pack-text"><strong>Аптечка</strong> — обезболивающие, от живота, от аллергии, пластыри</div></div>
      <div class="pack-check"><span class="pack-icon">🩹</span><div class="pack-text"><strong>Свои лекарства</strong> — если принимаете постоянно (с рецептом на EN!)</div></div>
      <div class="pack-check"><span class="pack-icon">🕶️</span><div class="pack-text"><strong>Солнечные очки</strong> — солнце в Заливе очень яркое</div></div>
      <div class="pack-check"><span class="pack-icon">💧</span><div class="pack-text"><strong>Бутылка для воды</strong> — пить нужно МНОГО, особенно летом</div></div>
    </div>
    <div class="info-card" style="border-left:3px solid var(--danger)">
      <h3><span class="icon">⚠️</span> Не берите!</h3>
      <div class="pack-check"><span class="pack-icon">🚫</span><div class="pack-text"><strong>Лекарства без рецепта</strong> — некоторые обычные препараты запрещены в Заливе (кодеин, трамадол и др.)</div></div>
      <div class="pack-check"><span class="pack-icon">🚫</span><div class="pack-text"><strong>Электронные сигареты</strong> — могут быть ограничения на ввоз</div></div>
      <div class="pack-check"><span class="pack-icon">🚫</span><div class="pack-text"><strong>Откровенные вещи</strong> — мини-юбки, глубокие декольте — не для этого региона</div></div>
    </div>`;
}

function renderChecklist(c) {
  return `
    <div class="info-card"><h3><span class="icon">✅</span> До вылета</h3>
      <ul class="checklist">
        <li>Проверить срок <strong>загранпаспорта</strong> (не менее 6 мес.)</li>
        <li>Получить <strong>копию контракта</strong> на понятном языке</li>
        <li>Сфотографировать <strong>все документы</strong> и сохранить в облаке</li>
        <li>Записать контакты <strong>посольства и горячих линий</strong></li>
        <li>Сообщить родным <strong>адрес работодателя</strong> и контакты</li>
        <li>Уточнить, кто оплачивает <strong>билет, визу, жильё</strong></li>
        <li>Взять <strong>медицинские документы</strong> (справки, прививки)</li>
        <li>Купить <strong>адаптер для розеток</strong> (${c.plug})</li>
        <li>Встать на <strong>консульский учёт</strong> после приезда</li>
      </ul>
    </div>
    <div class="info-card"><h3><span class="icon">📱</span> Сохранить в телефон</h3>
      <ul class="checklist">
        <li>Фото <strong>паспорта</strong> (все страницы)</li>
        <li>Фото <strong>контракта</strong></li>
        <li>Фото <strong>визы</strong></li>
        <li>Номер <strong>полиции: ${c.police}</strong></li>
        <li>Номер <strong>трудовой жалобы: ${c.laborHotline}</strong></li>
        ${c.embassyPhone ? `<li>Номер <strong>посольства: ${c.embassyPhone}</strong></li>` : ''}
        <li>Адрес <strong>посольства</strong></li>
      </ul>
    </div>
    <div class="info-card red-flag"><h3><span class="icon">🆘</span> Если что-то пошло не так</h3>
      <ul>
        <li><strong>Не паникуйте</strong> — у вас есть права по закону</li>
        <li>Позвоните в <strong>${c.laborName}</strong> по трудовым вопросам</li>
        <li>Свяжитесь с <strong>посольством КР</strong> при серьёзных проблемах</li>
        <li>Напишите жалобу — это можно сделать <strong>онлайн</strong></li>
        <li>Не подписывайте документы <strong>под давлением</strong></li>
        <li>Если угрожают — звоните <strong>${c.police}</strong> (полиция)</li>
      </ul>
    </div>`;
}

renderCountries();
