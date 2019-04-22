import { Item } from "./item";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.ProcessItem(i);
    }

    return this.items;
  }

  private ProcessItem(itemIndex: number) {
    if (
      this.NonLegendaryItems(itemIndex)
    ) {
      if (this.GetItemQuality(itemIndex) > 0) {
        if (this.GetItemName(itemIndex) != ItemName.Sulfuras) {
          this.DecrementQuality(itemIndex);
        }
      }
    } else {
      this.ProcessLegendaryItem(itemIndex);
    }
    if (this.GetItemName(itemIndex) != ItemName.Sulfuras) {
      this.DecrementSellIn(itemIndex);
    }
    if (this.GetItemSellIn(itemIndex) < 0) {
      if (this.GetItemName(itemIndex) != ItemName.Aged_Brie) {
        if (
          this.GetItemName(itemIndex) != ItemName.Backstage_Passes
        ) {
          if (this.GetItemQuality(itemIndex) > 0) {
            if (
              this.GetItemName(itemIndex) != ItemName.Sulfuras &&
              this.GetItemName(itemIndex) != ItemName.Conjured_Mana_Cake
            ) {
              this.DecrementQuality(itemIndex);
            }
          }
        } else if (this.GetItemName(itemIndex) != ItemName.Conjured_Mana_Cake) {
          this.DecrementQuality(itemIndex, this.GetItemQuality(itemIndex));
        }
      } else {
        if (
          this.GetItemQuality(itemIndex) < 50 &&
          this.GetItemName(itemIndex) != ItemName.Conjured_Mana_Cake
        ) {
          this.IncrementQuality(itemIndex);
        }
      }
    }
    if (this.GetItemName(itemIndex) == ItemName.Conjured_Mana_Cake) {
      if (this.GetItemQuality(itemIndex) - 2 > 0) this.DecrementQuality(itemIndex, 2);
    }
  }

  private GetItemQuality(itemIndex: number) {
    return this.GetItemQuality(itemIndex);
  }

  private GetItemName(itemIndex: number) {
    return this.GetItemName(itemIndex);
  }

  private ProcessLegendaryItem(itemIndex: number) {
    if (this.GetItemQuality(itemIndex) < 50) {
      if (this.GetItemName(itemIndex) != ItemName.Conjured_Mana_Cake)
        this.IncrementQuality(itemIndex);
      if (this.GetItemName(itemIndex) == ItemName.Backstage_Passes) {
        if (this.GetItemSellIn(itemIndex) < 11) {
          if (this.GetItemQuality(itemIndex) < 50) {
            this.IncrementQuality(itemIndex);
          }
        }
        if (this.GetItemSellIn(itemIndex) < 6) {
          if (this.GetItemQuality(itemIndex) < 50) {
            this.IncrementQuality(itemIndex);
          }
        }
      }
    }
  }

  private GetItemSellIn(itemIndex: number) {
    return this.items[itemIndex].sellIn;
  }

  private NonLegendaryItems(itemIndex: number) {
    return this.GetItemName(itemIndex) != ItemName.Aged_Brie &&
      this.GetItemName(itemIndex) != ItemName.Backstage_Passes &&
      this.GetItemName(itemIndex) != ItemName.Conjured_Mana_Cake;
  }

  private DecrementSellIn(itemIndex: number) {
    this.items[itemIndex].sellIn = this.GetItemSellIn(itemIndex) - 1;
  }

  private IncrementQuality(itemIndex: number) {
    this.items[itemIndex].quality = this.GetItemQuality(itemIndex) + 1;
  }

  private DecrementQuality(itemIndex: number, value: number = 1) {
    this.items[itemIndex].quality = this.GetItemQuality(itemIndex) - value;
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
