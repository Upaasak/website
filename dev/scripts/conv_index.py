import os
p = os.path.join(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'), 'index.html')
s = open(p, encoding='utf-8').read()


def rep(old, new, count=1):
    global s
    n = s.count(old)
    assert n == count, (n, old[:90])
    s = s.replace(old, new)


def rep_between(start, end, new):
    """Replace from start marker (inclusive) to end marker (exclusive)."""
    global s
    assert s.count(start) >= 1, ('start', start[:90])
    i = s.index(start)
    j = s.index(end, i)
    s = s[:i] + new + s[j:]


# ---- head
rep('<script src="./support.js"></script>\n<title>Whistleblower Lab — Home</title>',
    '<script src="./cms.js"></script>\n<script src="./support.js"></script>\n<title>Whistleblower Lab — Home</title>\n'
    '<meta name="description" content="Whistleblower is a student-run lab for ASIC and FPGA hardware verification: we pool tools, boards and mentorship, run real RTL through real flows, and publish everything we learn.">\n'
    '<link rel="preconnect" href="https://7h6avsoz.apicdn.sanity.io" crossorigin="">')
rep('  @keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }\n</style>',
    '  @keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }\n  .cms-cursor { animation: blink 1s steps(1) infinite; }\n</style>')

# ---- hero labels
rep('<span style="color: #D7E0E6;">MARK ── FIVE STAGES OF STANDING UP</span>\n        <span>INK · FIVE FRAMES</span>',
    '<span style="color: #D7E0E6;">{{ hero.kicker }}</span>\n        <span>{{ hero.heading }}</span>')

# ---- intro kicker, paragraphs, CTAs
rep('<span style="color: #39FF88;">▶</span>ASIC / FPGA HARDWARE VERIFICATION COLLECTIVE',
    '<span style="color: #39FF88;">▶</span>{{ kicker }}')
rep_between('        <p style="max-width: 62ch; font-size: 14px; line-height: 1.9; color: #A8B3BD; margin: 0 0 16px;">',
            '      </div>\n\n      <div style="border: 1px solid #163D2A; font-size: 12px;">',
            '''        <sc-for list="{{ intro }}" as="p">
        <p style="max-width: 62ch; font-size: 14px; line-height: 1.9; color: {{ p.color }}; margin: {{ p.margin }};">{{ p.text }}</p>
        </sc-for>
        <div style="display: flex; gap: 14px; flex-wrap: wrap;">
          <sc-for list="{{ ctas }}" as="l"><a href="{{ l.href }}" style="{{ l.style }}">{{ l.label }}</a></sc-for>
        </div>
''')

# ---- LAB.STATUS panel
rep_between('          <div style="display: flex; justify-content: space-between; gap: 12px;"><span style="color: #7AAE91;">FOUNDED</span>',
            '        </div>\n      </div>\n    </div>\n  </section>\n\n  <section data-screen-label="What we do"',
            '''          <sc-for list="{{ status }}" as="r">
          <div style="display: flex; justify-content: space-between; gap: 12px;"><span style="color: #7AAE91;">{{ r.label }}</span><span style="color: #D7E0E6;">{{ r.value }}</span></div>
          </sc-for>
          <div style="height: 1px; background: #66727D;"></div>
          <div style="color: #7AAE91; line-height: 1.8;">{{ statusNote }}</div>
          <sc-if value="{{ intakeOpen }}">
          <div style="color: #D7E0E6; display: flex; align-items: center; gap: 9px; font-size: 13px;"><span style="animation: blink 1.1s step-end infinite; color: #39FF88;">█</span>INTAKE OPEN</div>
          </sc-if>
''')

# ---- tracks
rep_between('      <div style="border: 1px solid #163D2A; padding: 20px 18px; display: grid; gap: 12px; align-content: start;" style-hover="border-color: #39FF88;">\n        <div style="font-size: 11px; letter-spacing: 0.18em; color: #66727D;">TRACK A</div>',
            '    </div>\n  </section>\n\n  <section data-screen-label="Plate"',
            '''      <sc-for list="{{ tracks }}" as="t">
      <div style="border: 1px solid #163D2A; padding: 20px 18px; display: grid; gap: 12px; align-content: start;" style-hover="border-color: #39FF88;">
        <div style="font-size: 11px; letter-spacing: 0.18em; color: #66727D;">{{ t.label }}</div>
        <div style="font-size: 15px; font-weight: 700; letter-spacing: 0.1em; color: #D7E0E6;">{{ t.value }}</div>
        <p style="margin: 0; font-size: 13px; line-height: 1.85; color: #A8B3BD;">{{ t.detail }}</p>
      </div>
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
          <p style="margin: 0; font-size: 13.5px; line-height: 1.95; color: {{ p.color }}; max-width: 56ch;">{{ p.text }}</p>
          </sc-for>
          <div style="display: flex; flex-wrap: wrap; gap: 10px 24px; font-size: 11px; letter-spacing: 0.14em; color: #66727D; padding-top: 4px;">
            <sc-for list="{{ warden.mottos }}" as="m"><span style="white-space: nowrap;">{{ m }}</span></sc-for>
          </div>
''')
rep('        <span>NO BLOCK SHIPS UNSIGNED</span>\n        <span style="color: #7AAE91;">GUARDIAN OF THE PIPELINE</span>',
    '        <span>{{ warden.footerLeft }}</span>\n        <span style="color: #7AAE91;">{{ warden.footerRight }}</span>')

# ---- research teaser
rep_between('      <a href="research.html" style="display: grid; grid-template-columns: auto 1fr auto;',
            '    </div>\n  </section>\n\n  <section data-screen-label="Projects"',
            '''      <sc-for list="{{ areas }}" as="a">
      <a href="research.html" style="display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: baseline; padding: 11px 0; border-bottom: 1px solid #182027; color: #D7E0E6;"><span style="color: #66727D;">{{ a.code }}</span><span>{{ a.title }}</span><span style="color: #7AAE91;">▸</span></a>
      </sc-for>
''')

# ---- featured projects + "more" card
rep_between('\n      <a href="projects.html" style="border: 1px solid #163D2A; display: flex; flex-direction: column; color: #39FF88;"',
            '      <a href="projects.html" style="border: 1px dashed #163D2A;',
            '''
      <sc-for list="{{ featured }}" as="f">
      <a href="{{ f.href }}" style="border: 1px solid #163D2A; display: flex; flex-direction: column; color: #39FF88;" style-hover="border-color: #39FF88;">
        <div style="position: relative; height: 240px; background: #0B1014; overflow: hidden;">
          <img src="{{ f.img }}" alt="{{ f.alt }}" style="display: block; width: 100%; height: 100%; object-fit: contain;" />
          <div style="position: absolute; inset: 0; display: grid; gap: 10px; align-content: end; padding: 18px 16px; background: linear-gradient(to top, rgba(5,7,10,0.97) 0%, rgba(5,7,10,0.9) 60%, rgba(5,7,10,0.7) 100%); opacity: 0; transition: opacity 200ms;" style-hover="opacity: 1;">
            <div style="font-size: 14.5px; font-weight: 700; letter-spacing: 0.05em; color: #D7E0E6; line-height: 1.35;">{{ f.title }}</div>
            <div style="font-size: 10.5px; letter-spacing: 0.14em; color: #7AAE91;">{{ f.tags }}</div>
            <p style="margin: 0; font-size: 12.5px; line-height: 1.8; color: #A8B3BD;">{{ f.summary }}</p>
            <div style="font-size: 11px; letter-spacing: 0.14em; color: #39FF88;">OPEN ▸</div>
          </div>
        </div>
      </a>
      </sc-for>

''')
rep('<div style="font-size: 13px; letter-spacing: 0.14em; color: #7AAE91;">+ 6 MORE BLOCKS IN THE QUEUE</div>',
    '<div style="font-size: 13px; letter-spacing: 0.14em; color: #7AAE91;">{{ moreBlocks }}</div>')

# ---- news teaser
rep_between('      <a href="news.html" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) auto;',
            '    </div>\n  </section>\n\n  <section data-screen-label="Join"',
            '''      <sc-for list="{{ news }}" as="n">
      <a href="news.html" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) auto; gap: 20px; align-items: baseline; padding: 15px 4px; border-bottom: 1px solid #182027; color: #D7E0E6; font-size: 13.5px;"><span style="color: #66727D; font-size: 12px;">{{ n.date }}</span><span>{{ n.title }}</span><span style="color: #7AAE91;">▸</span></a>
      </sc-for>
''')

# ---- join panel
rep('<div style="font-size: 12px; letter-spacing: 0.18em; color: #66727D; margin-bottom: 14px;">OPEN POSITIONS</div>',
    '<div style="font-size: 12px; letter-spacing: 0.18em; color: #66727D; margin-bottom: 14px;">{{ join.kicker }}</div>')
rep('<div style="font-size: 26px; font-weight: 700; letter-spacing: 0.06em; color: #D7E0E6; margin-bottom: 16px;">JOIN THE LAB</div>',
    '<div style="font-size: 26px; font-weight: 700; letter-spacing: 0.06em; color: #D7E0E6; margin-bottom: 16px;">{{ join.heading }}</div>')
rep('max-width: 50ch;">Undergrads and postgrads, any department. Bring a block you want to verify or pick one from the queue. No prior tapeout required — that is the point.</p>',
    'max-width: 50ch;">{{ join.body }}</p>')
rep_between('        <div style="display: flex; justify-content: space-between; gap: 16px;"><span style="color: #D7E0E6;">DV ENGINEER',
            '      </div>\n    </div>\n  </section>\n\n  <div style="max-width: 1520px; margin: 74px auto 0;',
            '''        <sc-for list="{{ positions }}" as="q">
        <div style="display: flex; justify-content: space-between; gap: 16px;"><span style="color: {{ q.roleColor }};">{{ q.role }}</span><span style="color: {{ q.slotsColor }};">{{ q.slots }}</span></div>
        </sc-for>
''')

# ---- footer
rep('<div style="color: #A8B3BD; line-height: 1.8; max-width: 30ch;">Student-run ASIC / FPGA hardware verification lab.</div>',
    '<div style="color: #A8B3BD; line-height: 1.8; max-width: 30ch;">{{ site.footerBlurb }}</div>')
rep('<div><span style="color: #66727D;">MAIL ▸ </span><a href="mailto:lab@whistleblower.dev">lab@whistleblower.dev</a></div>',
    '<div><span style="color: #66727D;">MAIL ▸ </span><a href="mailto:{{ site.email }}">{{ site.email }}</a></div>')
rep('<div><span style="color: #66727D;">GHUB ▸ </span><a href="join.html">github.com/whistleblower-lab</a></div>',
    '<sc-if value="{{ site.github }}">\n        <div><span style="color: #66727D;">GHUB ▸ </span><a href="{{ site.github }}" target="_blank" rel="noopener">{{ site.githubLabel }}</a></div>\n        </sc-if>')

assert 'TRACK B' not in s and 'R6</span>' not in s and 'DV ENGINEER' not in s and 'He stands' not in s
open(p, 'w', encoding='utf-8', newline='\n').write(s)
print('template ok')
