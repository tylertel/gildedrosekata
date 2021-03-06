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

  it("Once the sell by date has passed, Quality degrades twice as fast", function() {
    var daycount: number = 0;
    daycount = service.dayLog.length - 1;
    let d = 1;
    
    //0 == +5 Dexterity Vest is only one that follows 'normal' quality degredation
    var dexterityVestIndex = service.dayLog[0].items
      .map(e => e.name)
      .indexOf("+5 Dexterity Vest");
    var testItems = [dexterityVestIndex];

    for (var i in testItems) {
      for (d = 1; d < daycount; d++) {
        var prevDayQuality = service.dayLog[d - 1].items[i].quality;
        var currentQuality = service.dayLog[d].items[i].quality;
        if (currentQuality < prevDayQuality) {
          if (service.dayLog[d].items[i].sellIn < 0) {
            expect(parseInt(prevDayQuality)).toBe(parseInt(currentQuality) + 2);
          } else {
            expect(parseInt(prevDayQuality)).toBe(parseInt(currentQuality) + 1);
          }
        }
      }
    }
  });

  it("The Quality of an item is never negative", function() {
    let foundItems = 0;
    service.dayLog.forEach(day => {
      let items = day.items;
      foundItems = foundItems + items.filter(r => r.quality < 0).length;
    });

    expect(foundItems).toEqual(0);
  });

  it("Aged Brie actually increases in Quality the older it gets", function() {
    var daycount: number = 0;
    daycount = service.dayLog.length - 1;
    var agedBrieIndex = service.dayLog[0].items
      .map(e => e.name)
      .indexOf("Aged Brie");
    let d = 1;

    for (d = 1; d < daycount; d++) {
      var prevDayQuality = service.dayLog[d - 1].items[agedBrieIndex].quality;
      var currentQuality = service.dayLog[d].items[agedBrieIndex].quality;
      if (currentQuality < 50) {
        expect(parseInt(currentQuality)).toBeGreaterThan(
          parseInt(prevDayQuality)
        );
      }
    }
  });

  it("The Quality of an item is never more than 50 * can't increase to over 50 see sulfuras", function() {
    let countOfItemsWithQualityGreaterThan50 = 0;

    service.dayLog.forEach(day => {
      let items = day.items;

      let ItemsWithQualityGreaterThan50 = items.filter(r => r.quality > 50);
      ItemsWithQualityGreaterThan50.forEach(itemOver50 => {
        let ItemStartingQualityValue = service.dayLog[0].items.find(
          x => x.name == itemOver50.name
        ).quality;
        if (itemOver50.quality > ItemStartingQualityValue) {
          countOfItemsWithQualityGreaterThan50++;
        }
      });
    });

    expect(countOfItemsWithQualityGreaterThan50).toEqual(0);
  });

  it("Sulfuras, being a legendary item, never decreases in Quality", function() {
    let daysPassed: number = service.dayLog.length;
    debugger;
    let n: number = 0;
    do {
      let allNitems = service.dayLog[n].items.filter(
        f => f.name == "Sulfuras, Hand of Ragnaros"
      );
      let allNPlusOneitems = service.dayLog[n + 1].items.filter(
        f => f.name == "Sulfuras, Hand of Ragnaros"
      );

      let count = allNitems.length;

      for (let index = 0; index < count; index++) {
        let sulfurasItemQuality = parseInt(allNitems[index].quality);
        let sulfurasNextItemQuality = parseInt(allNPlusOneitems[index].quality);

        expect(sulfurasItemQuality).toEqual(sulfurasNextItemQuality);
      }

      n++;
    } while (n < daysPassed - 1);
  });

    it("Sulfuras, being a legendary item, never has to be sold", function(){
      let daysPassed: number = service.dayLog.length;
      debugger;
      let n: number = 0;
      do {
        let allNitems = service.dayLog[n].items.filter(
          f => f.name == "Sulfuras, Hand of Ragnaros"
        );
        let allNPlusOneitems = service.dayLog[n + 1].items.filter(
          f => f.name == "Sulfuras, Hand of Ragnaros"
        );
  
        let count = allNitems.length;
  
        for (let index = 0; index < count; index++) {
          let sulfurasItemSellIn = parseInt(allNitems[index].sellIn);
          let sulfurasNextItemSellIn = parseInt(allNPlusOneitems[index].sellIn);
          expect(sulfurasItemSellIn).toEqual(sulfurasNextItemSellIn);
        }
  
        n++;
      } while (n < daysPassed - 1);
    })

  it("BackStage passes: increases in Quality as its SellIn value approaches", function() {
    var daycount: number = 0;
    daycount = service.dayLog.length - 1;
    var backStageItemIndex = service.dayLog[0].items.indexOf(
      "Backstage passes to a TAFKAL80ETC concert"
    );
    backStageItemIndex = service.dayLog[0].items
      .map(e => e.name)
      .indexOf("Backstage passes to a TAFKAL80ETC concert");

    for (let d = 1; d < daycount; d++) {
      var backStageItemPrevDayQuality = service.dayLog[d - 1].items[backStageItemIndex].quality;
      var backStageItemCurDayQuality = service.dayLog[d].items[backStageItemIndex].quality;
      var backStageItemSellIn =
        service.dayLog[d].items[backStageItemIndex].sellIn;
      if (backStageItemSellIn > 10) {
        expect(parseInt(backStageItemCurDayQuality)).toBeGreaterThan(
          parseInt(backStageItemPrevDayQuality)
        );
      }
    }
  });

  it("BackStage passes: Quality increases by 2 when there are 10 days or less", function() {
    var daycount: number = 0;
    daycount = service.dayLog.length - 1;
    var backStageItemIndex = service.dayLog[0].items.indexOf(
      "Backstage passes to a TAFKAL80ETC concert"
    );
    backStageItemIndex = service.dayLog[0].items
      .map(e => e.name)
      .indexOf("Backstage passes to a TAFKAL80ETC concert");

    for (let d = 1; d < daycount; d++) {
      var backStageItemPrevDayQuality = service.dayLog[d - 1].items[backStageItemIndex].quality;
      var backStageItemCurDayQuality = service.dayLog[d].items[backStageItemIndex].quality;
      var backStageItemSellIn = service.dayLog[d].items[backStageItemIndex].sellIn;
      
      if (backStageItemSellIn < 10 && backStageItemSellIn > 5) {
        expect(parseInt(backStageItemCurDayQuality)).toEqual(
          (parseInt(backStageItemPrevDayQuality)+2)
        );
      }
    }
  });

  it("BackStage passes: Quality increases by 3 when there are 5 days or less", function() {
    var daycount: number = 0;
    daycount = service.dayLog.length - 1;
    var backStageItemIndex = service.dayLog[0].items.indexOf(
      "Backstage passes to a TAFKAL80ETC concert"
    );
    backStageItemIndex = service.dayLog[0].items
      .map(e => e.name)
      .indexOf("Backstage passes to a TAFKAL80ETC concert");

    for (let d = 1; d < daycount; d++) {
      var backStageItemPrevDayQuality = service.dayLog[d - 1].items[backStageItemIndex].quality;
      var backStageItemCurDayQuality = service.dayLog[d].items[backStageItemIndex].quality;
      var backStageItemSellIn = service.dayLog[d].items[backStageItemIndex].sellIn;

      
      if (backStageItemSellIn < 5 && backStageItemSellIn >0) {
        expect(parseInt(backStageItemCurDayQuality)).toEqual(
          (parseInt(backStageItemPrevDayQuality)+3)
        );
      }
    }
  });

  it("BackStage passes: Quality drops to 0 after the concert", function() {
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

  it("Conjured items decrease is value twice fast", function() {
    let daysPassed = service.dayLog.length;
    debugger;
    var n: number = 0;
    do {
      let allNitems = service.dayLog[n].items.filter(
        f => f.name == "Conjured Mana Cake"
      );
      let allNPlusOneitems = service.dayLog[n + 1].items.filter(
        f => f.name == "Conjured Mana Cake"
      );

      let count = allNitems.length;

      for (let index = 0; index < count; index++) {
        let sulfurasItemQuality = parseInt(allNitems[index].quality);
        let sulfurasNextItemQuality = parseInt(allNPlusOneitems[index].quality);
        if (sulfurasItemQuality == sulfurasNextItemQuality)
          expect(sulfurasItemQuality).toEqual(sulfurasNextItemQuality);
        else expect(sulfurasItemQuality).toEqual(sulfurasNextItemQuality + 2);
      }

      n++;
    } while (n < daysPassed - 1);
  });
});