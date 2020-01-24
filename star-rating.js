import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { beforeNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

/**
 * Shows 5 star rating or enables a 5 star rating using paper-icon-button and iron-icon.*
 *
 * ### Usage
 * Rating can be set as an attribute. It will round to the nearest half star,
 * so a rating of 2.3 would end up as 2.5 stars.
 *
 * ```html
 *  <star-rating rating="2.3"></star-rating>
 *  ```
 *
 *  ### Styling
 *  Custom property | Description | Default
 *  ----------------|-------------|----------
 *  `--star-color` | Color set for stars | `#faca43`
 *  `--star-rating` | Mixin for star-rating | `{}`
 *  `--star-rating-detail` | Mixin for details | `{}`
 *  `--empty-color` | Color set for blank stars | `#bebebe`
 *  `--detail-color` | Text color for details | `#999999`
 *
 *  @demo demo/index.html
 */
class StarRating extends PolymerElement {
  static get template() {
    return html`
      <custom-style>
        <style include="iron-flex">
        :host {
          @apply --star-rating;
        }
        iron-icon {
          color: var(--star-color, #faca43);
          width: 19px;
          height: 19px;
          padding: 0;
          margin: 0;
        }
        paper-icon-button {
          color: var(--star-color, #faca43);
          padding: 0px;
          /* offset by 1px for svg/background gap */
          width: 31px;
          height: 31px;
          --paper-icon-button-disabled: {
            color: var(--star-color, #faca43);
          };
        }
        .blank-star {
          color: var(--empty-color, #bebebe);
        }
        /* HACK: split the svg in two and merged with css
            NOTE: iron-icon uses img so svg styling won't work
            see: https://github.com/PolymerElements/iron-icon/issues/99 */
        .half-star {
          color: var(--star-color, #faca43);
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 23"><g id="right-star"><path style="fill:#bebebe" d="M 12,17.27 18.18,21 16.54,13.97 22,9.24 14.81,8.63 12,2 Z" /></g></svg>');
          /* offset by 1px for svg/background gap */
          --iron-icon-width: 19px;
        }
        .details {
          margin-left: .4em;
          color: var(--detail-color,  #999999);
          font-family: 'Roboto', 'Noto', sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 15px;
          font-weight: 400;
          line-height: 19px;
          @apply --star-rating-details;
        }
        </style>
      </custom-style>

      <iron-iconset-svg size="24" name="star-icons">
        <svg>
          <defs>
            <g id="star"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
            <g id="blank-star"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
            <g id="half-star"><path d="M 12,17.27 12,2 9.19,8.63 2,9.24 7.46,13.97 5.82,21 Z"></path></g>
          </defs>
        </svg>
      </iron-iconset-svg>

      <div class="layout horizontal center-center">

        <template id="stars" is="dom-repeat" items="{{_stars}}" as="star">
          <iron-icon class$="[[star]]" hidden$="[[!readOnly]]" icon$="star-icons:[[star]]"></iron-icon>
          <paper-icon-button class$="[[star]]" hidden$="[[readOnly]]" id="{{index}}" on-click="_updateRating" icon$="star-icons:[[star]]"></paper-icon-button>
        </template>

        <div hidden$="[[!_showDetails]]" class="details">
          <span>[[rating]]</span>
          <span hidden$="[[!votes]]">([[votes]] votes)</span>
          <span hidden$="[[votes]]">(No votes)</span>
        </div>
      </div>
    `;
  }

  static get is() { return 'star-rating'; }

  static get properties() {
    return {
      _showDetails: {
        type: Boolean,
        computed: '_displayDetails(details, readOnly)'
      },
      _stars: {
        type: Array,
        value: function() {
          return ["star", "star", "star", "star", "star"];
        }
      },
      // number of stars assigned for score
      rating: {
        type: Number,
        value: 0,
        notify: true,
        observer: '_updateStars'
      },
      // sets stars to editable and hides rating details
      readOnly: {
        type: Boolean,
        value: false
      },
      // show rating and votes when readOnly is true
      details: {
        type: Boolean,
        value: false
      },
      // number of votes to display
      votes: {
        type: Number,
        value: 0
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    beforeNextRender(this, () => {
      this._updateStars();
      this.$.stars.render();
    });
  }

  _updateRating(e) {
    let id = parseInt(e.currentTarget.id);
    this.rating = id + 1;
    this._updateStars();
  }

  _updateStars() {
    let int = Math.floor(this.rating);
    let decimal = this.rating % 1;
    for (var i = 0; i < 5; i++) {
      this._stars[i] = "blank-star";
      if (i < int)
        this._stars[i] = "star";
    }
    if (decimal >= 0.5)
      this._stars[int] = "half-star";
    var array = this._stars;
    this._stars = [];
    this._stars = array;
  }

  _displayDetails(details, readOnly) {
    return details === true && readOnly === true;
  }
}

customElements.define(StarRating.is, StarRating);
