import { spawn } from 'node:child_process'

function run(cmd, args, name, color) {
  const p = spawn(cmd, args, { stdio: 'pipe', env: process.env, shell: true })
  p.stdout.on('data', d => bufferLine(name, color, d))
  p.stderr.on('data', d => bufferLine(name, color, d))
  p.on('exit', code => {
    console.log(colorize(name, color) + ` exited (${code})`)
  })
  return p
}

const colors = { front: '\u001b[32m', back: '\u001b[36m', reset: '\u001b[0m' }
function colorize(label, color) { return `${colors[color] || ''}[${label}]${colors.reset}` }

let cleared = false
function bufferLine(label, color, chunk) {
  const text = chunk.toString()
  if (!cleared) {
    process.stdout.write('\x1Bc')
    cleared = true
  }
  const lines = text.split(/\r?\n/).filter(l => l.trim().length)
  const skipPatterns = [
    /^▲ Next\.js/i,
    /^\s*- (Local|Network|Environments?):/,
    /^\s*Starting\.\.\./,
    /^\s*Ready in /,
    /^\s*Compiled \/_not-found /i,
    /^\s*Compiled \/.* modules\)/,
    /^\s*Compiled \/?[^]*? modules\)/,
    /^\s*Compiled\s+\/.*/,
    /^\s*Compiled .* modules\)/,
    /^\s*Compiling \.{3}/,
    /^\(node:\d+\) \[DEP\d+\]/,
    /^\(Use `node --trace-deprecation/,
    /^warn - .+ (experimental|deprecated)/i,
    /^info  - Loaded env from /i,
    /^\s*Tailwind CSS is watching/,
    /favicon\.ico/i,
    /installHook\.js\.map/i,
  ]
  let allow = process.env.DEV_LOG_ALLOW?.split(',').map(s=>s.trim()).filter(Boolean)
  for (const line of lines) {
    if (line.startsWith('>') && (line.includes('dev') || line.includes('tsx watch'))) continue
    if (/^\s*tsx watch /.test(line)) continue
    const blocked = skipPatterns.some(r => r.test(line)) && !(allow && allow.some(a => line.includes(a)))
    if (blocked) continue
    process.stdout.write(colorize(label, color) + ' ' + line + '\n')
  }
}

const back = run('npm', ['run','dev:back'], 'back', 'back')
setTimeout(() => run('npm', ['run','dev:front'], 'front', 'front'), 300)

process.on('SIGINT', () => { back.kill('SIGINT'); process.exit() })
