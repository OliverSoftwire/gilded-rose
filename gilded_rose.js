class Item {
	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}

	setQuality(quality) {
		this.quality = Math.min(Math.max(quality, 0), 50);
	}

	updateQuality() {}
}

class BasicItem extends Item {
	constructor(name, sellIn, quality, qualityChange = -1) {
		super(name, sellIn, quality);

		this.qualityChange = qualityChange;
	}

	updateQuality() {
		this.sellIn--;
		this.setQuality(this.quality + this.qualityChange * (this.sellIn >= 0 ? 1 : 2));
	}
}

class ConjuredItem extends BasicItem {
	constructor(name, sellIn, quality) {
		super(name, sellIn, quality, -2);
	}
}

class LegendaryItem extends Item {
	constructor(name, quality) {
		super(name, 0, quality);
	}
}

class BackstagePass extends Item {
	updateQuality() {
		if (this.sellIn < 0) {
			this.setQuality(0);
			return;
		}

		let newQuality = this.quality + 1;
		if (this.sellIn <= 10) {
			newQuality++;
		}
		if (this.sellIn <= 5) {
			newQuality++;
		}

		this.setQuality(newQuality);
		this.sellIn--;
	}
}

class Shop {
	constructor(items = []) {
		this.items = items;
	}

	updateQuality() {
		this.items.forEach(item => item.updateQuality());
	}

	printStock() {
		this.items.forEach(item => console.log(item));
	}
}

const shop = new Shop([
	new LegendaryItem("Sulfuras, Hand of Ragnaros", 80),
	new BasicItem("Aged Brie", 10, 0, 1),
	new BasicItem("Witchwood Apple", 3, 15),
	new BasicItem("Diving Elixir", 11, 50),
	new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 15, 5),
	new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 25, 5),
	new BackstagePass("Backstage passes to an Ice Cream Boys concert", 25, 5),
	new ConjuredItem("Conjured Wizard Hat", 20, 50),
	new ConjuredItem("Conjured Wizard Robes", 16, 50)
]);

shop.printStock();
for (let day = 1; day < 21; day++) {
	shop.updateQuality();
	shop.printStock();
}
