import { Item } from "./item";
import { async } from "q";

describe('Item', function () {

    it('creates new item', function() {
        const item = new Item('foo', 0, 0);
        expect(item.name).toEqual('foo');
    });
});
