# QubitMusic — Português do Brasil

**Crie trilhas instrumentais curtas com computação quântica e clássica. Ajuste, gere, ouça, compare e exporte.**

[English — documentação técnica completa](../README.md) · [Português de Portugal](README.pt-PT.md) · [Español](README.es.md)

## Problema e proposta

Professores, pequenos criadores e desenvolvedores independentes precisam de trilhas que caibam em aulas, vídeos e jogos. Procurar uma gravação, verificar suas condições de uso e editar sua duração exige trabalho.

O QubitMusic explora uma alternativa: gerar pequenos trechos instrumentais a partir de duração e energia. A proposta de **Quantum Impact** é tornar esse processo mais acessível. Esse benefício ainda precisa ser medido com usuários.

O protótipo não gera vocais, letras, músicas completas ou áudio a partir de texto livre. Não há afirmação de vantagem quântica.

## Recursos

| Controle | Opções |
| --- | --- |
| Duração | 8–60 segundos |
| Energia | 0–100% |
| Timbre | Warm, glass e pulse, com rótulos traduzidos na interface |
| Tonalidade | C, D, F e A |
| Variação | Semente para as notas e botão de remix |
| Resultado | Visualização de notas e seis seções |
| Exportação | WAV mono de 22.050 Hz/16 bits e JSON |
| Comparação | Arranjo clássico exato, custo e diferença para o ótimo |
| Idiomas | Inglês, português do Brasil, português de Portugal e espanhol |

## Executar no computador

Requer Node.js 20 ou superior e um navegador com Web Audio. Não há dependências npm nem chaves de API.

```sh
git clone https://github.com/SouBeatrizKaroline/QollabQuantumHackathon_QubitMusic.git
cd QollabQuantumHackathon_QubitMusic
npm start
```

Abra **http://127.0.0.1:4173**, selecione **Português · Brasil**, escolha uma proposta e ajuste os controles. Gere, reproduza e exporte. Alterar os controles não recria a trilha automaticamente.

Exemplos: aula de 24 segundos com 25% de energia; vídeo de 30 segundos com 55%; jogo de 16 segundos com 85%. A paleta muda o timbre, e a semente muda as notas.

Não há salvamento automático. Exporte antes de fechar. O volume de reprodução não altera o WAV. A comparação clássica substitui a trilha ativa: exporte a versão medida antes de comparar se quiser guardar ambas. O JSON não pode ser reimportado pela interface atual.

## Como a computação quântica participa

Seis qubits representam seis escolhas entre seções suaves e energéticas: 64 arranjos possíveis. Uma função de custo combina adequação à energia, suavidade das transições, orçamento de energia e preferência por extremidades suaves.

O código clássico ajusta 120 pares de parâmetros de um circuito QAOA de uma camada. O circuito produz 256 medições; o sistema escolhe o arranjo de menor custo realmente observado. Depois, código clássico cria notas pentatônicas, baixo e pads e sintetiza o áudio.

O ótimo clássico vem da avaliação de todos os 64 estados. A diferença exibida é o custo selecionado menos o ótimo. Zero significa custo ótimo, não vantagem quântica. Nesta escala, a enumeração clássica é mais barata. A função de custo é uma aproximação de projeto, não uma medida validada de qualidade musical.

## Qollab e Vercel

**Navegador/Vercel:** simulação ideal em JavaScript, identificada na interface. Não executa Qiskit nem acessa um backend remoto.

**Qollab:** Python/Qiskit usa o backend fornecido pela plataforma. Execute `npm run package:qollab` e envie o conteúdo de `artifacts/qollab/`, preservando as pastas. Escolha **Upload your own files**, deixe o template opcional vazio e use o formato JS/Qiskit. Primeiro teste o simulador integrado; depois o simulador IonQ gratuito.

No Qollab, cada execução permite uma tentativa de geração, inclusive se falhar. Use **Stop → Run** antes de gerar novamente. A semente controla as notas, não a repetibilidade das medições remotas. Consulte o [guia do Qollab](QOLLAB.md).

Para Vercel, execute `npm run build`. Importe o repositório com **Other**, raiz `./`, comando `npm run build` e saída `dist`. Não são necessárias variáveis de ambiente. O endereço planejado é [qubitmusic.vercel.app](https://qubitmusic.vercel.app/), ainda sem implantação/domínio verificados. O QR do pitch depende desse endereço exato. Consulte o [guia do Vercel](VERCEL.md).

## Testes e situação

```sh
npm test
npm run build
python -m pip install -r requirements.txt
python -m unittest discover -s tests -p 'test_*.py'
```

Python/Qiskit é necessário apenas para os testes Python; esses testes também usam Node.js. Foram verificados localmente seis testes JavaScript, quatro testes Python, os idiomas, a reprodução e a exportação WAV. Veja o [registro de validação](VALIDATION.md).

A execução/publicação no Qollab, o simulador IonQ remoto, a implantação pública e a submissão ao hackathon ainda precisam de verificação. O pitch em inglês com legendas em português de Portugal foi preparado separadamente; sua publicação não foi verificada.

## Solução de problemas

- Página incompleta: use `npm start`; o HTML da raiz é destinado ao Qollab.
- Sem som: gere primeiro, clique em reproduzir e confira o volume do sistema.
- Novo arranjo bloqueado no Qollab: use Stop → Run.
- Qiskit ausente: instale os requisitos no mesmo ambiente Python dos testes.
- Vercel incompleto: confira a pasta de saída `dist`.

## Impacto, colaboração e licença

Para medir impacto, compare com um fluxo clássico e com busca/edição convencional: tempo até aceitar uma trilha, conclusão da tarefa e avaliação dos ouvintes. Não há estudo realizado, garantia de originalidade jurídica da melodia ou resultados em hardware.

A implementação inicial foi criada em 11 de outubro de 2026 com assistência de IA. Para participar, siga os [requisitos oficiais](https://qollab.xyz/programs/hackathon/how-it-works), publique o projeto Qiskit no Qollab sob MIT e envie o vídeo público pela equipe registrada.

Contribuições devem manter os quatro idiomas e a equivalência entre as probabilidades JavaScript/Qiskit. Consulte [arquitetura](ARCHITECTURE.md) e [proposta de apresentação](PROJECT_PAGE.md).

Licença [MIT](../LICENSE). Não há gravações ou samples de terceiros. O projeto não impõe restrições adicionais ao áudio exportado. Recursos futuros propostos incluem MIDI, importação de projetos e arranjos mais ricos; não estão implementados.
