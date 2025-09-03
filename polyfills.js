// polyfills.js

// Polyfill File, Blob, FileReader untuk SSR/Node
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

if (typeof global.FileReader === "undefined") {
  global.FileReader = class FileReader {
    readAsArrayBuffer(file) {
      this.result = new Uint8Array(file.size).buffer;
      if (this.onload) this.onload({ target: this });
    }
    readAsText(file) {
      this.result = file.parts.join('');
      if (this.onload) this.onload({ target: this });
    }
  };
}

console.log("Polyfills File, Blob, FileReader sudah di-load di Node/SSR");
