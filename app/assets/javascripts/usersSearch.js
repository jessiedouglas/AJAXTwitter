$.UsersSearch = function (el) {
  this.$el = $(el);
  this.input = this.$el.find("input");
  this.ul = this.$el.find("ul");
  this.input.keyup(this.handleInput.bind(this))
};

$.UsersSearch.prototype.renderResults = function (results) {
  var that = this
  //empty ul.users
  that.ul.empty();
  //iterate through fetched array of users, for each, building li w/ anchor tag
  jQuery.each(results, function(i, val) {
    console.log(val)
    follow = (val.followed ? 'followed' : 'unfollowed')
    var href = "/users/" + val.id
    that.ul.append("<li><a href=" + href + ">" + val.username + '</a><button\
      class="follow-toggle"\
      data-user-id="'+ val.id +'"\
      data-initial-follow-state="'+ follow +'">\
    </button></li>')
  });

  $(function () {
    $("button.follow-toggle").followToggle();
  });
};

$.UsersSearch.prototype.handleInput = function (event) {
  var val = $(event.target).val();
  var that = this
  $.ajax({
    type: "GET",
    url: "/users/search",
    data: {"query":  val},
    dataType: 'json',
    success: function( resp ) {
      that.renderResults(resp);
    }
  });


};
$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});