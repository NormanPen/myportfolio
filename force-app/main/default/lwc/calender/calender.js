// Importiere notwendige Module von Lightning Web Components
import { LightningElement, track } from 'lwc';

// Deklariere und exportiere die Lightning-Webkomponenten-Klasse
export default class Calendar extends LightningElement {

    // Deklariere verfolgbare Attribute für den aktuellen Tag und jeden Wochentag
    @track currentDate;
    @track Monday;
    @track Tuesday;
    @track Wednesday;
    @track Thursday;
    @track Friday;
    @track Saturday;
    @track Sunday;

    // Wird aufgerufen, wenn die Komponente mit dem DOM verbunden ist
    connectedCallback() {
        // Setze die aktuelle Woche beim Laden der Komponente
        this.setCurrentWeek();
    }

    // Methode zum Setzen der aktuellen Woche basierend auf dem ausgewählten Datum oder dem aktuellen Datum, falls keines ausgewählt wurde
    setCurrentWeek(selectedDate = new Date()) {
        // Berechne den Start der Woche für das ausgewählte Datum
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

        // Aktualisiere die verfolgbaren Attribute für den aktuellen Tag und jeden Wochentag
        this.currentDate = selectedDate.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        this.Monday = this.getDayWithDate(startOfWeek, 1);
        this.Tuesday = this.getDayWithDate(startOfWeek, 2);
        this.Wednesday = this.getDayWithDate(startOfWeek, 3);
        this.Thursday = this.getDayWithDate(startOfWeek, 4);
        this.Friday = this.getDayWithDate(startOfWeek, 5);
        this.Saturday = this.getDayWithDate(startOfWeek, 6);
        this.Sunday = this.getDayWithDate(startOfWeek, 0);
    }

    // Handler-Methode für die Änderung des ausgewählten Datums
    handleDateChange(event) {
        // Konvertiere das ausgewählte Datum in ein JavaScript-Date-Objekt oder setze es auf das aktuelle Datum, falls keines ausgewählt wurde
        const selectedDate = event.target.value ? new Date(event.target.value) : new Date();
        // Aktualisiere die aktuelle Woche basierend auf dem ausgewählten Datum
        this.setCurrentWeek(selectedDate);
        // Könnte dazu verwendet werden, das ausgewählte Datum auf der Konsole auszugeben
        // console.log('Ausgewähltes Datum:', selectedDate.toLocaleDateString('de-DE'));
    }

    // Methode zum Abrufen des aktuellen Datums in einem bestimmten Format
    getFormattedDate() {
        const today = new Date();
        const options = { day: 'numeric' };
        return today.toLocaleDateString('de-DE', options);
    }

    // Methode zum Abrufen des Wochentags für ein bestimmtes Datum
    getDayWithDate(baseDate, addDays) {
        const targetDate = new Date(baseDate);
        targetDate.setDate(baseDate.getDate() + addDays);
        const options = { weekday: 'long', day: 'numeric' };
        return targetDate.toLocaleDateString('de-DE', options);
    }
}
