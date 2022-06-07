import {
  startVoiceRecognition, defaultNoMatchCallback, stopVoiceRecognition, ENABLE_VOICE_LOGGING,
}
// eslint-disable-next-line import/extensions
  from '../scripts/voiceUtils.js';

const MIC_INACTIVE_HTML = `
    <a href="#"> 
        <img class="search" src="../media/mic_icon.svg" alt="Start voice control"/>
    </a>
`;
const MIC_ACTIVE_HTML = `
    <a href="#"> 
        <img class="search" src="../media/sound_active.svg" alt="Stop voice control"/>
    </a>
`;

// Map with page name as key and array of enabled commands as value
const ENABLED_COMMANDS = {
  Home: ['search', 'stop', 'help'],
  Search: ['search', 'stop', 'next', 'previous', 'help', 'select'],
};

// Local Storage keys.
const LOCAL_STORAGE_VOICE_BUTTON_LISTENING_KEY = 'voice-button-listening';
const LOCAL_STORAGE_VOICE_BUTTON_HELP_KEY = 'voice-button-first-time-use';

// These strings are the keywords that the user can use to invoke a command. Ensure that longer
// strings are ordered before shorter ones.
const SEARCH_COMMAND_KEYWORDS = ['search for', 'search'];
const HELP_COMMAND_KEYWORDS = ['help'];
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
 * @returns a trimmed transcript (type String)
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
 * @returns true if transcript matches a keyword, false otherwise
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
// eslint-disable-next-line import/prefer-default-export
export class VoiceButton extends HTMLElement {
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
     * @param {SpeechRecognitionEvent} event object from Web Speech onResult callback
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
     * @param {SpeechRecognitionEvent} event object from Web Speech onResult callback
     */
    async function handleSelectCommand(event) {
      const result = event.results[event.resultIndex];
      let { transcript } = result[0];

      transcript = trimKeywordFromTranscript(SELECT_COMMAND_KEYWORDS, transcript);

      if (result.isFinal) {
        // eslint-disable-next-line import/extensions
        const searchPage = await import('../scripts/searchpage.js');
        const searchResults = searchPage.getCurrentSearchResults();
        for (let i = 0; i < searchResults.length; i += 1) {
          const result1 = searchResults[i];
          if (result1.name.toLowerCase() === transcript) {
            result1.openPage();
          }
        }

        if (ENABLE_VOICE_LOGGING) {
          console.log(`No results matched transcript. Num results${searchResults.length
          } transcript: "${transcript}"`);
        }
      }
    }

    /**
     * If the transcript is final, navigates to to the next page, if it exists.
     *
     * @param {SpeechRecognitionEvent} event object from Web Speech onResult callback
     */
    async function handleNextPage(event) {
      const result = event.results[event.resultIndex];
      if (result.isFinal) {
        // eslint-disable-next-line import/extensions
        const searchPage = await import('../scripts/searchpage.js');
        searchPage.goToNextSearchPage();
      }
    }

