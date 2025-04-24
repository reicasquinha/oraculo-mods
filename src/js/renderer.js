// Renderer process - Lógica da interface do usuário
document.addEventListener('DOMContentLoaded', () => {
    // Controles da janela
    document.getElementById('minimize-btn').addEventListener('click', () => {
        window.electronAPI.minimizeWindow();
    });

    document.getElementById('maximize-btn').addEventListener('click', () => {
        window.electronAPI.maximizeWindow();
    });

    document.getElementById('close-btn').addEventListener('click', () => {
        window.electronAPI.closeWindow();
    });

    // Navegação entre seções
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            
            // Atualizar navegação ativa
            navItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
            
            // Mostrar seção correspondente
            contentSections.forEach(section => {
                if (section.id === target) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });

    // Tabs de login
    const loginTabs = document.querySelectorAll('.login-tab');
    const loginForms = document.querySelectorAll('.login-form');

    loginTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            
            // Atualizar tab ativa
            loginTabs.forEach(loginTab => loginTab.classList.remove('active'));
            tab.classList.add('active');
            
            // Mostrar formulário correspondente
            loginForms.forEach(form => {
                if (form.id === target) {
                    form.classList.add('active');
                } else {
                    form.classList.remove('active');
                }
            });
        });
    });

    // Slider de memória
    const memorySlider = document.getElementById('memory-slider');
    const memoryValue = document.getElementById('memory-value');

    if (memorySlider && memoryValue) {
        memorySlider.addEventListener('input', () => {
            memoryValue.textContent = `${memorySlider.value} GB`;
        });
    }

    // Botão de jogar
    const playButton = document.getElementById('play-btn');
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingProgress = document.getElementById('loading-progress');
    const loadingDetails = document.getElementById('loading-details');

    if (playButton) {
        playButton.addEventListener('click', () => {
            // Mostrar overlay de carregamento
            loadingOverlay.classList.remove('hidden');
            
            // Configurações de lançamento
            const versionSelect = document.getElementById('version-select');
            const version = versionSelect ? versionSelect.value : '1.20.4';
            
            // Carregar configurações salvas
            window.electronAPI.loadSettings().then(settings => {
                const launchOptions = {
                    version: version,
                    maxMemory: settings.maxMemory || '4G',
                    minMemory: settings.minMemory || '1G',
                    root: settings.gameDirectory
                };
                
                // Iniciar o jogo
                window.electronAPI.launchGame(launchOptions);
                
                // Eventos de progresso
                window.electronAPI.onLaunchProgress((progress) => {
                    loadingProgress.style.width = `${progress.percentage}%`;
                    loadingDetails.textContent = progress.message || 'Carregando...';
                });
                
                window.electronAPI.onLaunchComplete(() => {
                    loadingOverlay.classList.add('hidden');
                });
                
                window.electronAPI.onLaunchError((error) => {
                    loadingDetails.textContent = `Erro: ${error}`;
                    setTimeout(() => {
                        loadingOverlay.classList.add('hidden');
                    }, 3000);
                });
            });
        });
    }

    // Salvar configurações
    const saveSettingsButton = document.getElementById('save-settings');
    
    if (saveSettingsButton) {
        saveSettingsButton.addEventListener('click', () => {
            const settings = {
                maxMemory: `${document.getElementById('memory-slider').value}G`,
                minMemory: '1G',
                javaPath: document.getElementById('java-path').value,
                gameDirectory: document.getElementById('game-directory').value,
                theme: document.getElementById('theme-select').value,
                language: document.getElementById('language-select').value,
                autoUpdate: document.getElementById('auto-update').checked,
                fullscreen: document.getElementById('fullscreen').checked,
                resolution: {
                    width: document.getElementById('resolution-width').value || 1280,
                    height: document.getElementById('resolution-height').value || 720
                },
                jvmArgs: document.getElementById('jvm-args').value
            };
            
            window.electronAPI.saveSettings(settings);
            
            window.electronAPI.onSettingsSaved(() => {
                // Mostrar mensagem de sucesso
                alert('Configurações salvas com sucesso!');
            });
        });
    }

    // Restaurar configurações padrão
    const resetSettingsButton = document.getElementById('reset-settings');
    
    if (resetSettingsButton) {
        resetSettingsButton.addEventListener('click', () => {
            document.getElementById('theme-select').value = 'dark';
            document.getElementById('language-select').value = 'pt-BR';
            document.getElementById('auto-update').checked = true;
            document.getElementById('java-path').value = '';
            document.getElementById('memory-slider').value = 4;
            memoryValue.textContent = '4 GB';
            document.getElementById('jvm-args').value = '-XX:+UseG1GC -XX:+ParallelRefProcEnabled';
            document.getElementById('game-directory').value = '';
            document.getElementById('resolution-width').value = 1280;
            document.getElementById('resolution-height').value = 720;
            document.getElementById('fullscreen').checked = false;
        });
    }

    // Login com Microsoft
    const microsoftLoginButton = document.getElementById('microsoft-login-btn');
    
    if (microsoftLoginButton) {
        microsoftLoginButton.addEventListener('click', () => {
            // Simulação de login para demonstração
            document.getElementById('login').classList.remove('active');
            document.getElementById('home').classList.add('active');
            
            // Atualizar informações do usuário
            document.getElementById('username').textContent = 'Usuário Microsoft';
        });
    }

    // Login com Mojang
    const mojangLoginButton = document.getElementById('mojang-login-btn');
    
    if (mojangLoginButton) {
        mojangLoginButton.addEventListener('click', () => {
            const email = document.getElementById('mojang-email').value;
            const password = document.getElementById('mojang-password').value;
            
            if (!email || !password) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Simulação de login para demonstração
            document.getElementById('login').classList.remove('active');
            document.getElementById('home').classList.add('active');
            
            // Atualizar informações do usuário
            document.getElementById('username').textContent = email.split('@')[0];
        });
    }

    // Logout
    const logoutButton = document.getElementById('logout-btn');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Mostrar tela de login
            contentSections.forEach(section => section.classList.remove('active'));
            document.getElementById('login').classList.add('active');
            
            // Resetar navegação
            navItems.forEach(navItem => navItem.classList.remove('active'));
            navItems[0].classList.add('active');
        });
    }

    // Verificar se há usuário logado (simulação)
    const isLoggedIn = false; // Altere para true para simular usuário já logado
    
    if (!isLoggedIn) {
        // Mostrar tela de login
        contentSections.forEach(section => section.classList.remove('active'));
        document.getElementById('login').classList.add('active');
    }

    // Carregar configurações salvas
    window.electronAPI.loadSettings().then(settings => {
        if (settings) {
            // Preencher campos de configuração
            if (document.getElementById('theme-select')) {
                document.getElementById('theme-select').value = settings.theme || 'dark';
            }
            
            if (document.getElementById('language-select')) {
                document.getElementById('language-select').value = settings.language || 'pt-BR';
            }
            
            if (document.getElementById('auto-update')) {
                document.getElementById('auto-update').checked = settings.autoUpdate !== false;
            }
            
            if (document.getElementById('java-path')) {
                document.getElementById('java-path').value = settings.javaPath || '';
            }
            
            if (document.getElementById('memory-slider') && memoryValue) {
                const memoryGB = parseInt(settings.maxMemory) || 4;
                document.getElementById('memory-slider').value = memoryGB;
                memoryValue.textContent = `${memoryGB} GB`;
            }
            
            if (document.getElementById('jvm-args')) {
                document.getElementById('jvm-args').value = settings.jvmArgs || '-XX:+UseG1GC -XX:+ParallelRefProcEnabled';
            }
            
            if (document.getElementById('game-directory')) {
                document.getElementById('game-directory').value = settings.gameDirectory || '';
            }
            
            if (settings.resolution) {
                if (document.getElementById('resolution-width')) {
                    document.getElementById('resolution-width').value = settings.resolution.width || 1280;
                }
                
                if (document.getElementById('resolution-height')) {
                    document.getElementById('resolution-height').value = settings.resolution.height || 720;
                }
            }
            
            if (document.getElementById('fullscreen')) {
                document.getElementById('fullscreen').checked = settings.fullscreen || false;
            }
        }
    });

    // Carregar mods (simulação)
    const modsContainer = document.querySelector('.mods-container');
    
    if (modsContainer) {
        const mockMods = [
            {
                name: 'OptiFine',
                description: 'Otimiza o desempenho do jogo e adiciona suporte para texturas HD.',
                category: 'tech',
                version: '1.20.4',
                downloads: 15000000,
                image: 'assets/mod1.jpg'
            },
            {
                name: 'JourneyMap',
                description: 'Adiciona um mapa em tempo real com interface web, waypoints e muito mais.',
                category: 'adventure',
                version: '1.20.4',
                downloads: 8000000,
                image: 'assets/mod2.jpg'
            },
            {
                name: 'Biomes O\' Plenty',
                description: 'Adiciona mais de 90 novos biomas e blocos ao jogo.',
                category: 'adventure',
                version: '1.20.4',
                downloads: 10000000,
                image: 'assets/mod3.jpg'
            },
            {
                name: 'Create',
                description: 'Adiciona máquinas, engrenagens e sistemas de automação estilosos.',
                category: 'tech',
                version: '1.20.4',
                downloads: 7000000,
                image: 'assets/mod4.jpg'
            },
            {
                name: 'Chisel',
                description: 'Adiciona variações decorativas para blocos existentes.',
                category: 'building',
                version: '1.20.4',
                downloads: 5000000,
                image: 'assets/mod5.jpg'
            },
            {
                name: 'Thaumcraft',
                description: 'Adiciona magia, pesquisa e itens mágicos ao jogo.',
                category: 'magic',
                version: '1.16.5',
                downloads: 9000000,
                image: 'assets/mod6.jpg'
            }
        ];
        
        // Renderizar mods
        mockMods.forEach(mod => {
            const modCard = document.createElement('div');
            modCard.className = 'news-card';
            modCard.innerHTML = `
                <div class="news-image">
                    <img src="${mod.image}" alt="${mod.name}">
                </div>
                <div class="news-content">
                    <h3>${mod.name}</h3>
                    <p>${mod.description}</p>
                    <div class="texture-meta">
                        <span class="texture-version">${mod.version}</span>
                        <span class="texture-resolution">${mod.category}</span>
                    </div>
                </div>
                <button class="secondary-btn" style="margin: 0 15px 15px;">Instalar</button>
            `;
            modsContainer.appendChild(modCard);
        });
    }

    // Filtrar mods
    const modsSearch = document.getElementById('mods-search');
    const modsCategory = document.getElementById('mods-category');
    const modsVersion = document.getElementById('mods-version');
    
    if (modsSearch && modsCategory && modsVersion) {
        const filterMods = () => {
            const searchTerm = modsSearch.value.toLowerCase();
            const category = modsCategory.value;
            const version = modsVersion.value;
            
            const modCards = modsContainer.querySelectorAll('.news-card');
            
            modCards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                const cardCategory = card.querySelector('.texture-resolution').textContent;
                const cardVersion = card.querySelector('.texture-version').textContent;
                
                const matchesSearch = name.includes(searchTerm);
                const matchesCategory = category === 'all' || cardCategory === category;
                const matchesVersion = version === 'all' || cardVersion === version;
                
                if (matchesSearch && matchesCategory && matchesVersion) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        };
        
        modsSearch.addEventListener('input', filterMods);
        modsCategory.addEventListener('change', filterMods);
        modsVersion.addEventListener('change', filterMods);
    }
});
