function Horn(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;

  allHorns.push(this);
}

const allHorns = [];



function readJson () {
  $.get('./page-1.json', 'json')
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
