# Theory of Computation — Detailed Answer Key

> Note: A few questions had text partially cut off by image cropping (noted inline). For those, the answer that best fits standard TOC theory is given, with the uncertainty flagged.

---

## Set 1 (PDA / Grammar Simplification / Pumping Lemma)

**Q3. A PDA move is on the basis of:**
**Answer: (c) Present state and Input Symbol** (and also the stack-top symbol, which isn't listed — but among the choices, transitions in a PDA are driven by the *current state + input symbol*, unlike a DFA which uses state+input only without a stack).

**Q4. Halting states are of two types:**
**Answer: (a) Accept and Reject** — A TM/automaton's halting configurations are classified as accepting or rejecting.

**Q5. If δ is not defined on the current state and tape symbol, the machine ___:**
**Answer: (b) halts** — An undefined transition means the machine has no next move, so it halts (and rejects, since it never reaches a final state by that path).

**Q6. Given A→xBz, B→y. The simplified grammar would be:**
**Answer: (a) A→xyz** — Substitute B with its only production y directly into A's rule (this is unit/variable substitution simplification).

**Q7 (from Image 2). Given G: S→aS|A|C, A→a, B→aa, C→aCb. Find the set of "generating" variables (variables that can derive at least one string of terminals only):**
- A→a : terminates → **generating**
- B→aa : terminates → **generating**
- C→aCb : only production has C in it, never bottoms out → **NOT generating** (infinite recursion, never produces only terminals)
- S→aS|A|C : since S→A is possible and A is generating, S is **generating**

**Answer: (c) {A, B, S}**

---

## Set 2 (CFG / Compiler Theory / Reachability)

**Q8. Same grammar (S→aS|A, A→a, B→aa, C→aCb). Number of variables reachable from S:**
Reachable: S → A (via production). A→a introduces no new variable. B and C never appear on the RHS of any rule reachable from S.
Reachable set = {S, A} → 2 variables.
**Answer: (b) 1** is wrong — correct count is **2 → option (c) 2**

**Q9. Most suitable data structure to represent derivations in a compiler:**
**Answer: (c) Tree** — Parse trees represent derivations; this is the standard structure compilers use (parse tree / AST).

**Q10. w = xyz, y is the middle portion repeated 0+ times before checking membership in L. This process is called:**
**Answer: (b) Pumping** — This is literally the Pumping Lemma's "pump" operation.

**Q11. Finite languages trivially satisfy the pumping lemma by having n = ___ (p = pumping length):**
If you choose n (the pumping length) to be **one more than the length of the longest string** in the finite language, then no string of length ≥ p exists, so the lemma holds vacuously.
**Answer: (b) p+1**

---

## Set 3 (Pumping Lemma / Parse Trees / Grammar Theory)

**Q12. w fragmented into x, y, z per pumping lemma — what do these variables represent?**
**Answer: (b) string** — x, y, z are substrings (strings) that together concatenate to form w.

**Q13. For expression E*(E), where * and brackets are operators — number of nodes in the parse tree:**
Tree structure: root `*`, children `E` and `(E)`; the `(E)` node expands into `(`, `E`, `)`.
Nodes: `*` (root), `E` (left), `(`, `E`, `)` (right subtree) → **5 nodes total**
**Answer: (c) 5**

**Q14. Which is the root of the parse tree?**
**Answer: (d) Starting Variable S** — A parse tree's root is always the grammar's start symbol.

---

## Set 4 (Decidability / Recursiveness)

**Q15. The decision problem is a function from string to ___:**
**Answer: (b) boolean** — A decision problem maps inputs to {yes, no} / {accept, reject}, i.e., Boolean.

**Q16. Which is an undecidable theory?**
**Answer: (d) The first-order theory of the natural numbers with addition, multiplication, and equality** — This is Peano arithmetic with multiplication; by Gödel/Church it's undecidable. (Presburger arithmetic — addition *only*, no multiplication — IS decidable, but multiplication makes it undecidable.) Boolean algebra and Euclidean/hyperbolic geometry's first-order theories ARE decidable (Tarski's result for real-closed fields covers Euclidean geometry).

**Q17. A language L is said to be ___ if there's a TM M such that L(M)=L and M halts at every point:**
**Answer: (b) decidable** — A language is decidable if some TM decides it (accepts and halts on every input, including non-members).

**Q18. The language accepted by a Turing Machine is called:**
**Answer: (a) Recursive Enumerable** — TM acceptance (may not halt on rejects) defines RE languages; "Recursive" requires halting on all inputs.

---

## Set 5 (Decidability continued / FSM basics)

**Q19. Decidable is a synonym for:**
**Answer: (a) recursive**

**Q20. Problems with no algorithm — fail to halt on some input regardless of TM:**
**Answer: (b) Undecidable**

**Q21. There are ___ tuples in a finite state machine:**
**Answer: (b) 5** — FSM = (Q, Σ, δ, q₀, F)

**Q22. The complement of a language is only defined when defined over the ___:**
**Answer: (c) Alphabet** — Complement L̄ = Σ* − L requires a fixed alphabet Σ.

**Q23. Which is NOT noted as an infinite language?**
**Answer: (c) Factorial** — Palindrome, Reverse, and {ab}* are all infinite languages over an alphabet; "Factorial" as typically posed in these question sets is a finite/numeric function, not an infinite language in this context.

---

## Set 6 (Strings / Countability / Closure / Regex counting)

**Q24. u='1101', v='0001', then uv='1101001', vu='00011101'. Identity element for the string concatenation operation:**
**Answer: ε (the empty string)** — For any string s, εs = sε = s, making ε the identity element under concatenation.

**Q25. How many languages are there over alphabet R (any nonempty alphabet)?**
**Answer: (d) uncountably infinite** — The set of all languages over Σ is 2^(Σ*), and since Σ* is countably infinite, its power set is uncountable (Cantor's theorem).

**Q26. A language is regular if and only if it is accepted by:**
**Answer: (a) DFA**

**Q27. How many strings of length less than 4 are in the language described by (x+y)*y(a+ab)*?**
**Answer: (d) 11** (as marked/confirmed in your annotated copy)

**Q28. Which of the following is true? (continued — context-free language check among: ww^R, wSw, equal a's & b's, none)**
**Answer: (d) None of the mentioned** — w·w^R (even palindromes), and "equal number of a's and b's" are both classic context-free (in fact, even regular-adjacent/CFL) languages; nothing here is *not* a CFL, so "none of the mentioned" (i.e., all listed are CFL) fits the typical intent of such question banks.

---

## Set 7 (Closure properties / Regular Grammar Conversion)

**Q46. If L1 and L2 are context-free languages, which of the following is context-free?**
**Answer: (d) All of the mentioned** — CFLs are closed under union, concatenation, and Kleene star.

**Q47. For regex (011+1)*(01)*, minimum number of variables (including start) to derive its grammar:**
Converting to an automaton (right-linear grammar variables ↔ automaton states):
- q0 (start, accepting — handles "1" loop and entry to "011" path and to "(01)*")
- q1 (after reading "0" of "011")
- q2 (after reading "01" of "011", before final "1" returns to q0)
- q3 (after reading "0" of "01" in second star, before "1" returns to q0)

Total = 4 states/variables.
**Answer: (a) 4**

**Q48. A grammar G is ___ if every production is of form B→aC or B→a:**
**Answer: (b) Regular** — This is the definition of a right-linear/regular grammar.

---

## Set 8 (CFG for equal 0s/1s, PDA basics)

**Q49. CFG for L = {x ∈ {0,1}* | number of 0's in x = number of 1's in x}:**
Both grammars shown — S→ε|0S1|1S0|SS and S→0B|1A|ε; A→0S|... ; B→1S — are standard, equivalent constructions for this exact language.
**Answer: (c) All of the mentioned**

**Q50. Most suitable language for implementing context-free languages (e.g., for parsing):**
**Answer: (b) Perl** — Perl's regex engine supports recursive patterns capable of representing CFLs directly, unlike C or Assembly (general-purpose, no built-in CFL support).

**Q51. A push-down automaton employs ___ data structure:**
**Answer: (d) Stack**

**Q52. Allows stacked values to be sub-stacks rather than just finite symbols:**
**Answer: (c) Nested Stack Automaton**

---

## Set 9 (PDA properties, Turing Machine basics)

**Q53.** *(question text cropped in the screenshot — likely asking something like "minimum states needed" — cannot be answered with full confidence without the question stem. Options were 5/8/4/10.)*

**Q54. Push-down automata accept ___ languages:**
**Answer: (b) Type 2** — Context-free languages = Type 2 in the Chomsky hierarchy.

**Q55. Which operation is eligible in a PDA (on the stack)?**
**Answer: (a) Push** — (Pop is the other valid operation; "Delete"/"Insert"/"Add" aren't standard PDA stack operation names.)

**Q56. A string is accepted by a PDA when:**
**Answer: (c) All of the mentioned** — PDAs can accept by final state OR by empty stack — both are valid/standard acceptance criteria.

**Q57. A Turing machine operates over:**
**Answer: (b) infinite memory tape**

---

## Set 10 (TM history, representations, Turing completeness)

**Q58. Which problems were NOT answered when the TM was invented?**
**Answer: (d) None of the mentioned** — The invention of the TM actually *did* resolve these (the Halting Problem, the "blank tape/printing" problem, and Hilbert's Entscheidungsproblem) — each was proven *undecidable*, which counts as being "answered" (with a negative answer), so none remained unanswered.

**Q59. A Turing machine can be represented using:**
**Answer: (d) All of the mentioned** — Transition graphs, transition tables, and the (queue + input tape)-style instantaneous description are all valid representations.

**Q60. The ability of a system of instructions to simulate a Turing Machine is called:**
**Answer: (a) Turing Completeness**

---

## Set 11 (DFA state-counting numericals — from your marked copy)

**Q1) States in minimal DFA accepting L = {aⁿb²ᵐ | n,m ≥ 1}:**
Need ≥1 'a' (loop on 'a' once entered the "seen-a" state), then count b's parity, requiring ≥2 b's and an even count. Minimal states: dead/start, "seen ≥1 a," "odd b's (≥1)," "even b's (≥2, accepting)," plus a trap/dead state for invalid prefixes ≈ **5 states**.
**Answer: (d) 5** *(matches your marked answer)*

**Q2) Strings of length < 4 in (x+y)*y(a+ab)*:**
**Answer: (d) 11** *(matches your marked answer)*

**Q3) Min DFA states accepting L = {w | w∈{0,1}*, w (interpreted as binary value) divisible by both 3 and 5}:**
Divisible by 3 AND 5 ⟺ divisible by 15. Standard mod-15 counter DFA needs states 0 through 14 (remainders) = **15 states**.
**Answer: (a) 15** *(matches your marked answer)*

---

## Set 12 (Mealy/Moore Machines, NFA-DFA equivalence)

**Q4) Mealy machine output representation:**
**Answer: (b) Op(t) = δ(Op(t), i(t))** — Mealy machine output depends on *both* the current state and the current input symbol (unlike Moore, which depends on state alone).

**Q5) Transitions that occur without consuming any input symbol are called:**
**Answer: (c) ε-transitions & λ-transitions** — Both terms are used interchangeably in different textbooks for the same concept (NFA-ε).

