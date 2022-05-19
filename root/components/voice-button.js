import { startVoiceRecognition, defaultNoMatchCallback } from '../scripts/voiceUtils.js';
import {goToNextSearchPage, gotToPreviousSearchPage} from '../scripts/searchpage.js'

//Order longer strings before shorter ones.
const SEARCH_COMMAND_KEYWORDS = ['search for', 'search'];
const NEXT_COMMAND_KEYWORDS = ['go to the next', 'go to next', 'next'];
const PREVIOUS_COMMAND_KEYWORDS = ['go to the previous', 'go to previous', 'previous'];
const SELECT_COMMAND_KEYWORDS = ['select the recipe', 'select recipe','select the','select'];

function trimKeywordFromTranscript(keywords, transcript) {
  for(const keyword of keywords) {
    if(transcript.indexOf(keyword) == 0) {
      return transcript.substring(keyword.length + 1);
    }
  }
  return transcript
}

function keywordInTranscript(keywords, transcript) {
  for(const keyword of keywords) {
    if(transcript.indexOf(keyword) == 0) {
      return true;
    }
  }
  return false;
}

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

    function handleSearchCommand(event) {
      const searchbar = document.getElementById('searchbar');
      const result = event.results[event.resultIndex];
      let transcript = result[0].transcript;

      transcript = trimKeywordFromTranscript(SEARCH_COMMAND_KEYWORDS, transcript);

      searchbar.searchInput.value = transcript;

      if(result.isFinal) {
        searchbar.handleSearch();
      }
    }

    function handleSelectCommand(event) {
      const result = event.results[event.resultIndex];
      let transcript = result[0].transcript;

      transcript = trimKeywordFromTranscript(SELECT_COMMAND_KEYWORDS, transcript);

      if(result.isFinal) {
        const searchResults = document.getElementById('search-results-container');
      }
    }

    function handleNextPage(event) {
      const result = event.results[event.resultIndex];
      if(result.isFinal) {
        goToNextSearchPage();
      }
    }

    function handlePreviousPage(event) {
      const result = event.results[event.resultIndex];
      if(result.isFinal) {
        gotToPreviousSearchPage();
      }
    }

    function matchCallback(event) {
      const result = event.results[event.resultIndex];
      let transcript = result[0].transcript;
      let command = "";

      if(keywordInTranscript(SEARCH_COMMAND_KEYWORDS, transcript)) {
          command = 'search';  
          handleSearchCommand(event);
      }else if(keywordInTranscript(NEXT_COMMAND_KEYWORDS, transcript)){
          command = 'next';  
          handleNextPage(event);
      } else if(keywordInTranscript(PREVIOUS_COMMAND_KEYWORDS, transcript)) {
          command = 'previous';  
          handlePreviousPage(event);
      } else if(keywordInTranscript(SELECT_COMMAND_KEYWORDS, transcript)) {
          command = 'select';  
          handleSelectCommand(event);
      } else { 
          command = 'NO MATCH';  
      }
      console.log(command);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      startVoiceRecognition(matchCallback, defaultNoMatchCallback, ()=>{});
    });
  }
}

customElements.define('voice-button', VoiceButton);