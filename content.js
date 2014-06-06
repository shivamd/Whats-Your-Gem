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

var setStyleForInfoContainer = function(){
  $(".info-container").css({
    "padding": "0px 4px",
    "margin-top": "5px",
    "text-align": "justify",
    "white-space": "pre-wrap"
  })
}

var setStyleForLinkToProject = function(){
  $(".gem-link").css({
    color: "white",
    "text-decoration": "none",
  })
  $(".project-link").css({
    "color": "#4183c4"
  })
}

var setStyleForArrow = function(){
  $(".arrow-left").css({
    "position": "absolute",
    "width": "0",
    "height": "0",
    "border-top": "20px solid transparent",
    "border-right": "20px solid rgba(0,0,0,0.8)",
    "border-bottom": "20px solid transparent",
    left: "-20px",
    top: "47px"
  })
}

var setStyles = function(){
  setStyleForInfoContainer();
  setStyleForLinkToProject()
  setStyleForArrow();
}

var addMarkupForGemInformation = function(gemName, gemDescription, projectURL){
  var gemInformationMarkup = "<p class='info-container'><a class='gem-link' target='_blank' href='"+projectURL+"'><span class='arrow-left'></span><span class='gem-info'>"+gemDescription.substring(0,150)+"</span> <br/><span class='project-link'>Project Link</span></a></p>"
  $("#"+gemName).html(gemInformationMarkup);
  setStyles()
};

var getGemInfo = function($container, gemName){
  $.ajax({
    url: "https://rubygems.org/api/v1/gems/"+gemName+".json",
    type: "GET",
  }).done(function(data){
    var gemDescription = data.info
    var projectURL = data.homepage_uri
    addMarkupForGemInformation(gemName, gemDescription, projectURL);
  }).error(function(){
    console.log("error");
  })
}
var hoverEventForGemContainer = function($container, gemName){
  $container.on({
    mouseenter: function(){
      $("#"+gemName).css("display", "block")
      if ($("#"+gemName).children().length == 0) {
        getGemInfo($container, gemName);
      }
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
  } 
  if (location.origin.match(/github/)){
    setInterval(function(){
      if (isUserViewingGemfile()){
        addGemToolTip();
      }
    },
    3000);
  }
});
