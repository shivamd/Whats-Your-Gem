function inPath(pathName){
  return !!location.href.match(pathName)
}

$(document).ready(function(){
  gemAnnotater.init();
});

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

var gemAnnotater = {
  viewingGemfile: false,
  init: function(){
    if (this.isViewingGemfile()){
      this.addGemToolTip();
    }
    this.pageListner();
    this.clickEventForAnnotationContainer();
  },

  pageListner: function(){
    if (inPath(/github/)){
      $this = this
      setInterval(function(){
        if ($this.isViewingGemfile()){
          $this.addGemToolTip();
        } else {
          $this.viewingGemfile = false;
        }
      },
      3000);
    }
  },
  clickEventForAnnotationContainer: function(){
    $("body").on("click", ".annotation-container", function(e){
      $(this).find(".project-link").first().click()
    })
    $("body").on("click", ".project-link", function(e){
      e.stopPropagation();
    });
  },
  isViewingGemfile: function(){
    return !!(inPath(/github/) && ( inPath(/Gemfile/)) || inPath(/gemspec/) );
  },
  addGemToolTip: function(){
    if (!this.updateGemFileViewingStatus()) return;
    if (inPath(/Gemfile/)){
      var matches = this.gemFileMatches();
      for (i=0; i < matches.length; i++){
        this.annotateGem($(matches[i]).siblings("span").first())
      }
    } else {
      var matches = this.gemSpecMatches();
      for (i=0; i < matches.length; i++){
        this.annotateGem($(matches[i]))
      }
    }
  },
  updateGemFileViewingStatus: function(){
    if (this.viewingGemfile){
      return false
    } else {
      this.viewingGemfile = true;
      return true
    }
  },
  gemFileMatches: function(){
    return $("span:contains('gem')").filter(function(){
      return $(this).text() == "gem";
    });
  },
  gemSpecMatches: function(){
    return $("span:contains('dependency')").next();
  },
  annotateGem: function($match){
    function getGemName(){
      return $match.text().replace(/('|")/g, "")
    }
    var gemName = getGemName();
    this.markupForAnnotationContainer($match, gemName);
    this.hoverEventForGemContainer($match.parent(), gemName);
  },
  markupForAnnotationContainer: function($selector, gemName){
    $selector.parent().append("<div class='annotation-container' id='"+gemName+"'></div>")
    $selector.parent().css("position", "relative")
    setStyleForAnnotationContainer(gemName, window.location.pathname)
  },
  hoverEventForGemContainer: function($container, gemName){
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
}

var addMarkupForGemInformation = function(gemName, gemDescription, projectURL){
  var gemInformationMarkup = "<p class='info-container'><a class='gem-link' target='_blank' href='"+projectURL+"'><span class='arrow-left'></span><span class='gem-info'>"+gemDescription.substring(0,150)+"</span> <br/><span class='project-link'>Project Link</span></a></p>"
  $("#"+gemName).html(gemInformationMarkup);
  setStyles()
};

