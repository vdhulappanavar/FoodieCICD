let dummy = require('../src/TestFunc');
const should = require('chai').should;
should();

describe('Test CI', function(){
	it('should alert with Hello World', function(){
		let result = dummy();

		result.should.equal("Hello World");

		// expect(alert.calledOnce).to.be.true;
		// expect(alert.args[0][0]).to.equal('Hello World');
	})
})
