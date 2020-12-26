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
    'smoked salmon',
    'hard cheese',
    'soft cheese',
    'cured meat',
    'pickles',
    'olives',
    'dark chocolate',
    'crackers',
    'dried fruits',
    'nuts'
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

const weighted_list = create_weighted_list(whisky_regions);

// This function will assign a whisky region to each guest.
const create_whisky_assignments = (names_list, regions_list) => {
    const new_obj = {}
    names_list.forEach(guest => {
        // This number will be used to pick a random region out of the weighted list of whisky regions
        let check = Math.floor(Math.random() * (regions_list.length-1));
        /*  Since it is desired to have a representative whisky from each whisky region before doubling up, this
            boolean variable will be used in the check to see if a region is a duplicate in the assignments list. */
        let unique = false;
        while (unique === false) {
            // If this is the first entry in the new_obj assignments, or if all of the regions are already accounted for.
            if (Object.keys(new_obj).length === 0 || Object.keys(new_obj).length >= Object.keys(whisky_regions).length){
                new_obj[guest] = regions_list[check];
                regions_list.splice(check,1); // remove region from weighted list to update weighting.
                unique = true; // move on to next guest.
            } else {
                // If the region is a duplicate in the new_obj and not all regions are accounted for, find a new random region. 
                if (Object.values(new_obj).indexOf(regions_list[check]) !== -1){
                    regions_list.splice(check,1); // remove region from weighted list to update weigthing.
                    check = Math.floor(Math.random() * (regions_list.length - 1));
                } else {
                    new_obj[guest] = regions_list[check];
                    regions_list.splice(check,1);
                    unique = true; // move on to next guest.
                }
            }
        }
    });
    return new_obj;
};

const create_snack_assignments = (obj, snacks_list) => {
    const new_list = [];
    for (key in obj) {
        let check = Math.floor(Math.random() * snacks_list.length);
        let unique = false;
        while (unique === false) {
            if (new_list.indexOf(snacks_list[check]) === -1 || new_list.length >= snacks_list.length){
                new_list.push(snacks_list[check]);
                unique = true;
            } else {
                check = Math.floor(Math.random() * snacks_list.length);
            }
        }
        obj[key] += ',' + new_list[Object.keys(obj).indexOf(key)];
        obj[key] = obj[key].split(',');
    }

}

const assignments = create_whisky_assignments(guests, weighted_list);
create_snack_assignments(assignments, snacks);
console.log(assignments);