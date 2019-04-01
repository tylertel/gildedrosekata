import { GildedRose } from '../app/gilded-rose';
import { Item } from './item';
import { TestBed } from '@angular/core/testing';
import { GildedRoseService } from './gilded-rose.service';

const periodInDays: number = 30;
describe('Gilded Rose', function () {

    TestBed.configureTestingModule({});
    let service: any;
    debugger
    beforeAll(() => {
        service = TestBed.get(GildedRoseService);
        service.initiateGildedRose(periodInDays)
        let GildedRoseClass = service.gildedRose;
    })

    it('should foo', function () {
        const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual('foo');
    });

    it('BackStage passes, should be of zero Quality, where SellIn value is -ve', function () {

        let daysPassed = service.dayLog.length;

        let passesWithMoreSellIn = service.dayLog[0].items.filter(f => { return f.name == 'Backstage passes to a TAFKAL80ETC concert' && f.sellIn > periodInDays }).length;

        let passesWithLessSellIn = service.dayLog[0].items.filter(f => { return f.name == 'Backstage passes to a TAFKAL80ETC concert' && f.sellIn < periodInDays }).length;

        let latestSellInValue = service.dayLog[daysPassed - 1].items.filter(f => f.name == 'Backstage passes to a TAFKAL80ETC concert');

        let garbagePassesCount = latestSellInValue.filter(element => element.quality == 0).length

        expect(garbagePassesCount).toEqual(passesWithLessSellIn);

    });

    debugger;
    it('quality can\'t be Negative', function () {
        service.dayLog.forEach(element => {

            let items = element.item;

            let foundItem = items.filter(r => r.quality < 0).length;
            debugger
            expect(foundItem).toEqual(0);
        })
    })
    it('quality can\'t be more than 50', function () {

        service.dayLog.forEach(element => {

            let items = element.items            

            let foundItem =items.filter(r => r.quality >= 50).length;
            debugger
            expect(foundItem).toEqual(0)

        })

        // it('Sulfuras, quality never decreases',function(){
        //     debugger
        //     if(modifiedItems.filter(f => f.name = 'Sulfuras, Hand of Ragnaros')===SulphurusQuality){
        //         expect('Sulfuras Quality is same');
        //     }
        // }


    })
});


