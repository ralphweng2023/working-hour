const IFormatter = require('./IFormatter');

class JsonFormatter extends IFormatter {
    format(data) {
        return JSON.stringify(data, null, 2); // Pretty print with 2-space indentation
    }
}

module.exports = JsonFormatter;
