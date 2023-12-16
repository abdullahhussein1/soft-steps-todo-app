
if(typeof assert === 'undefined') {
  var assert = require('assert')
    , is_dst = require('../index') 
}

suite("dst", function() {
  test("known DST values", function() {
    // let's just grab a "best guess" case for which hemisphere of the
    // earth we're in.
    var is_northern_hemisphere = new Date(2012, 0, 1, 0, 0).getTimezoneOffset() > new Date(2012, 6, 1, 0, 0).getTimezoneOffset()
      , okay = function(x, tf) { return x.isDST() === (tf === is_northern_hemisphere) }

    okay(new Date(2012, 12, 1), false)
    okay(new Date(2012, 1,  1), false)
    okay(new Date(2012, 6,  1), true)
  })

  suite("thresholds", function() {

    test("reversed thresholds reverse expected dst", function() {
      var thresholds = is_dst.find_thresholds()
        , tmp
        , at 

      tmp = thresholds.spring_forward
      thresholds.spring_forward = thresholds.fall_back
      thresholds.fall_back = tmp

      assert.equal(!is_dst(at = new Date(2012, 0, 1, 0, 0)), is_dst(at, thresholds))
      assert.equal(!is_dst(at = new Date(2012, 6, 1, 0, 0)), is_dst(at, thresholds))
    })

    suite("mock getTimezoneOffset", function() {
      var old = Date.prototype.getTimezoneOffset()
      setup(function() {
        Date.prototype.getTimezoneOffset = function() { return 0 }
      })

      teardown(function() {
        Date.prototype.getTimezoneOffset = old
      })

      test("areas without DST do not break", function() {
        var thresholds = is_dst.find_thresholds()

        assert.ok('spring_forward' in thresholds)
        assert.ok('fall_back' in thresholds)
        assert.equal(thresholds.spring_forward, 0) 
        assert.equal(thresholds.fall_back, 0)

        assert.ok(!is_dst(new Date(2012, 0, 1, 0, 0), thresholds)) 
        assert.ok(!is_dst(new Date(2012, 5, 1, 0, 0), thresholds)) 
      }) 
    })
  })

  test("make sure dates in the past work", function() {
    var is_northern_hemisphere = new Date(2012, 0, 1, 0, 0).getTimezoneOffset() > new Date(2012, 6, 1, 0, 0).getTimezoneOffset()
    assert.equal(new Date(2010,11, 1, 18, 3, 59, 888).isDST(), !is_northern_hemisphere)
  })
})
