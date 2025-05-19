import { spawnSync } from 'child_process'
import { join } from 'path'

const testRunner = join('node_modules', '.bin', 'vscode-test')

const result = spawnSync(testRunner, { encoding: 'utf8' })
if (result.stdout) process.stdout.write(result.stdout)
if (result.stderr) process.stderr.write(result.stderr)

if (result.status !== 0) {
  const output = (result.stdout || '') + (result.stderr || '')
  if (/ENOTFOUND.*update\.code\.visualstudio\.com/i.test(output)) {
    console.warn('VS Code download failed, skipping integration tests')
    process.exit(0)
  }
}
process.exit(result.status ?? 1)
