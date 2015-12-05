(function() {
  'use strict';

  angular
    .module('onaroll21')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
