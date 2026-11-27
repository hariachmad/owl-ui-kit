import { Component, xml } from "@odoo/owl";
import "./input.scss";

let nextId = 0;

export class Input extends Component {
    static props = {
        value: { type: String, optional: true },
        type: { type: String, optional: true },
        variant: { type: String, optional: true },   // outlined | filled | underlined
        size: { type: String, optional: true },      // sm | md | lg
        label: { type: String, optional: true },
        hint: { type: String, optional: true },
        error: { type: String, optional: true },    
        onInput: { type: Function, optional: true },
        "*": true,
    };

    static defaultProps = {
        value: "",
        type: "text",
        variant: "outlined",
        size: "md",
    };

    static template = xml`
    <div class="field">
        <label t-if="props.label" class="field__label" t-att-for="inputId">
            <t t-esc="props.label"/>
        </label>
        <input
            class="input"
            t-att-class="inputClass"
            t-att-id="inputId"
            t-att-type="props.type"
            t-att-value="props.value"
            t-att-aria-invalid="props.error ? 'true' : false"
            t-att="rest"
            t-on-input="onInput"/>
        <span t-if="props.error" class="field__error">
            <t t-esc="props.error"/>
        </span>
        <span t-elif="props.hint" class="field__hint">
            <t t-esc="props.hint"/>
        </span>
    </div>
    `;

    setup() {
        this.autoId = `input-${nextId++}`;
    }

    get inputId() {
        return this.props.id || this.autoId;
    }

    get inputClass() {
        const classes = [`input--${this.props.variant}`];
        if (this.props.size !== "md") {
            classes.push(`input--${this.props.size}`);
        }
        if (this.props.error) {
            classes.push("input--error");
        }
        return classes.join(" ");
    }

    get rest() {
        const {
            value, type, variant, size, label, hint, error, onInput, id,
            ...rest
        } = this.props;
        return rest;
    }

    onInput(ev) {
        this.props.onInput?.(ev.target.value, ev);
    }
}