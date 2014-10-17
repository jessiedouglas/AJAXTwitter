$.FollowToggle = function (el) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");
  this.render();

  this.$el.on("click", this.handleClick.bind(this));
};

$.FollowToggle.prototype.render = function () {
  if (this.followState === "following" || this.followState === "unfollowing") {
    this.$el.attr("disabled", "disabled")
  } else if (this.followState === "followed") {
    this.$el.removeAttr("disabled")
    this.$el.text("Unfollow!");
  } else {
    this.$el.removeAttr("disabled")
    this.$el.text("Follow!");
  }
};

$.FollowToggle.prototype.handleClick = function (event) {
  event.preventDefault();
  var that = this;
  if (this.followState === "unfollowed") {
    var type = "POST";
    var url =  this.userId + "/follow";
    var newState = "followed";
    this.followState = "following"
  } else {
    var type = "DELETE";
    var url = this.userId + "/follow";
    var newState = "unfollowed";
    this.followState = "unfollowing"
  }

  this.render();

  $.ajax({
    type: type,
    url: url,
    dataType: 'json',
    success: function( resp ) {
      that.followState = newState;
      that.render();
    }
  });
};

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

// $(function () {
//   $("button.follow-toggle").followToggle();
// });