import { Item } from "./item";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert" &&
        this.items[i].name != "Conjured Mana Cake"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            this.decreaseQuality(this.items[i], 1);
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          if (this.items[i].name != "Conjured Mana Cake")
            this.increaseQuality(this.items[i], 1);
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.increaseQuality(this.items[i], 1);
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.increaseQuality(this.items[i], 1);
              }
            }
          }
        }
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.decreaseSellIn(this.items[i]);
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].quality > 0) {
              if (
                this.items[i].name != "Sulfuras, Hand of Ragnaros" &&
                this.items[i].name != "Conjured Mana Cake"
              ) {
                this.decreaseQuality(this.items[i], 1);
              }
            }
          } else if (this.items[i].name != "Conjured Mana Cake") {
            this.decreaseQuality(this.items[i], this.items[i].quality);
          }
        } else {
          if (
            this.items[i].quality < 50 &&
            this.items[i].name != "Conjured Mana Cake"
          ) {
            this.increaseQuality(this.items[i], 1);
          }
        }
      }

      if (this.items[i].name == "Conjured Mana Cake") {
        let quality = this.items[i].quality;

        if (quality - 2 > 0) {
          this.decreaseQuality(this.items[i], 2);
        }
      }
    }

    return this.items;
  }

  private decreaseSellIn(item: Item) {
    item.sellIn = item.sellIn - 1;
  }

  private increaseQuality(item: Item, amount: number) {
    item.quality = item.quality + amount;
  }

  private decreaseQuality(item: Item, amount: number) {
    item.quality = item.quality - amount;
  }
}
