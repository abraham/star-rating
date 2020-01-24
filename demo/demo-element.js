import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '@polymer/iron-demo-helpers/demo-snippet.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-list/iron-list.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../star-rating';

class DemoElement extends PolymerElement {
  static get template() {
    return html`
      <custom-style>
        <style include="demo-pages-shared-styles">
        .blue {
          --star-color: blue;
        }
        </style>
      </custom-style>

      <div class="vertical-section-container centered">

        <h3>Basic star-rating demo</h3>
        <demo-snippet>
          <template preserve-content>
            <star-rating rating="4" read-only></star-rating>
          </template>
        </demo-snippet>

        <h3>Rating with details</h3>
        <demo-snippet>
          <template preserve-content>
            <star-rating rating="4.7" votes="51" details read-only></star-rating>
          </template>
        </demo-snippet>

        <h3>Rating with custom color</h3>
        <demo-snippet>
          <template preserve-content>
            <star-rating class="blue" rating="4.7" votes="51" details read-only></star-rating>
          </template>
        </demo-snippet>

        <h3>Editable star-rating</h3>
        <demo-snippet>
          <template preserve-content>
            <star-rating rating="2.5"></star-rating>
          </template>
        </demo-snippet>

        <h3>Template loading</h3>
        <demo-snippet>
          <dom-bind>
            <template preserve-content>
              <iron-ajax url="stars.json" handle-as="json" last-response="{{stars}}" auto></iron-ajax>

              <iron-list items="[[stars]]" as="rating">
                <template preserve-content>
                  <star-rating rating="[[rating]]" read-only></star-rating>
                </template>
              </iron-list>
            </template>
          </dom-bind>

          <!-- duplicated to show source code -->
          <template preserve-content>
            <iron-ajax url="stars.json" handle-as="json" last-response="{{stars}}" auto></iron-ajax>

            <iron-list items="[[stars]]" as="rating">
              <template preserve-content>
                <star-rating rating="[[rating]]" read-only></star-rating>
              </template>
            </iron-list>
          </template>
        </demo-snippet>
      </div>
    `;
  }
}

customElements.define('demo-element', DemoElement);
