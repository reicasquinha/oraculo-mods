// Arquivo de preload para segurança e comunicação com o processo principal
const { contextBridge, ipcRenderer } = require('electron');

// Expõe APIs seguras para o processo de renderização
contextBridge.exposeInMainWorld('electronAPI', {
  // Controles da janela
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  
  // Funções do launcher
  launchGame: (options) => ipcRenderer.send('launch-game', options),
  onLaunchLog: (callback) => ipcRenderer.on('launch-log', (_, data) => callback(data)),
  onLaunchData: (callback) => ipcRenderer.on('launch-data', (_, data) => callback(data)),
  onLaunchProgress: (callback) => ipcRenderer.on('launch-progress', (_, data) => callback(data)),
  onLaunchComplete: (callback) => ipcRenderer.on('launch-complete', () => callback()),
  onLaunchError: (callback) => ipcRenderer.on('launch-error', (_, error) => callback(error)),
  
  // Configurações
  saveSettings: (settings) => ipcRenderer.send('save-settings', settings),
  loadSettings: () => ipcRenderer.invoke('load-settings'),
  onSettingsSaved: (callback) => ipcRenderer.on('settings-saved', () => callback())
});
