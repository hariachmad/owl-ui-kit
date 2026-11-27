import { Component, xml, useState } from "@odoo/owl";
import { Input } from "../Input/input";
import { Button } from "../Button/button";

export class Form extends Component {
    static components = { Input, Button };

    static props = {
        label: String,
        placeholder: { type: String, optional: true },
        buttonLabel: { type: String, optional: true },
        onSubmit: { type: Function, optional: true },
        "*": true,
    };

    static defaultProps = { buttonLabel: "Kirim" };
    
    static template = xml`
        <form class="form" novalidate="novalidate" t-on-submit.prevent="onSubmit">
            <Input
                label="props.label"
                placeholder="props.placeholder"
                value="state.value"
                error="state.error"
                onInput.bind="onInput"/>
            <Button label="props.buttonLabel" type="'submit'"/>
        </form>
    `;

    setup() {
        this.state = useState({ value: "", error: "" });
    }

    onInput(value) {
        this.state.value = value;
        if (this.state.error) {
            this.state.error = "";
        }
    }

    onSubmit() {
        const value = this.state.value.trim();
        if (!value) {
            this.state.error = "Wajib diisi";
            return;
        }
        this.props.onSubmit?.(value);
        this.state.value = "";
    }
}