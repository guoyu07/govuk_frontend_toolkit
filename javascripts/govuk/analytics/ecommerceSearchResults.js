;(function (global) {
  'use strict'

  var $ = global.jQuery
  var GOVUK = global.GOVUK || {}

  GOVUK.analyticsPlugins = GOVUK.analyticsPlugins || {}
  GOVUK.analyticsPlugins.ecommerceSearchResults = function () {
    ga('require', 'ec');

    function buildEcommerceData($searchResults) {
      return $searchResults.children('li').map(function(index, result) {
        var resultLink = $(result).find('h3 a');
        return {
          url: resultLink.attr('href'),
          title: resultLink.text(),
          position: index + 1
        }
      });
    }

    function add_impressions(ecommerceData) {
      for (var i = 0; i < ecommerceData.length; i++) {
        var searchResult = ecommerceData[i];
        ga('ec:addImpression', {
          id: searchResult.url,
          name: searchResult.title,
          list: 'GOVUK_SITE_SEARCH_PROTOTYPE'
        });
      }
    }

    function searchResult() {
      var $searchResults = $('#results .results-list');

      if ($searchResults) {
        var ecommerceData = buildEcommerceData($searchResults);
        add_impressions(ecommerceData);
      }
    }
  }

  global.GOVUK = GOVUK
})(window)
