    /* ==================== GAME DATA ==================== */
    const games = [
      { title:"Report an issue", "html-link":"/help.html", category:"Utility" },
      { title:"Pokemon Ruby", "html-link":"game/ruby2", category:"Arcade" },
      { title:"Pokemon Sapphire", "html-link":"game/sapp", category:"Arcade" },
      { title:"Spiral Roll", "html-link":"game/sroll", category:"Arcade" },
      { title:"Brick War", "html-link":"game/bwar", category:"Action" },
      { title:"Pokemon Mystery Dungeon Red", "html-link":"game/mysred", category:"Arcade" },
      { title:"Pokemon Leaf Green", "html-link":"game/pgreen", category:"Arcade" },
      { title:"Sonic Advance", "html-link":"game/sonicadv", category:"Arcade" },
      { title:"Sonic Advance 2", "html-link":"game/sonicadv2", category:"Arcade" },
      { title:"Sonic Advance 3", "html-link":"game/sonicadv3", category:"Arcade" },
      { title:"Sonic Battle", "html-link":"game/sbattle", category:"Action" },
      { title:"Super Mario Advance", "html-link":"game/marioadv", category:"Arcade" },
      { title:"Super Mario Advance 2", "html-link":"game/marioadv2", category:"Arcade" },
      { title:"Super Mario Advance 3", "html-link":"game/marioadv3", category:"Arcade" },
      { title:"Super Mario Advance 4", "html-link":"game/marioadv4", category:"Arcade" },
      { title:"Wario Land 4", "html-link":"game/wl4", category:"Arcade" },
      { title:"Wario Ware Inc.", "html-link":"game/ww", category:"Arcade" },
      { title:"The Legend of Zelda: A Link to the Past", "html-link":"game/zpt", category:"Action" },
      { title:"The Legend of Zelda: The Minish Cap", "html-link":"game/zmh", category:"Action" },
      { title:"Kirby: Nightmare in Dreamland", "html-link":"game/knd", category:"Action" },
      { title:"Kirby: The Amazing Mirror", "html-link":"game/tam", category:"Action" },
      { title:"F-Zero: Maximum Velocity", "html-link":"game/fzm", category:"Action" },
      { title:"F-Zero: GP Legend", "html-link":"game/fzg", category:"Action" },
      { title:"Minecraft 1.12.2", "html-link":"game/eagler1122w/", category:"Action" },
      { title:"Minecraft 1.8.8", "html-link":"game/eagler188w/", category:"Action" },
      { title:"Minecraft 1.5.2 (Precision Client)", "html-link":"game/eagler152precisionc/", category:"Action" },
      { title:"Click Test", "html-link":"game/clicks", category:"Action" },
      { title:"Minecraft 1.5.2", "html-link":"game/eagler152/", category:"Action" },
      { title:"Minecraft Classic", "html-link":"game/mcclassic/", category:"Action" },
      { title:"Snow Rider 3D", "html-link":"game/snowrider/", category:"Arcade" },
      { title:"Asteroids", "html-link":"game/asteroids/", category:"Arcade" },
      { title:"Dino", "html-link":"game/dino/", category:"Arcade" },
      { title:"DinoGame++", "html-link":"game/dinoplusplus/", category:"Arcade" },
      { title:"2048", "html-link":"game/2048/", category:"Puzzle" },
      { title:"ASCII Space", "html-link":"game/asciispace", category:"Action" },
      { title:"Henry Stickman: Breaking the Bank", "html-link":"game/btb", category:"Arcade" },
      { title:"Henry Stickman: Escaping the Prison", "html-link":"game/etp", category:"Arcade" },
      { title:"Henry Stickman: Crossing the Pit", "html-link":"game/fctp", category:"Arcade" },
      { title:"Henry Stickman: Fleeing the Complex", "html-link":"game/ftc", category:"Arcade" },
      { title:"Henry Stickman: Infiltrating the Airship", "html-link":"game/ita", category:"Arcade" },
      { title:"Henry Stickman: Stealing the Diamond", "html-link":"game/stealingthediamond", category:"Arcade" },
      { title:"Cookie Clicker", "html-link":"game/index.html", category:"Idle" },
      { title:"Drift Boss", "html-link":"game/driftboss", category:"Arcade" },
      { title:"Snake.io", "html-link":"game/snakeio", category:"Arcade" },
      { title:"Drift Hunters", "html-link":"game/drifthunters", category:"Arcade" },
      { title:"Race Survival Arena King", "html-link":"/rsak", category:"Action" },
      { title:"Deadly Descent", "html-link":"/dd", category:"Action" },
      { title:"ArrowMaster.io", "html-link":"/am", category:"Action" },
      { title:"Bit Planes", "html-link":"game/bitp", category:"Action" },
      { title:"Bloons TD", "html-link":"game/btd", category:"Puzzle" },
      { title:"Bloons TD 2", "html-link":"game/btd2", category:"Puzzle" },
      { title:"Bloons TD 3", "html-link":"game/btd3", category:"Puzzle" },
      { title:"Bloons TD 5", "html-link":"game/btd5", category:"Puzzle" },
      { title:"Capybara Clicker", "html-link":"game/capyclicker", category:"Idle" },
      { title:"Deltarune", "html-link":"game/deltar", category:"Action" },
      { title:"Doom", "html-link":"game/doom", category:"Action" },
      { title:"Aircraft Fighter Pilot", "html-link":"game/fighterpilot", category:"Action" },
      { title:"Flappy Bird", "html-link":"game/flapb", category:"Arcade" },
      { title:"Geometry Freezenova", "html-link":"game/gdfreezen", category:"Action" },
      { title:"Infinite Craft", "html-link":"game/infcraft", category:"Puzzle" },
      { title:"Jetpack Joyride", "html-link":"game/jpjyr", category:"Action" },
      { title:"Mini Golf", "html-link":"game/minig", category:"Arcade" },
      { title:"OvO", "html-link":"game/ovo", category:"Arcade" },
      { title:"OvO 2", "html-link":"game/ovo2", category:"Arcade" },
      { title:"OvO Dimensions", "html-link":"game/ovod", category:"Arcade" },
      { title:"Pokemon Emerald", "html-link":"game/pokeem", category:"Action" },
      { title:"Pokemon Red", "html-link":"game/pokemonr", category:"Action" },
      { title:"Plants vs Zombies", "html-link":"game/pvz", category:"Action" },
      { title:"Super Mario 64", "html-link":"game/sm64", category:"Arcade" },
      { title:"Subway Surfers", "html-link":"game/subsurf", category:"Action" },
      { title:"Super Mario Bros", "html-link":"game/supermariobros", category:"Action" },
      { title:"Temple Run 2", "html-link":"game/tr2", category:"Arcade" },
      { title:"Undertale", "html-link":"game/underta", category:"Action" },
      { title:"Vex 8", "html-link":"game/vx8", category:"Action" },
      { title:"Animal Crossing", "html-link":"game/animalc", category:"Action" },
      { title:"Baldi's Basics", "html-link":"game/bb", category:"Action" },
      { title:"Duck Life 2", "html-link":"game/dl2", category:"Action" },
      { title:"Duck Life 3", "html-link":"game/dl3", category:"Action" },
      { title:"Duck Life 4", "html-link":"game/dl4", category:"Action" },
      { title:"Doge Miner", "html-link":"game/dm", category:"Idle" },
      { title:"FNAF 1", "html-link":"game/fnaf1", category:"Action" },
      { title:"FNAF 2", "html-link":"game/fnaf2", category:"Action" },
      { title:"FNAF 3", "html-link":"game/fnaf3", category:"Action" },
      { title:"FNAF 4", "html-link":"game/fnaf4", category:"Action" },
      { title:"FNAF: Sister Location", "html-link":"game/fnaf5", category:"Action" },
      { title:"FNAF Pizzeria Simulator", "html-link":"game/fnafps", category:"Action" },
      { title:"Hollow Knight", "html-link":"game/hlkn", category:"Action" },
      { title:"Portal", "html-link":"game/portal", category:"Action" },
      { title:"Uno", "html-link":"game/uno", category:"Arcade" },
      { title:"99 Nights in The Forest", "html-link":"game/99nitf", category:"Action" },
      { title:"Blocky Puzzle", "html-link":"game/blockypuzzle", category:"Puzzle" },
      { title:"Bridge Race", "html-link":"game/brace", category:"Action" },
      { title:"CrazyCattle3D", "html-link":"game/cc3d", category:"Action" },
      { title:"Clash Royale", "html-link":"game/clro", category:"Action" },
      { title:"Grow a Garden", "html-link":"game/gag", category:"Action" },
      { title:"Granny", "html-link":"game/grny", category:"Action" },
      { title:"Growden.io", "html-link":"game/growio", category:"Action" },
      { title:"Helix Jump", "html-link":"game/hjump", category:"Action" },
      { title:"Idle Ants", "html-link":"game/idants", category:"Action" },
      { title:"Obby But You're On A Bike", "html-link":"game/obyoab", category:"Action" },
      { title:"Ragdoll Archers", "html-link":"game/ragarch", category:"Action" },
      { title:"Retro Bowl College", "html-link":"game/rbc", category:"Arcade" },
      { title:"Steal a Brainrot", "html-link":"game/sab", category:"Action" },
      { title:"Undertale Yellow", "html-link":"game/utyellow", category:"Action" }
    ];

    /* ==================== DOM ELEMENTS ==================== */
    const $ = (s) => document.querySelector(s);
    const gamesList = $('#gamesList');
    const searchInput = $('#search');
    const categoryFilter = $('#categoryFilter');
    const countDisplay = $('#count');
    const modeSelect = $('#modeSelect');
    const accentPicker = $('#accentPicker');
    const toggleDarkBtn = $('#toggleDark');
    const activeUsersDisplay = $('#activeUsers');
    const statCount = $('#statCount');
    const statUsers = $('#statUsers');
    const welcomeCard = $('#welcome');
    const emptyState = $('#empty');
    const recentSection = $('#recentSection');
    const recentGrid = $('#recentGrid');

    /* ==================== STATE ==================== */
    let filteredGames = [...games];
    let focusedIndex = -1;
    let searchTimer = null;
    const RECENT_KEY = 'obg_recent_v3';
    const ACCENT_KEY = 'obg_accent_v3';
    const MODE_KEY = 'obg_mode_v3';
    const USER_ID = 'user_' + Math.random().toString(36).substr(2, 9);
    const USER_TIMEOUT = 15000;
    const HEARTBEAT_INTERVAL = 5000;

    /* ==================== ACTIVE USERS SYSTEM ==================== */
    async function updateActiveUsers() {
      try {
        const now = Date.now();
        await window.storage.set(`active:${USER_ID}`, now.toString(), true);
        
        const result = await window.storage.list('active:', true);
        if (result && result.keys) {
          let activeCount = 0;
          
          for (const key of result.keys) {
            try {
              const userData = await window.storage.get(key, true);
              if (userData && userData.value) {
                const lastSeen = parseInt(userData.value);
                if (now - lastSeen < USER_TIMEOUT) {
                  activeCount++;
                } else {
                  await window.storage.delete(key, true).catch(() => {});
                }
              }
            } catch (e) {
              continue;
            }
          }
          
          activeUsersDisplay.textContent = activeCount;
          statUsers.textContent = activeCount;
        }
      } catch (error) {
        activeUsersDisplay.textContent = '1';
        statUsers.textContent = '1';
      }
    }

    updateActiveUsers();
    setInterval(updateActiveUsers, HEARTBEAT_INTERVAL);

    window.addEventListener('beforeunload', () => {
      try {
        window.storage.delete(`active:${USER_ID}`, true).catch(() => {});
      } catch (e) {}
    });

    /* ==================== RENDER GAMES LIST ==================== */
    function renderGamesList(gamesToRender) {
      gamesList.innerHTML = '';
      
      const validGames = gamesToRender.filter(game => 
        game.title && !game.title.startsWith('___') && game['html-link'] && game['html-link'] !== '#'
      );
      
      if (validGames.length === 0) {
        welcomeCard.style.display = 'none';
        emptyState.style.display = 'block';
        updateCount(0);
        return;
      }
      
      welcomeCard.style.display = 'block';
      emptyState.style.display = 'none';

      const fragment = document.createDocumentFragment();
      
      validGames.forEach((game, idx) => {
        const item = document.createElement('div');
        item.className = 'game-item';
        item.tabIndex = 0;
        item.dataset.idx = idx;

        const info = document.createElement('div');
        info.className = 'game-info';

        const title = document.createElement('div');
        title.className = 'game-title';
        title.textContent = game.title;

        const category = document.createElement('div');
        category.className = 'game-category';
        category.textContent = game.category || 'UNCATEGORIZED';

        info.appendChild(title);
        info.appendChild(category);

        const chevron = document.createElement('div');
        chevron.className = 'game-chevron';
        chevron.textContent = '▶';

        item.appendChild(info);
        item.appendChild(chevron);

        item.addEventListener('click', () => openGame(game));
        
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') openGame(game);
          if (e.key === 'ArrowDown') focusNext();
          if (e.key === 'ArrowUp') focusPrev();
        });

        let prefetched = false;
        item.addEventListener('pointerenter', () => {
          if (!prefetched) {
            prefetchGame(game['html-link']);
            prefetched = true;
          }
        });

        fragment.appendChild(item);
      });

      gamesList.appendChild(fragment);
      updateCount(validGames.length);
    }

    /* ==================== GAME ACTIONS ==================== */
    function openGame(game) {
      if (!game || !game['html-link'] || game['html-link'] === '#') return;
      
      window.open(game['html-link'], '_blank', 'noopener');
      addToRecent(game);
    }

    function prefetchGame(url) {
      if (!url || url === '#') return;
      try {
        const fullUrl = new URL(url, location.href);
        if (fullUrl.origin === location.origin) {
          fetch(fullUrl.href, { method: 'HEAD', mode: 'no-cors' }).catch(() => {});
        }
      } catch (e) {}
    }

    /* ==================== RECENT PLAYS ==================== */
    function addToRecent(game) {
      try {
        const recent = getRecent();
        const normalized = { title: game.title, link: game['html-link'] };
        
        const filtered = recent.filter(r => r.link !== normalized.link);
        filtered.unshift(normalized);
        const updated = filtered.slice(0, 8);
        
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
        renderRecent();
      } catch (e) {}
    }

    function getRecent() {
      try {
        return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
      } catch (e) {
        return [];
      }
    }

    function renderRecent() {
      const recent = getRecent();
      
      if (recent.length === 0) {
        recentSection.style.display = 'none';
        return;
      }

      recentSection.style.display = 'block';
      recentGrid.innerHTML = '';

      recent.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'recent-item';
        btn.textContent = item.title;
        btn.addEventListener('click', () => {
          window.open(item.link, '_blank', 'noopener');
        });
        recentGrid.appendChild(btn);
      });
    }

    /* ==================== SEARCH & FILTER ==================== */
    function applyFilters() {
      const query = searchInput.value.toLowerCase().trim();
      const category = categoryFilter.value;

      filteredGames = games.filter(game => {
        if (!game.title || game.title.startsWith('___') || game['html-link'] === '#') {
          return false;
        }

        if (category !== 'all' && game.category !== category) {
          return false;
        }

        if (query) {
          const titleMatch = game.title.toLowerCase().includes(query);
          const categoryMatch = (game.category || '').toLowerCase().includes(query);
          return titleMatch || categoryMatch;
        }

        return true;
      });

      renderGamesList(filteredGames);
    }

    function debounceApply() {
      if (searchTimer) clearTimeout(searchTimer);
      searchTimer = setTimeout(applyFilters, 160);
    }

    searchInput.addEventListener('input', debounceApply);
    categoryFilter.addEventListener('change', applyFilters);

    /* ==================== KEYBOARD SHORTCUTS ==================== */
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }

      if (e.key === 'ArrowDown' && document.activeElement === searchInput) {
        const firstItem = gamesList.querySelector('.game-item');
        if (firstItem) {
          e.preventDefault();
          firstItem.focus();
        }
      }
    });

    /* ==================== FOCUS NAVIGATION ==================== */
    function focusNext() {
      const items = Array.from(gamesList.querySelectorAll('.game-item'));
      if (!items.length) return;
      focusedIndex = Math.min(focusedIndex + 1, items.length - 1);
      items[focusedIndex].focus();
    }

    function focusPrev() {
      const items = Array.from(gamesList.querySelectorAll('.game-item'));
      if (!items.length) return;
      focusedIndex = Math.max(focusedIndex - 1, 0);
      items[focusedIndex].focus();
    }

    gamesList.addEventListener('focusin', (e) => {
      const item = e.target.closest('.game-item');
      if (item) {
        focusedIndex = parseInt(item.dataset.idx || 0);
      }
    });

    /* ==================== COUNT UPDATE ==================== */
    function updateCount(count) {
      countDisplay.textContent = `${count} GAMES`;
    }

    /* ==================== THEME SYSTEM ==================== */
    function setTheme(mode) {
      document.body.classList.remove('light', 'oled');
      if (mode === 'light') document.body.classList.add('light');
      if (mode === 'oled') document.body.classList.add('oled');
      modeSelect.value = mode;
      try {
        localStorage.setItem(MODE_KEY, mode);
      } catch (e) {}
    }

    modeSelect.addEventListener('change', (e) => {
      setTheme(e.target.value);
    });

    toggleDarkBtn.addEventListener('click', () => {
      const current = document.body.classList.contains('light') ? 'light' : 'dark';
      setTheme(current === 'light' ? 'dark' : 'light');
    });

    /* ==================== ACCENT COLOR ==================== */
    function setAccent(color) {
      document.documentElement.style.setProperty('--accent', color);
      
      try {
        localStorage.setItem(ACCENT_KEY, color);
      } catch (e) {}
    }

    accentPicker.addEventListener('input', (e) => {
      setAccent(e.target.value);
    });

    /* ==================== LOAD SAVED PREFERENCES ==================== */
    function loadPreferences() {
      try {
        const savedMode = localStorage.getItem(MODE_KEY) || 'dark';
        setTheme(savedMode);

        const savedAccent = localStorage.getItem(ACCENT_KEY);
        if (savedAccent) {
          accentPicker.value = savedAccent;
          setAccent(savedAccent);
        }
      } catch (e) {}
    }

    /* ==================== INITIALIZATION ==================== */
    function init() {
      loadPreferences();
      applyFilters();
      renderRecent();
      
      const totalGames = games.filter(g => 
        g.title && !g.title.startsWith('___') && g['html-link'] && g['html-link'] !== '#'
      ).length;
      statCount.textContent = totalGames;
    }

    init();
