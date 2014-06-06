var addGemToolTip = function(){
  console.log("user is viewing gemfile");
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
