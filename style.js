var setStyleForAnnotationContainer = function(gemName){
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
var setStyles = function(){
  setStyleForInfoContainer();
  setStyleForLinkToProject()
  setStyleForArrow();
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
