var markupForAnnotationContainer = function($selector, gemName){
  $selector.parent().append("<div id='"+gemName+"'></div>")
  $selector.parent().css("position", "relative")
  $("#"+gemName).css({
    "min-height": "100px",
    width: "250px",
    color: "white",
    background: "rgba(0,0,0,0.8)",
    position: "absolute",
    top: "-60px",
    "margin-left": "200px",
    display: "none",
    cursor: "pointer",
    color: "white",
    "overflow-wrap": "break-word",
    "z-index": "2",
    "border-radius": "3px",
    "font-size": "10px",
    "padding": "0 4px"
  })
}
var hoverEventForGemContainer = function($container, gemName){
  $container.on({
    mouseenter: function(){
      $("#"+gemName).css("display", "block")
    },

    mouseleave: function(){
      $("#"+gemName).css("display", "none")
    }
  });
}
var addGemToolTip = function(){
  var matches = $("span:contains('gem')")
  for (i=0; i < matches.length; i++){
    function getGemName(){
      return $(matches[i]).siblings("span").first().text().replace(/('|")/g, "")
    }
    var gemName = getGemName();
    markupForAnnotationContainer($(matches[i]), gemName);
    hoverEventForGemContainer($(matches[i]).parent(), gemName)
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
