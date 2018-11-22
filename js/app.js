function Horn(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;

  allHorns.push(this);
}

const allHorns = [];

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

  $entry.removeClass('entry');
  $entry.attr('class', this.name);
};

function readJson () {
  $.get('data/page-1.json', 'json')
    .then( data => {
      data.forEach( hornObj => {
        new Horn(hornObj);
      });
    })
    .then( () => {
      allHorns.forEach( horn => {
        horn.render();
      });
    });
}

$(() => readJson());
// readJson();
