import { LightningElement, track } from 'lwc';

export default class Calender extends LightningElement {

    @track currentDate;
    @track Monday;
    @track Tuesday;
    @track Wednesday;
    @track Thursday;
    @track Friday;
    @track Saturday;
    @track Sunday;

    connectedCallback() {
        // Beim Laden der Komponente Wochentage und aktuelles Datum setzen
        this.setCurrentWeek();
    }

    setCurrentWeek(selectedDate = new Date()) {
        // Berechne das Startdatum der Woche basierend auf dem ausgewählten Datum
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

        // Setze das aktuelle Datum und Wochentage für die Kopfzeile der Tabelle
        this.currentDate = selectedDate.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        this.Monday = this.getDayWithDate(startOfWeek, 1);
        this.Tuesday = this.getDayWithDate(startOfWeek, 2);
        this.Wednesday = this.getDayWithDate(startOfWeek, 3);
        this.Thursday = this.getDayWithDate(startOfWeek, 4);
        this.Friday = this.getDayWithDate(startOfWeek, 5);
        this.Saturday = this.getDayWithDate(startOfWeek, 6);
        this.Sunday = this.getDayWithDate(startOfWeek, 0);
    }

    handleDateChange(event) {
        const selectedDate = event.target.value ? new Date(event.target.value) : new Date();
        this.setCurrentWeek(selectedDate);
        console.log('Ausgewähltes Datum:', selectedDate.toLocaleDateString('de-DE'));
        // Hier kannst du weitere Aktionen mit dem ausgewählten Datum durchführen
    }

    getFormattedDate() {
        const today = new Date();
        const options = { day: 'numeric' };
        return today.toLocaleDateString('de-DE', options);
    }

    getDayWithDate(baseDate, addDays) {
        const targetDate = new Date(baseDate);
        targetDate.setDate(baseDate.getDate() + addDays);
        const options = { weekday: 'long', day: 'numeric' };
        return targetDate.toLocaleDateString('de-DE', options);
    }
}
