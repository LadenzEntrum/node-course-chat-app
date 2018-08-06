const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage',() => {
    it('should create message object',() => {
        var res = generateMessage('admin','Greetings');
        expect(res).toMatchObject({from:'admin',text:'Greetings'});
        expect(typeof res.createdAt).toBe('number');

    });
});
