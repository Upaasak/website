// Everything the site showed before the CMS, copied word-for-word from the HTML.
// `scripts/migrate.ts` loads it into Sanity. Image paths are relative to the site root.

type Row = {label?: string; value?: string; detail?: string; accent?: string}
type Section = {key: string; kicker?: string; heading?: string; body?: string; items?: Row[]; links?: {label: string; href: string}[]}

const rows = (pairs: [string, string, string?][]): Row[] =>
  pairs.map(([label, value, detail]) => ({label, value, ...(detail ? {detail} : {})}))

const WARDEN: Section = {
  key: 'warden',
  kicker: 'PLATE I ── THE WARDEN',
  heading: 'THE WARDEN',
  body: [
    'He stands at the end of the pipeline and nothing gets past him unsigned. Not a block, not a bitstream, not a waiver somebody talked themselves into late on a Friday. If it has not been verified, it does not ship, and the person who wrote it is the one who has to say so out loud.',
    'Timing closure has a price, and it is always paid in something you liked. A stage you were proud of gets retimed. A clever optimisation comes out because it cannot be proven. A constraint file gets read for the fourth time at midnight, and the fourth reading is the one that finds it.',
    'We keep the plate on the wall because that price is the actual work. Everything else is waiting for a run to finish.',
  ].join('\n\n'),
  items: rows([
    ['subtitle', 'PROTECTOR OF THE PIPELINE'],
    ['caption', 'ASCII · LUMINANCE RAMP .,:;+*?%S'],
    ['motto', '▚ NO BLOCK SHIPS UNSIGNED'],
    ['motto', '▚ THE PRICE OF TIMING CLOSURE'],
    ['footer-left', 'NO BLOCK SHIPS UNSIGNED'],
    ['footer-right', 'GUARDIAN OF THE PIPELINE'],
  ]),
}

export const siteSettings = {
  labName: 'WHISTLEBLOWER',
  tagline: 'ASIC · FPGA · DV',
  footerBlurb: 'Student-run ASIC / FPGA hardware verification lab.',
  intakeOpen: true,
  email: 'lab@whistleblower.dev',
  github: 'https://github.com/whistleblower-lab',
  location: '[ BUILDING · ROOM ]',
  hours: 'Wed 18:00 — open bench',
  statusPanel: rows([
    ['FOUNDED', '2026'],
    ['MEMBERS', '7 ACTIVE'],
    ['TARGETS', 'ARTIX-7 · ZYNQ · SKY130'],
    ['LANGUAGES', 'SV · VHDL · PYTHON'],
    ['BENCHES', '2 · SHARED'],
  ]),
  statusNote: 'Open to collaborators, tool donations and sponsored blocks.',
  tracks: rows([
    ['TRACK A', 'VERIFY', "Testbenches, coverage closure, assertions. UVM where it earns its keep, cocotb where it doesn't. Every block ships with a signed-off report."],
    ['TRACK B', 'BUILD', 'RTL for instrumentation and DSP — filters, transforms, CORDIC, control. Synthesised, placed, timed on hardware we can actually put a probe on.'],
    ['TRACK C', 'SHARE', 'Licences, boards and flows are expensive. Ours are pooled, documented and open to any member — plus the notes that make them usable.'],
  ]),
}

