"""Six-qubit p=1 QAOA with a classical parameter search and exact baseline.

Qollab supplies backend. Only one backend.run call is made per generation.
No runtime credentials, network services or hardware-specific provider needed.
"""
import json
import math
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

N = 6


def objective(energy=0.4):
    if not math.isfinite(energy) or not 0 <= energy <= 1:
        raise ValueError("Energy must be in [0, 1]")
    targets = [v * energy for v in (0.35, 0.8, 1, 1, 0.8, 0.35)]
    costs = []
    for state in range(1 << N):
        x = [(state >> i) & 1 for i in range(N)]
        fit = sum((v - targets[i]) ** 2 for i, v in enumerate(x))
        smooth = 0.45 * sum((x[i] - x[i - 1]) ** 2 for i in range(1, N))
        budget = 0.4 / N * (sum(x) - sum(targets)) ** 2
        costs.append(fit + smooth + budget + 0.35 * (x[0] + x[-1]))
    return costs


def ising_coefficients(costs):
    """Walsh transform of a quadratic cost: constant + h_i Z_i + J_ij Z_i Z_j."""
    linear = [sum(c * (1 - 2 * ((s >> i) & 1)) for s, c in enumerate(costs)) / 64 for i in range(N)]
    pairs = [(i, j, sum(c * (1 - 2 * ((s >> i) & 1)) * (1 - 2 * ((s >> j) & 1)) for s, c in enumerate(costs)) / 64) for i in range(N) for j in range(i + 1, N)]
    return linear, pairs


def circuit(costs, gamma, beta, measured=True):
    qc = QuantumCircuit(N)
    qc.h(range(N))
    linear, pairs = ising_coefficients(costs)
    for i, coefficient in enumerate(linear):
        qc.rz(2 * gamma * coefficient, i)
    for i, j, coefficient in pairs:
        if abs(coefficient) > 1e-12:
            # CX-RZ-CX is supported by built-in and IonQ Qiskit paths.
            qc.cx(i, j)
            qc.rz(2 * gamma * coefficient, j)
            qc.cx(i, j)
    for i in range(N):
        qc.rx(2 * beta, i)
    if measured:
        qc.measure_all()
    return qc


def tune(costs):
    best = None
    for g in range(1, 13):
        for b in range(1, 11):
            gamma, beta = g * math.pi / 12, b * math.pi / 20
            probs = Statevector.from_instruction(circuit(costs, gamma, beta, False)).probabilities()
            expectation = sum(p * c for p, c in zip(probs, costs))
            if best is None or expectation < best[0]:
                best = (float(expectation), gamma, beta)
    return best


def run_json(backend, energy=0.4, seed=42, shots=256):
    """Executed through callPromising so IonQ's async network bridge can suspend."""
    costs = objective(float(energy))
    expectation, gamma, beta = tune(costs)
    qc = circuit(costs, gamma, beta)
    # Qollab's chosen backend is mandatory; never replace it with a local provider.
    raw_counts = backend.run(qc, shots=int(shots)).result().get_counts()
    counts = {str(k).replace(" ", ""): int(v) for k, v in raw_counts.items()}
    candidates = [(costs[int(bits, 2)], -count, int(bits, 2), bits) for bits, count in counts.items() if count > 0]
    if not candidates:
        raise ValueError("Backend returned no measurements")
    cost, _, state, bits = min(candidates)
    optimum = min(costs)
    return json.dumps({"state": state, "bits": bits, "counts": counts, "cost": cost,
                       "optimum": optimum, "exactState": costs.index(optimum), "gap": cost - optimum,
                       "gamma": gamma, "beta": beta, "expectation": expectation,
                       "engine": "qollab", "shots": int(shots), "seed": int(seed)})