    /**
     * If the transcript is final, navigates to the previous page, if it exists.
     *
     * @param {SpeechRecognitionEvent} event object from Web Speech onResult callback
     */
    async function handlePreviousPage(event) {
      const result = event.results[event.resultIndex];
      if (result.isFinal) {
        // eslint-disable-next-line import/extensions
        const searchPage = await import('../scripts/searchpage.js');
        searchPage.gotToPreviousSearchPage();
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
     * @param {VoiceButton} voiceButtonPointer a `this` object of type VoiceButton passed from
     * the VoiceButton constructor.
     * @param {SpeechRecognitionEvent} event object from Web Speech onResult callback
     */
    function handleStopCommand(voiceButtonPointer, event) {
      const result = event.results[event.resultIndex];
      if (result.isFinal) {
        voiceButtonPointer.setListening(false);
        deactivateVoice(voiceButtonPointer);
      }
    }

    /**
     * If the transcript is final, shows the help string
     *
     * @param {VoiceButton} voiceButtonPointer a `this` object of type VoiceButton passed from
     * the VoiceButton constructor.
     * @param {SpeechRecognitionEvent} event object from Web Speech onResult callback
     */
    function handleHelpCommand(voiceButtonPointer, event) {
      const result = event.results[event.resultIndex];
      if (result.isFinal) {
        voiceButtonPointer.helpToast.showModal();
      }
    }

    /**
     * Callback function passed to the web speech API. This function is called when speech is
     * recognized. Once called, this function parses the speach for commands, and calls the
     * corresponding handler.
     *
     * @param {VoiceButton} voiceButtonPointer a `this` object of type VoiceButton passed from
     * the VoiceButton constructor.
     * @param {SpeechRecognitionEvent} event object from web speech onResult callback
     */
    function matchCallback(voiceButtonPointer, event) {
      const result = event.results[event.resultIndex];
      let { transcript } = result[0];
      transcript = transcript.replace(".", "");
      transcript = transcript.trim();
      transcript = transcript.toLowerCase();

      let command = '';

      const currentPage = document.title;
      const enabledCommands = ENABLED_COMMANDS[currentPage];

      if (keywordInTranscript(SEARCH_COMMAND_KEYWORDS, transcript)) {
        command = 'search';
        if (enabledCommands.includes(command)) {
          handleSearchCommand(event);
        } else {
          command += `: not enabled on page ${currentPage}`;
        }
      } else if (keywordInTranscript(NEXT_COMMAND_KEYWORDS, transcript)) {
        command = 'next';
        if (enabledCommands.includes(command)) {
          handleNextPage(event);
        } else {
          command += `: not enabled on page ${currentPage}`;
        }
      } else if (keywordInTranscript(PREVIOUS_COMMAND_KEYWORDS, transcript)) {
        command = 'previous';
        if (enabledCommands.includes(command)) {
          handlePreviousPage(event);
        } else {
          command += `: not enabled on page ${currentPage}`;
        }
      } else if (keywordInTranscript(SELECT_COMMAND_KEYWORDS, transcript)) {
        command = 'select';
        if (enabledCommands.includes(command)) {
          handleSelectCommand(event);
        } else {
          command += `: not enabled on page ${currentPage}`;
        }
      } else if (keywordInTranscript(STOP_COMMAND_KEYWORDS, transcript)) {
        command = 'stop';
        if (enabledCommands.includes(command)) {
          handleStopCommand(voiceButtonPointer, event);
        } else {
          command += `: not enabled on page ${currentPage}`;
        }
      } else if (keywordInTranscript(HELP_COMMAND_KEYWORDS, transcript)) {
        command = 'help';
        if (enabledCommands.includes(command)) {
          handleHelpCommand(voiceButtonPointer, event);
        } else {
          command += `: not enabled on page ${currentPage}`;
        }
      } else {
        command = `NO MATCH: "${transcript}"`;
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
      // show help if first time
      const showTutorial = localStorage.getItem(LOCAL_STORAGE_VOICE_BUTTON_HELP_KEY);
      if (showTutorial == null || showTutorial === 'false') {
        localStorage.setItem(LOCAL_STORAGE_VOICE_BUTTON_HELP_KEY, 'true');
        this.helpToast.showModal();
      }
      // set state of voice correctly.
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

    // help popup
    const helpPopup = document.getElementById('helpDialog');
    const helpPrompt = document.createElement('form');
    const helpHeader = document.createElement('h3');
    const helpMsg = document.createElement('p');
    const helpButt = document.createElement('button');
    helpHeader.innerText = 'Voice Commands:';
    helpMsg.innerText = 'Search for <search query>:    Searches for your query.\n'
          + 'Next page:   Navigates to the next page of search results.\n'
          + 'Previous page:   Navigates to the previous page of search results.\n'
          + 'Select <recipe name>:   Navigates to the specified recipe on the result page.\n'
          + 'Stop:   Stops voice recognition.\n'
          + 'Help:   Shows this message.\n';
    helpMsg.setAttribute('align', 'left');
    helpButt.innerHTML = 'Okay';
    helpPrompt.setAttribute('method', 'dialog');
    helpHeader.setAttribute('id', 'helpHeader');
    helpMsg.setAttribute('id', 'helpMsg');
    helpButt.setAttribute('id', 'helpButt');
    helpButt.setAttribute('class', 'buttons');

    helpPrompt.appendChild(helpHeader);
    helpPrompt.appendChild(helpMsg);
    helpPrompt.appendChild(helpButt);
    helpPopup.appendChild(helpPrompt);

    this.helpToast = helpPopup;
  }
}

customElements.define('voice-button', VoiceButton);
