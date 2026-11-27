import "../styles/global.scss";
import { Button } from "./Button/button";
import { Form } from "./Form/form";
import { Input } from "./Input/input";
import { Component, xml, mount, useState } from "@odoo/owl";

const BUTTON_VARIANTS = [
    "primary", "secondary", "success", "warning",
    "danger", "neutral", "info",
];

const INPUT_VARIANTS = ["outlined", "filled", "underlined"];

const INPUT_SIZES = ["sm", "md", "lg"];

const INPUT_STATES = [
    { label: "Default", props: { placeholder: "Ketik di sini" } },
    { label: "Dengan nilai", props: { value: "Teks yang sudah terisi" } },
    { label: "Hint", props: { placeholder: "Nama lengkap", hint: "Sesuai KTP" } },
    { label: "Error", props: { value: "abc", error: "Format tidak valid" } },
    { label: "Disabled", props: { value: "Tidak bisa diubah", disabled: true } },
    { label: "Read only", props: { value: "Hanya bisa dibaca", readonly: true } },
    { label: "Required", props: { placeholder: "Wajib diisi", required: true } },
];

const INPUT_TYPES = [
    { label: "Text", props: { type: "text", placeholder: "Teks biasa" } },
    { label: "Email", props: { type: "email", placeholder: "nama@contoh.com" } },
    { label: "Password", props: { type: "password", placeholder: "Kata sandi" } },
    { label: "Number", props: { type: "number", placeholder: "0", min: "0", max: "100" } },
    { label: "Search", props: { type: "search", placeholder: "Cari..." } },
    { label: "Date", props: { type: "date" } },
];

class App extends Component {
    static components = { Button, Input, Form };

    static template = xml`
        <div>
            <h2>UI Kit Magazines</h2>

            <h5>Button :</h5>
            <div class="demo-row">
                <t t-foreach="buttonVariants" t-as="variant" t-key="variant">
                    <Button
                        label="variant"
                        variant="variant"
                        t-on-click="() => onClick(variant)"/>
                </t>
            </div>

            <t t-foreach="[1,2,3,4] " t-as="i" t-key="i">
            <br/>
            </t>

            <h3>Input :</h3>

            <h6>Varian</h6>
            <div class="demo-grid">
                <t t-foreach="inputVariants" t-as="v" t-key="v">
                    <Input label="v" variant="v" placeholder="'Ketik di sini'"/>
                </t>
            </div>

            <h6>Ukuran</h6>
            <div class="demo-grid">
                <t t-foreach="inputSizes" t-as="s" t-key="s">
                    <Input label="s" size="s" placeholder="'Ukuran ' + s"/>
                </t>
            </div>

            <h6>Varian x ukuran</h6>
            <t t-foreach="inputVariants" t-as="v" t-key="v">
                <div class="demo-grid">
                    <t t-foreach="inputSizes" t-as="s" t-key="s">
                        <Input
                            variant="v"
                            size="s"
                            placeholder="v + ' / ' + s"/>
                    </t>
                </div>
            </t>

            <h6>State</h6>
            <div class="demo-grid">
                <t t-foreach="inputStates" t-as="item" t-key="item.label">
                    <Input label="item.label" t-props="item.props"/>
                </t>
            </div>

            <h6>Tipe input</h6>
            <div class="demo-grid">
                <t t-foreach="inputTypes" t-as="item" t-key="item.label">
                    <Input label="item.label" t-props="item.props"/>
                </t>
            </div>

            <h6>Interaktif (validasi email)</h6>
            <div class="demo-grid">
                <Input
                    label="'Email'"
                    variant="'filled'"
                    value="state.email"
                    placeholder="'nama@contoh.com'"
                    hint="'Kami tidak akan membagikan email kamu'"
                    error="state.emailError"
                    onInput.bind="onEmailInput"/>
            </div>
            <t t-foreach="[1,2,3,4] " t-as="i" t-key="i">
            <br/>
            </t>

            <Form
            label="'Email'"
            placeholder="'nama@contoh.com'"
            buttonLabel="'Simpan'"
            onSubmit.bind="onSave"/>
        </div>

        
    `;

    buttonVariants = BUTTON_VARIANTS;
    inputVariants = INPUT_VARIANTS;
    inputSizes = INPUT_SIZES;
    inputStates = INPUT_STATES;
    inputTypes = INPUT_TYPES;

    setup() {
        this.state = useState({ email: "", emailError: "" });
    }

    onClick(variant) {
        alert(`Clicked ${variant}`);
    }

    onEmailInput(value) {
        this.state.email = value;
        this.state.emailError =
            value && !value.includes("@") ? "Format email tidak valid" : "";
    }

    onSave(value) {
        alert("Tersimpan: " + value);
    }
}

mount(App, document.getElementById("app"));