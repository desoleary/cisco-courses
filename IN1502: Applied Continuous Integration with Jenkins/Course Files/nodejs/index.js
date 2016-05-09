var curVal = 0;
function sumIt(sumVal) {
	return function(curVal) {
		if (!curVal) throw new Error('trying to pull a fast one?')
		return sumVal + curVal
	}
}
module.exports = sumIt