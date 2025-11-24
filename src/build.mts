import { globSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { build } from 'esbuild'
import { dirname } from 'node:path'

const files = globSync('src/**/*.ts')

if (files.length === 0) {
  process.exit(1)
}

const result = await build({
  entryPoints: files,
  bundle: true,
  minify: true,
  format: 'esm',
  outdir: "cmd",
  // banner: {js: "(async()=>{"},
  // footer: {js: "})()"},
  write: false
})

Promise.allSettled(result.outputFiles
  .map(file => ({ ...file, bookmarklet: "javascript:" + encodeURIComponent(file.text) }))
  .map(async (f) => {
    await mkdir(dirname(f.path), { recursive: true })
    await writeFile(f.path, f.bookmarklet, "utf-8")
  })).catch(errors => {
    console.error(errors)
    process.exit(1)
  })