var startTag = "<soap:Body";
var endTag = "</soap:Body>";
var startTagRq = "<env:Body";
var endTagRq = "</env:Body>";


var indent = 2;
var endStart_re = /></g;
var startTagWithContent_re = />(\w)/g;
var endTagWithContent_re = /(\w)</g;


function parse(text) {
  text = removeNonXml(text)
  var tags = splitTags(text);

  var counter = 0;
  tags.forEach(function(tag) {
    tags[counter] = createIndentedStr(tag);
    counter++;
  });

  return tags.join("");
}

function createIndentedStr(tag) {
  if (tag.startsWith("</")) {
    indent -= 2;
  }
  var spaces = Array(indent).join(" ");
  var retVal = "\n" + spaces + tag;

  if (tag.startsWith("<") && !tag.startsWith("</")) {
    if (!tag.endsWith("/>")) {
      indent += 2;
    }
  }

  return retVal;
}

function removeNonXml(text) {
  var output = "//RESPONSE";
  //begin to response restart
  var startTagIdx = text.indexOf(startTag);
  var endTagIdx = text.indexOf(endTag);
  output += text.substr(startTagIdx, endTagIdx - startTagIdx + endTag.length);
  output += "\n//REQUEST";

  //response end to request start
  var startTagIdxRq = text.indexOf(startTagRq);
  var endTagIdxRq = text.indexOf(endTagRq);
  output += text.substr(startTagIdxRq, endTagIdxRq - startTagIdxRq + endTagRq.length);

  return output;
}

function splitTags(xml) {

  var formatted = xml
    .replace(endStart_re, ">> <<")
    .replace(startTagWithContent_re, ">> <$1")
    .replace(endTagWithContent_re, "$1> <<");

  var tags = formatted.split("> <");
  return tags;
}