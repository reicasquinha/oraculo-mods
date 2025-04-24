# Alexandria Minecraft Launcher

Um launcher personalizado de Minecraft desenvolvido com Electron e Node.js, inspirado no design do site Alexandria.

## Características

- **Interface moderna** com tema escuro e elementos em gradiente azul
- **Gerenciamento completo de contas** (Microsoft e Mojang)
- **Navegação intuitiva** entre diferentes seções
- **Feed de notícias** integrado na página inicial
- **Seleção de versões** do Minecraft
- **Biblioteca de mods** com sistema de filtragem
- **Servidores exclusivos** com informações de status
- **Pacotes de texturas** personalizados
- **Configurações avançadas** para Java e desempenho do jogo
- **Animações e transições** suaves entre seções

## Requisitos

- Node.js v20 ou superior
- Windows, macOS ou Linux

## Instalação

1. Clone o repositório:
```
git clone https://github.com/seu-usuario/alexandria-minecraft-launcher.git
cd alexandria-minecraft-launcher
```

2. Instale as dependências:
```
npm install
```

3. Execute o launcher:
```
npm start
```

## Empacotamento

Para criar um instalador para Windows:
```
npm run build
```

O instalador será gerado na pasta `dist`.

## Tecnologias utilizadas

- **Electron**: Framework para desenvolvimento de aplicações desktop
- **Node.js**: Ambiente de execução JavaScript
- **minecraft-launcher-core**: API para integração com o Minecraft
- **electron-store**: Armazenamento de configurações
- **electron-builder**: Empacotamento e distribuição

## Estrutura do projeto

- `src/main.js`: Processo principal do Electron
- `src/preload.js`: Script de preload para comunicação segura
- `src/index.html`: Interface do usuário
- `src/css/style.css`: Estilos da interface
- `src/js/renderer.js`: Lógica da interface do usuário
- `src/assets/`: Recursos gráficos

## Personalização

O launcher pode ser facilmente personalizado editando os seguintes arquivos:

- `src/css/style.css`: Altere as variáveis CSS para modificar cores e estilos
- `src/index.html`: Modifique a estrutura da interface
- `src/assets/`: Substitua os recursos gráficos

## Licença

Este projeto está licenciado sob a licença ISC.
