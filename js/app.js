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


Horn.prototype.menu = function () {
  if(uniqueHorns.indexOf(this.keyword) === -1){
    $('select').append('<option class = "option"></option>');
    let $option = $('option[class="option"]');

    $option.attr('value', this.keyword);
    $option.text(this.keyword);

    $option.removeClass('option');

    uniqueHorns.push(this.keyword);
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
  $('select').empty().html('<option value="default">-- Select --</option>');
  uniqueHorns = [];
  array.forEach( horn => {
    $('main').append(horn.toHtml());
    horn.menu();
  });
}

$('select').on('change', function() {
  let selection = $(this).val();

  if (selection === 'default'){
    $('div').show();
    return;
  } else {
    $('div').hide();
    $(`div[class = "${selection}"]`).show();
  }

});

$(() => readJson());