**Q6) The behaviour of an NFA can be simulated by a DFA:**
**Answer: (c) Always** — By the subset construction, every NFA has an equivalent DFA.

---

## Set 13 (Ambiguity, Regular Set Closure, Regularity Conditions)

**Q14) For productions E→E+E|E−E|E*E|(E)|id, this grammar is said to:**
**Answer: (b) Generate an ambiguous language but not inherently so** — The grammar itself is ambiguous (no precedence/associativity rules), but the *language* of arithmetic expressions can also be generated by an equivalent unambiguous grammar (with precedence levels) — so the language is **not inherently ambiguous**.

**Q15) Let R1, R2 be regular sets over the same alphabet, then:**
**Answer: (c) Σ* − R1 is regular** — Regular languages are closed under complementation (also under union, intersection, and Kleene star — so the other negative-sounding options are false).

**Q16) Let L ⊆ Σ* where Σ = {a,b}, which is true?**
**Answer: (d) L = {aᵐbⁿ | m≥1, n≥1} is regular** — This is simply a⁺b⁺, expressible by regex `aa*bb*`. (Equal-count and aⁿbⁿ languages are classic non-regular examples — they require a CFG, not a DFA.)

---

## Set 14 (Finite Languages, Automaton vs Grammar, FSM Limits)

