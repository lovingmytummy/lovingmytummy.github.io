/* global List */

// LISTJS //

// Define the list options.
const searchOptions = {
  valueNames: [
    'title',
    'category',
    'tags',
    'duration',
    'rank',
    { name: 'origin', attr: 'search' },
    { name: 'ingredients', attr: 'data-ingredients' }
  ],
  fuzzySearch: {
    searchClass: 'fuzzy-search',
    location: 0,
    distance: 20,
    threshold: 0.4,
    multiSearch: true
  }
};

// Define the list object.
const recipeList = new List('js-list', searchOptions);

const checkCategory = document.getElementsByClassName('js-category');
const checkDuration = document.getElementsByClassName('js-duration');
const checkMeat = document.getElementsByClassName('js-meat');
const checkOrigin = document.getElementsByClassName('js-origin');
const checkRank = document.getElementsByClassName('js-rank');
const checkRegion = document.getElementsByClassName('js-region');
const checkMachine = document.getElementsByClassName('js-machine');

const checkBoxes = document.getElementsByClassName('searchbar-checkbox');

// Filter the list with the selected filters.
function filterList() {
  const checkedCategory = [];
  const checkedDuration = [];
  const checkedMeat = [];
  const checkedOrigin = [];
  const checkedRank = [];
  const checkedRegion = [];
  const checkedMachine = [];

  // Put the checked categories into an array.
  for (let m = 0; m < checkCategory.length; m += 1) {
    if (checkCategory[m].checked) {
      const valueCategory = checkCategory[m].value;
      checkedCategory.push(valueCategory);
    }
  }

  // Put the checked durations into an array.
  for (let n = 0; n < checkDuration.length; n += 1) {
    if (checkDuration[n].checked) {
      const valueDuration = checkDuration[n].value;
      checkedDuration.push(valueDuration);
    }
  }

  // Put the checked tags into an array.
  for (let o = 0; o < checkMeat.length; o += 1) {
    if (checkMeat[o].checked) {
      const valueMeat = checkMeat[o].value;
      checkedMeat.push(valueMeat);
    }
  }

  // Put the checked tags into an array.
  for (let p = 0; p < checkOrigin.length; p += 1) {
    if (checkOrigin[p].checked) {
      const valueOrigin = checkOrigin[p].value;
      checkedOrigin.push(valueOrigin);
    }
  }

  // Put the checked tags into an array.
  for (let p = 0; p < checkRegion.length; p += 1) {
    if (checkRegion[p].checked) {
      const valueRegion = checkRegion[p].value;
      checkedRegion.push(valueRegion);
    }
  }

   // Put the checked tags into an array.
   for (let p = 0; p < checkMachine.length; p += 1) {
    if (checkMachine[p].checked) {
      const valueMachine = checkMachine[p].value;
      checkedMachine.push(valueMachine);
    }
  }

    // Put the checked categories into an array.
    for (let m = 0; m < checkRank.length; m += 1) {
      if (checkRank[m].checked) {
        const valueRank = checkRank[m].value;
        checkedRank.push(valueRank);
      }
    }

  const checkedLength =
    checkedCategory.length +
    checkedDuration.length +
    checkedMeat.length +
    checkedOrigin.length +
    checkedRank.length + 
    checkedRegion.length + 
    checkedMachine.length;

  if (checkedLength > 0) {
    // Check if the item matches the filters.
    recipeList.filter(item => {
      // Check if in category.
      const category =
        checkedCategory.length === 0 ||
        checkedCategory.indexOf(item.values().category) > -1;

      // Check if duration is shorter.
      const duration =
        checkedDuration.length === 0 ||
        checkedDuration >= item.values().duration;

      // Check if item has meat.
      const meat =
        checkedMeat.length === 0 ||
        checkedMeat.filter(
          n =>
            item
              .values()
              .tags.split(', ')
              .indexOf(n) !== -1
        ).length > 0;

      // Check where item originates.
      const origin =
        checkedOrigin.length === 0 ||
        checkedOrigin.indexOf(item.values().origin) > -1;

      // Check rank.
      const rank =
      checkedRank.length === 0 ||
      checkedRank.indexOf(item.values().rank) > -1;

      // Check the region.
      const region =
      checkedRegion.length === 0 ||
      checkedRegion.filter(
        n =>
          item
            .values()
            .tags.split(', ')
            .indexOf(n) !== -1
      ).length > 0;

      // Check the machine used.
      const machine =
        checkedMachine.length === 0 ||
        checkedMachine.filter(
          n =>
            item
              .values()
              .tags.split(', ')
              .indexOf(n) !== -1
        ).length > 0;

      // Show the item if it matches the filters.
      if (category && duration && meat && origin && rank && region && machine) {
        return true;
      }

      return false;
    });
  } else {
    // No filters, so clear all filters.
    recipeList.filter();
  }
}

// Filter list when checkbox is clicked.
if (checkBoxes) {
  for (let k = 0; k < checkBoxes.length; k += 1) {
    checkBoxes[k].addEventListener('change', filterList);
  }
}