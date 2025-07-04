export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {

            // Skip for sulfuras
            if (this.items[i].name == 'Sulfuras, Hand of Ragnaros')
                continue;

            // Modify sellIn
            this.items[i].sellIn = this.items[i].sellIn - 1;

            // Modify quality
            if (!['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert'].includes(this.items[i].name)) {

                // Check if is sold in time
                let decreaseQuality = this.items[i].sellIn < 0 ? 2 : 1;
                this.items[i].quality = Math.max(0, this.items[i].quality - decreaseQuality);

            } else {
                let addToQuality = this.items[i].sellIn < 0 ? 2 : 1;
                if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                    if (this.items[i].sellIn < 11) {
                        addToQuality = addToQuality + 1
                    }
                    if (this.items[i].sellIn < 6) {
                        addToQuality = addToQuality + 1
                    }

                    // If concert is done, pass goes to 0
                    addToQuality = this.items[i].sellIn < 0 ? -this.items[i].quality : addToQuality;
                }

                // Cap at 50
                this.items[i].quality = Math.min(50, this.items[i].quality + addToQuality);
            }
        }

        return this.items;
    }
}
