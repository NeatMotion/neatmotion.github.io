function switchToCS(){
  $.cookie('code_lang', 'cs');
  $('.language-cs').parent().parent().parent().show();
  $('.language-js').parent().parent().parent().hide();
}

function switchToJS(){
  $.cookie('code_lang', 'js');
  $('.language-cs').parent().parent().parent().hide();
  $('.language-js').parent().parent().parent().show();
}

$( document ).ready(function() {

  $('#markdown-toc').detach().appendTo('#doc-navbar').addClass('nav nav-stacked fixed').find('ul').addClass('nav nav-stacked');

  $('body').scrollspy({
      target: '.bs-docs-sidebar',
      offset: 120
  });

  $('figure.highlight').wrap("<div></div>");

  var langSelector = "<div class='dropdown' id='lang-dropdown'>";
  langSelector += "<button class='btn btn-primary dropdown-toggle btn-xs' type='button' id='lang-button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> C# <span class='caret'></span></button>";
  langSelector += "<ul class='dropdown-menu' aria-labelledby='lang-button'>";
  langSelector += "<li><a href='#' onClick='switchToCS();return false;'>C#</a></li>";
  langSelector += "<li><a href='#' onClick='switchToJS();return false;'>UnityScript</a></li>";
  langSelector += "</ul>";
  langSelector += "</div>";

  $('.language-cs').parent().parent().before(langSelector);

  langSelector = langSelector.replace("C# <span", "UnityScript <span");

  $('.language-js').parent().parent().before(langSelector);

  if(! $.cookie('code_lang'))
    $.cookie('code_lang', 'cs');

  var lang = $.cookie('code_lang');

  if(lang === 'cs'){
    switchToCS();
  }else{
    switchToJS();
  }

});
