export {};

declare global {
  interface Array<T> {
    last(): T | null;  
    first(): T | null;
  }
}

Array.prototype.last = function() {
  return this.length > 0 ? this[this.length - 1] : null;
}

Array.prototype.first = function() {
  return this.length > 0 ? this[0] : null;
}
