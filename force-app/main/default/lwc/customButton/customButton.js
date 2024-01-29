import { LightningElement, api } from 'lwc';

export default class CustomButton extends LightningElement {
    @api label = 'Button';

    handleClick() {
        this.dispatchEvent(new CustomEvent('buttonclick'));
    }
}
