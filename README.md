# Dossiê de Carreira

Site individual do Projetos 5 (Desenvolvimento Profissional, Soft Skills e Projeto
Integrador). Front-end estático em HTML/CSS/JS puro, hospedado no GitHub Pages.

A **base** está pronta: design, navegação, todas as páginas, seções e animações.
O conteúdo é preenchido manualmente ao longo do semestre — todos os pontos de
preenchimento estão marcados visualmente com **"✎ A preencher"** e, no código,
com comentários `<!-- PREENCHER: ... -->`.

## Estrutura

```
index.html                 Página Inicial
paginas/01-perfil.html     Perfil Profissional
paginas/02-diagnostico.html  Diagnóstico Profissional
paginas/03-contexto.html   Contexto e Empregabilidade
paginas/04-hipoteses.html  Hipóteses de Desenvolvimento
paginas/05-experimentacao.html  Experimentação Prática
paginas/06-evidencias.html Evidências e Aprendizados
paginas/07-percurso.html   Projetos e Percurso Acadêmico
paginas/08-planejamento.html  Planejamento Pós-Faculdade
paginas/09-sintese.html    Síntese Final
assets/css/style.css       Design system e componentes
assets/js/main.js          Navegação, rodapé e animações (config no topo)
assets/img/                Imagens (favicon + suas fotos/evidências)
```

## Como editar o conteúdo

1. **Seu nome e links de perfil** ficam em um só lugar: o topo de
   `assets/js/main.js`, no objeto `PERFIL` (nome, curso, escola, LinkedIn, GitHub).
   Edite ali e vale para o site inteiro (cabeçalho e rodapé).
   Ajuste também o nome no herói da `index.html`.
2. **Texto das páginas:** abra o `.html` da página e substitua cada bloco
   `<div class="fill">…</div>` pelo seu conteúdo. Procure por `PREENCHER` para
   achar os pontos rápido.
3. **Imagens (foto e evidências):** salve em `assets/img/` e troque o bloco
   placeholder por `<img src="../assets/img/arquivo.jpg" alt="descrição">`
   (na `index.html` o caminho é `assets/img/...`, sem o `../`).
4. **Blocos repetíveis** (projetos, evidências, vagas, semestres): duplique o
   bloco indicado nos comentários para adicionar mais itens.

A navegação se atualiza sozinha a partir da lista `PAGINAS` em `main.js`; você não
precisa editar o menu em cada página.

## Rodar localmente

Como o site usa caminhos entre pastas, abra por um servidor local (não pelo
`file://`):

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000/
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e suba estes arquivos (a raiz do projeto).
2. No repositório: **Settings → Pages → Build and deployment → Source:**
   "Deploy from a branch", branch `main`, pasta `/ (root)`.
3. Aguarde alguns minutos e acesse a URL gerada
   (`https://SEU-USUARIO.github.io/NOME-DO-REPO/`).

O arquivo `.nojekyll` já está incluído para o GitHub Pages servir os arquivos sem
processamento extra.

## Notas de design

- Tipografia: **Young Serif** (títulos) + **Hanken Grotesk** (texto), via Google Fonts.
- Cor: paleta quente em OKLCH (papel off-white, tinta terracota).
- Animações respeitam `prefers-reduced-motion`.
- Cada placeholder traz a orientação do edital (contexto, causa, consequência,
  ação) para guiar respostas com profundidade.
