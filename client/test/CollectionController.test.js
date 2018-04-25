import dummy from '../src/TestFunc';
const should = require('chai').should;
should();

console.log("Running test cases");

describe('Test CI', function(){
	it('should alert with Hello World', function(){
		let result = dummy();

		result.should.equal("Hello World");
	})
})