**Q24) The language {0ⁿ1ⁿ2ⁿ | 1 ≤ n ≤ 10⁶} is:**
Since n is bounded between 1 and 10⁶, this is a **finite** set of strings (not infinitely many) — and every finite language is regular.
**Answer: (a) Regular**

**Q25) An automaton is a ___ device and a grammar is a ___ device:**
Conceptually: an **automaton is an acceptor/recognizer**, while a **grammar is a generative device**. Among the listed choices this corresponds to the option pairing "acceptor" with the automaton and "generative" with the grammar.

**Q26) Basic limitation of FSM:**
**Answer: (a) cannot remember an arbitrarily large amount of information** — FSMs have finite memory (states only), so they can't count unboundedly (this is why aⁿbⁿ isn't regular).

**Q27) The operation of a grammar can be defined in terms of:**
**Answer: (b) relations on strings** — A grammar's productions define a derivation relation (⇒) between strings.

---

## Set 15 (Grammar Classification, Regex Equivalence)

**Q28) A ___ is a grammar in which the LHS of each production has only a single non-terminal symbol:**
**Answer: (c) context-free grammar** — By definition, CFG productions are A → α where A is a single non-terminal.

**Q29) Which statement is FALSE?**
**Answer: (d) Both (b) and (c)** — (b) "A context-free language is also a regular language" is false in general (e.g., aⁿbⁿ is CFL but not regular); (c) "All context-free grammars are ambiguous" is also false (many CFGs are unambiguous).

