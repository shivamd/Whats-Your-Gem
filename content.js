var addGemToolTip = function(){
  var matches = $("span:contains('gem')")
  for (i=0; i < matches.length; i++){
    function getGemName(){
      return $(matches[i]).siblings("span").first().text().replace(/('|")/g, "")
    }
    var gemName = getGemName()
    console.log(gemName);
  }
};
var isUserViewingGemfile = function(){
  return !!(location.origin.match(/github/) && location.pathname.match(/Gemfile/));
}
$(document).ready(function(){
  if (isUserViewingGemfile()){
    addGemToolTip();
  } else if (location.origin.match(/github/)){
    setInterval(function(){
      if (isUserViewingGemfile()){
        addGemToolTip();
      }
    },
    3000);
  }
});