export const pages: Record<string, {kicker?: string; title?: string; intro?: string; sections?: Section[]}> = {
  home: {
    kicker: 'ASIC / FPGA HARDWARE VERIFICATION COLLECTIVE',
    intro: [
      'A student-run lab for ASIC and FPGA hardware verification. We exist because the tools, the boards and the mentorship are hard to get to alone — so we pool them, run real RTL through real flows, and publish everything we learn.',
      'No coursework. No spectators. You take a block, you verify it, you sign it off.',
    ].join('\n\n'),
    sections: [
      {key: 'hero', kicker: 'MARK ── FIVE STAGES OF STANDING UP', heading: 'INK · FIVE FRAMES'},
      {key: 'cta', links: [{label: '[ ▸ SEE THE WORK ]', href: 'projects.html'}, {label: '[ ▸ JOIN THE LAB ]', href: 'join.html'}]},
      {key: 'projects-more', heading: '+ 6 MORE BLOCKS IN THE QUEUE'},
      WARDEN,
      {
        key: 'join',
        kicker: 'OPEN POSITIONS',
        heading: 'JOIN THE LAB',
        body: 'Undergrads and postgrads, any department. Bring a block you want to verify or pick one from the queue. No prior tapeout required — that is the point.',
      },
    ],
  },
  research: {
    kicker: '▚▚ 02 / RESEARCH ▞▞',
    title: 'SIX THINGS\nWE ARE TRYING\nTO GET GOOD AT',
    intro: 'Areas, not departments. Every member works in at least two of them, and every area has to produce something a stranger can reproduce: a testbench, a report, a bitstream, a writeup.',
    sections: [{key: 'cta', heading: 'Want one of these areas to be yours?', links: [{label: '[ ▸ JOIN THE LAB ]', href: 'join.html'}]}],
  },
  projects: {
    kicker: '▚▚ 03 / PROJECTS ▞▞',
    title: 'BLOCKS IN FLIGHT',
    intro: 'One entry per block, from proposal to signoff. Nothing is listed here until there is RTL and a testbench in the repository — proposals sit in the queue below until somebody owns them.',
    sections: [
      {key: 'queue', heading: 'QUEUE', kicker: 'UNCLAIMED', body: 'Proposed blocks with a written spec and no owner. Claim one when you join — you get the spec, a mentor and bench time.'},
      {key: 'cta', heading: 'Bringing your own block is also allowed.', links: [{label: '[ ▸ CLAIM A BLOCK ]', href: 'join.html'}]},
    ],
  },
  people: {
    kicker: '▚▚ 04 / PEOPLE ▞▞',
    title: 'WHO SIGNS OFF',
    intro: 'Seven active members and one advisor. No hierarchy beyond who owns which block: every block has exactly one owner and one reviewer, and the two are never the same person.',
    sections: [
      {key: 'notice', body: 'PLACEHOLDER ROSTER — send names, roles and handles and they go straight in.'},
      {key: 'alumni', heading: 'ALUMNI', body: 'Alumni still review blocks on request. It is the cheapest mentorship we have.'},
    ],
  },
  publications: {
    kicker: '▚▚ 05 / PUBLICATIONS ▞▞',
    title: 'WHAT WE PUBLISH',
    intro: 'Our first paper is out. Alongside it we publish every signoff report, constraint file and failed run from the blocks we finish — published as written, not cleaned up afterwards.',
    sections: [
      {key: 'reports', heading: 'LAB REPORTS'},
      {key: 'papers', heading: 'PEER-REVIEWED'},
      {key: 'cta', heading: 'Want the raw reports, seeds or waveforms? Ask.', links: [{label: '[ ▸ REQUEST ARTEFACTS ]', href: 'mailto:lab@whistleblower.dev'}]},
    ],
  },
  news: {
    kicker: '▚▚ 06 / NEWS ▞▞',
    title: 'LAB LOG',
    intro: 'Newest first. Closures, failures, intakes and hardware. If it changed what the lab can do, it goes in the log.',
    sections: [{key: 'notice', body: 'SAMPLE ENTRIES — send the real log and these get replaced.'}],
  },
  join: {
    kicker: '▚▚ 07 / OPEN POSITIONS ▞▞',
    title: 'TAKE A BLOCK.\nSIGN IT OFF.',
    intro: [
      'Undergraduates and postgraduates, any department. You need curiosity and a term of time; you do not need a tapeout, a licence or prior lab experience. That is what the lab is for.',
      'Six slots this intake. One block each, one mentor each, one signoff at the end.',
    ].join('\n\n'),
    sections: [
      {key: 'intake', heading: 'OPEN', body: 'Rolling review. Applications close when the slots fill.', kicker: 'NEXT REVIEW: MONDAY'},
      {
        key: 'steps',
        heading: 'HOW TO APPLY',
        items: [
          {label: 'STEP 1', value: 'PICK A BLOCK', detail: 'Take one from the queue, or bring your own with a paragraph of spec.'},
          {label: 'STEP 2', value: 'MAIL US', detail: 'CV, the block you want, and one paragraph on why. No cover letter, no forms.'},
          {label: 'STEP 3', value: 'SIT A REVIEW', detail: 'Forty minutes with two members. We read code together; nobody quizzes you on trivia.'},
          {label: 'STEP 4', value: 'GET BENCH TIME', detail: 'Repository access, a booking slot, a mentor and the review checklist. Then it is on you.'},
        ],
      },
      {
        key: 'get',
        heading: 'WHAT YOU GET',
        items: [
          {value: 'Bench time on Artix-7 and Zynq hardware, booked not begged.'},
          {value: 'A reviewer who reads your code line by line.'},
          {value: 'Tool access and the scripts that make the flows reproducible.'},
          {value: 'A signed-off block with your name on the report.'},
        ],
      },
      {
        key: 'expect',
        heading: 'WHAT WE EXPECT',
        items: [
          {value: 'Six to eight hours a week, honestly counted.'},
          {value: "You review somebody else's block as well as your own."},
          {value: 'Failures written up, not quietly deleted.'},
          {value: 'Everything in the repository, nothing on your laptop only.'},
        ],
      },
      {...WARDEN, body: WARDEN.body!.split('\n\n').slice(0, 2).join('\n\n')},
      {
        key: 'collaborate',
        heading: 'NOT A STUDENT?',
        body: 'We take collaborators, tool donations and sponsored blocks. A licence seat or a spare board changes what a whole intake can do.',
        links: [{label: '[ ▸ TALK TO US ]', href: 'mailto:lab@whistleblower.dev'}],
      },
    ],
  },
}

