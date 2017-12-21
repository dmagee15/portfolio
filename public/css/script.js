$(window).on("scroll", function() {
    if($(window).scrollTop() > $(window).height()) {
        $(".headerButton").addClass("active");
        $(".buttonList").addClass("activeBorder");
    } else {
        //remove the background property so it comes transparent again (defined in your css)
       $(".headerButton").removeClass("active");
       $(".buttonList").removeClass("activeBorder");
    }
});