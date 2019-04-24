import { Item } from "./item";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      switch (this.GetItemName(i)) {
        case ItemName.Aged_Brie:
          this.increaseQuality(this.items[i], 1);
          this.decreaseSellIn(this.items[i]);
          break;
        case ItemName.Conjured_Mana_Cake:
          this.decreaseSellIn(this.items[i]);
          break;

        case ItemName.Sulfuras:
          this.decreaseSellIn(this.items[i]);
          break;

        case ItemName.Backstage_Passes:
          if (this.GetItemQuality(i) < 50) {
            this.increaseQuality(this.items[i], 1);

            if (this.GetItemSellIn(i) < 11) {
              if (this.GetItemQuality(i) < 50) {
                this.increaseQuality(this.items[i], 1);
              }
            }
            if (this.GetItemSellIn(i) < 6) {
              if (this.GetItemQuality(i) < 50) {
                this.increaseQuality(this.items[i], 1);
              }
            }
          }
          this.decreaseSellIn(this.items[i]);
          if (this.GetItemSellIn(i) < 0) {
            this.decreaseQualityNoLessThanZero(
              this.items[i],
              this.items[i].quality
            );
          }
          break;
        default:
          this.decreaseQualityNoLessThanZero(this.items[i], 1);

          this.decreaseSellIn(this.items[i]);
          if (this.GetItemSellIn(i) < 0) {
            this.decreaseQualityNoLessThanZero(this.items[i], 1);
          }
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

  private GetItemQuality(itemIndex: number) {
    return this.items[itemIndex].quality;
  }

  private GetItemSellIn(itemIndex: number) {
    return this.items[itemIndex].sellIn;
  }

  private GetItemName(itemIndex: number) {
    return this.items[itemIndex].name;
  }
}

export class ItemName {
  public static Aged_Brie = "Aged Brie";
  public static Backstage_Passes = "Backstage passes to a TAFKAL80ETC concert";
  public static Conjured_Mana_Cake = "Conjured Mana Cake";
  public static Sulfuras = "Sulfuras, Hand of Ragnaros";
  public static Dexterity_Vest = "+5 Dexterity Vest";
  public static Elixir_Mongoose = "Elixir of the Mongoose";
}
