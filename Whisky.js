/*  The following object contains the 6 Scotch Whisky Regions along with a count of how many distilleries are in each region.
    This data was taken from https://en.wikipedia.org/wiki/List_of_whisky_distilleries_in_Scotland on 12/25/2020. */
const whisky_regions = {
    'Campbeltown' : 3,
    'Highland': 36,
    'Island' : 12,
    'Islay' : 9,
    'Lowland' : 16,
    'Speyside' : 51
};

// This list contains all of the guests at the whisky night
const guests = [
    'Tim',
    'Geoff',
    'Caleb',
    'Elson',
    'Nathan',
    'Michael',
    'Jordan',
    'David',
    'John'
];

// This list contains some common whisky tasting snacks.
const snacks = [
    'Smoked Salmon',
    'Hard Cheese',
    'Soft Cheese',
    'Cured Meat',
    'Pickles',
    'Olives',
    'Dark Chocolate',
    'Crackers',
    'Dried Fruits',
    'Nuts'
];

/*  This function creates a weighted list of whisky regions. This will be used later so that when regions are randomly
    assigned, any extra assignments are done weighted towards the regions with more distilleries. */
const create_weighted_list = regions => {
    const new_list = [];
    for (region in regions) {
        for (let i = 0; i < regions[region]; i++) {
            new_list.push(region);
        }
    }
    return new_list;
}
// This function creates a whisky list that will later be incorporated into the assignments Object.
const create_whisky_list = (guest_list, regions_list, weighted_list_func) => {
    let new_list = [];
    weighted_list = weighted_list_func(regions_list);
    for (let i = 0; i < guest_list.length; i++) {
        // This number will be used to pick a random region out of the weighted list of whisky regions
        let check = Math.floor(Math.random() * (weighted_list.length - 1));
        /*  Since it is desired to have a representative whisky from each whisky region before doubling up, this
            boolean variable will be used in the check to see if a region is a duplicate in the assignments list. */
        let unique = true;
        while (unique === true) {
            // If this is the first entry in the new_list, or if all of the regions are already accounted for.
            if (new_list.length === 0 || new_list.length >= Object.keys(regions_list).length) {
                new_list.push(weighted_list[check]);
                weighted_list.splice(check,1); // remove region entry from weighted list to update weighting.
                unique = false; // move on to index.
            } else {
                // If the region is a duplicate in the new_list and not all regions are accounted for, find a new random region.
                if (new_list.indexOf(weighted_list[check]) !== -1) {
                    weighted_list.splice(check,1);
                    check = Math.floor(Math.random() * (weighted_list.length -1));
                } else {
                    new_list.push(weighted_list[check]);
                    weighted_list.splice(check,1);
                    unique = false;
                }
            }
        }
    }
    return new_list;
};

// This function creates a snack list that will later be incorporated into the assignments Object.
const create_snack_list = (guest_list, snacks_list) => {
    const new_list = [];
    for (let i = 0; i < guest_list.length; i++) {
        // This will pick a random snack from the snacks list.
        let check = Math.floor(Math.random() * snacks_list.length);
        let unique = true;
        while (unique === true) {
            // If this is the first entry into the new_list or if all snacks are already accounted for.
            if (new_list.indexOf(snacks_list[check]) === -1 || new_list.length >= snacks_list.length){
                new_list.push(snacks_list[check]);
                unique = false;
            } else {
                check = Math.floor(Math.random() * snacks_list.length); // Create a new random snack to check.
            }
        }
    }
    return new_list;
}

// This function creates a draw list that will later be incorporated into the assignments Object.
const create_draw_list = guest_list => {
    const draw_numbers = []; // Numbers that will be drawn from
    const new_list = [];
    // This will generate the draw numbers from 1 to n where n is the number of guests.
    for (let i = 1; i <= guest_list.length; i++) {
      draw_numbers.push(i);  
    }
    // Draws a random number from the draw list and assigns it to the new list and then removes from the draw list.
    let check = Math.floor(Math.random() * draw_numbers.length);
    while (draw_numbers.length > 0) {
        new_list.push(draw_numbers[check]);
        draw_numbers.splice(check,1);
        check = Math.floor(Math.random() * draw_numbers.length);
        }
    return new_list;
}

/*  This function takes all of the previously generated lists and creates a new Object where the keys are the guest names
    and the values are from the whisky, snack, and draw lists. */
const create_assignments = (guest_lst, whisky_lst, snack_lst, draw_lst) => {
    const new_obj = {};
    for (let i = 0; i < guest_lst.length; i++) {
        new_obj[guest_lst[i]] = {
            'Whisky Region': whisky_lst[i],
            'Snack' : snack_lst[i],
            'Draw \#': draw_lst[i]
        };
    };
    return new_obj;
}

const whisky_list = create_whisky_list(guests, whisky_regions, create_weighted_list);
const snack_list = create_snack_list(guests, snacks);
const draw_list = create_draw_list(guests);

const assignments = create_assignments(guests, whisky_list, snack_list, draw_list);

console.log(
'\nThank you for signing up for our next whisky night! For this event we\'ve randomly assigned everyone a \
different Scotch Whisky Region to bring a bottle from. We\'ve also randomly assigned everyone a different \
snack to bring. At the end of the night everyone will get to go home with one of the bottles of whisky. We \
will draw numbers to see what order we pick our bottle to take home. The table below contains your assignment \
and draw order.\n'
);
console.table(assignments);