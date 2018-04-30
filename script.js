$(window).on("scroll", function() {
    if($(window).scrollTop() > $(window).height()) {
        $(".header").addClass("headerActive");
        $(".headerButton").addClass("active");
        $(".buttonList").addClass("activeBorder");
    } else {
        //remove the background property so it comes transparent again (defined in your css)
       $(".header").removeClass("headerActive");
       $(".headerButton").removeClass("active");
       $(".buttonList").removeClass("activeBorder");
    }
});

$("#workButton").click(function() {
    $('html,body').animate({
        scrollTop: $(".workSection").offset().top+2},
        'slow');
});

$("#aboutButton").click(function() {
    $('html,body').animate({
        scrollTop: $(".aboutSection").offset().top},
        'slow');
});

$("#contactButton").click(function() {
    $('html,body').animate({
        scrollTop: $(".contactSection").offset().top},
        'slow');
});

$("#workEntryInfo1").on("click", function(){
    if($("#workEntryInfo1Box").hasClass('hide')) {
        $("#workEntryInfo1Box").animate({maxHeight:'1000px', paddingBottom:'15px'},300).removeClass('hide');
      } else { 
        $("#workEntryInfo1Box").animate({maxHeight:0, paddingBottom:0},300).addClass('hide');
      }
});

$("#workEntryInfo2").on("click", function(){
    if($("#workEntryInfo2Box").hasClass('hide')) {
        $("#workEntryInfo2Box").animate({maxHeight:'1000px', paddingBottom:'15px'},300).removeClass('hide');
      } else { 
        $("#workEntryInfo2Box").animate({maxHeight:0, paddingBottom:0},300).addClass('hide');
      }
});

$("#workEntryInfo3").on("click", function(){
    if($("#workEntryInfo3Box").hasClass('hide')) {
        $("#workEntryInfo3Box").animate({maxHeight:'1000px', paddingBottom:'15px'},300).removeClass('hide');
      } else { 
        $("#workEntryInfo3Box").animate({maxHeight:0, paddingBottom:0},300).addClass('hide');
      }
});

$("#workEntryInfo4").on("click", function(){
    if($("#workEntryInfo4Box").hasClass('hide')) {
        $("#workEntryInfo4Box").animate({maxHeight:'1000px', paddingBottom:'15px'},300).removeClass('hide');
      } else { 
        $("#workEntryInfo4Box").animate({maxHeight:0, paddingBottom:0},300).addClass('hide');
      }
});

$("#workEntryInfo5").on("click", function(){
    if($("#workEntryInfo5Box").hasClass('hide')) {
        $("#workEntryInfo5Box").animate({maxHeight:'1000px', paddingBottom:'15px'},300).removeClass('hide');
      } else { 
        $("#workEntryInfo5Box").animate({maxHeight:0, paddingBottom:0},300).addClass('hide');
      }
});

$("#workEntryInfo6").on("click", function(){
    if($("#workEntryInfo6Box").hasClass('hide')) {
        $("#workEntryInfo6Box").animate({maxHeight:'1000px', paddingBottom:'15px'},300).removeClass('hide');
      } else { 
        $("#workEntryInfo6Box").animate({maxHeight:0, paddingBottom:0},300).addClass('hide');
      }
});