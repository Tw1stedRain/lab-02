function Horn(obj) {
  this.image_url = `<img src="${obj.image_url}"`;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
}

const horns1 = [];
const horns2 = [];
let page;
let uniqueHorns = [];

const alphabetHorns = [];
const numbericHorns = [];



Horn.prototype.menu = function () {
  if(uniqueHorns.indexOf(this.keyword) === -1){
    $('#keyword').append('<option class = "option"></option>');
    let $option = $('option[class="option"]');

    $option.attr('value', this.keyword);
    $option.text(this.keyword);

    $option.removeClass('option');

    uniqueHorns.push(this.keyword);
  }
  if(hornNum.indexOf(this.horns) === -1){
    $('#horns').append('<option class = "horn"></option>');
    let $horns = $('option[class="horn"]');

    $horns.attr('value', this.horns);
    $horns.text(this.horns);

    $horns.removeClass();
    
    hornNum.push(this.horns);

  }
};

Horn.prototype.toHtml = function () {
  let templateHtml = $('#horns-template').html();
  let hornTemplate = Handlebars.compile(templateHtml);
  let newHorn = hornTemplate(this);
  return newHorn;

}

function alphaSort (a, b) {
  return a.title.toLowerCase() > b.title.toLowerCase();
}

function readJson () {
  $.get('data/page-1.json', 'json')
    .then( data => {
      data.forEach( hornObj => {
        horns1.push(new Horn(hornObj));
      });
    });
  $.get('data/page-2.json', 'json')
    .then( data => {
      data.forEach( hornObj => {
        horns2.push(new Horn(hornObj));
      });
    });
}

$('#horns1').on('click', function() {
  pageRender(horns1);
  page = 1;
});

$('#horns2').on('click', function () {
  pageRender(horns2);
  page = 2;
});

function pageRender (array) {
  $('main').empty();
  $('#keyword').empty().html('<option value="default">-- Keyword --</option>');
  $('#horns').empty().html('<option value="default">-- Horns --</option>');
  $('#title').empty().html('<option value="default">-- Title --</option>');
  uniqueHorns = [];
  hornNum = [];
  array.forEach( horn => {
    $('main').append(horn.toHtml());
    horn.menu();
  });
}

$('#keyword').on('change', function() {
  let selection = $(this).val();

  if (selection === 'default'){
    $('div').show();
    return;
  } else {
    $('div').hide();
    $(`div[class = "${selection}"]`).show();
  }

});

$('#alpha').on('click', function() {
  $('div').hide();
  if (page === 1) {
    horns1.sort(function(a, b) {
      if( a.title > b.title){
        return 1
      }
      if( a.title < b.title){
        return -1
      }
      return 0;
    });
    pageRender(horns1);
    console.log("1");
  } else {
    horns2.sort(function(a, b) {
      if( a.title > b.title){
        return 1
      }
      if( a.title < b.title){
        return -1
      }
      return 0;
    });
    pageRender(horns2);
  }

});

$(() => readJson());

