import { Item } from "./item";
import { async } from "q";

describe('Item', function () {

    it('should foo', function() {
        const item = new Item('foo', 0, 0);
        expect(item.name).toEqual('foo');
    });

    //The Quality of an item is never negative
    it(`item quality can't be -ve`, function() {
        const item=new Item('foo',5,1);
        expect(item.quality).toBeGreaterThanOrEqual(0);
    });

    //The Quality of an item is never more than 50
    it(`item quality can't be greater than 50`, function() {
        const item=new Item('foo',5,50);
        expect(item.quality).toBeLessThanOrEqual(50);
    });

});