export const researchAreas = [
  {code: 'R1', title: 'FUNCTIONAL VERIFICATION', status: 'PRIMARY', sideLabel: 'TOOLING', sideItems: ['SystemVerilog · UVM', 'cocotb · Verilator', 'SVA · formal (open flows)'],
    description: 'Constrained-random and coverage-driven testbenches for blocks nobody has verified before. We care about the boring part: reproducible seeds, coverage that means something, and a signoff document that survives a hostile reader.'},
  {code: 'R2', title: 'DSP FOR INSTRUMENTATION', status: 'ACTIVE', sideLabel: 'SEE ALSO', sideItems: [], related: [{label: 'ipdft_channel_top ▸', href: 'project-ipdft.html'}],
    description: 'Transforms and estimators that have to run in real time on a mid-range part: interpolated DFT, CORDIC magnitude and phase, rate-of-change estimation, decimation chains. Fixed point, error budgets written down before the RTL.'},
  {code: 'R3', title: 'TIMING & PHYSICAL CLOSURE', status: 'ACTIVE', sideLabel: 'TOOLING', sideItems: ['Vivado · OpenSTA', 'OpenROAD · OpenLane'],
    description: 'Why the design missed by 180 ps, and what to do about it. Constraint hygiene, clock-domain crossings, retiming, floorplanning on FPGA and on open PDKs. Every closure is written up as a before/after with the actual reports attached.'},
  {code: 'R4', title: 'OPEN-SOURCE SILICON', status: 'EXPLORATORY', sideLabel: 'TARGET', sideItems: ['SKY130 · 130 nm', 'no tapeout yet'],
    description: 'Sky130 and open flows are the only route to real physical design for a lab with no licence budget. We push small blocks through GDS to learn where the flow lies to you, and publish the failures too.'},
  {code: 'R5', title: 'BRINGUP & LAB INFRASTRUCTURE', status: 'ONGOING', sideLabel: 'BENCH', sideItems: ['ARTIX-7 · ZYNQ-7020', 'SCOPE · LOGIC ANALYSER'],
    description: 'Two benches, shared boards, one JTAG server, regression running on whatever machine is free. Access is the resource we are actually pooling, so the scripts that manage it are treated as first-class work.'},
  {code: 'R6', title: 'VERIFICATION PEDAGOGY', status: 'ONGOING', sideLabel: 'OUTPUT', sideItems: ['INTAKE CURRICULUM', 'REVIEW CHECKLISTS'],
    description: 'How do you take somebody from a first Verilog module to signing off a block in one term? We keep the curriculum, the exercises and the review checklists in the open, and revise them every intake.'},
]

