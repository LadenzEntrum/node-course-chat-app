const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',() => {
    it('should create message object',() => {
        var res = generateMessage('admin','Greetings');
        expect(res).toMatchObject({from:'admin',text:'Greetings'});
        expect(typeof res.createdAt).toBe('number');

    });
});

describe('generateLocationMessage',() => {
    it('should create google maps link object',() => {
        var latitude = '48.113';
        var longitude = '11.5369776';
        var url = `https://www.google.de/maps?q=${latitude},${longitude}`
        var res = generateLocationMessage('admin',latitude,longitude);
        expect(res).toMatchObject({from:'admin',url});
        expect(typeof res.createdAt).toBe('number');
        expect(res.url).toBe(url);

    });
});
