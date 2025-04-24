const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');
const { Client } = require('minecraft-launcher-core');

// Configuração do armazenamento local
const store = new Store();

// Inicialização do cliente do launcher
const launcher = new Client();

let mainWindow;

function createWindow() {
  // Criar a janela do navegador
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1024,
    minHeight: 600,
    frame: false,
    backgroundColor: '#1a1a1a',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.png')
  });

  // Carregar o arquivo HTML principal
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Abrir o DevTools em ambiente de desenvolvimento
  // mainWindow.webContents.openDevTools();

  // Evento quando a janela é fechada
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Quando o Electron terminar de inicializar
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // No macOS, é comum recriar uma janela no app quando o
    // ícone da dock é clicado e não há outras janelas abertas.
    if (mainWindow === null) createWindow();
  });
});

// Sair quando todas as janelas estiverem fechadas, exceto no macOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Manipuladores de eventos IPC para comunicação com o renderer

// Minimizar janela
ipcMain.on('minimize-window', () => {
  mainWindow.minimize();
});

// Maximizar/restaurar janela
ipcMain.on('maximize-window', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.restore();
  } else {
    mainWindow.maximize();
  }
});

// Fechar janela
ipcMain.on('close-window', () => {
  mainWindow.close();
});

// Iniciar o jogo
ipcMain.on('launch-game', (event, launchOptions) => {
  // Configurações padrão se não forem fornecidas
  const options = {
    authorization: launchOptions.authorization || {},
    root: launchOptions.root || path.join(app.getPath('userData'), 'minecraft'),
    version: {
      number: launchOptions.version || '1.20.4',
      type: launchOptions.versionType || 'release'
    },
    memory: {
      max: launchOptions.maxMemory || '4G',
      min: launchOptions.minMemory || '1G'
    }
  };

  // Adicionar mods se especificados
  if (launchOptions.forge) {
    options.forge = launchOptions.forge;
  }

  // Adicionar servidor se especificado
  if (launchOptions.server) {
    options.server = launchOptions.server;
  }

  // Eventos de progresso
  launcher.on('debug', (e) => event.sender.send('launch-log', e));
  launcher.on('data', (e) => event.sender.send('launch-data', e));
  launcher.on('progress', (e) => event.sender.send('launch-progress', e));

  // Iniciar o jogo
  launcher.launch(options)
    .then(() => {
      event.sender.send('launch-complete');
    })
    .catch((err) => {
      event.sender.send('launch-error', err.message);
    });
});

// Salvar configurações
ipcMain.on('save-settings', (event, settings) => {
  store.set('settings', settings);
  event.sender.send('settings-saved');
});

// Carregar configurações
ipcMain.handle('load-settings', () => {
  return store.get('settings') || {
    accounts: [],
    selectedAccount: null,
    gameDirectory: path.join(app.getPath('userData'), 'minecraft'),
    maxMemory: '4G',
    minMemory: '1G',
    javaPath: '',
    lastVersion: '1.20.4'
  };
});
