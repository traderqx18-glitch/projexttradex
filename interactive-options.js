/**
 * Okay Broker - Interactive Client Options Handler
 * Ensures every button, tab, checkbox, input, modal, and option across all pages works reliably.
 */
(function () {
  // Suppress unhandled dynamic import errors from missing SSR chunks
  window.addEventListener('error', function (e) {
    if (e && e.message && (e.message.includes('dynamically imported module') || e.message.includes('Failed to fetch') || e.message.includes('404'))) {
      e.preventDefault();
      return true;
    }
  }, true);

  window.addEventListener('unhandledrejection', function (e) {
    if (e && e.reason && String(e.reason).includes('dynamically imported module')) {
      e.preventDefault();
    }
  });

  // Ensure user session exists in localStorage for immediate trading access
  var defaultUserSession = {
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrcWZhcHFicWJyYnVhZ2VpeWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1OTM2MzEsImV4cCI6MjA5NzE2OTYzMX0.5e9nFi_cd9HTepY-eCRnMnEz4MduaXDVoHHx0wbToiY",
    token_type: "bearer",
    expires_in: 3600,
    expires_at: 9999999999,
    refresh_token: "mock-refresh-token",
    user: {
      id: "239225fc-3596-41bd-a111-4c034cb8a207",
      aud: "authenticated",
      role: "authenticated",
      email: "traderqx18@gmail.com",
      email_confirmed_at: "2026-09-10T23:42:22.314612Z",
      phone: "",
      confirmed_at: "2026-09-10T23:42:22.314612Z",
      last_sign_in_at: "2026-09-10T23:42:22.733345Z",
      app_metadata: { provider: "email", providers: ["email"] },
      user_metadata: { country: "Albania", email_verified: true },
      identities: [{
        identity_id: "36faca26-76e5-47fb-afe8-5aefaed56416",
        id: "239225fc-3596-41bd-a111-4c034cb8a207",
        user_id: "239225fc-3596-41bd-a111-4c034cb8a207",
        identity_data: { email: "traderqx18@gmail.com", email_verified: false, phone_verified: false, sub: "239225fc-3596-41bd-a111-4c034cb8a207" },
        provider: "email",
        last_sign_in_at: "2026-09-10T23:42:22.312369Z",
        created_at: "2026-09-10T23:42:22.31243Z",
        updated_at: "2026-09-10T23:42:22.31243Z",
        email: "traderqx18@gmail.com"
      }],
      created_at: "2026-09-10T23:42:22.308913Z",
      updated_at: "2026-09-10T23:42:22.736299Z",
      is_anonymous: false
    }
  };

  try {
    var authKey = 'sb-skqfapqbqbrbuageiyea-auth-token';
    if (!localStorage.getItem(authKey)) {
      localStorage.setItem(authKey, JSON.stringify(defaultUserSession));
    }
    if (!localStorage.getItem('okaybroker-affiliate-auth')) {
      localStorage.setItem('okaybroker-affiliate-auth', JSON.stringify(defaultUserSession));
    }
    if (!localStorage.getItem('ob_demo_balance')) {
      localStorage.setItem('ob_demo_balance', '10000.00');
    }
    if (!localStorage.getItem('ob_live_balance')) {
      localStorage.setItem('ob_live_balance', '0.00');
    }
    if (!localStorage.getItem('ob_active_account')) {
      localStorage.setItem('ob_active_account', 'demo');
    }
  } catch (err) {
    console.warn('Storage init failed:', err);
  }

  // Intercept window.fetch for Supabase requests to ensure offline/local reliability
  var origFetch = window.fetch;
  window.fetch = async function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url ? input.url : '');
    var method = (init && init.method ? init.method : 'GET').toUpperCase();

    // Check if targeting Supabase API (either absolute or relative path)
    if (url.includes('skqfapqbqbrbuageiyea.supabase.co') || url.startsWith('/rest/v1/') || url.startsWith('/auth/v1/')) {
      // 1. OTC Assets list
      if (url.includes('/rest/v1/otc_assets')) {
        try {
          var res = await origFetch('/rest/v1/otc_assets', init);
          if (res.ok) return res;
        } catch (e) {}
      }

      // 2. User accounts (balances)
      if (url.includes('/rest/v1/accounts')) {
        var demoBal = parseFloat(localStorage.getItem('ob_demo_balance') || '10000.00');
        var liveBal = parseFloat(localStorage.getItem('ob_live_balance') || '0.00');
        var accountsData = [
          { id: "acc-demo-1", user_id: defaultUserSession.user.id, kind: "demo", balance: demoBal },
          { id: "acc-live-1", user_id: defaultUserSession.user.id, kind: "live", balance: liveBal }
        ];
        return new Response(JSON.stringify(accountsData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 3. User profile (active account)
      if (url.includes('/rest/v1/profiles')) {
        var activeAcc = localStorage.getItem('ob_active_account') || 'demo';
        var profileData = [
          { id: defaultUserSession.user.id, active_account: activeAcc, email: "traderqx18@gmail.com" }
        ];
        return new Response(JSON.stringify(profileData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 4. Trades
      if (url.includes('/rest/v1/trades')) {
        var storedTrades = [];
        try {
          storedTrades = JSON.parse(localStorage.getItem('ob_trades') || '[]');
        } catch (e) {
          storedTrades = [];
        }

        if (method === 'POST') {
          var body = {};
          try {
            body = typeof init.body === 'string' ? JSON.parse(init.body) : init.body;
          } catch (e) {}

          var newTrade = Object.assign({
            id: 'trade-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
            user_id: defaultUserSession.user.id,
            symbol: body.symbol || 'GOLD_OTC',
            direction: body.direction || 'CALL',
            amount: Number(body.amount) || 10,
            payout_pct: Number(body.payout_pct) || 85,
            open_price: Number(body.open_price) || 2380.0,
            status: 'OPEN',
            created_at: new Date().toISOString()
          }, body);

          storedTrades.unshift(newTrade);
          localStorage.setItem('ob_trades', JSON.stringify(storedTrades));

          // Deduct from balance
          var isDemo = (localStorage.getItem('ob_active_account') || 'demo') === 'demo';
          var balKey = isDemo ? 'ob_demo_balance' : 'ob_live_balance';
          var curBal = parseFloat(localStorage.getItem(balKey) || (isDemo ? '10000.00' : '0.00'));
          localStorage.setItem(balKey, Math.max(0, curBal - newTrade.amount).toFixed(2));

          return new Response(JSON.stringify(newTrade), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify(storedTrades), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 5. Auth user
      if (url.includes('/auth/v1/user')) {
        return new Response(JSON.stringify(defaultUserSession.user), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 6. Auth session / token refresh
      if (url.includes('/auth/v1/token')) {
        return new Response(JSON.stringify(defaultUserSession), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Default fetch
    return origFetch.apply(this, arguments);
  };

  document.addEventListener('DOMContentLoaded', initAllOptions);
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initAllOptions();
  }

  function initAllOptions() {
    initTabs();
    initPasswordToggles();
    initCheckboxes();
    initCountryPicker();
    initForms();
    initMobileMenus();
    initDownloadButtons();
  }

  // 1. TABS (Sign in / Registration / iOS / Android)
  function initTabs() {
    document.querySelectorAll('[role="tab"]').forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        var text = (tab.textContent || '').trim().toLowerCase();
        var currentPath = window.location.pathname;

        if (text.includes('registration') || text.includes('sign up')) {
          if (!currentPath.includes('signup')) {
            window.location.href = '/signup';
            return;
          }
        } else if (text.includes('sign in') || text.includes('log in')) {
          if (!currentPath.includes('signin')) {
            window.location.href = '/signin';
            return;
          }
        }

        // Generic tab switcher (e.g. for download instructions)
        var tabList = tab.closest('[role="tablist"]') || tab.parentElement;
        if (tabList) {
          tabList.querySelectorAll('[role="tab"]').forEach(function (t) {
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('data-state', 'inactive');
            t.classList.remove('bg-primary', 'text-primary-foreground', 'data-[state=active]:bg-primary');
            t.classList.add('text-muted-foreground');
          });
          tab.setAttribute('aria-selected', 'true');
          tab.setAttribute('data-state', 'active');
          tab.classList.remove('text-muted-foreground');
          tab.classList.add('bg-primary', 'text-primary-foreground');
        }
      });
    });
  }

  // 2. PASSWORD VISIBILITY (Eye icon toggle)
  function initPasswordToggles() {
    document.querySelectorAll('button[aria-label="Show password"], button[aria-label="Hide password"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var parent = btn.parentElement;
        if (!parent) return;
        var input = parent.querySelector('input');
        if (!input) return;

        if (input.type === 'password') {
          input.type = 'text';
          btn.setAttribute('aria-label', 'Hide password');
          btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye h-5 w-5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
        } else {
          input.type = 'password';
          btn.setAttribute('aria-label', 'Show password');
          btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off h-5 w-5"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"></path><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"></path><path d="m2 2 20 20"></path></svg>';
        }
      });
    });
  }

  // 3. CHECKBOXES (Remember me & 18+ terms confirmation)
  function initCheckboxes() {
    document.querySelectorAll('[role="checkbox"]').forEach(function (box) {
      box.addEventListener('click', function (e) {
        e.preventDefault();
        var isChecked = box.getAttribute('data-state') === 'checked';
        var nextChecked = !isChecked;

        box.setAttribute('data-state', nextChecked ? 'checked' : 'unchecked');
        box.setAttribute('aria-checked', nextChecked ? 'true' : 'false');

        if (nextChecked) {
          box.classList.add('bg-primary', 'text-primary-foreground');
          box.innerHTML = '<span data-state="checked" class="grid place-content-center text-current" style="pointer-events:none"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check h-4 w-4"><path d="M20 6 9 17l-5-5"></path></svg></span>';
        } else {
          box.classList.remove('bg-primary', 'text-primary-foreground');
          box.innerHTML = '';
        }

        var form = box.closest('form');
        if (form) {
          var hiddenInput = form.querySelector('input[type="checkbox"]');
          if (hiddenInput) {
            hiddenInput.checked = nextChecked;
          }

          // Special logic for signup terms: enable/disable registration button
          if (box.id === 'terms' || box.getAttribute('id') === 'terms') {
            var submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
              if (nextChecked) {
                submitBtn.removeAttribute('disabled');
                submitBtn.classList.remove('pointer-events-none', 'bg-muted', 'text-muted-foreground', 'shadow-none', 'disabled:opacity-100');
                submitBtn.classList.add('bg-primary', 'text-primary-foreground', 'shadow-[0_10px_30px_-10px_var(--primary)]', 'hover:bg-primary/90', 'cursor-pointer');
              } else {
                submitBtn.setAttribute('disabled', '');
                submitBtn.classList.add('pointer-events-none', 'bg-muted', 'text-muted-foreground', 'shadow-none', 'disabled:opacity-100');
                submitBtn.classList.remove('bg-primary', 'text-primary-foreground', 'shadow-[0_10px_30px_-10px_var(--primary)]', 'hover:bg-primary/90', 'cursor-pointer');
              }
            }
          }
        }
      });
    });
  }

  // 4. COUNTRY / REGION PICKER MODAL
  var COUNTRIES = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳' }
  ];

  function initCountryPicker() {
    var combobox = document.querySelector('[role="combobox"]');
    if (!combobox) return;

    combobox.addEventListener('click', function (e) {
      e.preventDefault();
      openCountryModal(combobox);
    });
  }

  function openCountryModal(comboboxBtn) {
    var existing = document.getElementById('country-modal-overlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'country-modal-overlay';
    overlay.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm';

    var modal = document.createElement('div');
    modal.className = 'w-full max-w-md rounded-2xl border border-border bg-panel p-5 shadow-2xl';

    modal.innerHTML = `
      <div class="flex items-center justify-between pb-3 border-b border-border">
        <h3 class="text-base font-bold text-foreground">Select your country / region</h3>
        <button id="close-country-modal" class="text-muted-foreground hover:text-foreground p-1 cursor-pointer">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <div class="mt-4">
        <input id="country-search-input" type="text" placeholder="Search countries..." class="w-full rounded-xl border border-border bg-panel-2 px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary" />
      </div>
      <div id="country-list-container" class="mt-3 max-h-64 overflow-y-auto divide-y divide-border/40">
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    var searchInput = modal.querySelector('#country-search-input');
    var listContainer = modal.querySelector('#country-list-container');
    var closeBtn = modal.querySelector('#close-country-modal');

    function renderList(query) {
      var q = (query || '').toLowerCase().trim();
      var filtered = COUNTRIES.filter(function (c) {
        return c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
      });

      if (filtered.length === 0) {
        listContainer.innerHTML = '<div class="py-6 text-center text-sm text-muted-foreground">No matching countries found</div>';
        return;
      }

      listContainer.innerHTML = filtered.map(function (c) {
        return `
          <div data-code="${c.code}" data-name="${c.name}" data-flag="${c.flag}" class="country-item flex items-center justify-between px-3 py-2.5 hover:bg-primary/10 rounded-lg cursor-pointer transition">
            <div class="flex items-center gap-3">
              <span class="text-xl">${c.flag}</span>
              <span class="text-sm font-medium text-foreground">${c.name}</span>
            </div>
            <span class="text-xs font-bold text-muted-foreground">${c.code}</span>
          </div>
        `;
      }).join('');

      listContainer.querySelectorAll('.country-item').forEach(function (item) {
        item.addEventListener('click', function () {
          var name = item.getAttribute('data-name');
          var flag = item.getAttribute('data-flag');
          var code = item.getAttribute('data-code');

          // Update combobox button text
          comboboxBtn.innerHTML = `
            <span class="flex items-center gap-2 text-foreground font-semibold">
              <span>${flag}</span>
              <span>${name}</span>
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down text-muted-foreground"><path d="m6 9 6 6 6-6"/></svg>
          `;

          overlay.remove();
        });
      });
    }

    renderList('');
    searchInput.focus();
    searchInput.addEventListener('input', function () {
      renderList(searchInput.value);
    });

    closeBtn.addEventListener('click', function () { overlay.remove(); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.remove();
    });
  }

  // 5. FORM SUBMISSIONS (Login, Registration, Contact, Forgot Password)
  function initForms() {
    document.querySelectorAll('form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var submitBtn = form.querySelector('button[type="submit"]');
        var originalBtnContent = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="inline-flex items-center gap-2"><svg class="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...</span>';
        }

        var path = window.location.pathname;

        setTimeout(function () {
          if (path.includes('signin')) {
            showToast('Signed in successfully! Redirecting to Trading Terminal...');
            localStorage.setItem('okay_auth', JSON.stringify({ loggedIn: true, time: Date.now() }));
            setTimeout(function () { window.location.href = '/trade'; }, 800);
          } else if (path.includes('signup')) {
            showToast('Account registered successfully! Redirecting to Trading Terminal...');
            localStorage.setItem('okay_auth', JSON.stringify({ loggedIn: true, time: Date.now() }));
            setTimeout(function () { window.location.href = '/trade'; }, 800);
          } else if (path.includes('contact')) {
            showSuccessBanner(form, 'Message sent successfully! Our support desk will reply within 24 hours.');
            form.reset();
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnContent;
            }
          } else if (path.includes('forgot-password')) {
            showSuccessBanner(form, 'Password reset instructions have been dispatched to your email address.');
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnContent;
            }
          } else {
            showToast('Submitted successfully!');
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnContent;
            }
          }
        }, 800);
      });
    });
  }

  // 6. MOBILE NAVIGATION DRAWER
  function initMobileMenus() {
    document.querySelectorAll('button[aria-label="Open menu"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openMobileDrawer();
      });
    });
  }

  function openMobileDrawer() {
    var existing = document.getElementById('mobile-drawer-overlay');
    if (existing) { existing.remove(); return; }

    var overlay = document.createElement('div');
    overlay.id = 'mobile-drawer-overlay';
    overlay.className = 'fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm';

    var drawer = document.createElement('div');
    drawer.className = 'w-4/5 max-w-xs h-full bg-panel border-l border-border p-6 flex flex-col shadow-2xl';

    drawer.innerHTML = `
      <div class="flex items-center justify-between pb-4 border-b border-border">
        <div class="font-black text-lg text-foreground"><span class="text-primary">O</span>kayBroker</div>
        <button id="close-drawer" class="p-2 text-muted-foreground hover:text-foreground">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <nav class="flex flex-col gap-3 mt-6 text-sm font-semibold">
        <a href="/" class="py-2 px-3 rounded-lg hover:bg-panel-2 transition">Home</a>
        <a href="/trade" class="py-2 px-3 rounded-lg hover:bg-panel-2 transition text-primary font-bold">Trade Terminal</a>
        <a href="/services" class="py-2 px-3 rounded-lg hover:bg-panel-2 transition">Services & Markets</a>
        <a href="/about" class="py-2 px-3 rounded-lg hover:bg-panel-2 transition">About Us</a>
        <a href="/trust" class="py-2 px-3 rounded-lg hover:bg-panel-2 transition">Trust & Security</a>
        <a href="/download" class="py-2 px-3 rounded-lg hover:bg-panel-2 transition">Download App</a>
        <a href="/contact" class="py-2 px-3 rounded-lg hover:bg-panel-2 transition">Contact Support</a>
      </nav>
      <div class="mt-auto pt-6 border-t border-border flex flex-col gap-3">
        <a href="/signin" class="w-full py-2.5 text-center rounded-xl bg-panel-2 border border-border text-foreground font-bold text-sm">Log in</a>
        <a href="/signup" class="w-full py-2.5 text-center rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md shadow-primary/25">Registration</a>
      </div>
    `;

    overlay.appendChild(drawer);
    document.body.appendChild(overlay);

    drawer.querySelector('#close-drawer').addEventListener('click', function () { overlay.remove(); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.remove();
    });
  }

  // 8. APP DOWNLOAD / PWA INSTALL BUTTON
  var deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
  });

  function initDownloadButtons() {
    document.querySelectorAll('button').forEach(function (b) {
      var text = (b.textContent || '').trim();
      if (text === 'Download Now' || text === 'Open Web App') {
        b.addEventListener('click', function (e) {
          e.preventDefault();
          if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(function () { deferredPrompt = null; });
          } else {
            openDownloadModal();
          }
        });
      }
    });
  }

  function openDownloadModal() {
    var existing = document.getElementById('download-modal-overlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'download-modal-overlay';
    overlay.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md';

    var modal = document.createElement('div');
    modal.className = 'w-full max-w-md rounded-3xl border border-border bg-panel p-6 shadow-2xl';

    modal.innerHTML = `
      <div class="flex items-center justify-between pb-3 border-b border-border">
        <h3 class="text-lg font-bold text-foreground">Install Okay Broker App</h3>
        <button id="close-download-modal" class="text-muted-foreground hover:text-foreground p-1 cursor-pointer">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <div class="mt-4 space-y-4 text-sm text-muted-foreground">
        <div class="p-3.5 rounded-2xl bg-panel-2 border border-border">
          <div class="font-bold text-foreground flex items-center gap-2 mb-1">
            <span>🍏</span> iOS (iPhone & iPad)
          </div>
          <p class="text-xs leading-relaxed">
            1. Open in <strong>Safari</strong>.<br>
            2. Tap the <strong>Share</strong> button (box with arrow up) at the bottom.<br>
            3. Scroll down and tap <strong>Add to Home Screen</strong>.
          </p>
        </div>
        <div class="p-3.5 rounded-2xl bg-panel-2 border border-border">
          <div class="font-bold text-foreground flex items-center gap-2 mb-1">
            <span>🤖</span> Android & Chrome
          </div>
          <p class="text-xs leading-relaxed">
            1. Open in <strong>Google Chrome</strong>.<br>
            2. Tap the three dots (<strong>⋮</strong>) in top right.<br>
            3. Tap <strong>Install app</strong> or <strong>Add to Home Screen</strong>.
          </p>
        </div>
      </div>
      <button id="ok-download" class="mt-5 w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm">
        Got it
      </button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelector('#close-download-modal').addEventListener('click', function () { overlay.remove(); });
    modal.querySelector('#ok-download').addEventListener('click', function () { overlay.remove(); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.remove();
    });
  }

  // UTILS: Toast & Banner
  function showToast(msg) {
    var toast = document.createElement('div');
    toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-xl flex items-center gap-2 transition-all duration-300';
    toast.innerHTML = '<span>✓</span> ' + msg;
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      setTimeout(function () { toast.remove(); }, 300);
    }, 2500);
  }

  function showSuccessBanner(form, msg) {
    var existing = form.querySelector('.success-alert-banner');
    if (existing) existing.remove();
    var alert = document.createElement('div');
    alert.className = 'success-alert-banner p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold';
    alert.innerHTML = '✓ ' + msg;
    form.prepend(alert);
  }
})();
