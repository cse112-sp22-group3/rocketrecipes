import {
  startVoiceRecognition, defaultNoMatchCallback, stopVoiceRecognition, ENABLE_VOICE_LOGGING,
}
// eslint-disable-next-line import/extensions
  from '../scripts/voiceUtils.js';
import { goToNextSearchPage, gotToPreviousSearchPage, getCurrentSearchResults }
// eslint-disable-next-line import/extensions
  from '../scripts/searchpage.js';

const MIC_INACTIVE_HTML = `
    <a href="#"> 
        <img class="search" src="../media/mic_icon.svg" alt="Voice Control"/>
    </a>
`;
const MIC_ACTIVE_HTML = `
    <a href="#"> 
        <img class="search" src="../media/sound_active.svg" alt="Voice Control"/>
    </a>
`;

// Name of the listening value in local storage.
const LOCAL_STORAGE_VOICE_BUTTON_LISTENING_KEY = 'voice-button-listening';

// These strings are the keywords that the user can use to invoke a command. Ensure that longer
// strings are ordered before shorter ones.
const SEARCH_COMMAND_KEYWORDS = ['search for', 'search'];
const STOP_COMMAND_KEYWORDS = ['turn off', 'quit', 'stop', 'off'];
const NEXT_COMMAND_KEYWORDS = ['go to the next', 'go to next', 'next'];
const PREVIOUS_COMMAND_KEYWORDS = ['go to the previous', 'go to previous', 'previous'];
const SELECT_COMMAND_KEYWORDS = ['select the recipe', 'open the recipe', 'select recipe',
  'open recipe', 'select the', 'open the', 'select', 'open'];

/**
 * Trims the first keyword from the keywords array that matches the start of the transcript.
 * If no matching keyword is found, returns the transcript
 *
 * @param {String[]} keywords list of keywords that correspond to the detected command
 * @param {String} transcript transcript of voice command
 * @returns
 */
function trimKeywordFromTranscript(keywords, transcript) {
  const transcript1 = transcript.trim();
  for (let i = 0; i < keywords.length; i += 1) {
    const keyword = keywords[i];
    if (transcript1.indexOf(keyword) === 0) {
      return transcript1.substring(keyword.length + 1);
    }
  }
  return transcript1;
}

/**
 * Returns true if the start of the start of the transcript contains at least one of the keywords.
 * Returns false othewise.
 *
 * @param {String[]} keywords list of keywords to check
 * @param {String} transcript transcript of voice command
 * @returns
 */
function keywordInTranscript(keywords, transcript) {
  const transcript1 = transcript.trim();
  for (let i = 0; i < keywords.length; i += 1) {
    const keyword = keywords[i];
    if (transcript1.indexOf(keyword) === 0) {
      return true;
    }
  }
  return false;
}

/**
 * Class that implements voice controls.
 */
