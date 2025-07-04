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

    private checkConjured(item: Item): string {

        // Delete Conjured for normal parsing of items
        return item.name.replace('Conjured', '');
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {

            // Skip for sulfuras
            if (this.items[i].name.includes('Sulfuras'))
                continue;

            // Compare name to check conjuring, multiply degrade by 2 if conjured
            const conjuredFactor: number = this.items[i].name == this.checkConjured(this.items[i]) ? 1 : 2;

            // Modify sellIn
            this.items[i].sellIn = this.items[i].sellIn - 1;

            // Modify quality
            if(!(this.items[i].name.includes('Brie') || this.items[i].name.includes('Backstage pass'))) {

                // Check if is sold in time
                let decreaseQuality = this.items[i].sellIn < 0 ? 2 : 1;
                this.items[i].quality = Math.max(0, this.items[i].quality - decreaseQuality * conjuredFactor);

            } else {
                let addToQuality = this.items[i].sellIn < 0 ? 2 : 1;
                if (this.items[i].name.includes('Backstage pass')) {
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
