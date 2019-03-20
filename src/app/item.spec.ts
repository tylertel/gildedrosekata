import { Item } from "./item";

describe('Item', function () {

    it('should foo', function() {
        const item = new Item('foo', 0, 0);
        expect(item.name).toEqual('fixme');
    });

});
