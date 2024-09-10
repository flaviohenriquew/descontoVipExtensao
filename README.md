
# Shopee & Magalu Link Modifier

## Descrição

A **Shopee & Magalu Link Modifier** é uma extensão do Chrome que facilita a modificação e geração de links de produtos da Shopee e Magalu. Ela permite que o usuário:
- Gere links limpos da Shopee, removendo parâmetros extras.
- Gere links da Magalu com base nos códigos de produtos, com a opção de exibir ou não o nome do produto.
- Configurar o link base da Magalu e outras opções personalizadas.

## Funcionalidades

- **Gerar Links Shopee**: Limpa o link de produtos da Shopee, removendo parâmetros de rastreamento.
- **Gerar Links Magalu por Código**: Permite inserir códigos de produtos Magalu e gera links baseados neles.
- **Configurações Personalizáveis**: O usuário pode definir o link base da Magalu e optar por exibir ou não o nome dos produtos.

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/usuario/seu-repositorio.git
    ```

2. Abra o Chrome e vá até `chrome://extensions/`.

3. Ative o **Modo do Desenvolvedor** (Developer Mode) no canto superior direito.

4. Clique em **Carregar sem compactação** (Load Unpacked) e selecione a pasta do projeto da extensão.

5. A extensão será carregada e estará pronta para uso.

## Configurações

### Como Configurar o Link Base da Magalu

1. Abra a página de **opções** da extensão clicando com o botão direito no ícone da extensão e selecionando "Opções" (Options).
2. Na página de configurações, insira o **link base da Magalu** (padrão: `https://www.magazinevoce.com.br/casadapromocoes/p/`).
3. Ative ou desative a opção de **exibir nome do produto** ao gerar os links da Magalu.
4. Clique em **Salvar Configurações**.

## Estrutura do Projeto

```bash
extensao-shopee-magalu/
│
├── assets/                 # Imagens e ícones da extensão
│   ├── icons/
│   └── styles/
├── js/                     # Scripts JavaScript da extensão
│   ├── popup.js            # Lógica principal do popup
│   ├── options.js          # Lógica da página de configurações
│   └── storage.js          # Funções para armazenamento com chrome.storage
├── popup.html              # Interface do popup
├── options.html            # Página de configurações
├── manifest.json           # Manifesto da extensão
└── README.md               # Documentação do projeto
```

## Como Usar

- **Gerar Links Shopee**: Ao acessar um link de produto da Shopee, clique no ícone da extensão e use a função de gerar o link limpo.
- **Gerar Links Magalu**: Insira códigos de produtos Magalu no popup e clique em "Gerar Links". Se a opção de exibir nome do produto estiver habilitada, o nome será incluído no link gerado.

## Contribuição

1. Faça um fork do projeto.
2. Crie um branch para sua nova funcionalidade (`git checkout -b feature/nova-funcionalidade`).
3. Faça o commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. Faça o push para o branch (`git push origin feature/nova-funcionalidade`).
5. Abra um pull request.

## Licença

Este projeto é licenciado sob a licença MIT.
