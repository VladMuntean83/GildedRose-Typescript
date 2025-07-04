import { Item, GildedRose } from '../app/gilded-rose';

// Add a master test here

const itemArr: Item[] = [
    new Item('book', 3, 5),
    new Item('Aged Brie', 10, 50),
    new Item('expired milk', 0, 2),
    new Item('bad candy', 0, 0),
    new Item('Backstage passes to a TAFKAL80ETC concert', 2, 9),
    new Item('Sulfuras, Hand of Ragnaros', 10, 80),
    new Item('Backstage passes to a TAFKAL80ETC concert', 8, 9)
];

const gildedRose: GildedRose = new GildedRose(itemArr);

console.log("After update:");

gildedRose.updateQuality();

for (const item of gildedRose.items) {
    console.log(item);
}

console.log("Done!");