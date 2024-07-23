import { css, html } from 'lit';
import { LionTooltip } from '@lion/ui/tooltip.js';

class DemoTooltip extends LionTooltip {
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          --tooltip-arrow-width: 16px;
          --tooltip-arrow-height: 8px;
          fill: darkgrey;
        }

        :host ::slotted([slot='content']) {
          display: block;
          font-size: 14px;
          color: white;
          background-color: darkgrey;
          border-radius: 4px;
          padding: 2px 8px;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.hasArrow = true;
    /**
     * Decides whether the tooltip invoker text should be considered a description
     * (sets aria-describedby) or a label (sets aria-labelledby).
     * @type {'label'|'description'}
     */
    this.invokerRelation = 'label';
  }

  // Override config getter/setter pair to convert popperConfig to popper 2
  get config() {
    return super.config;
  }

  /** @param {OverlayConfig} value */
  set config(value) {
    if (value.popperConfig) {
      // eslint-disable-next-line no-param-reassign
      value.popperConfig = convertPopperConfig(value.popperConfig);
    }
    super.config = value;
  }

  // eslint-disable-next-line class-methods-use-this
  _arrowTemplate() {
    return html`
      <svg class="arrow__graphic" viewBox="0 0 16 8">
        <path
          d="M16,0 L10.0166133,7.01721836 C8.90530216,8.32531955 7.09884797,8.32694781 5.98407499,7.0218636 C5.98248447,7.01884255 5.98090672,7.01584578 5.97934072,7.01287286 L0,0"
        ></path>
      </svg>
    `;
  }

  _showMouse() {
    if (!this._keyActive) {
      this._mouseActive = true;
      setTimeout(() => {
        if (this._mouseActive) {
          this.opened = true;
        }
      }, 1000);
    }
  }

  _hideMouse() {
    if (!this._keyActive) {
      this._mouseActive = false;
      setTimeout(() => {
        if (!this._mouseActive) {
          this.opened = false;
        }
      }, 1500);
    }
  }
}

customElements.define("demo-tooltip", DemoTooltip);
