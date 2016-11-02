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
    var pageviews_visible = window.location.href.indexOf("content-overview");
    var usr_visible = window.location.href.indexOf("visitors-overview");
    var ref_visible = window.location.href.indexOf("trafficsources-overview");

    console.log("PAGE LOADED - "+window.location);

    // Wait 3 seconds before doing anything, clear all the errors if any.
    setTimeout(function () {
        console.clear();
        checkStatus();

        $('body').prepend("<div id='top' style='margin: .5em; padding: .25em; border-bottom: 3px solid orange'>");

        if($('#top').html().length == 0)
            $('#top').append("<button id='data' class='btn button-default'>Get Data</button>");
        else
        {
            if(pageviews_visible > -1)
                $('#data').html = "Get Pageview Data";
            else if(usr_visible > -1)
                $('#data').html = "Get User Data";
            else if(ref_visible > -1)
                $('#data').html = "Get Referral Data";
            else
                $('#top').html = "<h3>No data available here.</h3>";
        }

        //$('#ID-newNavPanel > div._GAoB._GAh.TARGET-nav > div:nth-child(7) > ul > li.ID-visitors-overview-item._GAB-_visitors_overview.ACTION-navigate.TARGET-visitors-overview._GAep._GAUb._GAff._GAOb > a, #ID-newNavPanel > div._GAoB._GAh.TARGET-nav > div:nth-child(8) > ul > li.ID-acquisition-overview-item._GAB-_acquisition_overview.ACTION-navigate.TARGET-acquisition-overview._GAep._GAUb > a, #ID-newNavPanel > div._GAoB._GAh.TARGET-nav > div:nth-child(9) > ul > li.ID-content-overview-item._GAB-_content_overview.ACTION-navigate.TARGET-content-overview._GAep._GAUb._GAff._GAOb > a').on('click', function() {
        $('a').on('click', function() {
            pageviews_visible = window.location.href.indexOf("content-overview");
            usr_visible = window.location.href.indexOf("visitors-overview");
            ref_visible = window.location.href.indexOf("trafficsources-overview");

            if($('#top').html().length == 0) {
                if(pageviews_visible > -1)
                    $('#top').append("<button id='data' class='btn button-default'>Get Pageview Data</button>");
                else if(usr_visible > -1)
                    $('#top').append("<button id='data' class='btn button-default'>Get User Data</button>");
                else if(ref_visible > -1)
                    $('#top').append("<button id='data' class='btn button-default'>Get Referral Data</button>");
                else
                    $('#top').append("<h3>No data available here.</h3>");
            }
            else
            {
                if(pageviews_visible > -1)
                    $('#data').html = "Get Pageview Data";
                else if(usr_visible > -1)
                    $('#data').html = "Get User Data";
                else if(ref_visible > -1)
                    $('#data').html = "Get Referral Data";
                else
                    $('#top').html = "<h3>No data available here.</h3>";
            }

            setTimeout(function () { checkStatus(); }, 2000);
        });

        $("#data").click(function() {
            pageviews_visible = window.location.href.indexOf("content-overview");
            usr_visible = window.location.href.indexOf("visitors-overview");
            ref_visible = window.location.href.indexOf("trafficsources-overview");

            var res = '';
            if(pageviews_visible > -1)
            {
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
                console.log("PAGEVIEW DATA");
                console.log("-----------------------");
                console.log(text);
            }
            else if(usr_visible > -1)
            {
                res = '';
                res +=
                    ($("#ID-overview-sparkline > div:nth-child(3) > div._GAEx > div > div._GAEU").html()+'\n') +
                    ($("#ID-overview-sparkline > div:nth-child(2) > div._GAEx > div > div._GAEU").html()+'\n')+
                    ($("#ID-overview-sparkline > div:nth-child(1) > div._GAEx > div > div._GAEU").html()+'\n')+
                    ($("#ID-overview-sparkline > div:nth-child(6) > div._GAEx > div > div._GAEU").html()+'\n');

                console.clear();
                console.log("USER DATA");
                console.log("-----------------------");
                console.log(res);
            }
            else if(ref_visible > -1)
            {
                res = '';
                res +=
                    $("#ID-slidebarchart-columnbody0 > div.ID-COLUMN-BODY-0 > div > div.ID-0-0-DATACELLCONTAINER._GAss._GAFN > div > div").html()+'\n'+
                    $("#ID-slidebarchart-columnbody0 > div.ID-1-0-DATAROW.ACTION-rowAction.TARGET-1._GAMn._GAyF > div.ID-1-0-DATACELLCONTAINER._GAss._GAFN > div > div").html()+'\n'+
                    $("#ID-slidebarchart-columnbody0 > div.ID-2-0-DATAROW.ACTION-rowAction.TARGET-2._GAMn._GAyF > div.ID-2-0-DATACELLCONTAINER._GAss._GAFN > div > div").html()+'\n';

                console.clear();
                console.log("REFERRAL DATA");
                console.log("-----------------------");
                console.log(res);
            }
        });

        // Make an invisible element to store the data in temporarily
        $('body').prepend("<div id='DATA' class='test' hidden></div>");
    }, 2000);
});

function checkStatus() {
    pageviews_visible = window.location.href.indexOf("content-overview");
    usr_visible = window.location.href.indexOf("visitors-overview");
    ref_visible = window.location.href.indexOf("trafficsources-overview");

    console.clear();
    console.log("Data Available:");
    console.log("-----------------------");
    console.log("User Data: "    + (usr_visible > -1).toString().toUpperCase());
    console.log("Referral Data: "+ (ref_visible > -1).toString().toUpperCase());
    console.log("Pageview Data: "+ (pageviews_visible > -1).toString().toUpperCase());
    console.log("-----------------------");
}
