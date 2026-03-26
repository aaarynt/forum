export function avatarIdFromName(name: string) {
  // Deterministic hash -> stable avatar across routes and renders.
  // Keep it simple and fast; we only need a consistent integer.
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

