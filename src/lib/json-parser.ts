// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createNdjsonParser(on: (obj: any) => void) {
  let buf = ""
  return (chunk: string) => {
    buf += chunk
    const lines = buf.split("\n")
    buf = lines.pop() ?? ""
    for (const l of lines) {
      const s = l.trim()
      if (!s) continue
      try {
        on(JSON.parse(s))
      } catch {}
    }
  }
}

export default createNdjsonParser
