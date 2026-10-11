# QubitMusic — trilhas adaptadas com computação quântica e clássica

Projeto para **Quantum Impact**: ajudar professores, pequenos criadores e desenvolvedores independentes a criar trilhas instrumentais com duração e energia específicas. Sem gravações de terceiros, microfone ou APIs pagas.

Execute `npm start` e abra http://127.0.0.1:4173. Escolha Português · Brasil, ajuste a ideia, gere uma trilha, ouça e exporte WAV ou JSON. O navegador usa simulação QAOA identificada; no Qollab, o projeto usa Qiskit e o backend escolhido na plataforma.

Seis qubits escolhem frases suaves ou energéticas. O código clássico ajusta o circuito, avalia resultados medidos e sintetiza áudio. A interface compara com o ótimo clássico exato. Nesta escala, a solução clássica custa menos; não afirmamos vantagem quântica nem benefício comprovado em usuários.

Para o hackathon ainda é necessário executar e publicar no Qollab, verificar o simulador IonQ gratuito, publicar um vídeo de 2–3 minutos e enviar pela equipe registrada. Instruções: [Qollab](QOLLAB.md). Documentação principal em [inglês](../README.md). Licença MIT.
