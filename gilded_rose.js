class Item {
	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}

	clone() {
		return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
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

		const qualityMultiplier = this.sellIn >= 0 ? 1 : 2;
		this.setQuality(this.quality + this.qualityChange * qualityMultiplier);
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

class TablePrinter {
	constructor(columnNames) {
		this.columnHeaders = columnNames.map(name => {
			return {
				name: name,
				longestString: name.length
			}
		});
		this.rows = [];
	}

	pushRow(row) {
		if (row.length !== this.columnHeaders.length) {
			throw "Row width does not match number of columns";
		}

		row = row.map(field => field.toString());

		for (let column = 0; column < this.columnHeaders.length; column++) {
			this.columnHeaders[column].longestString = Math.max(
				this.columnHeaders[column].longestString,
				row[column].length
			);
		}

		this.rows.push(row);
	}

	toString() {
		let buffer = "";
		
		this.columnHeaders.forEach(header => {
			const padding = header.longestString - header.name.length;
			buffer += header.name + " ".repeat(padding) + " | ";
		});
		buffer = buffer.slice(0, -3);

		this.rows.forEach(row => {
			buffer += "\n";

			for (let column = 0; column < this.columnHeaders.length; column++) {
				const padding = this.columnHeaders[column].longestString - row[column].length;
				buffer += " ".repeat(padding) + row[column] + " | ";
			}

			buffer = buffer.slice(0, -3);
		})

		return buffer;
	}

	print() {
		console.log(this.toString());
	}
}

class Shop {
	constructor(items = []) {
		this.items = items.map(item => item.clone());
		this.day = 0;
	}

	updateQuality() {
		this.items.forEach(item => item.updateQuality());
		this.day++;
	}

	printStock() {
		const tablePrinter = new TablePrinter([`End of day ${this.day}`, "Sel", "Qua"]);
		this.items.forEach(item => tablePrinter.pushRow([item.name, item.sellIn, item.quality]));
		tablePrinter.print();
	}
}

function sleep(seconds) {
	return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function main() {
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

	while (true) {
		shop.updateQuality();
		shop.printStock();
		await sleep(10);
	}
}

//main();
