function Horn(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
}

const horns1 = [];
const horns2 = [];
let uniqueHorns = [];

Horn.prototype.render = function () {
  // creating new div and appending to main
  $('main').append('<div class="entry"></div>');
  // give new div a new js variable name so we can work with it
  let $entry = $('div[class="entry"]');

  // copy the tags from the html template
  let hornTemplate = $('#photo-template').html();

  // place the template tags into our new entry
  $entry.html(hornTemplate);

  // give our div content from the obj
  $entry.find('h2').text(this.title);
  $entry.find('img').attr('src', this.image_url);
  $entry.find('p').text(this.description);
  $entry.find('h6').text(this.horns);

  $entry.removeClass('entry');
  $entry.attr('class', this.keyword);
};

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
    horn.render();
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

