$.TweetCompose = function (el) {
  this.$el = $(el);

  this.$el.on("submit", this.submit.bind(this))
};

$.TweetCompose.prototype.submit = function (event) {
  var that = this;
  event.preventDefault();
  console.log(this.$el)
  var contents = this.$el.serializeJSON();
  $("*:input").attr("disabled", "disabled");
  $.ajax({
    type: "POST",
    url: "/tweets/",
    data: contents,
    dataType: 'json',
    success: function( resp ) {
      console.log(resp)
      console.log(JSON.stringify(resp));
      that.handleSuccess(resp);
    }
  });
};

$.TweetCompose.prototype.clearInput = function () {
  this.$el.find("textarea").val("");
  this.$el.find("option").removeAttr("selected");
  $("ul")
};

$.TweetCompose.prototype.handleSuccess = function (resp) {
  this.clearInput();
  $("*:input").removeAttr("disabled");
  var data = this.$el.data("tweets-ul");
  var ul = $(data);

  var id = resp.user_id;
  var content = resp.content;
  var mentions = resp.mentions;
  var created = resp.created_at;
  var username = resp.user.username

  ul.prepend("<li>" + content + " -- " + '<a href="users/' + id +'">' + username + "</a> -- " + created + "</li>")
};

$.TweetCompose.prototype.constructTweet = function (first_argument) {
  // body...
};

$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};

$(function () {
  $("form.tweet-compose").tweetCompose();
});