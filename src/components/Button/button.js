import { Component, xml } from "@odoo/owl";
import "./button.scss";

export class Button extends Component {
    static props = {
        label: String,
        variant: {
            type: String,
            optional: true,
        },
        "*": true,
    }

    static defaultProps = { variant: "primary" };
    static template = xml`
    <t t-name="Button">
    <button
        class="btn primary"
        t-att-class="'btn--' + props.variant"
        t-att="rest" >
        <t t-esc="props.label" />
    </button>
</t>
`
    get rest() {
        const { label, variant, ...rest } = this.props;
        return rest;
    }
}