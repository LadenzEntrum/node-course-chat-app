const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString',() => {
    it('should reject non-string values',() => {
        var bool = isRealString(234234);
        expect(bool).toBeFalsy();
    });
    it('should reject stings with only spaces',() => {
        var bool = isRealString('    ');
        expect(bool).toBeFalsy();
    });
    it('allow with non-space characters',() => {
        var bool = isRealString('  lotr  ');
        expect(bool).toBeTruthy();
    });
});
