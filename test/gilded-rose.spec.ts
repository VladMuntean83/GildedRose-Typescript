import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Standard Quality', function () {

    it('should decrease by 1', function() {
        const gildedRose = new GildedRose([ new Item('foo', 2, 2) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(1);
    });
});

describe('Standard SellIn', function () {

    it('should decrease by 1', function() {
        const gildedRose = new GildedRose([ new Item('foo', 2, 2) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(1);
    });
});

describe('Quality if SellIn negative', function () {

    it('should decrease by 2', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 2) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });
});

describe('Quality never negative', function () {

    it('should stay 0', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });
});

describe('Brie increases quality', function () {

    it('should increase by 1', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 20, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(1);
    });
});

describe('Brie never above 50', function () {

    it('should stay 50', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 20, 50) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(50);
    });
});

describe('Brie double quality, sellIn negative', function () {

    it('should increase by 2 when sellIn negative', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(2);
    });
});

describe('Backstage increases quality normal', function () {

    it('should increase by 1', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 20, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(1);
    });
});

describe('Backstage increases quality 10 days', function () {

    it('should increase by 1', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(2);
    });
});

describe('Backstage increases quality 5 days', function () {

    it('should increase by 1', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(3);
    });
});

describe('Backstage quality after concert', function () {

    it('should drop to 0', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });
});

describe('Sulfura unmodified', function () {

    it('quality and sellIn should stay the same', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 10, 80) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(80);
        expect(items[0].sellIn).to.equal(10);
    });
});

describe('Conjured standard', function () {

    it('quality decreases by 2', function() {
        const gildedRose = new GildedRose([ new Item('Conjured watermelon', 10, 2) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });
});

describe('Conjured Brie/Backstage pass', function () {

    it('quality decreases normally (Brie/Backstage pass)', function() {
        const gildedRose = new GildedRose([
            new Item('Conjured Brie', 10, 2),
            new Item('Conjured Backstage pass', 20, 2)
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(3);
        expect(items[1].quality).to.equal(3);
    });
});

describe('Conjured Sulfura', function () {

    it('stays unmodified', function() {
        const gildedRose = new GildedRose([ new Item('Conjured Sulfuras', 10, 80) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(80);
        expect(items[0].sellIn).to.equal(10);
    });
});
