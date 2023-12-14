const app = Vue.createApp({
    data() {
        return {
            inputText: '',
            leadingApostrophe: true,
        };
    },
    computed: {
        parsedText() {
            return this.inputText.split('\n').map(line => {
                return line.split('\t').map(phoneNumber => {
                    if (phoneNumber.trim() === '') {
                        return '';
                    }
                    const parsedPhoneNumber = libphonenumber.parsePhoneNumberFromString(phoneNumber, 'BE');
                    if (!parsedPhoneNumber) {
                        return 'Invalid number';
                    }
                    let formattedNumber = parsedPhoneNumber.format('E.164').replace(/\s/g, '');
                    if (this.leadingApostrophe) {
                        formattedNumber = "'" + formattedNumber;
                    }
                    return formattedNumber;
                }).join('\t'); // Join the numbers in a line back with tabs
            }).join('\n'); // Join the lines with new lines
        }
    }
    
});

app.mount('#app');
