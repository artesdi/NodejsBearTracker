

exports.apply = function(sightings, filter) {
    //TODO: Extract DI Container and use composite pattern

    sightings = apply_start_date_filter(sightings, filter.start_date);
    sightings = apply_end_date_filter(sightings, filter.end_date);
    sightings = apply_zip_code_filter(sightings, filter.zip_code);
    sightings = apply_bear_type_filter(sightings, filter.bear_type);

    apply_sort(sightings, filter.sort);

    console.log("filtered sightings:");
    console.log(sightings);

    return sightings;
}

function apply_sort(sightings, sort) {
    console.log("Filter sort equals: " + sort)
    if (sort === 'num_bears') {
        sightings.sort((a,b) => a.num_bears - b.num_bears);
    }
    else {
        sightings.sort((a,b) => new Date(a.date) - new Date(b.date));
    }
}

function apply_start_date_filter(sightings, filter) {
    console.log("Filter start_date equals: " + filter)
    if (filter === undefined)
        return sightings;

    return sightings.filter(s => new Date(s.date) >= new Date(filter));
}

function apply_end_date_filter(sightings, filter) {
    console.log("Filter end_date equals: " + filter)
    if (filter === undefined)
        return sightings;

    return sightings.filter(s => new Date(s.date) < new Date(filter));
}

function apply_zip_code_filter(sightings, filter) {
    console.log("Filter zip_code equals: " + filter)
    if (filter === undefined)
        return sightings;

    return sightings.filter(s => s.zip_code === filter);
}

function apply_bear_type_filter(sightings, filter) {
    console.log("Filter bear_type equals: " + filter)
    if (filter === undefined)
        return sightings;

    return sightings.filter(s => s.bear_type === filter);
}