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
    if ( $("#workEntryInfo1Box").css('display') == 'none' ){
        $("#workEntryInfo1Box").removeClass("invisible");
    }
    else{
        $("#workEntryInfo1Box").addClass("invisible");
    }
});

$("#workEntryInfo2").on("click", function(){
    if ( $("#workEntryInfo2Box").css('display') == 'none' ){
        $("#workEntryInfo2Box").removeClass("invisible");
    }
    else{
        $("#workEntryInfo2Box").addClass("invisible");
    }
});

$("#workEntryInfo3").on("click", function(){
    if ( $("#workEntryInfo3Box").css('display') == 'none' ){
        $("#workEntryInfo3Box").removeClass("invisible");
    }
    else{
        $("#workEntryInfo3Box").addClass("invisible");
    }
});

$("#workEntryInfo4").on("click", function(){
    if ( $("#workEntryInfo4Box").css('display') == 'none' ){
        $("#workEntryInfo4Box").removeClass("invisible");
    }
    else{
        $("#workEntryInfo4Box").addClass("invisible");
    }
});