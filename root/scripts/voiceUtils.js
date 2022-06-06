/**
 * This file contains various methods for voice controls
 */
// eslint-disable-next-line no-undef
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

export const ENABLE_VOICE_LOGGING = false;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

/**
 * Callback function that handles all web speech API errors.
 *
 * @param {SpeechRecognitionEvent} event object from Web Speech API
 */
recognition.onerror = function (event) {
  switch (event.error) {
    case 'no-speech':
      // No speech was detected.
      console.error(`Speech Recognition Error Event: ${event.error} ${event.message}`);
      break;
    case 'aborted':
      // Speech input was aborted in some manner, perhaps by some user-agent-specific behavior like
      // a button the user can press to cancel speech input.

      // This does not indicate an error.
      if (ENABLE_VOICE_LOGGING) {
        console.log('Speech recogniton aborted.');
      }
      break;
    case 'audio-capture':
      // Audio capture failed.
      console.error(`Speech Recognition Error Event: ${event.error} ${event.message}`);
      break;
    case 'network':
      // Network communication required for completing the recognition failed.
      alert('In order to use voice search, please ensure you have a stable network connection.');
      console.error(`Speech Recognition Error Event: ${event.error} ${event.message}`);
      break;
    case 'not-allowed':
      // The user agent disallowed any speech input from occurring for reasons of security,
      // privacy or user preference.
      alert('In order to use voice search, please allow this site to use your microphone.');
      console.error(`Speech Recognition Error Event: ${event.error} ${event.message}`);
      break;
    case 'service-not-allowed':
      // The user agent disallowed the requested speech recognition service, either because the
      // user agent doesn't support it or because of reasons of security, privacy or user
      // preference. In this case it would allow another more suitable speech recognition service
      // to be used instead.
      alert('In order to use voice search, please enable the web speech api, '
           + 'or switch to a supported browser, like Chrome or Safari.');
      console.error(`Speech Recognition Error Event: ${event.error} ${event.message}`);
      break;
    case 'bad-grammar':
      // There was an error in the speech recognition grammar or semantic tags, or the chosen
      // grammar format or semantic tag format was unsupported.
      break;
    case 'language-not-supported':
      // The language was not supported.
      console.error(`Speech Recognition Error Event: ${event.error} ${event.message}`);
      break;
    default:
      console.error('ERROR DID NOT MATCH ANY CASE. THIS IS A PROBLEM.');
      console.error(`Speech Recognition Error Event: ${event.error} ${event.message}`);
  }
};

let onSpeechEndCallbackFunc = null;
let matchCallbackUtil = null;
let voiceButtonPointerUtil = null;

/**
 * Calls the callback function provided by startVoiceRecogniton()
 */
recognition.onspeechend = function () {
  onSpeechEndCallbackFunc();
  if (ENABLE_VOICE_LOGGING) {
    console.log('Speech ended.');
  }
};

/**
 * Default callback function to handle noMatch events. These events should not happen
 * becuase we are not using a grammer.
 *
 * @param {SpeechRecognitionEvent} event object from Web Speech API
 */
// eslint-disable-next-line no-unused-vars
export const defaultNoMatchCallback = function (event) {
  if (ENABLE_VOICE_LOGGING) {
    console.log('Did not match a command.');
  }
};

/**
 * Stops voice recogniton when called. Web Speech still returns a final transcript.
 */
export function stopVoiceRecognition() {
  recognition.stop();
  if (ENABLE_VOICE_LOGGING) {
    console.log('Speech recogniton stopped.');
  }
}

/**
 * Stops voice recognition when called. Web Speech does not return a final transcript.
 */
export function abortVoiceRecognition() {
  recognition.abort();
  if (ENABLE_VOICE_LOGGING) {
    console.log('Speech recogniton aborted.');
  }
}

/**
 * Callback function passed from startVoiceRecogniton(). Uses the provided Voice Button object.
 *
 * @param {SpeechRecognitionEvent} event object from Web Speech API
 */
function onResultCallback(event) {
  matchCallbackUtil(voiceButtonPointerUtil, event);
}

/**
 * This function is called when a result is recognized. It should have the signiture:
 * void func(SpeechRecognitionEvent)
 *
 * @callback matchCallback
 * @param {SpeechRecognitionEvent} event from web speech api
 */

/**
 * This function is called when a result is not recognized. It should have the signiture:
 * void func(SpeechRecognitionEvent)
 *
 * @callback noMatchCallback
 * @param {SpeechRecognitionEvent} event from web speech api
 */

/**
 * This function is called when speech is ended. It should have the signiture:
 * void func()
 *
 * @callback onSpeechEndCallback
 */

/**
 * Starts voice recognition.
 *
 * @param {VoiceButton} voiceButtonPointer a `this` object of type VoiceButton passed from
 * the VoiceButton constructor.
 * @param {matchCallback} matchCallback function called when a result is recognized.
 * @param {noMatchCallback} noMatchCallback function called when no result is recognized.
 * @param {onSpeechEndCallback} onSpeechEndCallback function called when speech detection ends.
 */
export function startVoiceRecognition(
  voiceButtonPointer,
  matchCallback,
  noMatchCallback,
  onSpeechEndCallback,
) {
  matchCallbackUtil = matchCallback;
  voiceButtonPointerUtil = voiceButtonPointer;
  recognition.onresult = onResultCallback;
  recognition.onnomatch = noMatchCallback;
  onSpeechEndCallbackFunc = onSpeechEndCallback;
  recognition.start();
  if (ENABLE_VOICE_LOGGING) {
    console.log('Speech recogniton activated.');
  }
}
