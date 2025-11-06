// Proof data for ISYE 425 Exam 2
export const proofs = [
  {
    id: "prop-2-10-part1",
    title: "Proposition 2.10 (Part 1)",
    category: "Shortest Paths",
    difficulty: "Medium",
    theorem: "If all edge lengths are non-negative, then for any s-t path P and any s-t shortest path P*, we have length(P) ≥ length(P*).",
    steps: [
      {
        step: 1,
        content: "Let P be any s-t path with edges e₁, e₂, ..., eₖ",
        explanation: "We start by defining an arbitrary path from s to t",
        keyTerm: "path"
      },
      {
        step: 2,
        content: "Let P* be an s-t shortest path",
        explanation: "Define the shortest path we're comparing against",
        keyTerm: "shortest path"
      },
      {
        step: 3,
        content: "length(P) = Σᵢ₌₁ᵏ length(eᵢ)",
        explanation: "The length of path P is the sum of its edge lengths",
        keyTerm: "path length"
      },
      {
        step: 4,
        content: "Since all edges have non-negative lengths, each length(eᵢ) ≥ 0",
        explanation: "By assumption of the proposition",
        keyTerm: "non-negative"
      },
      {
        step: 5,
        content: "length(P*) is the minimum over all s-t paths by definition",
        explanation: "P* is the shortest path, so its length is minimal",
        keyTerm: "minimum"
      },
      {
        step: 6,
        content: "Therefore, length(P) ≥ length(P*)",
        explanation: "Since P* minimizes length, any other path P must have length at least as long",
        keyTerm: "conclusion"
      }
    ]
  },
  {
    id: "prop-2-10-part2",
    title: "Proposition 2.10 (Part 2)",
    category: "Shortest Paths",
    difficulty: "Medium",
    theorem: "If there exists a negative cycle reachable from s, then the shortest path problem is not well-defined.",
    steps: [
      {
        step: 1,
        content: "Assume there exists a negative cycle C reachable from s",
        explanation: "Start with the hypothesis - there's a cycle with negative total length that we can reach from source s",
        keyTerm: "negative cycle"
      },
      {
        step: 2,
        content: "Let P be any path from s to some vertex v that passes through C",
        explanation: "Consider any path that goes through this negative cycle",
        keyTerm: "path through cycle"
      },
      {
        step: 3,
        content: "We can traverse cycle C any number of times k ≥ 0",
        explanation: "Since C is a cycle, we can go around it multiple times",
        keyTerm: "cycle traversal"
      },
      {
        step: 4,
        content: "length(P with k cycles) = length(P) + k · length(C)",
        explanation: "Each time around the cycle adds its length to our path",
        keyTerm: "total length"
      },
      {
        step: 5,
        content: "Since length(C) < 0, as k → ∞, length(P with k cycles) → -∞",
        explanation: "Because the cycle is negative, we can make the path arbitrarily short",
        keyTerm: "unbounded below"
      },
      {
        step: 6,
        content: "Therefore, there is no finite shortest path length",
        explanation: "The shortest path is not well-defined since we can always find a shorter one",
        keyTerm: "conclusion"
      }
    ]
  },
  {
    id: "theorem-2-11",
    title: "Theorem 2.11 (Bellman-Ford Correctness)",
    category: "Shortest Paths",
    difficulty: "Hard",
    theorem: "The Bellman-Ford algorithm correctly computes shortest paths if no negative cycles are reachable from the source.",
    steps: [
      {
        step: 1,
        content: "Let d[v] be the distance label computed by Bellman-Ford for vertex v",
        explanation: "Define our notation for the algorithm's output",
        keyTerm: "distance label"
      },
      {
        step: 2,
        content: "Let δ(s,v) be the true shortest path distance from s to v",
        explanation: "Define the actual shortest distance",
        keyTerm: "true distance"
      },
      {
        step: 3,
        content: "Initialize: d[s] = 0 and d[v] = ∞ for all v ≠ s",
        explanation: "Starting configuration of the algorithm",
        keyTerm: "initialization"
      },
      {
        step: 4,
        content: "The algorithm performs n-1 iterations of relaxing all edges",
        explanation: "Main loop of Bellman-Ford",
        keyTerm: "relaxation"
      },
      {
        step: 5,
        content: "For each edge (u,v), we update: d[v] = min(d[v], d[u] + length(u,v))",
        explanation: "Relaxation step - try to improve the distance to v through u",
        keyTerm: "edge relaxation"
      },
      {
        step: 6,
        content: "Claim: After k iterations, d[v] ≤ length of shortest path using ≤k edges",
        explanation: "Inductive hypothesis for correctness",
        keyTerm: "induction"
      },
      {
        step: 7,
        content: "Base case (k=0): d[s] = 0 is correct, d[v] = ∞ for v ≠ s",
        explanation: "Initial state satisfies the claim",
        keyTerm: "base case"
      },
      {
        step: 8,
        content: "Inductive step: Assume true for k, prove for k+1",
        explanation: "Standard inductive argument",
        keyTerm: "inductive step"
      },
      {
        step: 9,
        content: "Any shortest path with k+1 edges is: s → ... → u → v",
        explanation: "A path with k+1 edges must end with some edge (u,v)",
        keyTerm: "path structure"
      },
      {
        step: 10,
        content: "By induction, d[u] ≤ δ(s,u) after k iterations",
        explanation: "Apply inductive hypothesis to u",
        keyTerm: "apply hypothesis"
      },
      {
        step: 11,
        content: "Relaxing edge (u,v) gives: d[v] ≤ d[u] + length(u,v) ≤ δ(s,u) + length(u,v) = δ(s,v)",
        explanation: "The relaxation step ensures we find this path",
        keyTerm: "relaxation correctness"
      },
      {
        step: 12,
        content: "After n-1 iterations, all shortest paths (which have ≤n-1 edges) are found",
        explanation: "Simple paths have at most n-1 edges, so n-1 iterations suffice",
        keyTerm: "completion"
      },
      {
        step: 13,
        content: "Therefore, d[v] = δ(s,v) for all v at termination",
        explanation: "The algorithm correctly computes all shortest distances",
        keyTerm: "conclusion"
      }
    ]
  },
  {
    id: "prop-2-16",
    title: "Proposition 2.16 (DAG Property)",
    category: "Directed Acyclic Graphs",
    difficulty: "Medium",
    theorem: "Every directed acyclic graph (DAG) has at least one vertex with in-degree 0.",
    steps: [
      {
        step: 1,
        content: "Proof by contradiction: Assume G is a DAG with all vertices having in-degree ≥ 1",
        explanation: "We assume the opposite of what we want to prove",
        keyTerm: "contradiction"
      },
      {
        step: 2,
        content: "Start at any vertex v₁. Since in-degree(v₁) ≥ 1, there exists edge (v₂, v₁)",
        explanation: "Since v₁ has incoming edges, we can find a predecessor v₂",
        keyTerm: "predecessor"
      },
      {
        step: 3,
        content: "Since in-degree(v₂) ≥ 1, there exists edge (v₃, v₂)",
        explanation: "Similarly, v₂ has a predecessor v₃",
        keyTerm: "chain"
      },
      {
        step: 4,
        content: "Continue this process: v₁ ← v₂ ← v₃ ← ...",
        explanation: "We can keep going backwards indefinitely",
        keyTerm: "infinite regress"
      },
      {
        step: 5,
        content: "Since G is finite, we must revisit some vertex vᵢ",
        explanation: "There are only finitely many vertices, so we must repeat",
        keyTerm: "pigeonhole principle"
      },
      {
        step: 6,
        content: "This creates a cycle: vᵢ ← vᵢ₊₁ ← ... ← vⱼ ← vᵢ",
        explanation: "When we revisit vᵢ, we've found a cycle",
        keyTerm: "cycle"
      },
      {
        step: 7,
        content: "But this contradicts G being acyclic",
        explanation: "DAG means no cycles, but we found one",
        keyTerm: "contradiction"
      },
      {
        step: 8,
        content: "Therefore, there must exist a vertex with in-degree 0",
        explanation: "Our assumption was wrong, so the proposition is true",
        keyTerm: "conclusion"
      }
    ]
  },
  {
    id: "theorem-2-17",
    title: "Theorem 2.17 (Existence of Topological Sort)",
    category: "Directed Acyclic Graphs",
    difficulty: "Medium",
    theorem: "Every DAG has a topological ordering.",
    steps: [
      {
        step: 1,
        content: "Proof by induction on the number of vertices n",
        explanation: "We'll prove this works for any size DAG",
        keyTerm: "induction"
      },
      {
        step: 2,
        content: "Base case: n = 1. A single vertex is trivially topologically sorted",
        explanation: "One vertex has no edges, so any order works",
        keyTerm: "base case"
      },
      {
        step: 3,
        content: "Inductive hypothesis: Assume true for all DAGs with n-1 vertices",
        explanation: "Assume we can topologically sort any smaller DAG",
        keyTerm: "hypothesis"
      },
      {
        step: 4,
        content: "Consider a DAG G with n vertices",
        explanation: "Now we need to prove it for n vertices",
        keyTerm: "inductive step"
      },
      {
        step: 5,
        content: "By Proposition 2.16, G has a vertex v with in-degree 0",
        explanation: "We can always find a vertex with no incoming edges",
        keyTerm: "source vertex"
      },
      {
        step: 6,
        content: "Remove v from G to get G' with n-1 vertices",
        explanation: "Create a smaller graph",
        keyTerm: "reduction"
      },
      {
        step: 7,
        content: "G' is still a DAG (removing vertices preserves acyclicity)",
        explanation: "Removing a vertex can't create cycles",
        keyTerm: "preserve property"
      },
      {
        step: 8,
        content: "By inductive hypothesis, G' has a topological ordering σ'",
        explanation: "Apply our assumption to the smaller graph",
        keyTerm: "apply hypothesis"
      },
      {
        step: 9,
        content: "Place v first, followed by σ': σ = (v, σ')",
        explanation: "Put v at the front of the ordering",
        keyTerm: "construction"
      },
      {
        step: 10,
        content: "σ is a valid topological ordering: v has no incoming edges, so it can be first",
        explanation: "Since v has in-degree 0, no vertex in σ' points to v",
        keyTerm: "validity"
      },
      {
        step: 11,
        content: "Therefore, every DAG has a topological ordering",
        explanation: "By induction, this holds for all n",
        keyTerm: "conclusion"
      }
    ]
  },
  {
    id: "theorem-2-18",
    title: "Theorem 2.18 (Topological Sort Algorithm Correctness)",
    category: "Directed Acyclic Graphs",
    difficulty: "Medium",
    theorem: "The topological sort algorithm using in-degree counting is correct.",
    steps: [
      {
        step: 1,
        content: "Algorithm: Repeatedly find and remove vertices with in-degree 0",
        explanation: "Describe the algorithm we're proving correct",
        keyTerm: "algorithm"
      },
      {
        step: 2,
        content: "Let σ = (v₁, v₂, ..., vₙ) be the ordering produced",
        explanation: "Define the output",
        keyTerm: "output"
      },
      {
        step: 3,
        content: "Need to show: For every edge (vᵢ, vⱼ), we have i < j",
        explanation: "This is the definition of topological ordering",
        keyTerm: "goal"
      },
      {
        step: 4,
        content: "Proof by contradiction: Suppose (vᵢ, vⱼ) exists with i > j",
        explanation: "Assume there's an edge going backwards",
        keyTerm: "contradiction"
      },
      {
        step: 5,
        content: "When vⱼ was selected, it had in-degree 0 in the remaining graph",
        explanation: "We only select vertices with no incoming edges",
        keyTerm: "selection criteria"
      },
      {
        step: 6,
        content: "Since i > j, vertex vᵢ was not yet removed when vⱼ was selected",
        explanation: "vⱼ came earlier in the ordering",
        keyTerm: "timing"
      },
      {
        step: 7,
        content: "But edge (vᵢ, vⱼ) exists, so vⱼ had in-degree ≥ 1 in the remaining graph",
        explanation: "The edge from vᵢ to vⱼ was still there",
        keyTerm: "contradiction"
      },
      {
        step: 8,
        content: "This contradicts vⱼ being selected (in-degree must be 0)",
        explanation: "We can't select a vertex with incoming edges",
        keyTerm: "contradiction reached"
      },
      {
        step: 9,
        content: "Therefore, the algorithm produces a valid topological ordering",
        explanation: "No backward edges exist",
        keyTerm: "conclusion"
      }
    ]
  },
  {
    id: "prop-2-19",
    title: "Proposition 2.19 (DAG Shortest Paths)",
    category: "Shortest Paths",
    difficulty: "Medium",
    theorem: "For DAGs, we can compute shortest paths in O(m + n) time using topological ordering.",
    steps: [
      {
        step: 1,
        content: "Compute a topological ordering σ = (v₁, v₂, ..., vₙ) of the DAG",
        explanation: "First, order the vertices so all edges go forward",
        keyTerm: "topological sort"
      },
      {
        step: 2,
        content: "Initialize: d[s] = 0, d[v] = ∞ for all v ≠ s",
        explanation: "Standard initialization for shortest paths",
        keyTerm: "initialization"
      },
      {
        step: 3,
        content: "Process vertices in topological order: for each vᵢ in σ",
        explanation: "Visit vertices in the order computed",
        keyTerm: "processing order"
      },
      {
        step: 4,
        content: "For each outgoing edge (vᵢ, u): d[u] = min(d[u], d[vᵢ] + length(vᵢ, u))",
        explanation: "Relax all edges leaving the current vertex",
        keyTerm: "relaxation"
      },
      {
        step: 5,
        content: "Claim: When processing vᵢ, d[vᵢ] is the correct shortest path distance",
        explanation: "At each step, we've computed the true distance",
        keyTerm: "invariant"
      },
      {
        step: 6,
        content: "Proof: Any path to vᵢ only uses vertices that come before vᵢ in σ",
        explanation: "Due to topological ordering, all incoming edges are from earlier vertices",
        keyTerm: "topological property"
      },
      {
        step: 7,
        content: "All predecessors of vᵢ have been processed before vᵢ",
        explanation: "We process in topological order",
        keyTerm: "ordering guarantee"
      },
      {
        step: 8,
        content: "Therefore, d[vᵢ] = min over all edges (u,vᵢ) of {d[u] + length(u,vᵢ)}",
        explanation: "We've tried all possible paths to vᵢ",
        keyTerm: "optimality"
      },
      {
        step: 9,
        content: "This gives the shortest path to vᵢ",
        explanation: "We've considered all paths by the time we reach vᵢ",
        keyTerm: "correctness"
      },
      {
        step: 10,
        content: "Time complexity: O(m + n) for topological sort + O(m + n) for relaxation",
        explanation: "Linear time in the size of the graph",
        keyTerm: "complexity"
      },
      {
        step: 11,
        content: "Total: O(m + n)",
        explanation: "Very efficient for DAGs",
        keyTerm: "conclusion"
      }
    ]
  },
  {
    id: "dijkstra-correctness",
    title: "Theorem (Validity of Dijkstra's Algorithm)",
    category: "Shortest Paths",
    difficulty: "Hard",
    theorem: "Dijkstra's algorithm correctly computes shortest paths when all edge lengths are non-negative.",
    steps: [
      {
        step: 1,
        content: "Algorithm maintains set S of vertices with finalized distances",
        explanation: "S grows from {s} to all reachable vertices",
        keyTerm: "finalized set"
      },
      {
        step: 2,
        content: "Each vertex v has distance label d[v]",
        explanation: "Estimate of shortest path distance",
        keyTerm: "distance label"
      },
      {
        step: 3,
        content: "Invariant: For all v ∈ S, d[v] = δ(s,v) (true shortest distance)",
        explanation: "Vertices in S have correct shortest path distances",
        keyTerm: "invariant"
      },
      {
        step: 4,
        content: "Initially: S = {s}, d[s] = 0, d[v] = ∞ for v ≠ s",
        explanation: "Start with just the source",
        keyTerm: "initialization"
      },
      {
        step: 5,
        content: "Invariant holds initially: δ(s,s) = 0",
        explanation: "Base case is trivial",
        keyTerm: "base case"
      },
      {
        step: 6,
        content: "At each step: Select u ∉ S with minimum d[u], add u to S",
        explanation: "Choose the closest vertex not yet finalized",
        keyTerm: "greedy choice"
      },
      {
        step: 7,
        content: "Claim: d[u] = δ(s,u) when u is added to S",
        explanation: "We need to prove the greedy choice is correct",
        keyTerm: "correctness claim"
      },
      {
        step: 8,
        content: "Proof by contradiction: Suppose d[u] > δ(s,u)",
        explanation: "Assume we haven't found the shortest path to u yet",
        keyTerm: "contradiction"
      },
      {
        step: 9,
        content: "Let P* be a true shortest path from s to u",
        explanation: "Consider an actual shortest path",
        keyTerm: "shortest path"
      },
      {
        step: 10,
        content: "Let y be the first vertex on P* not in S, with predecessor x ∈ S",
        explanation: "Find where P* exits the set S",
        keyTerm: "boundary vertex"
      },
      {
        step: 11,
        content: "When x was added to S, we relaxed edge (x,y), so d[y] ≤ d[x] + length(x,y)",
        explanation: "The relaxation step updated d[y]",
        keyTerm: "relaxation"
      },
      {
        step: 12,
        content: "By invariant: d[x] = δ(s,x)",
        explanation: "x is in S, so its distance is correct",
        keyTerm: "apply invariant"
      },
      {
        step: 13,
        content: "Therefore: d[y] ≤ δ(s,x) + length(x,y) = δ(s,y)",
        explanation: "d[y] is at most the shortest distance to y",
        keyTerm: "upper bound"
      },
      {
        step: 14,
        content: "Since y is on shortest path P* to u: δ(s,y) ≤ δ(s,u)",
        explanation: "y comes before u on the shortest path",
        keyTerm: "path property"
      },
      {
        step: 15,
        content: "All edges are non-negative, so δ(s,y) ≤ δ(s,u)",
        explanation: "Can't decrease distance by adding positive lengths",
        keyTerm: "non-negative lengths"
      },
      {
        step: 16,
        content: "Therefore: d[y] ≤ δ(s,u) < d[u]",
        explanation: "Combining our inequalities",
        keyTerm: "contradiction setup"
      },
      {
        step: 17,
        content: "But we selected u because it had minimum d-value among vertices not in S",
        explanation: "This was our greedy choice",
        keyTerm: "selection criteria"
      },
      {
        step: 18,
        content: "So d[u] ≤ d[y], which contradicts d[y] < d[u]",
        explanation: "We've reached a contradiction",
        keyTerm: "contradiction"
      },
      {
        step: 19,
        content: "Therefore, d[u] = δ(s,u), and the invariant is maintained",
        explanation: "Our assumption was wrong",
        keyTerm: "invariant maintained"
      },
      {
        step: 20,
        content: "By induction, all vertices added to S have correct distances",
        explanation: "The invariant holds throughout",
        keyTerm: "conclusion"
      }
    ]
  },
  {
    id: "theorem-2-20",
    title: "Theorem 2.20 (Max-Flow Min-Cut)",
    category: "Maximum Flow",
    difficulty: "Hard",
    theorem: "The maximum value of an s-t flow equals the minimum capacity of an s-t cut.",
    steps: [
      {
        step: 1,
        content: "Let f be any s-t flow and (S,T) be any s-t cut",
        explanation: "Consider an arbitrary flow and an arbitrary cut",
        keyTerm: "definitions"
      },
      {
        step: 2,
        content: "value(f) = Σ_{out of S} f(e) - Σ_{into S} f(e)",
        explanation: "Flow value equals net flow out of the source set",
        keyTerm: "flow value"
      },
      {
        step: 3,
        content: "For the cut (S,T): capacity(S,T) = Σ_{edges from S to T} c(e)",
        explanation: "Cut capacity is the sum of capacities of edges crossing the cut",
        keyTerm: "cut capacity"
      },
      {
        step: 4,
        content: "Since f(e) ≤ c(e) for all edges e: Σ_{out of S} f(e) ≤ Σ_{out of S} c(e) = capacity(S,T)",
        explanation: "Flow on each edge is bounded by capacity",
        keyTerm: "capacity constraint"
      },
      {
        step: 5,
        content: "And Σ_{into S} f(e) ≥ 0",
        explanation: "Flows are non-negative",
        keyTerm: "non-negative flow"
      },
      {
        step: 6,
        content: "Therefore: value(f) ≤ capacity(S,T)",
        explanation: "Any flow is bounded by any cut",
        keyTerm: "weak duality"
      },
      {
        step: 7,
        content: "This holds for any flow f and any cut (S,T)",
        explanation: "Universal bound",
        keyTerm: "universal bound"
      },
      {
        step: 8,
        content: "So: max_{flows f} value(f) ≤ min_{cuts (S,T)} capacity(S,T)",
        explanation: "Maximum flow is at most minimum cut",
        keyTerm: "inequality"
      },
      {
        step: 9,
        content: "Now need to prove equality: max flow = min cut",
        explanation: "Show the inequality is tight",
        keyTerm: "strong duality"
      },
      {
        step: 10,
        content: "Run Ford-Fulkerson algorithm to get maximum flow f*",
        explanation: "Compute a maximum flow",
        keyTerm: "algorithm"
      },
      {
        step: 11,
        content: "Let S* = vertices reachable from s in residual graph G_f*",
        explanation: "Define a specific cut",
        keyTerm: "residual graph"
      },
      {
        step: 12,
        content: "Let T* = V \\ S*",
        explanation: "The complement of S*",
        keyTerm: "cut complement"
      },
      {
        step: 13,
        content: "(S*, T*) is an s-t cut (s ∈ S*, t ∈ T* since no path s→t in G_f*)",
        explanation: "This is a valid cut separating s and t",
        keyTerm: "valid cut"
      },
      {
        step: 14,
        content: "For any edge e = (u,v) with u ∈ S*, v ∈ T*: f*(e) = c(e)",
        explanation: "Forward edges across the cut are saturated",
        keyTerm: "saturated edges"
      },
      {
        step: 15,
        content: "Because if f*(e) < c(e), then v would be reachable from s in G_f*",
        explanation: "If not saturated, there would be residual capacity",
        keyTerm: "reachability"
      },
      {
        step: 16,
        content: "For any edge e = (v,u) with v ∈ T*, u ∈ S*: f*(e) = 0",
        explanation: "Backward edges across the cut have zero flow",
        keyTerm: "zero flow"
      },
      {
        step: 17,
        content: "Because if f*(e) > 0, then v would be reachable from s via reverse edge in G_f*",
        explanation: "Positive flow creates reverse residual capacity",
        keyTerm: "reverse reachability"
      },
      {
        step: 18,
        content: "value(f*) = Σ_{out of S*} f*(e) - Σ_{into S*} f*(e)",
        explanation: "Calculate flow value using the cut",
        keyTerm: "flow calculation"
      },
      {
        step: 19,
        content: "value(f*) = Σ_{out of S*} c(e) - 0 = capacity(S*, T*)",
        explanation: "Forward edges saturated, backward edges empty",
        keyTerm: "equality achieved"
      },
      {
        step: 20,
        content: "Therefore: max flow = value(f*) = capacity(S*, T*) ≥ min cut",
        explanation: "Found a flow equal to a cut",
        keyTerm: "lower bound"
      },
      {
        step: 21,
        content: "Combined with step 8: max flow = min cut",
        explanation: "The two inequalities give equality",
        keyTerm: "conclusion"
      }
    ]
  },
  {
    id: "prop-2-21",
    title: "Proposition 2.21 (Integrality of Max Flow)",
    category: "Maximum Flow",
    difficulty: "Medium",
    theorem: "If all capacities are integers, then there exists a maximum flow that is integer-valued.",
    steps: [
      {
        step: 1,
        content: "Assume all edge capacities c(e) are integers",
        explanation: "Starting assumption",
        keyTerm: "integer capacities"
      },
      {
        step: 2,
        content: "Consider the Ford-Fulkerson algorithm starting with f(e) = 0 for all e",
        explanation: "Start with zero flow (which is integer)",
        keyTerm: "initialization"
      },
      {
        step: 3,
        content: "Initially, all flows are integers (specifically, 0)",
        explanation: "Base case for induction",
        keyTerm: "integer initialization"
      },
      {
        step: 4,
        content: "At each iteration, find an augmenting path P in the residual graph",
        explanation: "Main step of Ford-Fulkerson",
        keyTerm: "augmenting path"
      },
      {
        step: 5,
        content: "The bottleneck capacity b = min_{e ∈ P} c_f(e)",
        explanation: "Maximum flow we can push along this path",
        keyTerm: "bottleneck"
      },
      {
        step: 6,
        content: "For forward edges e in P: c_f(e) = c(e) - f(e)",
        explanation: "Residual capacity on forward edges",
        keyTerm: "forward residual"
      },
      {
        step: 7,
        content: "For backward edges e in P: c_f(e) = f(e)",
        explanation: "Residual capacity on backward edges",
        keyTerm: "backward residual"
      },
      {
        step: 8,
        content: "By induction, assume f(e) is integer for all edges",
        explanation: "Inductive hypothesis",
        keyTerm: "induction hypothesis"
      },
      {
        step: 9,
        content: "Since c(e) is integer and f(e) is integer: c_f(e) is integer",
        explanation: "Integer minus integer is integer",
        keyTerm: "integer arithmetic"
      },
      {
        step: 10,
        content: "Therefore, b = min of integers is an integer",
        explanation: "Bottleneck is an integer",
        keyTerm: "integer bottleneck"
      },
      {
        step: 11,
        content: "We augment flow by b along path P",
        explanation: "Push flow along the augmenting path",
        keyTerm: "augmentation"
      },
      {
        step: 12,
        content: "For forward edges: f(e) := f(e) + b (integer + integer)",
        explanation: "Update flow on forward edges",
        keyTerm: "forward update"
      },
      {
        step: 13,
        content: "For backward edges: f(e) := f(e) - b (integer - integer)",
        explanation: "Update flow on backward edges",
        keyTerm: "backward update"
      },
      {
        step: 14,
        content: "After augmentation, all flows remain integers",
        explanation: "Integer operations preserve integrality",
        keyTerm: "integrality preserved"
      },
      {
        step: 15,
        content: "By induction, when the algorithm terminates, f is integer-valued",
        explanation: "Integrality maintained throughout",
        keyTerm: "final integrality"
      },
      {
        step: 16,
        content: "The algorithm terminates with a maximum flow",
        explanation: "Ford-Fulkerson correctness",
        keyTerm: "termination"
      },
      {
        step: 17,
        content: "Therefore, there exists an integer-valued maximum flow",
        explanation: "Conclusion of the proposition",
        keyTerm: "conclusion"
      }
    ]
  },
  {
    id: "prop-3-1",
    title: "Proposition 3.1 (Flow Decomposition)",
    category: "Maximum Flow",
    difficulty: "Hard",
    theorem: "Any flow can be decomposed into flow along at most m paths and cycles.",
    steps: [
      {
        step: 1,
        content: "Let f be a flow in network G = (V, E) with m edges",
        explanation: "Consider an arbitrary flow",
        keyTerm: "flow"
      },
      {
        step: 2,
        content: "We will decompose f into paths from s to t and cycles",
        explanation: "Goal of the decomposition",
        keyTerm: "decomposition"
      },
      {
        step: 3,
        content: "If f is the zero flow, we're done (empty decomposition)",
        explanation: "Base case",
        keyTerm: "base case"
      },
      {
        step: 4,
        content: "Otherwise, there exists an edge e with f(e) > 0",
        explanation: "Flow is non-zero somewhere",
        keyTerm: "non-zero flow"
      },
      {
        step: 5,
        content: "Case 1: There exists a path P from s to t with f(e) > 0 for all e ∈ P",
        explanation: "First case: we can find a path with positive flow",
        keyTerm: "s-t path"
      },
      {
        step: 6,
        content: "Let b = min_{e ∈ P} f(e) > 0",
        explanation: "Minimum flow along this path",
        keyTerm: "bottleneck"
      },
      {
        step: 7,
        content: "Add (P, b) to our decomposition",
        explanation: "Record this path and its flow",
        keyTerm: "add path"
      },
      {
        step: 8,
        content: "Define f'(e) = f(e) - b for all e ∈ P, f'(e) = f(e) otherwise",
        explanation: "Remove this flow from the network",
        keyTerm: "reduced flow"
      },
      {
        step: 9,
        content: "f' is a valid flow with smaller support (at least one edge now has f'(e) = 0)",
        explanation: "New flow has fewer positive edges",
        keyTerm: "size reduction"
      },
      {
        step: 10,
        content: "Case 2: No s-t path with positive flow exists",
        explanation: "Second case: can't reach t from s",
        keyTerm: "no path"
      },
      {
        step: 11,
        content: "Let S = {v : there exists path s → v with f(e) > 0 for all edges}",
        explanation: "Vertices reachable from s with positive flow",
        keyTerm: "reachable set"
      },
      {
        step: 12,
        content: "By flow conservation at vertices in S \\ {s}, flow in must equal flow out",
        explanation: "Conservation of flow",
        keyTerm: "flow conservation"
      },
      {
        step: 13,
        content: "Since t ∉ S, there must be a cycle C in S with f(e) > 0 for all e ∈ C",
        explanation: "Flow must form a cycle within S",
        keyTerm: "cycle"
      },
      {
        step: 14,
        content: "Let b = min_{e ∈ C} f(e) > 0",
        explanation: "Minimum flow around the cycle",
        keyTerm: "cycle bottleneck"
      },
      {
        step: 15,
        content: "Add (C, b) to our decomposition",
        explanation: "Record this cycle and its flow",
        keyTerm: "add cycle"
      },
      {
        step: 16,
        content: "Define f'(e) = f(e) - b for all e ∈ C, f'(e) = f(e) otherwise",
        explanation: "Remove cycle flow",
        keyTerm: "reduced flow"
      },
      {
        step: 17,
        content: "Again, f' has at least one fewer edge with positive flow",
        explanation: "Support decreases",
        keyTerm: "size reduction"
      },
      {
        step: 18,
        content: "Repeat this process until f becomes zero",
        explanation: "Continue decomposing",
        keyTerm: "iteration"
      },
      {
        step: 19,
        content: "Each iteration removes at least one edge from the support",
        explanation: "Progress measure",
        keyTerm: "progress"
      },
      {
        step: 20,
        content: "Since there are m edges, we need at most m iterations",
        explanation: "Bound on number of paths/cycles",
        keyTerm: "bound"
      },
      {
        step: 21,
        content: "Therefore, any flow decomposes into at most m paths and cycles",
        explanation: "Final conclusion",
        keyTerm: "conclusion"
      }
    ]
  }
];

