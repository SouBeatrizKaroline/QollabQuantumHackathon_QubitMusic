# QubitMusic — bandas sonoras adaptadas com computação quântica e clássica

Projeto para **Quantum Impact**: ajudar professores, pequenos criadores e programadores independentes a criar faixas instrumentais com duração e energia específicas. Sem gravações de terceiros, microfone ou APIs pagas.

Executa `npm start` e abre http://127.0.0.1:4173. Escolhe Português · Portugal, ajusta a ideia, gera uma banda sonora, ouve e exporta WAV ou JSON. O navegador usa simulação QAOA identificada; no Qollab, o projeto usa Qiskit e o backend escolhido na plataforma.

Seis qubits escolhem frases suaves ou enérgicas. O código clássico ajusta o circuito, avalia resultados medidos e sintetiza áudio. A interface compara com o ótimo clássico exato. Nesta escala, a solução clássica custa menos; não afirmamos vantagem quântica nem benefício comprovado nos utilizadores.

Para o hackathon ainda é necessário executar e publicar no Qollab, verificar o simulador IonQ gratuito, publicar um vídeo de 2–3 minutos e submeter pela equipa registada. Instruções: [Qollab](QOLLAB.md). Documentação principal em [inglês](../README.md). Licença MIT.
