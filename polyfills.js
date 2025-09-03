// polyfills.js
if (typeof global.File === "undefined") {
  global.File = class File {
    constructor(parts = [], filename = '', options = {}) {
      this.parts = parts;
      this.name = filename;
      this.type = options.type || '';
      this.lastModified = options.lastModified || Date.now();
      this.size = parts.reduce((acc, part) => {
        if (typeof part === 'string') return acc + part.length;
        if (part instanceof Uint8Array) return acc + part.byteLength;
        return acc;
      }, 0);
    }
  };
}

if (typeof global.Blob === "undefined") {
  global.Blob = class Blob {
    constructor(parts = [], options = {}) {
      this.parts = parts;
      this.type = options.type || '';
      this.size = parts.reduce((acc, part) => {
        if (typeof part === 'string') return acc + part.length;
        if (part instanceof Uint8Array) return acc + part.byteLength;
        return acc;
      }, 0);
    }
  };
}
