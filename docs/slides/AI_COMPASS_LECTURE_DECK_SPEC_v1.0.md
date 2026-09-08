# AI Compass Lecture Deck Spec v1.0

Status: **IMPLEMENTATION BASELINE**

## Primary deck

Audience:
- teachers
- university professors / lecturers
- high-school learners with sufficient background

Duration:
- 60–90 minutes

Purpose:
- teach the core manuscript as a coherent story
- not reproduce every paragraph
- give the audience a reusable mental model

## Learning outcomes

By the end, participants should be able to:
1. distinguish Model / Product / Agent
2. use Purpose & Stakes before technical analysis
3. read the Capability Stack
4. explain why Control Plane is cross-cutting
5. identify Context trust-boundary risks
6. distinguish model output from tool execution
7. distinguish automation from autonomy and classify basic L0–L4 cases
8. use reversibility to reason about controls
9. analyze the three anchor cases
10. apply the six Compass questions to an unfamiliar AI system

## Recommended slide flow

### Opening: Why another AI framework? (1–4)
1. Title
2. "What are you actually using when you use AI?"
3. AI is not one thing
4. Six Compass questions

### System map (5–9)
5. Model vs Product vs Agent
6. AI System assembly diagram
7. Purpose & Stakes first
8. Capability Stack
9. Control Plane crossing all layers

### MODEL (10–13)
10. Training vs inference
11. Why hallucination happens
12. Bias has multiple sources
13. Model takeaway + checkpoint

### CONTEXT (14–18)
14. Context as working space
15. Information enters through several channels
16. Instruction hierarchy vs trust boundary
17. Hidden white-text case
18. Grounded does not mean guaranteed true

### ACTION / TOOLS (19–23)
19. Model requests; runtime executes
20. Tool connection creates real-world reach
21. Permission and least privilege
22. Confused Deputy
23. Sandbox = blast-radius reduction

### AUTONOMY (24–29)
24. Automation vs autonomy
25. Agent loop
26. L0–L4 overview
27. L3 vs L4
28. Trigger is separate
29. Fixed 09:00 message counterexample

### CONTROL PLANE (30–34)
30. Control elements
31. HITL is not automatically safe
32. Automation Bias + Approval Fatigue
33. Reversibility traffic light
34. Cross-layer combinations

### CASE LAB (35–38)
35. Case A: hidden instruction
36. Case B: hallucinated record
37. Case C: drive agent
38. Compare all three

### Transfer (39–42)
39. Analysis Canvas concept
40. New unfamiliar AI system challenge
41. Six questions again
42. Closing: a compass, not a product map

## Visual language

- 16:9
- dark navy / white / restrained cyan accent
- large Korean typography
- use diagrams more than paragraphs
- one main message per slide
- repeated visual spine for Model / Context / Action / Autonomy / Control
- cases use consistent cards
- traffic-light slide uses color + labels/symbols, never color alone

## Presenter notes

Each slide should include short speaker notes:
- intended message
- common misconception
- optional example

## Derivative decks later

- 30-minute condensed: ~20 slides
- high-school learner deck: ~30 slides + activities
- workshop deck: ~25 slides + case-card pauses
