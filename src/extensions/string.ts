import './number';

export {};

declare global {
  interface String {
    format():string;
    words():Array<string>;
    uppercaseSentence():string;
    uppercaseWord():string;
    snakeCase():string;
    camelCase():string;
    linkify():string;
    stripHtml():string;
  }
}

String.prototype.format = function() {
  let args = arguments;
  let index = 0;

  return this.replace(/%@([0-9]+)?/g, (match, argumentIndex) => {
    argumentIndex = (argumentIndex) ? parseInt(argumentIndex, 0) - 1 : index++;
    match = args[argumentIndex];

    return ((match === null) ? '(null)' : (match === undefined) ? '' : match).toString();
  });
};

String.prototype.words = function() {
  return this.split(' ');
};

String.prototype.uppercaseSentence = function() {
  return this.substring(0, 1).toUpperCase() + this.substring(1, this.length);
};

String.prototype.uppercaseWord = function() {
  return this.words().map((w) => w.uppercaseSentence());
};

String.prototype.snakeCase = function() {
  return this.replace(new RegExp("([A-Z])", "g"), (typeof arguments[0] !== 'undefined')? arguments[0] : "_" + "$1").toLowerCase();
};

String.prototype.camelCase = function() {
  const words = this.split('_');

  if(words.length < 2) { return words.join(); }

  return words
  .map((w, i) => i == 0 ? w : w.uppercaseWord())
  .join('');
};

String.prototype.linkify = function() {
  return (function(urlString){
    var pattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    return (!urlString.match(pattern))? 
      urlString.replace('www.', 'http://').replace(pattern,"<a href='$1'>$1</a>") : 
      urlString.replace(pattern,"<a href='$1'>$1</a>");		
  })(this);
};

String.prototype.stripHtml = function() {
  return this.replace(/<(?:.|\n)*?>/gm, '');
}
