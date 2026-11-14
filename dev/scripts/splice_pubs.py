import sys
sp = sys.argv[1]
p = 'publications.html'
s = open(p, encoding='utf-8').read()
a = '<script src="./support.js"></script>\n<title>Whistleblower Lab — Publications</title>'
assert s.count(a) == 1
s = s.replace(a, '<script src="./cms.js"></script>\n<script src="./support.js"></script>\n<title>Whistleblower Lab — Publications</title>\n<meta name="description" content="Papers, signoff reports, notes and checklists published by Whistleblower, a student-run ASIC / FPGA hardware verification lab.">\n<link rel="preconnect" href="https://7h6avsoz.apicdn.sanity.io" crossorigin="">', 1)
b = '  @keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }\n</style>'
assert s.count(b) == 1
s = s.replace(b, '  @keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }\n  .cms-cursor { animation: blink 1s steps(1) infinite; }\n</style>', 1)
start = s.index('  <section data-screen-label="Pubs header"')
end = s.index('  <div style="max-width: 1520px; margin: 74px auto 0;')
s = s[:start] + open(sp + '/pubs_body.html', encoding='utf-8').read() + '\n' + s[end:]
ob = '<div style="color: #A8B3BD; line-height: 1.8; max-width: 30ch;">Student-run ASIC / FPGA hardware verification lab.</div>'
om = '<div><span style="color: #66727D;">MAIL ▸ </span><a href="mailto:lab@whistleblower.dev">lab@whistleblower.dev</a></div>'
assert s.count(ob) == 1 and s.count(om) == 1
s = s.replace(ob, '<div style="color: #A8B3BD; line-height: 1.8; max-width: 30ch;">{{ site.footerBlurb }}</div>')
s = s.replace(om, '<div><span style="color: #66727D;">MAIL ▸ </span><a href="mailto:{{ site.email }}">{{ site.email }}</a></div>')
assert s.count('</x-dc>\n') == 1
s = s.replace('</x-dc>\n', '</x-dc>\n' + open(sp + '/pubs_logic.html', encoding='utf-8').read(), 1)
open(p, 'w', encoding='utf-8', newline='\n').write(s)
print('ok')
