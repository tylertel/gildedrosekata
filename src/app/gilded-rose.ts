import { Item } from "./item";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      switch (this.items[i].name) {
        case "Aged Brie":
          this.increaseQuality(this.items[i], 1);
          this.decreaseSellIn(this.items[i]);
          break;
        case "Conjured Mana Cake":
          this.decreaseSellIn(this.items[i]);
        break;

        case "Sulfuras, Hand of Ragnaros":
          this.decreaseSellIn(this.items[i]);
        break;

        default:
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
              this.decreaseQualityNoLessThanZero(this.items[i], 1);
          } else {
            if (this.items[i].quality < 50) {
                this.increaseQuality(this.items[i], 1);
              if (
                this.items[i].name ==
                "Backstage passes to a TAFKAL80ETC concert"
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
            this.decreaseSellIn(this.items[i]);
          if (this.items[i].sellIn < 0) {
            if (this.items[i].name != "Aged Brie") {
              if (
                this.items[i].name !=
                "Backstage passes to a TAFKAL80ETC concert"
              ) {
                
                  this.decreaseQualityNoLessThanZero(this.items[i], 1);
                
              } else {
                this.decreaseQualityNoLessThanZero(
                  this.items[i],
                  this.items[i].quality
                );
              }
            } else {
              if (
                this.items[i].quality < 50
              ) {
                this.increaseQuality(this.items[i], 1);
              }
            }
          }

          // if (this.items[i].name == "Conjured Mana Cake") {
          //   this.decreaseQualityNoLessThanZero(this.items[i], 2);
          // }
          break;
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

  private decreaseQualityNoLessThanZero(item: Item, amount: number) {
    if (item.quality - amount >= 0) {
      item.quality = item.quality - amount;
    } else {
      item.quality = 0;
    }
  }
}
