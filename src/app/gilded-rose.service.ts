import { Injectable } from "@angular/core";
import { Item } from "./item";
import { GildedRose } from "./gilded-rose";
import { Day } from "./day";

@Injectable({
  providedIn: "root"
})
export class GildedRoseService {
  public gildedRose: GildedRose;

  public dayLog: Day[] = [];


  public initiateGildedRose(days: number) {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20), //
      new Item("Aged Brie", 2, 0), //
      new Item("Elixir of the Mongoose", 5, 7), //
      new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      // this conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6)
    ];

    const gildedRose = new GildedRose(items);

    for (let i = 0; i < days; i++) {
      let day: Day = new Day();
      day.dayNumber = i;
      day.items = items;
      this.dayLog.push(day);
      gildedRose.updateQuality();
    }
  }

  public clearMessages() {
    this.dayLog = [];
  }
}