// Definitions and key concepts
export const definitions = {
  "shortest path": "A path from s to t where the sum of edge lengths is minimized",
  "negative cycle": "A cycle where the sum of edge lengths is negative",
  "DAG": "Directed Acyclic Graph - a directed graph with no cycles",
  "topological ordering": "An ordering of vertices where all edges go from earlier to later vertices",
  "in-degree": "Number of incoming edges to a vertex",
  "residual graph": "Graph showing remaining capacities after flow is sent",
  "augmenting path": "A path from s to t in the residual graph",
  "s-t cut": "A partition of vertices into sets S and T where s ∈ S and t ∈ T",
  "flow conservation": "At each vertex except s and t, incoming flow equals outgoing flow",
  "capacity constraint": "Flow on each edge cannot exceed its capacity"
};

// Quiz questions
export const quizQuestions = [
  {
    id: "q1",
    question: "Why can't we use Dijkstra's algorithm when there are negative edge weights?",
    options: [
      "The algorithm will run too slowly",
      "The greedy choice may not be optimal",
      "The algorithm will crash",
      "Negative weights are not allowed in graphs"
    ],
    correct: 1,
    explanation: "Dijkstra's greedy choice assumes that once a vertex is finalized, no shorter path will be found. With negative edges, a path through later vertices might be shorter."
  },
  {
    id: "q2",
    question: "What is the time complexity of topological sort using the in-degree method?",
    options: [
      "O(n²)",
      "O(m log n)",
      "O(m + n)",
      "O(n log n)"
    ],
    correct: 2,
    explanation: "We process each vertex once and examine each edge once, giving O(m + n) time."
  },
  {
    id: "q3",
    question: "In the Max-Flow Min-Cut theorem, what can we say about edges crossing the minimum cut?",
    options: [
      "They all have zero flow",
      "Forward edges are saturated, backward edges are empty",
      "They all have maximum capacity",
      "They form a cycle"
    ],
    correct: 1,
    explanation: "At the minimum cut corresponding to maximum flow, all forward edges are saturated (flow = capacity) and all backward edges are empty (flow = 0)."
  },
  {
    id: "q4",
    question: "Why does the Ford-Fulkerson algorithm terminate when capacities are integers?",
    options: [
      "Each augmentation increases flow by at least 1",
      "The number of paths is finite",
      "The algorithm uses dynamic programming",
      "Integer capacities guarantee no cycles"
    ],
    correct: 0,
    explanation: "With integer capacities and flows, each augmentation increases the total flow by at least 1. Since max flow is bounded by the sum of capacities leaving s, the algorithm must terminate."
  }
];
