(function makeCustomSelect(rootId){
  const root   = document.getElementById(rootId);
  const input  = root.querySelector('input[type="hidden"]');
  const button = root.querySelector('button[role="combobox"]');
  const label  = button.querySelector('[data-slot="label"]');
  const list   = root.querySelector('[role="listbox"]');
  const opts   = Array.from(list.querySelectorAll('[role="option"]'));

  let open = false;
  let active = Math.max(0, opts.findIndex(o => o.dataset.value === input.value));

  function openMenu() {
    open = true;
    list.classList.remove('hidden');
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('data-open', 'true');
    root.querySelector('svg').setAttribute('data-open', 'true');
    list.focus({preventScroll:true});
    setActive(active, true);
  }

  function closeMenu() {
    open = false;
    list.classList.add('hidden');
    button.setAttribute('aria-expanded', 'false');
    button.removeAttribute('data-open');
    root.querySelector('svg').removeAttribute('data-open');
    button.focus({preventScroll:true});
  }

  function setActive(i, scrollIntoView) {
    active = (i + opts.length) % opts.length;
    opts.forEach((o, idx) => {
      o.setAttribute('data-active', idx === active ? 'true' : 'false');
    });
    button.setAttribute('aria-activedescendant', opts[active].id);
    if (scrollIntoView) opts[active].scrollIntoView({block:'nearest'});
  }

  function selectActive() {
    const o = opts[active];
    opts.forEach(x => x.setAttribute('data-selected', x === o ? 'true' : 'false'));
    input.value = o.dataset.value;
    label.textContent = o.textContent.trim();
    root.dataset.value = o.dataset.value;
    closeMenu();
  }

  // Init selection from current input value
  (function initSelected(){
    const idx = opts.findIndex(o => o.dataset.value === input.value);
    if (idx >= 0) {
      active = idx;
      opts.forEach((o,i)=>o.setAttribute('data-selected', i===idx ? 'true':'false'));
      label.textContent = opts[idx].textContent.trim();
    }
  })();

  // Button events
  button.addEventListener('click', () => open ? closeMenu() : openMenu());
  button.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); open? setActive(active+1,true): openMenu(); break;
      case 'ArrowUp':   e.preventDefault(); open? setActive(active-1,true): openMenu(); break;
      case 'Enter':
      case ' ':         e.preventDefault(); open? selectActive() : openMenu(); break;
      case 'Escape':    if (open) { e.preventDefault(); closeMenu(); } break;
    }
  });

  // Listbox keyboard
  list.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); setActive(active+1,true); break;
      case 'ArrowUp':   e.preventDefault(); setActive(active-1,true); break;
      case 'Home':      e.preventDefault(); setActive(0,true); break;
      case 'End':       e.preventDefault(); setActive(opts.length-1,true); break;
      case 'Enter':
      case ' ':         e.preventDefault(); selectActive(); break;
      case 'Escape':    e.preventDefault(); closeMenu(); break;
    }
  });

  // Mouse/touch on options
  opts.forEach((o, i) => {
    o.addEventListener('mouseenter', () => setActive(i, false));
    o.addEventListener('click', selectActive);
  });

  // Click outside to close
  document.addEventListener('mousedown', (e) => {
    if (!root.contains(e.target) && open) closeMenu();
  });

})('contactpref-select');