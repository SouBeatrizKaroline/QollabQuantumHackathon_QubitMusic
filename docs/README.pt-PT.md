# QubitMusic — Português de Portugal

**Crie bandas sonoras instrumentais curtas com computação quântica e clássica. Ajuste, gere, ouça, compare e exporte.**

[English — documentação técnica completa](../README.md) · [Português do Brasil](README.pt-BR.md) · [Español](README.es.md)

## Problema e proposta

Professores, pequenos criadores e programadores independentes precisam de bandas sonoras adequadas a aulas, vídeos e jogos. Procurar uma gravação, verificar as condições de utilização e ajustar a duração exige trabalho.

O QubitMusic explora uma alternativa: gerar pequenos excertos instrumentais a partir da duração e energia pretendidas. A proposta de **Quantum Impact** é tornar esse processo mais acessível. O benefício ainda precisa de ser medido com utilizadores.

O protótipo não gera voz, letras, canções completas ou áudio a partir de texto livre. Não se afirma vantagem quântica.

## Funcionalidades

| Controlo | Opções |
| --- | --- |
| Duração | 8–60 segundos |
| Energia | 0–100% |
| Timbre | Warm, glass e pulse, com rótulos traduzidos na interface |
| Tonalidade | C, D, F e A |
| Variação | Semente para as notas e botão de remix |
| Resultado | Visualização das notas e de seis secções |
| Exportação | WAV mono de 22 050 Hz/16 bits e JSON |
| Comparação | Arranjo clássico exato, custo e diferença para o ótimo |
| Idiomas | Inglês, português do Brasil, português de Portugal e espanhol |

## Executar no computador

Requer Node.js 20 ou posterior e um navegador com Web Audio. Não há dependências npm nem chaves de API.

```sh
git clone https://github.com/SouBeatrizKaroline/QollabQuantumHackathon_QubitMusic.git
cd QollabQuantumHackathon_QubitMusic
npm start
```

Abra **http://127.0.0.1:4173**, selecione **Português · Portugal**, escolha uma proposta e ajuste os controlos. Gere, reproduza e exporte. Alterar os controlos não volta a gerar automaticamente a banda sonora.

Exemplos: aula de 24 segundos com 25% de energia; vídeo de 30 segundos com 55%; jogo de 16 segundos com 85%. A paleta altera o timbre e a semente altera as notas.

Não há gravação automática de projetos. Exporte antes de fechar. O volume de reprodução não altera o WAV. A comparação clássica substitui a faixa ativa: exporte a versão medida primeiro se pretender guardar ambas. A interface atual não importa o JSON exportado.

## Como participa a computação quântica

Seis qubits representam seis escolhas entre secções suaves e enérgicas: 64 arranjos possíveis. A função de custo combina adequação à energia, suavidade das transições, orçamento de energia e preferência por início e fim suaves.

O código clássico ajusta 120 pares de parâmetros de um circuito QAOA de uma camada. O circuito produz 256 medições; escolhe-se o arranjo de menor custo efetivamente observado. Depois, código clássico cria notas pentatónicas, baixo e pads e sintetiza o áudio.

O ótimo clássico resulta da avaliação dos 64 estados. A diferença apresentada é o custo selecionado menos o ótimo. Zero significa custo ótimo, não vantagem quântica. Nesta escala, a enumeração clássica é mais barata. A função de custo é uma aproximação de projeto, não uma medida validada da qualidade musical.

## Qollab e Vercel

**Navegador/Vercel:** simulação ideal em JavaScript, identificada na interface. Não executa Qiskit nem acede a um backend remoto.

**Qollab:** Python/Qiskit utiliza o backend disponibilizado pela plataforma. Execute `npm run package:qollab` e carregue o conteúdo de `artifacts/qollab/`, preservando as pastas. Escolha **Upload your own files**, deixe o template opcional vazio e utilize o formato JS/Qiskit. Teste primeiro o simulador integrado e depois o simulador IonQ gratuito.

Cada execução no Qollab permite uma tentativa de geração, mesmo que falhe. Utilize **Stop → Run** antes de gerar novamente. A semente controla as notas, não a repetibilidade das medições remotas. Consulte o [guia do Qollab](QOLLAB.md).

Para Vercel, execute `npm run build`. Importe o repositório com **Other**, raiz `./`, comando `npm run build` e saída `dist`. Não são necessárias variáveis de ambiente. O endereço previsto é [qubitmusic.vercel.app](https://qubitmusic.vercel.app/), cuja publicação e atribuição de domínio ainda não foram verificadas. O QR do pitch depende deste endereço exato. Consulte o [guia do Vercel](VERCEL.md).

## Testes e estado

```sh
npm test
npm run build
python -m pip install -r requirements.txt
python -m unittest discover -s tests -p 'test_*.py'
```

Python/Qiskit só é necessário para os testes Python, que também utilizam Node.js. Foram verificados localmente seis testes JavaScript, quatro testes Python, os idiomas, a reprodução e a exportação WAV. Consulte o [registo de validação](VALIDATION.md).

A execução/publicação no Qollab, o simulador IonQ remoto, a publicação pública e a submissão ao hackathon ainda precisam de verificação. O pitch em inglês com legendas em português de Portugal foi preparado separadamente; a publicação não foi verificada.

## Resolução de problemas

- Página incompleta: utilize `npm start`; o HTML da raiz destina-se ao Qollab.
- Sem som: gere primeiro, clique em reproduzir e verifique o volume do sistema.
- Novo arranjo bloqueado no Qollab: utilize Stop → Run.
- Qiskit em falta: instale os requisitos no ambiente Python utilizado nos testes.
- Vercel incompleto: verifique a pasta de saída `dist`.

## Impacto, colaboração e licença

Para medir impacto, compare com uma versão clássica e com pesquisa/edição convencional: tempo até aceitar uma banda sonora, conclusão da tarefa e avaliação dos ouvintes. Não há estudo realizado, garantia de originalidade jurídica das melodias ou resultados em hardware.

A implementação inicial foi criada em 11 de outubro de 2026 com assistência de IA. Para participar, siga os [requisitos oficiais](https://qollab.xyz/programs/hackathon/how-it-works), publique o projeto Qiskit no Qollab sob MIT e envie o vídeo público através da equipa registada.

As contribuições devem manter os quatro idiomas e a equivalência das probabilidades JavaScript/Qiskit. Consulte a [arquitetura](ARCHITECTURE.md) e o [texto de apresentação](PROJECT_PAGE.md).

Licença [MIT](../LICENSE). Não há gravações ou amostras de terceiros. O projeto não impõe restrições adicionais ao áudio exportado. MIDI, importação de projetos e arranjos mais ricos são propostas futuras, ainda não implementadas.
