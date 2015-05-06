function format() {
  var val = $("#obeOutput").val();
  val = parse(val);
  $("#formatted").text(val);
}