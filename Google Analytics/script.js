// ==UserScript==
// @name         Google Analytics Data Grabber
// @namespace    http://www.pholyoke.com/
// @version      0.1
// @description  Sticks buttons in google analytics page to get data faster.
// @author       Peter Holyoke
// @match        *://analytics.google.com/analytics/web/*
// @require      https://code.jquery.com/jquery-2.2.4.js
// @include      https://analytics.google.com/analytics/web/#report/content-overview/*
// @grant        none
// ==/UserScript==

$(function() {
    "use strict";
    $('body').prepend("<div id='top' style='margin: .5em; padding: .25em; border-bottom: 3px solid orange'>");
    $('#top').append("<button id='pageviews' class='btn button-default'>Get Referral Data</button>");

    if(window.location.href.indexOf("content-overview") > -1)
        $('#pageviews').prop("disabled", false);
    else
        $('#pageviews').prop("disabled", true);

    // Make an invisible element to store the data in temporarily
    $('body').prepend("<div id='DATA' class='test' hidden></div>");

    $('#pageviews').on('click', function() {
        var text = '';
        $('#ID-overview-dimensionSummary-miniTable > table > tbody > tr').each(function(i, v) {
            if(i<=5 && ($(v).find('.TARGET-').html() !== undefined)) text += ($(v).find('.TARGET-').html()+'\n');
        });

        text+='\n';

        $('#ID-overview-dimensionSummary-miniTable > table > tbody > tr').each(function(i, v) {
            if(i<=5 && $(v).find('.TARGET-').html() !== undefined) text += ($(v).find('._GAjD').html()+'\n');
        });
        text += $('#ID-overview-sparkline > div:nth-child(2) > div._GAEx > div > div._GAEU').html()+'\n';

        console.clear();
        console.log(text);
    });
});