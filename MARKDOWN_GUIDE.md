# Guia de Markdown Profissional

Este guia mostra como usar Markdown no seu sistema de artigos. O parser agora renderiza corretamente todos os comandos de texto sem mostrar os caracteres especiais.

## Títulos

```
# Título H1
## Título H2
### Título H3
#### Título H4
```

Renderiza como:
- # Título H1
- ## Título H2
- ### Título H3
- #### Título H4

## Formatação de Texto

### Negrito
Use `**texto**` ou `__texto__`
**Exemplo: Este texto está em negrito**

### Itálico
Use `*texto*` ou `_texto_`
*Exemplo: Este texto está em itálico*

### Negrito + Itálico
Use `***texto***`
***Exemplo: Este texto está em negrito e itálico***

### Tachado
Use `~~texto~~`
~~Exemplo: Este texto está tachado~~

### Código Inline
Use backticks simples: `código`
Exemplo: Use a função `render()` para processar conteúdo

## Listas

### Listas Desordenadas
Use `-`, `*` ou `+`:
```
- Primeiro item
- Segundo item
- Terceiro item
```

Ou:
```
* Primeiro item
* Segundo item
```

### Listas Ordenadas
Use números com ponto:
```
1. Primeiro passo
2. Segundo passo
3. Terceiro passo
```

## Tabelas

Use pipes `|` e hífens `-`:
```
| Item | Informação |
|------|-----------|
| Fabricante | Ferrari |
| Modelo | Purosangue |
| Lançamento | 2022 |
```

Renderiza como uma tabela profissional com bordas e cores alternadas.

## Blocos de Código
```javascript
function exemplo() {
  console.log('Hello, World!');
}
```

Você pode especificar a linguagem:
- ` ```javascript ` para JavaScript
- ` ```python ` para Python
- ` ```typescript ` para TypeScript
- ` ```html ` para HTML
- etc.

## Citações/Blockquotes

Use `>` no início da linha:
```
> Esta é uma citação importante
> Pode ter múltiplas linhas
```

## Links

Use `[texto](url)`:
```
[Clique aqui](https://exemplo.com)
[Google](https://google.com)
```

## Imagens

### Markdown
```
![Descrição da imagem](https://exemplo.com/imagem.jpg)
```

### URL Direta
Coloque apenas a URL em uma linha:
```
https://exemplo.com/imagem.jpg
```

## Subtítulo em Negrito

Use uma linha inteira em negrito como subtítulo:
```
**Isto é um subtítulo importante**
```

Renderiza como um `<h3>` com estilo especial.

## Exemplo Completo

```markdown
# Meu Artigo Incrível

Este é um parágrafo com **texto em negrito** e *texto em itálico*.

## Seção Principal

Você pode usar `código inline` para mencionar funções ou variáveis.

### Subsection

Aqui está uma lista de recursos:

- Recurso 1
- Recurso 2
- Recurso 3

E uma lista numerada:

1. Primeiro passo
2. Segundo passo
3. Terceiro passo

> **Dica Importante:** Você pode combinar formatações para criar efeitos interessantes!

Para mais informações, acesse [nosso blog](https://exemplo.com).

![Imagem de exemplo](https://exemplo.com/exemplo.jpg)
```

## Dicas

1. **Espaçamento:** Linhas em branco são automaticamente convertidas em espaçamento vertical
2. **Sem caracteres visíveis:** Todos os caracteres especiais de Markdown são processados e não aparecem no texto final
3. **Combinações:** Você pode combinar formatações, ex: `**_negrito e itálico_**`
4. **Links seguros:** Os links abrem em uma nova aba
5. **Código destacado:** Código inline tem fundo cinza e cor especial
6. **Imagens responsivas:** Imagens se adaptam automaticamente ao tamanho da tela

---

Divirta-se criando conteúdo profissional! 🚀
