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

  // Tyler
  //   it("Once the sell by date has passed, Quality degrades twice as fast", function() {
  //     expect(true).toBe(false);
  //   });

  it("The Quality of an item is never negative", function() {
    let foundItems = 0;
    service.dayLog.forEach(day => {
      let items = day.items;
      foundItems = foundItems + items.filter(r => r.quality < 0).length;
    });

    expect(foundItems).toEqual(0);
  });

  // Tyler
  //   it("Aged Brie actually increases in Quality the older it gets", function(){
  //     expect(true).toBe(false);
  //   })

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

  // Mahendra
  //   it("Sulfuras, being a legendary item, never has to be sold", function(){
  //     expect(true).toBe(false);
  //   })

  it("Sulfuras, being a legendary item, never decreases in Quality", function() {
    let sulfurasStartingQuality = service.dayLog[0].items.filter(
      f => (f.name = "Sulfuras, Hand of Ragnaros")
    ).quality;
    let countOfQualityDecreases = 0;
    service.dayLog.forEach(day => {
      //this can easily be changed to quality never changed instead of quality never decreases.
      if (
        day.items.filter(f => (f.name = "Sulfuras, Hand of Ragnaros")).quality <
        sulfurasStartingQuality
      ) {
        countOfQualityDecreases++;
      }
    });

    expect(countOfQualityDecreases).toBe(0);
  });

  // Suhail
  //   it("BackStage passes: increases in Quality as its SellIn value approaches", function() {
  //     expect(true).toBe(false);
  //   });

  // Suhail
  //   it("BackStage passes: Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less", function() {
  //     expect(true).toBe(false);
  //   });

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

  // Mahendra
  //   it("Conjured items: degrade in Quality twice as fast as normal items",function(){
  //     expect(true).toBe(false);
  //   })
});
