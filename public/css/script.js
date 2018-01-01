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
        scrollTop: $(".workSection").offset().top},
        'slow');
});

$("#aboutButton").click(function() {
    $('html,body').animate({
        scrollTop: $(".coverSection").offset().top},
        'slow');
});