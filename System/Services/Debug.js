import ColorToStylesheet from '/System/Utils/ColorToStylesheet.js';

export default class Debug {
    static debug_print = true;
    static icons = {
        main: "\u{E0B2}",
        clock: "\u{23F1}",
    };

    //Save original console.log/warn/error
    static types = {
        log: console.log,
        debug: console.debug,
        warn: console.warn,
        error: console.error
    };
    

    constructor() {
        //Hijack console.log to redirect to our function
        console.log = function (...args) {
            Debug.log(Debug.types.log, ...args);
        };
        console.debug = function (...args) {
            Debug.log(Debug.types.debug, ...args);
        };
        console.warn = function (...args) {
            Debug.log(Debug.types.warn, ...args);
        };
        console.error = function (...args) {
            Debug.log(Debug.types.error, ...args);
        };
    }

    static get_stack = function() {
        let stack;
        try {
          throw new Error('');
        }
        catch (error) {
          stack = error.stack || '';
        }
        stack = stack.split('\n').map(function (line) { return line.trim(); });
        return stack.splice(stack[0] == 'Error' ? 2 : 1);
    };

    static log(funcPtr,...args) {
        const datetime          = new Date();
        const time_hours        = datetime.getHours() <= 9 ? `0${datetime.getHours()}` : datetime.getHours();
        const time_minutes      = datetime.getMinutes() <= 9 ? `0${datetime.getMinutes()}` : datetime.getMinutes();
        const time_seconds      = datetime.getSeconds() <= 9 ? `0${datetime.getSeconds()}` : datetime.getSeconds();
        const time_milliseconds = datetime.getMilliseconds() <= 9 ? `0${datetime.getMilliseconds()}` : datetime.getMilliseconds();

        const stack = Debug.get_stack()[2];
        const origin_link = stack.split("/").pop().split(":")[0] + " (" + stack.split("/").pop().split(":")[1] + ":" + stack.split("/").pop().split(":")[2].replace(")", "") + ")";

        const header_line_start     = `\x1b[00m\u256D\u2500\x1b[01m`;
        const content_line_start    = `\x1b[00m\u2570\u2500\x1b[02m`;
        const icon_text             = `\x1b[37m${Debug.icons.main}\x1b[30m\x1b[47m \u{2692}`;
        const header_log            = `\x1b[37m\x1b[44m\u{E0BC}\x1b[37m   Log   \x1b[34m`;
        const header_debug          = `\x1b[37m\x1b[48m\u{E0BC}\x1b[37m  Debug  \x1b[38m`;
        const header_warn           = `\x1b[37m\x1b[43m\u{E0BC}\x1b[30m Warning \x1b[33m`;
        const header_error          = `\x1b[37m\x1b[41m\u{E0BC}\x1b[30m  Error  \x1b[31m`;
        const header_time           = `\x1b[42m\u{E0BC}\x1b[37m ${Debug.icons.clock} ${time_hours}:${time_minutes}:${time_seconds}:${time_milliseconds} \x1b[32m\x1b[42m`;
        const header_instigator     = `\x1b[45m\u{E0BC} \x1b[20m${origin_link}\x1b[13m \x1b[12m\x1b[35m\u{E0B0}`;

        let log_type_text;

        switch(arguments[0]) {
            case Debug.types.log:
                log_type_text = header_log;
                break;
            case Debug.types.debug:
                log_type_text = header_debug;
                break;
            case Debug.types.warn:
                log_type_text = header_warn;
                break;
            case Debug.types.error:
                log_type_text = header_error;
                break;
            default:
                log_type_text = header_log;
                break;
        }
        if((Debug.debug_print && arguments[0] == Debug.types.debug) || arguments[0] != Debug.types.debug) {
            const header_content = `${header_line_start}${icon_text} ${log_type_text}${header_time}${header_instigator}\n\x1b[00m\x1b[10m${content_line_start}`;
            const { formatted_text, css_styles } = ColorToStylesheet.ansiToCss(header_content);
            // Debug.types.log(formatted_text);
            // Debug.types.log(css_styles);
            // Debug.types.log(...args);
            const log_args = [formatted_text];

            css_styles.forEach(style => {
                log_args.push(style || "");
            });

            if (args.length > 0) {
                log_args.push(...args);
            }

            console.groupCollapsed(formatted_text, ...css_styles, ...args);
            Debug.types.log("Origin " + stack);
            console.groupCollapsed("View full log");
                funcPtr(...args);
            console.groupEnd()
            console.groupCollapsed("Trace");
                    
                    funcPtr(console.trace("Trace"));
                console.groupEnd()
                console.groupCollapsed("Context");
                    funcPtr(console.context())
                console.groupEnd()
            console.groupEnd()
            return undefined;
        }
    }
}