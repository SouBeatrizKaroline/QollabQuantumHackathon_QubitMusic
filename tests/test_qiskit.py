import json
import subprocess
import unittest
from qiskit.quantum_info import Statevector
from quantum.optimizer import objective, circuit, ising_coefficients, run_json


class Backend:
    calls = 0

    def run(self, qc, shots):
        self.calls += 1
        probs = Statevector.from_instruction(qc.remove_final_measurements(inplace=False)).probabilities_dict()
        self.counts = {k: round(v * shots) for k, v in probs.items()}
        return self

    def result(self):
        return self

    def get_counts(self):
        return self.counts


class QuantumTests(unittest.TestCase):
    def test_ising_reconstructs_every_cost(self):
        for energy in (0, 0.25, 0.55, 0.85, 1):
            costs = objective(energy)
            h, pairs = ising_coefficients(costs)
            for state, cost in enumerate(costs):
                z = [1 - 2 * ((state >> i) & 1) for i in range(6)]
                value = sum(costs) / 64 + sum(a*b for a,b in zip(h,z)) + sum(v*z[i]*z[j] for i,j,v in pairs)
                self.assertAlmostEqual(value, cost, places=11)

    def test_normalization_and_bit_order(self):
        qc = circuit(objective(0.85), 0.8, 0.4, False)
        probs = Statevector.from_instruction(qc).probabilities()
        self.assertAlmostEqual(sum(probs), 1, places=12)
        self.assertEqual(qc.num_qubits, 6)

    def test_single_backend_submission(self):
        backend = Backend()
        result = json.loads(run_json(backend, 0.55, 42, 256))
        self.assertEqual(backend.calls, 1)
        self.assertIn(result['bits'], result['counts'])
        self.assertGreaterEqual(result['gap'], -1e-12)

    def test_browser_probabilities_match_qiskit(self):
        script = "import {objective,probabilities} from './lib/quantum.js'; console.log(JSON.stringify([0,.25,.55,.85,1].map(e=>({e,costs:objective(e),probs:probabilities(objective(e),.8,.4)}))));"
        fixtures = json.loads(subprocess.check_output(['node', '--input-type=module', '-e', script], text=True))
        for fixture in fixtures:
            costs = objective(fixture['e'])
            for a, b in zip(costs, fixture['costs']):
                self.assertAlmostEqual(a, b, places=12)
            probs = Statevector.from_instruction(circuit(costs, 0.8, 0.4, False)).probabilities()
            for a, b in zip(probs, fixture['probs']):
                self.assertAlmostEqual(a, b, places=12)


if __name__ == '__main__':
    unittest.main()
