/**
 * This file contains various methods for voice controls 
 */
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent

//const commands = [ 'search', 'next page', 'previous page', 'select', 'ingredients', 'steps'];
//const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + commands.join(' | ') + ' ;';

const recognition = new SpeechRecognition();
//const speechRecognitionList = new SpeechGrammarList();
//speechRecognitionList.addFromString(grammar, 1);
//recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

recognition.onerror = function(event) {
  switch(event.error) {
    case 'no-speech':
      // No speech was detected.
      console.error('Speech Recognition Error Event: ' + event.error + ' ' + event.message);
      break;
    case 'aborted':
      // Speech input was aborted in some manner, perhaps by some user-agent-specific behavior like
      // a button the user can press to cancel speech input.
      console.error('Speech Recognition Error Event: ' + event.error + ' ' + event.message);
      break;
    case 'audio-capture':
      // Audio capture failed.
      console.error('Speech Recognition Error Event: ' + event.error + ' ' + event.message);
      break;
    case 'network':
      // Network communication required for completing the recognition failed.
      alert('In order to use voice search, please ensure you have a stable network connection.');
      console.error('Speech Recognition Error Event: ' + event.error + ' ' + event.message);
      break;
    case 'not-allowed':
      // The user agent disallowed any speech input from occurring for reasons of security, 
      // privacy or user preference.
      alert('In order to use voice search, please allow this site to use your microphone.');
      console.error('Speech Recognition Error Event: ' + event.error + ' ' + event.message);
      break;
    case 'service-not-allowed':
      // The user agent disallowed the requested speech recognition service, either because the
      // user agent doesn't support it or because of reasons of security, privacy or user
      // preference. In this case it would allow another more suitable speech recognition service
      // to be used instead.
      alert('In order to use voice search, please enable the web speech api, ' 
           +'or switch to a supported browser, like Chrome or Safari.');
      console.error('Speech Recognition Error Event: ' + event.error + ' ' + event.message);
      break;
    case 'bad-grammar':
      //There was an error in the speech recognition grammar or semantic tags, or the chosen
      // grammar format or semantic tag format was unsupported.
    case 'language-not-supported':
      //The language was not supported. 
      console.error('Speech Recognition Error Event: ' + event.error + ' ' + event.message);
      break;
    default:
      console.error('ERROR DID NOT MATCH ANY CASE. THIS IS A PROBLEM.');
      console.error('Speech Recognition Error Event: ' + event.error + ' ' + event.message);

  }
};

var onSpeechEndCallbackFunc = () => { };

recognition.onspeechend = function() {
  onSpeechEndCallbackFunc();
  console.log('Speech recognition stopped.');
  recognition.stop();
};

export const defaultNoMatchCallback = function(event) {
  console.log('Did not match a command.');
}

/**
 * Starts voice recognition. 
 * 
 * @param {void func(event)} matchCallback function called when a result is recognized. 
 * @param {void func(event)} noMatchCallback function called when no result is recognized. 
 */
export function startVoiceRecognition(matchCallback, noMatchCallBack, onSpeechEndCallback) {
  recognition.onresult = matchCallback;
  recognition.onnomatch = noMatchCallBack;
  onSpeechEndCallbackFunc= onSpeechEndCallback;
  recognition.start();
  console.log('Speech recogniton activated.');
}