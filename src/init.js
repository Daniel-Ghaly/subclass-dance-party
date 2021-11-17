$(document).ready(function() {
  window.dancers = [];


  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );

    $('body').append(dancer.$node);
    window.dancers.push(dancer);
  });

  $('#line-up-button').on('click', function(event) {
    for (var i = 0; i < window.dancers.length; i++) {
      window.dancers[i].lineUp();
    }
  });


  $('#pair-up-button').on('click', function(event) {
    // console.log(window.dancers)
    var alreadyPairedIndexes = [];
    for (var i = 0; i < window.dancers.length; i++) {
      // skip dancers already paired up
      if (alreadyPairedIndexes.includes(i)) {
        continue;
      }
      // get distance to each dancer, and find lowest
      var shortestDistanceNeighbor = window.dancers[0];
      for (var j = 0; j < window.dancers.length; j++) {
        if (i !== j) {
          // get distance
          var distance = getDistance(window.dancers[i], window.dancers[j])
          if (distance < getDistance(shortestDistanceNeighbor, window.dancers[i])) {
            shortestDistanceNeighbor = window.dancers[j];
             // get j index of closest partner to skip that index in first loop
             if (j === window.dancers.length-1){
              alreadyPairedIndexes.push(j)
             }
          }
        }
      }
      // store closest neighbor and send to makeDancer.prototype.pairUp() function
      window.dancers[i].pairUp(shortestDistanceNeighbor)

    }
  });

  function getDistance(dancerOne, dancerTwo) {
    var expression = ((dancerTwo.left-dancerOne.left)**2) - ((dancerTwo.top-dancerOne.top)**2);
    return Math.sqrt(expression);
  }

});