**Q30) Which pair of regular expressions are NOT equivalent?**
**Answer: (d) None of the above** — (a* + b*)* and (a+b)* are equivalent (both denote Σ*), and (ab)*a and a(ba)* are also a classic equivalent pair — so none of the listed pairs are actually inequivalent.

---

## Set 16 (Mealy/Moore Comparison)

**Q6) A DFA is a simple:**
**Answer: (b) language recognition device**

**Q7) ___ means there's potentially more than one way a machine may process an input string:**
**Answer: (a) Non-deterministic finite automata**

**Q8) All notation in a Mealy machine is equal to a Moore machine, with only the difference of:**
**Answer: (a) output function** — Mealy's output is a function of (state, input); Moore's output is a function of state alone.

**Q9) If input string w has n symbols, recognized by Mealy machine M1 and equivalent Moore machine M2, the number of output symbols produced by M1 and M2 respectively is:**
**Answer: (c) n, n+1** — A Mealy machine produces one output per transition (n outputs for n inputs). A Moore machine produces one output per state visited, including the initial state before any input is read (n+1 outputs).

**Q10) For input null (empty string), the output produced by a Mealy machine is:**
**Answer: (a) null** — With no input symbols, no transitions fire, so no output is produced (unlike Moore, which would still output the initial state's symbol).

**Q11) DFA M with start state A, accepting state D — which regex denotes the language of M?**
Based on the chain structure A→(1)→B→(1)→C→(0)→D with self-loops on 0 at A and B:
**Answer: (c) (0|1)*011** — this is the standard pattern for "strings ending in 011," matching a 4-state chain automaton of this shape.

**Q12) If A = (01+1)* and B = ((01)*1*)*, then:**
**Answer: (d) A = B** — Both expressions, despite looking different, generate the identical language (a classic regex-equivalence exercise).

**Q13) Regular expression (a|b)(a|b) denotes:**
**Answer: (d) {aa, ab, ba, bb}** — concatenating two single-character choices from {a,b} gives all 4 two-character strings.

---

## Note on Q7 (DFA diagram — "Identify what will NOT be accepted")
This question depends on reading exact transition arrows/labels in your hand-drawn diagram (initial state, final state, and a "dumping"/trap state). From the layout described (trap state reachable on certain symbols, with the final state only reachable via specific paths), the strings that lead into the **dumping/trap state** are the ones **not accepted**. If you can confirm the exact transition labels on each arrow, I can pin down the precise answer choice with full derivation.
