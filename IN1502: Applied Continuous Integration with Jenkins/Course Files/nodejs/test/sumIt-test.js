var test = require('tape')
var sumIt = require('../index')

test('sumIt', function(t) {
	var valley = sumIt(-10) 
	t.equal(valley(10), 0, 'should be equal')
	t.end()
})