// slug → existing hand-built page (the 8 case files keep their own design)
export const projects = [
  {slug: 'neuromorphic', code: 'PRJ_01', stage: 'RTL', title: 'NEUROMORPHIC SPIKING NETWORK', tags: 'RTL · SNN · EVENT-DRIVEN', image: 'assets/cards/neuromorphic.jpg', featured: true,
    short: 'LIF neuron array with event-driven routing. Spikes, not tensors.',
    summary: 'A digital array of leaky integrate-and-fire neurons with event-driven routing between them. Spikes instead of tensors, so there are no multipliers in the datapath and the whole power argument rests on how sparse the traffic really is.'},
  {slug: 'sentinel', code: 'PRJ_02', stage: 'SPEC', title: 'SENTINEL', tags: 'SPEC IN PROGRESS', image: 'assets/cards/sentinel.jpg', featured: true, design: 'sentinel',
    short: 'Spec in progress.',
    summary: 'Software-defined autonomous mission vehicle. FPGA-native deterministic edge compute, formal safety, 3-tier HIL digital twin.'},
  {slug: 'tcpip', code: 'PRJ_03', stage: 'RTL', title: 'TCP/IP IN FPGA', tags: 'RTL · GbE · NO SOFT CORE', image: 'assets/cards/tcpip.png', featured: true, design: 'tcpip',
    short: 'The whole stack in fabric, no soft core in the data path.',
    summary: 'The stack in fabric: MAC interface, ARP, IPv4 and a TCP state machine with retransmission, all in hardware with no soft core in the data path. It either holds line rate on a gigabit PHY or it does not count.'},
  {slug: 'systolic', code: 'PRJ_04', stage: 'SPEC', title: 'SYSTOLIC ARRAY NEURAL NETWORK', tags: 'RTL · INT8 · GEMM', image: 'assets/cards/systolic.jpg',
    summary: 'A weight-stationary grid of int8 MAC cells with tiled GEMM scheduling and a double-buffered activation store. The interesting engineering is the memory schedule; the multipliers are the easy part.'},
  {slug: 'pqc', code: 'PRJ_05', stage: 'SPEC', title: 'POST-QUANTUM CRYPTO IN FPGA', tags: 'RTL · PQC · LATTICE', image: 'assets/cards/pqc.jpg', featured: true, design: 'pqc',
    short: 'Lattice arithmetic and NTT butterflies, constant-time by construction.',
    summary: 'Hardware for the algorithms that outlive RSA: lattice arithmetic, NTT butterflies, constant-time control and a sampler that does not leak through timing. The threat model is a machine that does not exist yet, which makes the constant-time argument the whole project.'},
  {slug: 'power', code: 'PRJ_06', stage: 'IN VERIFICATION', title: 'POWER SYSTEM PROTOCOLS', tags: 'VERILOG · ARTIX-7 · CORDIC · 6 CH', image: 'assets/cards/power.jpg', design: 'power',
    summary: 'Instrumentation for the grid: a six-channel interpolated-DFT front end with CORDIC magnitude and phase and ROCOF differentiation, wrapped in the reporting protocols a substation actually expects. No vendor IP anywhere in the chain.'},
  {slug: 'secondbrain', code: 'PRJ_07', stage: 'SPEC', title: 'SECOND BRAIN ALGORITHM', tags: 'SPEC IN PROGRESS', image: 'assets/cards/secondbrain.jpg', design: 'secondbrain',
    summary: '[ Send me a paragraph on the second brain algorithm and it goes here verbatim. ]'},
  {slug: 'bitstream-llm', code: 'PRJ_08', stage: 'SPEC', title: 'BITSTREAM LLM', tags: 'SPEC IN PROGRESS', image: 'assets/cards/bitstream-llm.jpg',
    summary: '[ Send me a paragraph on the bitstream LLM and it goes here verbatim. ]'},
  {slug: 'swarm', code: 'PRJ_09', stage: 'SPEC', title: 'DRONE CONTROL', tags: 'RTL · CONTROL · SENSOR FUSION', image: 'assets/cards/drone.jpg', design: 'swarm',
    summary: 'Attitude control in fabric instead of firmware: IMU fusion, a fixed-point rate loop and PWM generation with deterministic latency from sample to actuator. The argument for hardware here is jitter, not throughput.'},
  {slug: 'hft', code: 'PRJ_10', stage: 'SPEC', title: 'HFT FPGA ALGORITHMS', tags: 'RTL · LOW LATENCY · FEED PARSING', image: 'assets/cards/hft.jpg', design: 'hft',
    summary: 'Tick-to-trade in hardware: market-data feed parsing on the wire, an order book maintained in fabric and a decision path measured in nanoseconds. Every stage has to justify the cycle it costs.'},
  // Not on the Projects grid today, but it has a hand-built case file and is linked from Research and News.
  {slug: 'ipdft', code: 'PRJ_11', stage: 'IN VERIFICATION', title: 'ipdft_channel_top', tags: 'RTL · DSP · ARTIX-7', design: 'ipdft', hidden: true,
    summary: 'Interpolated-DFT channel with CORDIC magnitude and phase. Closes timing at 148 MHz on Artix-7.'},
]

export const queue = [
  {title: 'AXI4-LITE CSR', tag: 'DV · 1 OWNER', description: 'Register block generator plus a UVM agent that proves the generated map matches the spec.'},
  {title: 'CIC DECIMATOR', tag: 'RTL · 1 OWNER', description: 'Configurable-rate CIC with compensation FIR. Fixed-point error budget written before the RTL.'},
  {title: 'CDC AUDIT KIT', tag: 'DV · 2 OWNERS', description: 'Assertions and a lint pass that catch the clock-domain crossings our reviews keep missing.'},
  {title: 'SKY130 SRAM TILE', tag: 'PD · 1 OWNER', description: 'Small macro pushed through OpenLane to GDS, with the timing and DRC reports published as-is.'},
]

