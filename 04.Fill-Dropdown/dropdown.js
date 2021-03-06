import {html, render} from '../node_modules/lit-html/lit-html.js';
import {getOptions, createOption} from './api.js';


const dropMenu = document.getElementById('menu');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

updateMenu();

async function updateMenu() {
    const records = await getOptions();
    const options = Object.values(records);

    const elementTemplate = (options) => html`${options.map(option => html`<option value="${option._id}">${option.text}</option>`)}`;
    render(elementTemplate(options), dropMenu);
}

async function onSubmit(event) {
    event.preventDefault();

    const text = new FormData(form).get('text');

    form.reset();
    await createOption({text});
    updateMenu();
}