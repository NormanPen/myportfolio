import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';

const FIELDS = ['User.Name', 'User.Email', 'User.SmallPhotoUrl']; // Das Feld für das Profilbild

export default class RegisteredUser extends LightningElement {
    @wire(getRecord, { recordId: USER_ID, fields: FIELDS })
    wiredUser({ error, data }) {
        if (data) {
            // Daten erfolgreich abgerufen
            this.userInfo = {
                Name: data.fields.Name.value,
                Email: data.fields.Email.value
            };
            this.userProfileImageUrl = data.fields.SmallPhotoUrl.value;
        } else if (error) {
            // Fehler beim Abrufen der Daten
            console.error('Fehler beim Abrufen der Benutzerdaten', error);
        }
    }

    userInfo = {}; // Objekt für die Benutzerdaten
    userProfileImageUrl; // URL des Profilbilds
}