export const publications = [
  {category: 'report', date: '2026-08-01', title: 'ipdft_channel_top — interim verification report, revision C', kind: 'TECH REPORT · PDF', url: 'project-ipdft.html'},
  {category: 'report', date: '2026-07-01', title: 'Fixed-point error budget for a sliding-DFT front end', kind: 'NOTE · PDF', url: 'project-ipdft.html'},
  {category: 'report', date: '2026-06-01', title: 'Intake curriculum: zero to signed-off block in one term', kind: 'CURRICULUM', url: 'join.html'},
  {category: 'report', date: '2026-05-01', title: 'Review checklist for RTL and testbench signoff, v2', kind: 'CHECKLIST', url: 'research.html'},
  {category: 'paper', date: '2026-01-01', kind: 'PAPER · RESEARCHGATE',
    title: 'Sub-Microsecond Deterministic Neural Network Acceleration for Real-Time Power System Protection Using FPGA Systolic Arrays',
    url: 'https://www.researchgate.net/publication/413866718_Sub-Microsecond_Deterministic_Neural_Network_Acceleration_for_Real-Time_Power_System_Protection_Using_FPGA_Systolic_Arrays'},
]

export const posts = [
  {date: '2026-08-14', tag: 'TIMING', title: 'ipdft_channel_top closes timing at 148 MHz on Artix-7',
    body: 'Retiming the CORDIC output stage and moving the window multiplier to a DSP48 bought 620 ps of slack. Utilisation went up two points, which we will take. Reports are in the repository.',
    link: {label: 'CASE FILE ▸', href: 'project-ipdft.html'}},
  {date: '2026-07-30', tag: 'BENCH', title: 'Second bench online — shared JTAG and scope access',
    body: 'A donated Zynq-7020 board, a scope and a logic analyser now sit behind a booking script, so bringup no longer blocks on one person being in the room.'},
  {date: '2026-07-02', tag: 'INTAKE', type: 'announcement', title: 'Autumn intake open: three verification slots, two RTL slots',
    body: 'Applications by mail with a CV and one paragraph on a block you would like to verify. No prior tapeout, no coursework requirement, no interview panel.',
    link: {label: 'HOW TO APPLY ▸', href: 'join.html'}},
  {date: '2026-06-11', tag: 'DEFECT', title: 'DEF-014 opened: ROCOF overshoot on a 2 Hz/s step',
    body: 'Found by the golden-model comparison, not by a human reading waveforms, which is the whole argument for keeping the python model in the regression. Still open, still unassigned.'},
  {date: '2026-05-20', tag: 'LAB', title: 'Whistleblower starts with seven members and one board',
    body: 'Founded to pool the things a single student cannot get alone: a licence, a board, a reviewer. First block claimed the same week.'},
]

export const people = [
  {tag: 'LEAD', role: 'VERIFICATION LEAD', bio: 'Owns the review checklist and the intake curriculum. Reviewer of last resort.', areas: ['R1', 'R6']},
  {tag: 'RTL', role: 'RTL · DSP', bio: 'Owner of ipdft_channel_top. Fixed-point error budgets, CORDIC, decimation.', areas: ['R2', 'R3']},
  {tag: 'DV', role: 'DV · UVM', bio: 'Constrained-random environments and the regression that runs them overnight.', areas: ['R1']},
  {tag: 'DV', role: 'DV · FORMAL', bio: 'Assertions, CDC audits, and the argument about whether formal was worth it.', areas: ['R1', 'R3']},
  {tag: 'PD', role: 'PHYSICAL DESIGN', bio: 'OpenLane runs on Sky130, floorplans, and the reports nobody else wants to read.', areas: ['R3', 'R4']},
  {tag: 'FLOW', role: 'TOOLING · INFRA', bio: 'Bench scheduling, JTAG server, and every script that keeps the two boards busy.', areas: ['R5']},
  {tag: 'INTAKE', role: 'RTL · FIRST TERM', bio: 'Working through the intake curriculum. Claiming the CIC decimator next term.', areas: ['R2', 'R6']},
  {status: 'advisor', role: 'ADVISOR', bio: 'Signs the tool requests, argues with the constraint files, and does not write the RTL.'},
  {status: 'alumni', alumniNote: 'now DV at [ COMPANY ]'},
  {status: 'alumni', alumniNote: 'MSc, [ INSTITUTION ]'},
]

export const positions = [
  {role: 'DV ENGINEER (SV/UVM)', slots: '3 SLOTS'},
  {role: 'RTL DESIGN (DSP)', slots: '2 SLOTS'},
  {role: 'FLOW / TOOLING', slots: '1 SLOT'},
  {role: 'FACULTY ADVISOR', slots: 'FILLED', filled: true},
]
