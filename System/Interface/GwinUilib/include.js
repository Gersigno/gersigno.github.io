import NavView from '/System/Interface/GwinUilib/NavView.js';
import Icon from '/System/Interface/GwinUilib/Icon.js';
import Debug from '/System/Services/Debug.js'
import hoverEffect from '/System/Interface/GwinUilib/HoverEffect.js';

new Debug();
new hoverEffect();

window.customElements.define("nav-view", NavView);
window.customElements.define("button-icon", Icon);