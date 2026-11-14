import os
p = os.path.join(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'), 'join.html')
s = open(p, encoding='utf-8').read()


def rep(old, new, count=1):
    global s
    n = s.count(old)
    assert n == count, (n, old[:90])
    s = s.replace(old, new)


def rep_between(start, end, new):
    global s
    assert s.count(start) >= 1, ('start', start[:90])
    i = s.index(start)
    j = s.index(end, i)
    s = s[:i] + new + s[j:]


# ---- head
rep('<script src="./support.js"></script>\n<title>Whistleblower Lab — Join</title>',
    '<script src="./cms.js"></script>\n<script src="./support.js"></script>\n<title>Whistleblower Lab — Join</title>\n'
    '<meta name="description" content="Join Whistleblower, a student-run ASIC / FPGA verification lab: take a block, get a mentor and bench time, and sign it off in one term.">\n'
    '<link rel="preconnect" href="https://7h6avsoz.apicdn.sanity.io" crossorigin="">')
rep('  @keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }\n</style>',
    '  @keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }\n  .cms-cursor { animation: blink 1s steps(1) infinite; }\n</style>')

# ---- header
rep('<div style="font-size: 12px; letter-spacing: 0.3em; color: #00D9FF; margin-bottom: 18px;">▚▚ 07 / OPEN POSITIONS ▞▞</div>',
    '<div style="font-size: 12px; letter-spacing: 0.3em; color: #00D9FF; margin-bottom: 18px;">{{ kicker }}</div>')
rep('color: #D7E0E6; line-height: 1.05;">TAKE A BLOCK.<br />SIGN IT OFF.</h1>',
    'color: #D7E0E6; line-height: 1.05; white-space: pre-line;">{{ title }}</h1>')
rep_between('        <p style="max-width: 62ch; font-size: 14px; line-height: 1.9; color: #A8B3BD; margin: 0 0 14px;">',
            '      </div>\n      <div style="border: 1px solid #39FF88; font-size: 12px;">',
            '''        <sc-for list="{{ intro }}" as="p">
        <p style="max-width: 62ch; font-size: 14px; line-height: 1.9; color: {{ p.color }}; margin: {{ p.margin }};">{{ p.text }}</p>
        </sc-for>
''')

# ---- intake panel
rep('<span>INTAKE</span><span>OPEN</span></div>', '<span>INTAKE</span><span>{{ intake.status }}</span></div>')
rep_between('          <div style="display: flex; justify-content: space-between; gap: 12px;"><span style="color: #D7E0E6;">DV ENGINEER',
            '          <div style="height: 1px; background: #66727D;"></div>',
            '''          <sc-for list="{{ positions }}" as="q">
          <div style="display: flex; justify-content: space-between; gap: 12px;"><span style="color: #D7E0E6;">{{ q.role }}</span><span style="color: #39FF88;">{{ q.slots }}</span></div>
          </sc-for>
''')
rep('<div style="color: #7AAE91; line-height: 1.8;">Rolling review. Applications close when the slots fill.</div>',
    '<div style="color: #7AAE91; line-height: 1.8;">{{ intake.note }}</div>')
rep('<span style="animation: blink 1.1s step-end infinite; color: #39FF88;">█</span>NEXT REVIEW: MONDAY</div>',
    '<span style="animation: blink 1.1s step-end infinite; color: #39FF88;">█</span>{{ intake.next }}</div>')

# ---- how to apply
rep('letter-spacing: 0.18em; color: #D7E0E6;">HOW TO APPLY</span>',
    'letter-spacing: 0.18em; color: #D7E0E6;">{{ stepsHeading }}</span>')
rep_between('      <div style="border: 1px solid #163D2A; padding: 20px 18px; display: grid; gap: 11px; align-content: start;">\n        <div style="font-size: 11px; letter-spacing: 0.18em; color: #66727D;">STEP 1</div>',
            '    </div>\n  </section>\n\n  <section data-screen-label="Expectations"',
            '''      <sc-for list="{{ steps }}" as="t">
      <div style="border: 1px solid #163D2A; padding: 20px 18px; display: grid; gap: 11px; align-content: start;">
        <div style="font-size: 11px; letter-spacing: 0.18em; color: #66727D;">{{ t.label }}</div>
        <div style="font-size: 14.5px; font-weight: 700; color: #D7E0E6; letter-spacing: 0.06em;">{{ t.value }}</div>
        <p style="margin: 0; font-size: 13px; line-height: 1.85; color: #A8B3BD;">{{ t.detail }}</p>
        <sc-if value="{{ t.link }}">
        <a href="{{ t.link.href }}" style="font-size: 12.5px; letter-spacing: 0.12em;">{{ t.link.label }}</a>
        </sc-if>
      </div>
      </sc-for>
''')

# ---- expectations
rep('<div style="padding: 6px 14px; background: #182027; color: #39FF88; font-size: 11.5px; letter-spacing: 0.14em;">WHAT YOU GET</div>',
    '<div style="padding: 6px 14px; background: #182027; color: #39FF88; font-size: 11.5px; letter-spacing: 0.14em;">{{ get.heading }}</div>')
rep_between('          <div><span style="color: #39FF88;">▸ </span>Bench time',
            '        </div>\n      </div>\n      <div style="border: 1px solid #163D2A;">',
            '''          <sc-for list="{{ get.items }}" as="x">
          <div><span style="color: #39FF88;">▸ </span>{{ x }}</div>
          </sc-for>
''')
rep('<div style="padding: 6px 14px; background: #182027; color: #39FF88; font-size: 11.5px; letter-spacing: 0.14em;">WHAT WE EXPECT</div>',
    '<div style="padding: 6px 14px; background: #182027; color: #39FF88; font-size: 11.5px; letter-spacing: 0.14em;">{{ expect.heading }}</div>')
rep_between('          <div><span style="color: #39FF88;">▸ </span>Six to eight',
            '        </div>\n      </div>\n    </div>\n  </section>\n\n  <section data-screen-label="Plate"',
            '''          <sc-for list="{{ expect.items }}" as="x">
          <div><span style="color: #39FF88;">▸ </span>{{ x }}</div>
          </sc-for>
''')

# ---- warden plate
rep('<span style="color: #D7E0E6;">PLATE I ── THE WARDEN</span>\n        <span>ASCII · LUMINANCE RAMP .,:;+*?%S</span>',
    '<span style="color: #D7E0E6;">{{ warden.kicker }}</span>\n        <span>{{ warden.caption }}</span>')
rep('<div style="font-size: 11px; letter-spacing: 0.24em; color: #66727D;">PROTECTOR OF THE PIPELINE</div>',
    '<div style="font-size: 11px; letter-spacing: 0.24em; color: #66727D;">{{ warden.subtitle }}</div>')
rep('line-height: 1.1;">THE WARDEN</div>', 'line-height: 1.1;">{{ warden.heading }}</div>')
rep_between('          <p style="margin: 0; font-size: 13.5px; line-height: 1.95; color: #A8B3BD; max-width: 56ch;">He stands',
            '        </div>\n      </div>\n      <div style="display: flex; justify-content: space-between; gap: 16px; padding: 7px 14px; border-top',
            '''          <sc-for list="{{ warden.paras }}" as="p">
          <p style="margin: 0; font-size: 13.5px; line-height: 1.95; color: #A8B3BD; max-width: 56ch;">{{ p }}</p>
          </sc-for>
          <div style="display: flex; flex-wrap: wrap; gap: 10px 24px; font-size: 11px; letter-spacing: 0.14em; color: #66727D; padding-top: 4px;">
            <sc-for list="{{ warden.mottos }}" as="m"><span>{{ m }}</span></sc-for>
          </div>
''')
rep('        <span>NO BLOCK SHIPS UNSIGNED</span>\n        <span style="color: #7AAE91;">GUARDIAN OF THE PIPELINE</span>',
    '        <span>{{ warden.footerLeft }}</span>\n        <span style="color: #7AAE91;">{{ warden.footerRight }}</span>')

# ---- contact block
rep_between('          <div><span style="color: #66727D;">MAIL ▸ </span><a href="mailto:lab@whistleblower.dev">lab@whistleblower.dev</a></div>\n          <div><span style="color: #66727D;">GHUB',
            '        </div>\n      </div>\n      <div style="padding: 28px 24px; display: grid; gap: 14px; align-content: start;">',
            '''          <div><span style="color: #66727D;">MAIL ▸ </span><a href="mailto:{{ site.email }}">{{ site.email }}</a></div>
          <sc-if value="{{ site.github }}">
          <div><span style="color: #66727D;">GHUB ▸ </span><a href="{{ site.github }}" target="_blank" rel="noopener">{{ site.githubLabel }}</a></div>
          </sc-if>
          <sc-if value="{{ site.location }}">
          <div><span style="color: #66727D;">LOCN ▸ </span><span style="color: #D7E0E6;">{{ site.location }}</span></div>
          </sc-if>
          <sc-if value="{{ site.hours }}">
          <div><span style="color: #66727D;">HOURS ▸ </span><span style="color: #D7E0E6;">{{ site.hours }}</span></div>
          </sc-if>
''')
rep('<div style="font-size: 12px; letter-spacing: 0.18em; color: #66727D;">NOT A STUDENT?</div>',
    '<div style="font-size: 12px; letter-spacing: 0.18em; color: #66727D;">{{ collab.heading }}</div>')
rep('max-width: 46ch;">We take collaborators, tool donations and sponsored blocks. A licence seat or a spare board changes what a whole intake can do.</p>',
    'max-width: 46ch;">{{ collab.body }}</p>')
rep('        <a href="mailto:lab@whistleblower.dev" style="justify-self: start; border: 1px solid #39FF88; padding: 11px 20px; font-size: 13px; letter-spacing: 0.16em; font-weight: 700;">[ ▸ TALK TO US ]</a>',
    '        <sc-for list="{{ collab.links }}" as="l"><a href="{{ l.href }}" style="justify-self: start; border: 1px solid #39FF88; padding: 11px 20px; font-size: 13px; letter-spacing: 0.16em; font-weight: 700;">{{ l.label }}</a></sc-for>')

# ---- footer
rep('<div style="color: #A8B3BD; line-height: 1.8; max-width: 30ch;">Student-run ASIC / FPGA hardware verification lab.</div>',
    '<div style="color: #A8B3BD; line-height: 1.8; max-width: 30ch;">{{ site.footerBlurb }}</div>')
rep('<div><span style="color: #66727D;">MAIL ▸ </span><a href="mailto:lab@whistleblower.dev">lab@whistleblower.dev</a></div>',
    '<div><span style="color: #66727D;">MAIL ▸ </span><a href="mailto:{{ site.email }}">{{ site.email }}</a></div>')

assert 'lab@whistleblower.dev' not in s.split('</x-dc>')[0], 'hard-coded email left in template'
assert 'STEP 2' not in s and 'Six to eight' not in s and 'He stands' not in s
open(p, 'w', encoding='utf-8', newline='\n').write(s)
print('template ok')
