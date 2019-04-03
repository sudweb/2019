(function () {

  // Lazyload ---------------------------------------------------------------------------
  var lozadObserver = lozad('.lozad', {
    load: function (el) {
      if (el.tagName == "IMG") {
        el.setAttribute("decoding","async");
      }
      if(el.dataset.src)
        el.src = el.dataset.src;
      if(el.dataset.srcset)
        el.srcset = el.dataset.srcset;
      el.onload = function () {
        el.classList.add('fade')
      }
    }
  });
  lozadObserver.observe();
  window.addEventListener('load', function() {
    setTimeout(function() {
      document.querySelectorAll('.lozad[class^="banner-"]:not([data-loaded])').forEach(function(element) {
        lozadObserver.triggerLoad(element);
    });}, 4000);
  });

  // Toggle class -----------------------------------------------------------------------
  let toggleClassPrefix = ""; // Prefix should end by hyphen

  var retrieveTargets = function(element) {
    if(element.hasAttribute('data-'+ toggleClassPrefix +'toggle-target-all'))
      return document.querySelectorAll(element.getAttribute('data-'+toggleClassPrefix+'toggle-target-all'));
    else if(element.hasAttribute('data-'+toggleClassPrefix+'toggle-target-parent'))
      return element.parentElement.querySelectorAll(element.getAttribute('data-'+toggleClassPrefix+'toggle-target-parent'));
    else if(element.hasAttribute('data-'+toggleClassPrefix+'toggle-target-self'))
      return element.querySelectorAll(element.getAttribute('data-'+toggleClassPrefix+'toggle-target-self'));
    return [];
  };

  var toggleClass = function (element, className) {
    if(!element.hasAttribute('data-'+toggleClassPrefix+'toggle-target-only'))
      element.classList.toggle(className);

    if(element.hasAttribute('aria-expanded'))
      element.setAttribute('aria-expanded', element.isActive);

    if(element.hasAttribute('aria-selected'))
      element.setAttribute('aria-selected', element.isActive);

    let targetElements = retrieveTargets(element);
    for(var i=0;i<targetElements.length;i++) {
      targetElements[i].classList.toggle(className);
    }
  };

  var blurEventHandler = function(event) {
    let element = event.target;
      element.isActive = !element.isActive;

    toggleClass(element, element.getAttribute('data-'+toggleClassPrefix+'toggle-class'));

    element.removeEventListener('blur', blurEventHandler, false);
  };

  var manageToggle = function(element) {
    element.isActive = !element.isActive;

    toggleClass(element, element.getAttribute('data-'+toggleClassPrefix+'toggle-class'));

    if(element.hasAttribute('data-'+toggleClassPrefix+'toggle-focus-out')) {
      if(element.isActive)
        element.addEventListener('blur', blurEventHandler, false);
      else
        element.removeEventListener('blur', blurEventHandler, false);
    }
  };

  [...document.querySelectorAll('[data-'+toggleClassPrefix+'toggle-class]')].forEach(function(trigger){
    trigger.addEventListener(trigger.getAttribute('data-'+toggleClassPrefix+'toggle-on-event') || 'click', function(event) {
      event.preventDefault();
      manageToggle(trigger);
    }, false);
  });

  var triggerEscElements = [...document.querySelectorAll('[data-'+toggleClassPrefix+'toggle-class][data-'+toggleClassPrefix+'toggle-escape-key]')];
  document.onkeyup = function(event) {
    event = event || window.event;
    let isEscape = false;

    if('key' in event)
      isEscape = (event.key == 'Escape' || event.key == 'Esc');
    else
      isEscape = (event.keyCode == 27);

    if(isEscape) {
      triggerEscElements.forEach(function(trigger){
        if(trigger.isActive) manageToggle(trigger);
      });
    }
  };

  // Smooth scroll ----------------------------------------------------------------------
  function loadScript(url, callback) {
    var script = document.createElement('script'),
      loaded = false;

    script.setAttribute('src', url);
    script.onreadystatechange = script.onload = function () {
      if (!loaded && callback) {
        callback();
        loaded = true;
      }
    };

    document.head.appendChild(script);
  }

  function initSmoothScroll() {
    loadScript(
      'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@14.0.0/dist/smooth-scroll.polyfills.min.js',
      function () {
        var scroll = new SmoothScroll("a[href^='#']:not([role='button'])", {
          speed: 1000,
          easing: 'easeInOutQuint'
        });
      }
    );
  }

  document.addEventListener('DOMContentLoaded', initSmoothScroll);


  // Oh! --------------------------------------------------------------------------------
  console.log("                     7MMNMMMMM.\n              . 7M MMMMMMMMMMMM                       MM\n             MMIMMMMMMMMMM+MMMM   Time to come to    MMMM\n           M.MMMMMMMM.   .MMMMI                      MMMM\n         MMMMMMMMM       MMMM                       MMMM\n        MMMMMMMM      MMMMMM                       MMMMM\n       MMMMMMM       MMMMM                         MMMM\n       MMMMMM       MMMMM   M .              ,MM~ MMMM=\n       MMMMMMM      MMM    .M8M.    MMM?   DMMMMMMMMMM\n        MMMMMMMM .         MMMM    MMMM   M+MMM MMMMM\n          MMMMMMMM+       MM.MM   MMMM   MNMMM  MMMMM.\n            $MMMMMMMM.    MMMM   ?MMMM   MMMM   MMMI     .M\n               ~MMMMMMM  MMMM.   MM+M   MMMMM  ~MMMM    MM\n                  MMMMMM.MMMM  .MMMMM .:MMMM   ZMM,    MM\n                  .MMMMM MMM  .MMMMM  MMMMM   MMMMM   MM.\n         ,MMMMMMM MMMMM  MMM,MMMMMMM MMMMMM  MMMMMM .MM\n     .MMMMM8   .MMMMM.   MMMMMM  MMMMM  MMMMMM  MMMMMM\n     MMMMMMMMMMMMMMMM      MM     MM8    MMM.    MMMZ\n     .MMMMMMMMMMM:M\n       NMMMMM,MM:\n\n           MMMMMMMM           MMMMMMM\n        ~MMM.   MMMM            MMMMM               MM\n      .MMMM     +MMM            MMMMM.             MMMM\n     MMMMM      .MMM    MMM     MMMMM             .MMMM\n   MMMMM        ZMMM   MMMMM    MMMM=             +MMM\n  OMMMM~        MMMM  :MMMMM    MMMMM            MMMM.\n =MMMMM        MMMMM  MMMMMM   MMMM             .~MMM\nMMMMMM         .MMMM MMMMMMM  .MMMMM   MMMMMM   MMMM MMMM.\nMMMMM          MMMM MMMMMMMM  .MMMM  ..MMMMMMM :MMMMMMMMMI\n MMMM         MMMMM.MM MMMMM  MMM.  DI?MM ~MM  MMMM.M  MM?,\n    =         MMMM MMM MMMM   MMM  :MDMM  ~MM  MMMMN   MM\n             MMMMM.MM MMMMM .MMMZ  OMMM. MMM  MMMM~   MMMM\n            .MMMMIMM  MMMMM MMMM  MMMM MMM   MMMMN   MMMMO\n            MMMMMMM.  MMMMMIMMM   MMMM.     MMMMM   :MMMM\n           :MMMMMM    MMMMMMMM    MMM$     MM:MMM   MMMM\n           MMMMMMM    MMMMMMM     MMMM  .MMM. MMMM.MMMM.\n           MMMMMM     MMMMMM      .MMMMMMMM   MMMMMMMM\n           MMMMM.      .MMM            .        M  .\n           MMMMM\n            MMM8");

})();
