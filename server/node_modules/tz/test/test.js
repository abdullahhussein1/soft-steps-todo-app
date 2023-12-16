var tzinfo = require('../index')
  , test = require('tape')

test("get_offset_format", function(assert) {
  var result

  for(var i = 0; i < 12 * 60; ++i) {
    result = tzinfo.get_offset_format(i)
    assert.equal(parseInt(result.slice(-2), 10),      ~~(i % 60))
    assert.equal(parseInt(result.slice(-4, -2), 10),  ~~(i / 60))
  }

  assert.end()
})

test("tzinfo, has no dst", function(assert) {
  var fake_determine_thresholds = function() { return {
      spring_forward: 0
    , fall_back     : 0
    } }
    , fake_determine_dst = Function('return false')
    , offset        = ~~(Math.random() * 720)
    , expected      = tzinfo.get_offset_format(offset)
    , tzs           = {}
    , date          = {getTimezoneOffset:function() { return offset }}
    , result

  tzs[expected] = [
    {'name':'unexpected', 'loc':'unexpected', 'abbr':'exc'}
  , {'name':'expected',   'loc':'expected',   'abbr':'expected'}
  ] 

  fake_determine_dst.find_thresholds = fake_determine_thresholds
  result = tzinfo(date, undefined, fake_determine_dst, tzs)

  assert.equal(result.name, 'expected')
  assert.equal(result.loc,  'expected')
  assert.equal(result.abbr, 'expected')
  assert.equal(result.offset, expected)
  assert.end()
})

test("tzinfo, has dst but is not dst (north)", function(assert) {
  var fake_determine_thresholds = function() { return {
      spring_forward: 0
    , fall_back     : 100 
    } }
    , fake_determine_dst = Function('return false')
    , offset        = ~~(Math.random() * 720)
    , expected      = tzinfo.get_offset_format(offset)
    , tzs           = {}
    , date          = {getTimezoneOffset:function() { return offset }}
    , result

  tzs[expected] = [
    {'name':'expected',   'loc':'expected',   'abbr':'expected'}
  , {'name':'unexpected', 'loc':'unexpected', 'abbr':'exc'}
  ] 

  fake_determine_dst.find_thresholds = fake_determine_thresholds
  result = tzinfo(date, undefined, fake_determine_dst, tzs)

  assert.equal(result.name, 'expected')
  assert.equal(result.loc,  'expected')
  assert.equal(result.abbr, 'expected')
  assert.equal(result.offset, expected)
  assert.end()
})

test("tzinfo, has dst and is dst (north)", function(assert) {
  // we're in the north if our fall_back is greater than our spring_forward
  var fake_determine_thresholds = function() { return {
      spring_forward: 0
    , fall_back     : 100 
    } }
    , fake_determine_dst = Function('return true')
    , offset        = ~~(Math.random() * 720)
    , expected      = tzinfo.get_offset_format(offset)
    , tzs           = {}
    , date          = {getTimezoneOffset:function() { return offset }}
    , result

  tzs[expected] = [
    {'name':'unexpected', 'loc':'unexpected', 'abbr':'exc'}
  , {'name':'daylight savings', 'loc':'expected', 'abbr':'expected'} // should filter all but the two with "daylight" in their name
  , {'name':'daylight savings', 'loc':'unexpected', 'abbr':'exc'}    // <-- shouldn't reach this one as it's grabbing from the top of the list
  , {'name':'unexpected', 'loc':'unexpected', 'abbr':'exc'}
  ] 

  fake_determine_dst.find_thresholds = fake_determine_thresholds
  result = tzinfo(date, undefined, fake_determine_dst, tzs)

  assert.equal(result.name, 'daylight savings')
  assert.equal(result.loc,  'expected')
  assert.equal(result.abbr, 'expected')
  assert.equal(result.offset, expected)
  assert.end()
})

test("tzinfo, has dst but is not dst (south)", function(assert) { 
  var fake_determine_thresholds = function() { return {
      spring_forward: 100
    , fall_back     : 0
    } }
    , fake_determine_dst = Function('return false')
    , offset        = ~~(Math.random() * 720)
    , expected      = tzinfo.get_offset_format(offset)
    , tzs           = {}
    , date          = {getTimezoneOffset:function() { return offset }}
    , result

  tzs[expected] = [
    {'name':'unexpected', 'loc':'unexpected', 'abbr':'exc'}
  , {'name':'expected',   'loc':'expected',   'abbr':'expected'}
  ] 

  fake_determine_dst.find_thresholds = fake_determine_thresholds
  result = tzinfo(date, undefined, fake_determine_dst, tzs)

  assert.equal(result.name, 'expected')
  assert.equal(result.loc,  'expected')
  assert.equal(result.abbr, 'expected')
  assert.equal(result.offset, expected)
  assert.end()
})

test("tzinfo, has dst and is dst (south)", function(assert) {
  // we're in the south if our fall_back is less than our spring_forward
  var fake_determine_thresholds = function() { return {
      spring_forward: 100 
    , fall_back     : 0 
    } }
    , fake_determine_dst = Function('return true')
    , offset        = ~~(Math.random() * 720)
    , expected      = tzinfo.get_offset_format(offset)
    , tzs           = {}
    , date          = {getTimezoneOffset:function() { return offset }}
    , result

  tzs[expected] = [
    {'name':'unexpected', 'loc':'unexpected', 'abbr':'exc'}
  , {'name':'daylight savings', 'loc':'unexpected', 'abbr':'exc'}    // <-- shouldn't reach this one as it's grabbing from the bottom of the list
  , {'name':'daylight savings', 'loc':'expected', 'abbr':'expected'} // should filter all but the two with "daylight" in their name
  , {'name':'unexpected', 'loc':'unexpected', 'abbr':'exc'}
  ] 

  fake_determine_dst.find_thresholds = fake_determine_thresholds
  result = tzinfo(date, undefined, fake_determine_dst, tzs)

  assert.equal(result.name, 'daylight savings')
  assert.equal(result.loc,  'expected')
  assert.equal(result.abbr, 'expected')
  assert.equal(result.offset, expected)
  assert.end()
})

test("no tzinfo available", function(assert) {
  var fake_determine_thresholds = function() { return {
      spring_forward: 100 
    , fall_back     : 0 
    } }
    , fake_determine_dst = Function('return true')
    , offset        = ~~(Math.random() * 720)
    , expected      = tzinfo.get_offset_format(offset)
    , tzs           = {}
    , date          = {getTimezoneOffset:function() { return offset }}
    , result

  // we simply don't provide TZINFO in this case to simulate a tzinfo "miss"

  fake_determine_dst.find_thresholds = fake_determine_thresholds
  result = tzinfo(date, undefined, fake_determine_dst, tzs)

  assert.deepEqual(result, {})
  assert.end()
})
