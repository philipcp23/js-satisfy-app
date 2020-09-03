import uniqueid from 'uniqueid';

export default class List {
    constructor() {
        this.item = [];
    }

    addItem(id, count, unit, ingredient) {
        const item = {
            id: uniqueid(),
            count,
            unit,
            ingredient
        }        
    };

    deleteItem(id) {
        const index = this.item.findIndex(el => el.id === id);
        this.item.splice(index, 1);
    };

    updateCount(id, newCount) {
        this.item.find(el => el.id === id).count = newCount;
    };
}