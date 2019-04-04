import { GildedRose } from "../app/gilded-rose";
import { Item } from "./item";
import { TestBed } from "@angular/core/testing";
import { GildedRoseService } from "./gilded-rose.service";

const periodInDays: number = 30;
describe("Gilded Rose", function() {
  TestBed.configureTestingModule({});
  let service: any;
  beforeAll(() => {
    service = TestBed.get(GildedRoseService);
    service.initiateGildedRose(periodInDays);
  });

  it("BackStage passes, should be of zero Quality, where SellIn value is -ve", function() {
    let daysPassed = service.dayLog.length;

    let passesWithMoreSellIn = service.dayLog[0].items.filter(f => {
      return (
        f.name == "Backstage passes to a TAFKAL80ETC concert" &&
        f.sellIn > periodInDays
      );
    }).length;

    let passesWithLessSellIn = service.dayLog[0].items.filter(f => {
      return (
        f.name == "Backstage passes to a TAFKAL80ETC concert" &&
        f.sellIn < periodInDays
      );
    }).length;

    let latestSellInValue = service.dayLog[daysPassed - 1].items.filter(
      f => f.name == "Backstage passes to a TAFKAL80ETC concert"
    );

    let garbagePassesCount = latestSellInValue.filter(
      element => element.quality == 0
    ).length;

    expect(garbagePassesCount).toEqual(passesWithLessSellIn);
  });

  it("quality can't be Negative", function() {
    let foundItems = 0;
    service.dayLog.forEach(day => {
      let items = day.items;
      foundItems = foundItems + items.filter(r => r.quality < 0).length;
    });

    expect(foundItems).toEqual(0);
  });

  it("quality can't increase to be more than 50", function() {
    let countOfItemsWithQualityGreaterThan50 = 0;
    
    service.dayLog.forEach(day => {
      let items = day.items;

      
      let ItemsWithQualityGreaterThan50 = items.filter(r => r.quality > 50);
      ItemsWithQualityGreaterThan50.forEach(itemOver50 => {
        let ItemStartingQualityValue = service.dayLog[0].items.find(x => x.name == itemOver50.name).quality;
        if(itemOver50.quality > ItemStartingQualityValue){
            countOfItemsWithQualityGreaterThan50++
        }
      });    
    });

    expect(countOfItemsWithQualityGreaterThan50).toEqual(0);

    // it('Sulfuras, quality never decreases',function(){
    //     if(modifiedItems.filter(f => f.name = 'Sulfuras, Hand of Ragnaros')===SulphurusQuality){
    //         expect('Sulfuras Quality is same');
    //     }
    // }
  });
});
