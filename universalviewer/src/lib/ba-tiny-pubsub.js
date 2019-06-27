/*! Tiny Pub/Sub - v0.7.0 - 2018-10-11
* https://github.com/cowboy/jquery-tiny-pubsub
* Copyright (c) 2018 "Cowboy" Ben Alman; Licensed MIT */
(function($) {

  var o = null;

  $.initPubSub = function() {
    o = $({});
  };

  $.subscribe = function() {
    if (!o) {
      $.initPubSub();
    }

    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    if (!o) {
      $.initPubSub();
    }

    o.off.apply(o, arguments);
  };

  $.disposePubSub = function() {
    o = null;
  };

  $.publish = function() {
    if (!o) {
      $.initPubSub();
    }

    o.trigger.apply(o, arguments);
  };

}(jQuery));