import { startVoiceRecognition, defaultNoMatchCallback } from '../scripts/voiceUtils.js';

class VoiceButton extends HTMLElement {
  constructor() {
    super(); // Inheret everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    this.attachShadow({ mode: 'open' });

    const micButtonContainer = document.createElement('div');
    const form = document.createElement('form');
    form.id = 'voice-button-form';
    micButtonContainer.appendChild(form);

    const micButton = document.createElement('button');
    micButton.innerHTML = `
        <a href="#"> 
            <img class="search" src="../media/mic.png" alt="Voice Control"/>
        </a>
    `;
    form.appendChild(micButton);

    this.shadowRoot.append(micButtonContainer);

    function matchCallback(event) {
      const searchbar = document.getElementById('searchbar');
      searchbar.searchInput.value = event.results[0][0].transcript;
    }

    function onSpeechEndCallback() {
      const searchbar = document.getElementById('searchbar');
      searchbar.handleSearch();
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      startVoiceRecognition(matchCallback, defaultNoMatchCallback, onSpeechEndCallback);
    });
  }
}

customElements.define('voice-button', VoiceButton);