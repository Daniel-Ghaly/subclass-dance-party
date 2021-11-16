var makeBlinkyDancer = function(top, left, timeBetweenSteps) {
  //var blinkyDancer = makeDancer(top, left, timeBetweenSteps);
  //console.log("blinky-time:", timeBetweenSteps);
  makeDancer.call(this, top, left, timeBetweenSteps);

  this.$node.addClass('BlinkyDancer');
};

makeBlinkyDancer.prototype = Object.create(makeDancer.prototype);

makeBlinkyDancer.prototype.constructor = makeBlinkyDancer;

// we plan to overwrite the step function below, but we still want the superclass step behavior to work,
// so we must keep a copy of the old version of this function

makeBlinkyDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  //console.log('this2: ', this);

  var oldStep = makeDancer.prototype.step.bind(this);

  //console.log('oldStep: ', oldStep);
  // makeDancer.prototype.step.call(this);
  oldStep(); // makeDancer.step()
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.toggle();
};