class VoiceButton extends HTMLElement {
  /**
   * Creates a new instance of a VoiceButton.
   */
  constructor() {
    super(); // Inheret everything from HTMLElement

    /**
     * Sets the value of listening to the specified value. Also sets the corresponding value in
     * local storage.
     *
     * @param {Boolean} value the value to set listening to
     */
    this.setListening = (value) => {
      this.listening = value;
      localStorage.setItem(LOCAL_STORAGE_VOICE_BUTTON_LISTENING_KEY, this.listening);
    };

    /**
     * Writes the search query from the event transcript to the search bar. If the transcript
     * is final, this function executes the search.
     *
     * @param {SpeachRecognitionEvent} event object from Web Speech onResult callback
     */
    function handleSearchCommand(event) {
      const searchbar = document.getElementById('searchbar');
      const result = event.results[event.resultIndex];
      let { transcript } = result[0];

      transcript = trimKeywordFromTranscript(SEARCH_COMMAND_KEYWORDS, transcript);

      searchbar.searchInput.value = transcript;

      if (result.isFinal) {
        searchbar.handleSearch();
      }
    }

    /**
     * If the transcript is final, navigates to the recipie requested in the transcript. Does
     * nothing if no result is found.
     *
     * @param {SpeachRecognitionEvent} event object from Web Speech onResult callback
     */
    function handleSelectCommand(event) {
      const result = event.results[event.resultIndex];
      let { transcript } = result[0];

      transcript = trimKeywordFromTranscript(SELECT_COMMAND_KEYWORDS, transcript);

      if (result.isFinal) {
        const searchResults = getCurrentSearchResults();
        for (let i = 0; i < searchResults.length; i += 1) {
          const result1 = searchResults[i];
          if (result1.name.toLowerCase() === transcript) {
            result1.openPage();
          }
        }

        if (ENABLE_VOICE_LOGGING) {
          console.log(`No results matched transcript. Num results${searchResults.length
          } transcript: ${transcript}`);
        }
      }
    }

    /**
     * If the transcript is final, navigates to to the next page, if it exists.
     *
     * @param {SpeachRecognitionEvent} event object from Web Speech onResult callback
     */
    function handleNextPage(event) {
      const result = event.results[event.resultIndex];
      if (result.isFinal) {
        goToNextSearchPage();
      }
    }

    /**
     * If the transcript is final, navigates to the previous page, if it exists.
     *
     * @param {SpeachRecognitionEvent} event object from Web Speech onResult callback
     */
    function handlePreviousPage(event) {
      const result = event.results[event.resultIndex];
      if (result.isFinal) {
        gotToPreviousSearchPage();
      }
    }

    /**
      * Stops web speech voice detection, and updates the button to the inactive mic icon.
      *
      * @param {VoiceButton} voiceButtonPointer a `this` object of type VoiceButton passed from
       * the VoiceButton constructor.
      */
    function deactivateVoice(voiceButtonPointer) {
      const voiceButton = voiceButtonPointer.button;
      voiceButton.innerHTML = MIC_INACTIVE_HTML;
      stopVoiceRecognition();
    }

    /**
     * If the transcript is final, stops voice recognition.
     *
     * @param {SpeachRecognitionEvent} event object from Web Speech onResult callback
     */
    function handleStopCommand(voiceButtonPointer, event) {
      const result = event.results[event.resultIndex];
      if (result.isFinal) {
        voiceButtonPointer.setListening(false);
        deactivateVoice(voiceButtonPointer);
      }
    }

    /**
     * Callback function passed to the web speech API. This function is called when speech is
     * recognized. Once called, this function parses the speach for commands, and calls the
     * corresponding handler.
     *
     * @param {VoiceButton} voiceButtonPointer a `this` object of type VoiceButton passed from
     * the VoiceButton constructor.
     * @param {SpeachRecognitionEvent} event object from webSpeach onResult callback
     */
    function matchCallback(voiceButtonPointer, event) {
      const result = event.results[event.resultIndex];
      let { transcript } = result[0];
      transcript = transcript.trim();
      let command = '';

      if (keywordInTranscript(SEARCH_COMMAND_KEYWORDS, transcript)) {
        command = 'search';
        handleSearchCommand(event);
      } else if (keywordInTranscript(NEXT_COMMAND_KEYWORDS, transcript)) {
        command = 'next';
        handleNextPage(event);
      } else if (keywordInTranscript(PREVIOUS_COMMAND_KEYWORDS, transcript)) {
        command = 'previous';
        handlePreviousPage(event);
      } else if (keywordInTranscript(SELECT_COMMAND_KEYWORDS, transcript)) {
        command = 'select';
        handleSelectCommand(event);
      } else if (keywordInTranscript(STOP_COMMAND_KEYWORDS, transcript)) {
        command = 'stop';
        handleStopCommand(voiceButtonPointer, event);
      } else {
        command = `NO MATCH: ${transcript}`;
      }

      if (ENABLE_VOICE_LOGGING) {
        console.log(command);
      }
    }

    /**
      * Activates web speech voice detection, and updates the button to the active mic icon.
      *
      * @param {VoiceButton} voiceButtonPointer a `this` object of type VoiceButton passed from
      * the VoiceButton constructor.
      */
    function activateVoice(voiceButtonPointer) {
      const voiceButton = voiceButtonPointer.button;
      voiceButton.innerHTML = MIC_ACTIVE_HTML;
      startVoiceRecognition(voiceButtonPointer, matchCallback, defaultNoMatchCallback, () => {});
    }

    /** ****************************************
     *  START OF THE ACTUAL CONSTRUCTOR CODE  *
     ***************************************** */

    // Get the previous value of listening, if it was set
    const oldListening = localStorage.getItem(LOCAL_STORAGE_VOICE_BUTTON_LISTENING_KEY);
    if (oldListening != null) {
      this.listening = oldListening === 'true';
    } else {
      this.setListening(false);
    }

    // Attach the shadow DOM and append this markup / stlying inside
    this.attachShadow({ mode: 'open' });

    const micButtonContainer = document.createElement('div');
    const form = document.createElement('form');
    form.id = 'voice-button-form';
    micButtonContainer.appendChild(form);

    const micButton = document.createElement('button');
    micButton.innerHTML = MIC_INACTIVE_HTML;
    micButton.id = 'voice-button-input';
    form.appendChild(micButton);
    this.button = micButton;

    this.shadowRoot.append(micButtonContainer);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!this.listening) {
        activateVoice(this);
      } else {
        deactivateVoice(this);
      }
      this.setListening(!this.listening);
    });

    // Update the button to the current listening state;
    if (this.listening) {
      activateVoice(this);
    } else {
      deactivateVoice(this);
    }
  }
}

customElements.define('voice-button', VoiceButton);
