import React from 'react';

class Dispense extends React.Component {
    constructor(props) {
        super(props);
        this.updateItem = this.updateItem.bind(this)
        this.addItem = this.addItem.bind(this)
    }

    updateItem(event){
        const id = event.target.id.split('_')
        const item_id = id[1]
        let temp_supportedDispenseItems = this.props.attributes.supportedDispenseItems

        if(id[0] === 'lang'){
            temp_supportedDispenseItems[item_id].item_name_synonyms[0].lang = event.target.value;
        } else if (id[0] === 'names'){
            temp_supportedDispenseItems[item_id].item_name_synonyms[0].synonym = event.target.value.split(',');
            temp_supportedDispenseItems[item_id].item_name = event.target.value.split(',')[0]
        } else if (id[0] === 'units'){
            temp_supportedDispenseItems[item_id].supported_units[0] = event.target.value;
        } else if (id[0] === 'amount'){
            temp_supportedDispenseItems[item_id].default_portion[0] = event.target.value;
        } else if (id[0] === 'unit'){
            temp_supportedDispenseItems[item_id].default_portion[0] = event.target.value;
        }

        this.props.update('attributes/supportedDispenseItems', temp_supportedDispenseItems);
    }

    addItem(){
        let temp_supportedDispenseItems = this.props.attributes.supportedDispenseItems
        temp_supportedDispenseItems.push({
            "item_name": "",
            "supported_units": [""],
            "item_name_synonyms": [{
                "synonyms": [""],
                "lang": "en"
            }],
            "default_portion": [{
                "amount": "",
                "unit": ""
            }]
        });
        this.props.update('attributes/supportedDispenseItems', temp_supportedDispenseItems);
    }

    render (){
        const names_box = {
            width: '150px'
        }
        const portions_box = {
            width: '30px'
        }

        const items = this.props.attributes.supportedDispenseItems.map((item, i)  => {

            return (
                <div key={i}>
                    <div className="two_table_row">
                        <div className="two_table_cel">
                        </div>
                        <div className="two_table_cel">
                            <label>
                                <span>Language: </span>
                                <select name="type" id={"lang_" + i} value={item.item_name_synonyms[0].lang} onChange={this.updateItem}>
                                    <option value="es">es</option>
                                    <option value="en">en</option>
                                </select>
                            </label>
                            <label style={names_box}>
                                <span>Item name: </span>
                                <input type="text" id={"names_" + i} defaultValue={item.item_name_synonyms[0].synonym} placeholder="Item name" onChange={this.updateItem}/>
                            </label>
                            <label>
                                <span>Units: </span>
                                <select name="type" id={"units_" + i} value={item.supported_units[0]} onChange={this.updateItem}>
                                    <option value="NO_UNITS">No units</option>
                                    <option value="UNKNOWN_UNITS">Unkown</option>
                                    <option value="CENTIMETERS">Centimeters</option>
                                    <option value="CUPS">Cups</option>
                                    <option value="DECILITERS">Deciliters</option>
                                    <option value="FEET">Feet</option>
                                    <option value="FLUID_OUNCES">Fluid ounces</option>
                                    <option value="GALLONS">Gallons</option>
                                    <option value="GRAMS">Grams</option>
                                    <option value="INCHES">Inches</option>
                                    <option value="KILOGRAMS">Kilograms</option>
                                    <option value="LITERS">Liters</option>
                                    <option value="METERS">Meters</option>
                                    <option value="MILLIGRAMS">Miligrams</option>
                                    <option value="MILLILITERS">Mililiters</option>
                                    <option value="MILLIMETERS">Milimeters</option>
                                    <option value="OUNCES">Ounces</option>
                                    <option value="PINCH">Pinch</option>
                                    <option value="PINTS">Pints</option>
                                    <option value="PORTION">Portion</option>
                                    <option value="POUNDS">Pounds</option>
                                    <option value="QUARTS">Quarts</option>
                                    <option value="TABLESPOONS">Tablespoons</option>
                                    <option value="TEASPOONS">Teaspoons</option>
                                </select>
                            </label>
                            <label style={portions_box}>
                                <span>Dispensed amount: </span>
                                <input type="text" id={"amount_" + i} defaultValue={item.default_portion[0].amount} placeholder="Amount" onChange={this.updateItem}/>
                            </label>
                            <label style={portions_box}>
                                <span>Dispensed unit: </span>
                                <input type="text" id={"unit_" + i} defaultValue={item.default_portion[0].unit} placeholder="Unit" onChange={this.updateItem}/>
                            </label>
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div>

                <div className="three_table_row">
                    <div className="three_table_cel align_right">
                        Add a item
                    </div>
                    <div className="three_table_cel">
                        <button type="button" className="add_attribute_button" onClick={ this.addItem }>Add</button>
                    </div>
                </div>

                {items}

            </div>
        );
    }
}

export default Dispense