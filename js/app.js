function Horn(obj) {
  this.image_url = `<img src="${obj.image_url}"`;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
}

const horns1 = [];
const horns2 = [];
let uniqueHorns = [];
let hornNum = [];


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

$('button').on('click', function() {
  let choice = $(this).attr('value');
  if(choice === 'horns1'){
    pageRender(horns1);
  } else {
    pageRender(horns2);
  }
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

$('#horns').on('change', function() {
  let selection2 = $(this).val();

  if (selection2 === 'default'){
    $('div').show();
    return;
  } else {
    $('div').hide();
    $(`div[class = "${selection2}"]`).show();
  }

});

$(() => readJson());

